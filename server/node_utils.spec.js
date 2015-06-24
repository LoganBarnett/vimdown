'use strict';

const NodeUtils = require('./node_utils');

describe('NodeUtils', () => {
  it('resolves the standard Node.js callbacks as a promise on success', (done) => {
    const fn = () => {
      const cb = arguments[arguments.length - 1];
      cb(null, 'some data');
    };
    NodeUtils.promisize(fn).then((data) => {
      expect(data).toEqual('some data');
      done();
    }, (error) => {
      done.fail('Expected success handling Node.js callback but got error instead: ' + error + '\n' + error.stack);
    });
  });

  it('rejects the standard Node.js callbacks as a promise on an error', (done) => {
    const fn = () => {
      const cb = arguments[arguments.length - 1];
      cb('an error', null);
    };

    NodeUtils.promisize(fn).then((data) => {
      done.fail('Expected error handling Node.js callback but got success instead: ' + data);
    }, (error) => {
      expect(error).toEqual('an error');
      done();
    });
  });
});