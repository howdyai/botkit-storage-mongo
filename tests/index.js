var should = require('should');

var testObject = {
        id: 'test1',
        foo: 'bar0'
    },
    testObject2 = {
        id: 'test2',
        foo: 'bar1'
    };

var mongodbDriver = require('../src/index.js')({
    mongoUri: 'mongodb://127.0.0.1:27017/tests'
});

describe('Users', function() {
    it('should be created', function(done) {
        mongodbDriver.users.save(testObject, function(err) {
            (err === null).should.be.true;

            done();
        });
    });

    it('should get a user', function(done) {
        mongodbDriver.users.save(testObject, function(err, data) {
            (err === null).should.be.true;

            mongodbDriver.users.get(testObject.id, function(err, data) {
                (err === null).should.be.true;

                data.foo.should.equal(testObject.foo);
                done();
            });
        });
    });

    it('should get multiple users', function(done) {
        var first, second;
        mongodbDriver.users.save(testObject, function(err, data) {
            (err === null).should.be.true;
            first = data;

            mongodbDriver.users.save(testObject2, function(err, data) {
                (err === null).should.be.true;

                second = data;

                mongodbDriver.users.all(function(err, data) {
                    (err === null).should.be.true;

                    data.should.have.length(2);
                    done();
                })
            });
        })
    });
});

describe('Channels', function() {
    it('should be created', function(done) {
        mongodbDriver.users.save(testObject, function(err) {
            (err === null).should.be.true;

            done();
        });
    });

    it('should get a channel', function(done) {
        mongodbDriver.channels.save(testObject, function(err, data) {
            (err === null).should.be.true;

            mongodbDriver.channels.get(testObject.id, function(err, data) {
                (err === null).should.be.true;

                data.foo.should.equal(testObject.foo);
                done();
            });
        });
    });

    it('should get multiple channels', function(done) {
        var first, second;
        mongodbDriver.channels.save(testObject, function(err, data) {
            (err === null).should.be.true;
            first = data;

            mongodbDriver.channels.save(testObject2, function(err, data) {
                (err === null).should.be.true;

                second = data;

                mongodbDriver.users.all(function(err, data) {
                    (err === null).should.be.true;

                    data.should.have.length(2);
                    done();
                })
            });
        })
    });
});

describe('Teams', function() {
    it('should be created', function(done) {
        mongodbDriver.teams.save(testObject, function(err) {
            (err === null).should.be.true;

            done();
        });
    });

    it('should get a team', function(done) {
        mongodbDriver.teams.save(testObject, function(err, data) {
            (err === null).should.be.true;

            mongodbDriver.teams.get(testObject.id, function(err, data) {
                (err === null).should.be.true;

                data.foo.should.equal(testObject.foo);
                done();
            });
        });
    });

    it('should get multiple teams', function(done) {
        var first, second;

        mongodbDriver.teams.save(testObject, function(err, data) {
            (err === null).should.be.true;
            first = data;

            mongodbDriver.teams.save(testObject2, function(err, data2) {
                (err === null).should.be.true;
                second = data2;

                mongodbDriver.teams.all(function(err, data) {
                    (err === null).should.be.true;

                    data.should.have.length(2);
                    done();
                })
            });
        })
    });
});
