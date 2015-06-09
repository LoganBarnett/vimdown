'use strict';

var model = require('./notes.model');
const fs = require('fs');
const q = require('q');

describe('Generation Sets', function() {
  describe('model', function() {

    afterEach(function() {
    });

    it('gets a list of notes', function(done) {
      spyOn(fs, 'readdir').and.callFake((dir, cb) => {
        const deferred = q.defer();
        setTimeout(() => cb(null, ['foo', 'bar', 'bazz']), 0);
        return deferred.promise;
      });
      model.getList('./dir').then((list) => {
        expect(list).toBeDefined();
        done();
      }, (error) => {
        done.fail('Expected success getting files but got error instead', error);
      });
    });
  });
});
