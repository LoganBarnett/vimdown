'use strict';

const requireUncached = require('require-uncached');
const FileBrowser = require('./file_browser');

// TODO: Instead of stubbing things out, let's just pass functions in DI style
describe('vimdown', () => {
  describe('routing', () => {
    it('selects a file based on the URL provided', () => {
      const app = require('./app.jsx');
      spyOn(app, 'selectFile').and.stub();
      app.route('#/test-file.md');
      expect(app.selectFile).toHaveBeenCalledWith(false, 'test-file.md');
    });

    it('routes on hash changes to the URL', (done) => {
      const app = require('./app.jsx');
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
    it('renders the file name in the editor');

    it('changes the URL hash when selecting a file', () => {
      const app = require('./app.jsx');
      const FileSelection = require('./file_selection');
      spyOn(FileSelection, 'selectFile').and.returnValue(['foo', 'bar']);
      spyOn(app, 'loadFile').and.stub();
      spyOn(app, 'changeHash').and.stub();
      app.selectFile(true, 'qux-file.md');

      expect(app.changeHash).toHaveBeenCalledWith(window.location, 'qux-file.md');
    });

    it('stores the new results with the selection upon selecting a file', () => {
      const app = require('./app.jsx');
      const FileSelection = require('./file_selection');
      spyOn(FileSelection, 'selectFile').and.returnValue(['foo', 'bar']);
      spyOn(app, 'loadFile').and.stub();
      app.selectFile(false, 'bar-file.md');
      expect(app.fileListResults).toEqual(['foo', 'bar']);
    });

    it('loads files when they are selected', () => {
      const app = require('./app.jsx');
      const FileSelection = require('./file_selection');
      spyOn(FileSelection, 'selectFile').and.returnValue(['foo', 'bar']);
      spyOn(app, 'loadFile').and.stub();
      app.selectFile(false, 'bazz-file.md');
      expect(app.loadFile).toHaveBeenCalledWith('bazz-file.md');
    });
  });

  describe('file editing', () => {
    // TODO: Stagger this
    it('automatically saves files as they are edited', () => {
      const FileBrowser = require('./file_browser');
      spyOn(FileBrowser, 'writeFile');
      const app = require('./app.jsx');
      spyOn(app, 'render').and.stub();
      app.selectedFileName = 'bar.md';

      app.onChange('foo');

      expect(FileBrowser.writeFile).toHaveBeenCalledWith('bar.md', 'foo');
    });

    xit('handles errors saving files', () => {
      const q = require('q');
      const FileBrowser = require('./file_browser');
      spyOn(FileBrowser, 'writeFile').and.returnValue(Q.reject({status: 500, data: 'Error loading file'}));
      const app = require('./app.jsx');
      spyOn(app, 'render').and.stub();
      app.selectedFileName = 'error.md';

      app.onChange('foo');

      expect(FileBrowser.writeFile).toHaveBeenCalledWith('error.md', 'foo');
    });

    it('does something smart if rendering fails');
  });
});