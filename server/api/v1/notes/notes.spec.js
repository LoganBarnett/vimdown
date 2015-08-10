'use strict';

const model = require('./notes.model');
const childProcess = require('child_process');
const fs = require('fs');
const q = require('q');
const _ = require('lodash');
//import mori from 'mori';
const mori = require('mori');

const delayedPromise = (callback) => {
  const deferred = q.defer();
  setTimeout(() => callback(), 0);
  return deferred.promise;
};

const expectPromiseResolve = (promise, done, expected) => {
  promise.then((result) => {
    expect(result).toEqual(expected);
    done();
  }, (error) => {
    done.fail('Expected success resolving promise but got failure instead', error);
  });
};

const expectPromiseReject = (promise, done, expected) => {
  promise.then((result) => {
    done.fail('Expected error resolving promise but got success instead', result);
  }, (error) => {
    expect(error).toEqual(expected);
    done();
  });
};

describe('Notes', function() {
  describe('model', function() {

    it('gets a list of notes', function(done) {
      spyOn(childProcess, 'execFile').and.callFake((command, params, options, cb) => {
        const deferred = q.defer();
        // find lists the base path itself
        setTimeout(() => cb(null, 'unused\nfoo\nbar\nbazz'), 0);
        return deferred.promise;
      });
      model.getList('./dir').then((list) => {
        expect(list).toBeDefined();
        done();
      }, (error) => {
        done.fail('Expected success getting files but got error instead: ' + error);
      });
    });

    it('truncates the base dir from the notes path', () => {
      spyOn(childProcess, 'execFile').and.callFake((command, params, options, cb) => {
        const deferred = q.defer();
        // find lists the base path itself
        setTimeout(() => cb(null, './dir\n./dir/foo\n./dir/bar\n./dir/bazz'), 0);
        return deferred.promise;
      });
      model.getList('./dir').then((list) => {
        expect(list[0]).toEqual('foo');
        expect(list[1]).toEqual('bar');
        expect(list[2]).toEqual('bazz');
        done();
      }, (error) => {
        done.fail('Expected success getting files but got error instead: ' + error);
      });
    });

    it('parses the list of files correctly', () => {
      spyOn(childProcess, 'execFile').and.callFake((command, params, options, cb) => {
        const deferred = q.defer();
        // find lists the base path itself
        setTimeout(() => cb(null, './dir\nfoo\nbar\nbazz'), 0);
        return deferred.promise;
      });
      model.getList('./dir').then((list) => {
        expect(list[0]).toEqual('foo');
        expect(list[1]).toEqual('bar');
        expect(list[2]).toEqual('bazz');
        done();
      }, (error) => {
        done.fail('Expected success getting files but got error instead: ' + error);
      });
    });

    it('rejects getting notes on an error', (done) => {
      spyOn(childProcess, 'execFile').and.callFake((command, params, options, cb) => {
        const deferred = q.defer();
        setTimeout(() => cb('Dir does not exist', null), 0);
        return deferred.promise;
      });

      model.getList('./dir').then((list) => {
        done.fail('Expected error getting files but got success instead', list);
      }, (error) => {
        expect(error).toEqual('Dir does not exist');
        done();
      })
    });

    it('gets data from a note', (done) => {
      spyOn(fs, 'readFile').and.callFake((path, options, cb) => {
        delayedPromise(mori.partial(cb, null, '<foo></foo>'));
      });
      expectPromiseResolve(model.getFileData('foo.xml'), done, '<foo></foo>');
    });

    it('rejects getting note data on an error', (done) => {
      spyOn(fs, 'readFile').and.callFake((path, options, cb) => {
        delayedPromise(mori.partial(cb, 'an error', null));
      });
      expectPromiseReject(model.getFileData('foo.xml'), done, 'an error');
    });

    it('creates new notes', (done) => {
      spyOn(fs, 'writeFile').and.callFake((fileName, data, cb) => {
        delayedPromise(_.partial(cb, null));
      });

      model.create('file.md', 'contents').then(() => {
        expect(fs.writeFile).toHaveBeenCalledWith('file.md', 'contents', jasmine.any(Function));
        done();
      }, (error) => {
        done.fail('Expected success writing file but got error instead', error);
      });
    });

    it('rejects creating files on error', (done) => {
      spyOn(fs, 'writeFile').and.callFake((fileName, data, cb) => {
        delayedPromise(_.partial(cb, 'invalid permissions'));
      });

      model.create('file.md', 'contents').then(() => {
        done('Expected error writing file but got success instead');
      }, (error) => {
        expect(error).toEqual('invalid permissions');
        done();
      });
    });

    it('writes to existing files', (done) => {
      spyOn(fs, 'writeFile').and.callFake((fileName, data, cb) => {
        delayedPromise(_.partial(cb, null));
      });

      model.update('file.md', 'contents').then(() => {
        expect(fs.writeFile).toHaveBeenCalledWith('file.md', 'contents', jasmine.any(Function));
        done();
      }, (error) => {
        done.fail('Expected success writing file but got error instead', error);
      });
    });

    it('rejects updating files on error', (done) => {
      spyOn(fs, 'writeFile').and.callFake((fileName, data, cb) => {
        delayedPromise(_.partial(cb, 'invalid permissions'));
      });

      model.update('file.md', 'contents').then(() => {
        done('Expected error writing file but got success instead');
      }, (error) => {
        expect(error).toEqual('invalid permissions');
        done();
      });
    });

    it('deletes files', (done) => {
      spyOn(fs, 'unlink').and.callFake((fileName, cb) => {
        delayedPromise(_.partial(cb, 'invalid permissions'));
      });

      model.delete('file.md').then(() => {
        done('Expected error writing file but got success instead');
      }, (error) => {
        expect(error).toEqual('invalid permissions');
        done();
      });
    });

    it('rejects deleting files on error', (done) => {
      spyOn(fs, 'unlink').and.callFake((fileName, cb) => {
        delayedPromise(_.partial(cb, 'invalid permissions'));
      });

      model.delete('file.md').then(() => {
        done('Expected error writing file but got success instead');
      }, (error) => {
        expect(error).toEqual('invalid permissions');
        done();
      });
    });

  });

  // TODO: Get a pattern for controller tests
  xdescribe('controller', () => {
    it('gets file data for a file', (done) => {
      const controller = require('./notes.controller');
      //controller.get();
    });
  });
});
