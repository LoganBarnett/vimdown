'use strict';

const requireUncached = require('require-uncached');
const FileBrowser = require('./file_browser');

describe('vimdown', () => {
  describe('routing', () => {
    it('selects a file based on the URL provided', () => {
      const app = require('./app');
      const fileSelection = require('./file_selection');
      spyOn(fileSelection, 'selectFile');
      app.route('#/test-file.md');
      expect(fileSelection.selectFile).toHaveBeenCalledWith('test-file.md', []);
    });

    it('routes on hash changes to the URL', (done) => {
      const app = require('./app');
      spyOn(app, 'route').and.stub();
      window.location.hash = '#/test-file.md';
      // needs a timeout because the event needs time to propagate
      setTimeout(() => {
        const urlMinusHash = window.location.href.replace('#/test-file.md', '');
        expect(app.route).toHaveBeenCalledWith(urlMinusHash + '#/test-file.md');
        done();
      });
    });


    it('changes the route upon file selection', () => {
      const app = require('./app');
      app.selectFile('test-file.md');
      expect(window.location.hash).toEqual('#/test-file.md');
    });
  });
});