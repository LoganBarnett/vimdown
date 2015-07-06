'use strict';

const requireUncached = require('require-uncached');
const FileBrowser = require('./file_browser');

// TODO: Instead of stubbing things out, let's just pass functions in DI style
describe('vimdown', () => {
  xdescribe('routing', () => {
    it('selects a file based on the URL provided', () => {
      const app = require('./app');
      spyOn(app, 'selectFile').and.stub();
      app.route('#/test-file.md');
      expect(app.selectFile).toHaveBeenCalledWith(false, 'test-file.md');
    });

    it('routes on hash changes to the URL', (done) => {
      console.log('initial url', window.location.href);
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
  });

  describe('file selection', () => {
    it('changes the URL hash when selecting a file', () => {
      const app = require('./app');
      const FileSelection = require('./file_selection');
      spyOn(FileSelection, 'selectFile').and.stub();
      spyOn(app, 'loadFile').and.stub();
      app.selectFile(true, 'foo-file.md');
      expect(window.location.hash).toEqual('#/foo-file.md');
    });

    it('stores the new results with the selection upon selecting a file', () => {
      const app = require('./app');
      const FileSelection = require('./file_selection');
      spyOn(FileSelection, 'selectFile').and.returnValue(['foo', 'bar']);
      spyOn(app, 'loadFile').and.stub();
      app.selectFile(false, 'foo-file.md');
      expect(app.fileListResults).toEqual(['foo', 'bar']);
    });

    it('loads files when they are selected', () => {
      const app = require('./app');
      const FileSelection = require('./file_selection');
      spyOn(FileSelection, 'selectFile').and.returnValue(['foo', 'bar']);
      spyOn(app, 'loadFile').and.stub();
      app.selectFile(false, 'foo-file.md');
      expect(app.loadFile).toHaveBeenCalledWith('foo-file.md');
    });
  });
});