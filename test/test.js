// Created by leiko on 13/08/14 15:39
var expect = require('chai').expect;
var injectAsync = require('../inject-async');
var Class = require('./fixtures/Class');

describe('Class.syncStart()', function () {
    it('should set instance state to "true"', function () {
        var c = new Class();
        c.syncStart();
        expect(c.started).to.equal(true);
    });
});

describe('Class.asyncStart()', function () {
    it('should set instance state to "true" asynchronously', function (done) {
        this.timeout(4000);
        var c = new Class();
        injectAsync(c, c.asyncStart, function (err) {
            expect(err).to.be.a('null');
            expect(c.started).to.equal(true);
            done();
        });
    });
});