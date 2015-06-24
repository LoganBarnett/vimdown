'use strict';

import axios from 'axios';
import FileBrowser from './file_browser';
import Q from 'q';

describe('FileBrowser', () => {
  it('retrieves a list of files from the server', (done) => {
    spyOn(axios, 'get').and.callFake(() => {
      const deferred = Q.defer();
      setTimeout(() => deferred.resolve(['foo.txt', 'bar.png', 'bazz.sh']));
      return deferred.promise;
    });
    FileBrowser.getList().then((list) => {
      expect(list.length).toEqual(3);
      expect(list[0]).toEqual('foo.txt');
      expect(list[1]).toEqual('bar.png');
      expect(list[2]).toEqual('bazz.sh');
      done();
    })
    .catch((error) => {
      done.fail('Expected success getting file list but got failure instead', error);
    });
  });

  it('handles errors getting a list of files', (done) => {
    spyOn(axios, 'get').and.callFake(() => {
      const deferred = Q.defer();
      setTimeout(() => deferred.reject('404ed!'));
      return deferred.promise;
    });

    FileBrowser.getList().then((list) => {
      done.fail('Expected error getting file list but got success instead', list);
    })
    .catch((error) => {
      expect(error).toEqual('404ed!');
      done();
    });
  });

  it('loads an individual file', (done) => {
    spyOn(axios, 'get').and.callFake(() => {
      const deferred = Q.defer();
      setTimeout(() => deferred.resolve({data: '<foo></foo>'}));
      return deferred.promise;
    });

    FileBrowser.getFileData('foo.xml').then((fileData) => {
      expect(fileData).toEqual('<foo></foo>');
      done();
    })
    .catch((error) => {
      done.fail('expected success getting file data but got failure instead', error);
    });
  });

  it('handles errors loading individual files', (done) => {
    spyOn(axios, 'get').and.callFake(() => {
      const deferred = Q.defer();
      setTimeout(() => deferred.reject({status: 500, data: 'it blowed up'}));
      return deferred.promise;
    });

    FileBrowser.getFileData('foo.xml').then((fileData) => {
      done.fail('expected error getting file data but got success instead', fileData);
    })
    .catch((error) => {
      expect(error.status).toEqual(500);
      expect(error.data).toEqual('it blowed up');
      done();
    });
  });
});
