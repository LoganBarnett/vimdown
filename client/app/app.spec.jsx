'use strict';

const app = require('./app');
const FileBrowser = require('./file_browser');

describe('vimdown', () => {
  describe('routing', () => {
    it('selects a file based on the URL provided', () => {
      spyOn(app, 'selectFile');
      app.route('https://foo.com:2134/#/test-file.md');
      expect(app.selectFile).toHaveBeenCalledWith('test-file.md');
    });

    it('routes on hash changes to the URL', (done) => {
      spyOn(app, 'route').and.stub();
      window.location.hash = '#/test-file.md';
      // needs a timeout because the event needs time to propagate
      setTimeout(() => {
        const urlMinusHash = window.location.href.replace('#/test-file.md', '');
        expect(app.route).toHaveBeenCalledWith(urlMinusHash + '#/test-file.md');
        done();
      });
    });
  });
});