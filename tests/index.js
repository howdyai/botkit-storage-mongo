var should = require('should'),
    sinon = require('sinon'),
    proxyquire = require('proxyquire').noCallThru();

require('should-sinon');

describe('Mongo', function() {
    var monkMock,
        collectionMock,
        collectionObj,
        Storage,
        config;

    beforeEach(function() {
        config = {mongoUri: 'http://someurl.somewhere.com'};

        collectionObj = {
            find: sinon.stub(),
            findOne: sinon.stub(),
            findOneAndUpdate: sinon.stub(),
            findOneAndDelete: sinon.stub(),
        };

        collectionMock = {
            get: sinon.stub().returns(collectionObj)
        };

        monkMock = sinon.stub().returns(collectionMock);

        Storage = proxyquire('../src/index', {monk: monkMock});
    });

    describe('Initialization', function() {
        it('should throw an error if config is missing', function() {
            Storage.should.throw('Need to provide mongo address.');
        });

        it('should throw an error if mongoUri is missing', function() {
            (function() {Storage({});}).should.throw('Need to provide mongo address.');
        });

        it('should initialize monk with mongoUri', function() {
            Storage(config);
            monkMock.callCount.should.equal(1);
            monkMock.args[0][0].should.equal(config.mongoUri);
        });
    });

    ['teams', 'channels', 'users'].forEach(function(method) {
        describe(method + '.get', function() {
            it('should call findOne with callback', function() {
                var cb = sinon.stub();

                Storage(config)[method].get('walterwhite', cb);
                collectionObj.findOne.should.be.calledWith({id: 'walterwhite'}, cb);
            });
        });

        describe(method + '.save', function() {

            it('should call findOneAndUpdate', function() {
                var data = {id: 'walterwhite'},
                    cb = sinon.stub();

                Storage(config)[method].save(data, cb);
                collectionObj.findOneAndUpdate.should.be.calledWith(
                    {id: 'walterwhite'},
                    data,
                    {upsert: true, 'returnNewDocument': true},
                    cb
                );
            });
        });

        describe(method + '.all', function() {

            it('should call find', function() {
                var cb = sinon.stub();

                Storage(config)[method].all(cb);
                collectionObj.find.should.be.calledWith({}, cb);
            });
        });

        describe(method + '.delete', function() {

            it('should call findOneAndDelete', function() {
                var id = 'walterwhite',
                    cb = sinon.stub();

                Storage(config)[method].delete(id, cb);
                collectionObj.findOneAndDelete.should.be.calledWith({id: 'walterwhite'}, cb);
            });
        });

        describe(method + '.find', function() {
            it('should pass options to find', function() {
                var cb = sinon.stub(),
                    options = {
                        limit: 1
                    };


                Storage(config)[method].find({}, options, cb);
                collectionObj.find.should.be.calledwith({}, options, cb);
            });
        });
    });
});
