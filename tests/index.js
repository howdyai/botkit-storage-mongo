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
            findAndModify: sinon.stub()
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
            monkMock.callCount.should.equal(3);
            monkMock.args[0][0].should.equal(config.mongoUri);
            monkMock.args[1][0].should.equal(config.mongoUri);
            monkMock.args[2][0].should.equal(config.mongoUri);
        });
    });

    ['teams', 'channels', 'users'].forEach(function(method) {
        describe(method + '.get', function() {
            it('should call callback with error if error occurs', function() {
                var cb = sinon.stub(),
                    err = new Error('OOPS!');

                collectionObj.findOne.yields(err);

                Storage(config)[method].get('walterwhite', cb);
                collectionObj.findOne.should.be.calledWith({id: 'walterwhite'});
                cb.should.be.calledWith(err);
            });

            it('should call callback wih data', function() {
                var cb = sinon.stub(),
                    data = {};

                collectionObj.findOne.yields(null, data);

                Storage(config)[method].get('walterwhite', cb);
                collectionObj.findOne.should.be.calledWith({id: 'walterwhite'});
                cb.should.be.calledWith(null, data);
            });
        });

        describe(method + '.save', function() {

            it('should call findAndModify', function() {
                var data = {id: 'walterwhite'},
                    cb = sinon.stub();

                Storage(config)[method].save(data, cb);
                collectionObj.findAndModify.should.be.calledWith(
                    {id: 'walterwhite'},
                    data,
                    {upsert: true, 'new': true},
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
    });
});
