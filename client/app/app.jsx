'use strict';

const React = require('react');
const MarkdownView = require('./markdown_view');
const AceEditor = require('react-ace');
const brace = require('brace');
import FileSelection from './file_selection';
import FileList from './file_list';
import FileListLoadError from './file_list_load_error';
import FileBrowser from './file_browser';
import _ from 'lodash';
import mori from 'mori';

require('brace/mode/markdown');
brace.acequire('ace/mode/markdown');
require('brace/keybinding/vim.js');
brace.acequire('ace/keybinding/vim');

let text = '';
let reacting = false;
let fileListError = false;

const app = {
  getFileList: () => {
    return FileBrowser.getList().then((fileList) => {
      try {
        app.fileListResults = mori.map(f => {
          return mori.toClj({fileName: f, selected: false});
        }, fileList.data);

        fileListError = false;
        app.render();
      }
      // TODO: Need to have errors on success handlers automatically reject...
      catch(e) {
        console.error('error getting files', e);
        fileListError = true;
      }
    })
    .catch((error) => {
      fileListError = true;
      app.fileListResults = error;
    });
  }
  , selectFile: (applyUrl, fileName) => {
    app.fileListResults = FileSelection.selectFile(fileName, app.fileListResults);

    app.loadFile(fileName);
    if(applyUrl) {
      window.location.hash = '#/' + fileName;
    }
  }
  , loadFile: (fileName) => {
    FileBrowser.getFileData(fileName).then((data) => {
      text = data;
      reacting = true;
      app.render();
      reacting = false;
    }, (error) => {
      console.error('error', error);
      text = 'Error loading file "' + fileName + '":' + error;
      app.render();
    });
  }
  , getFileListTag: function() {
    return fileListError ? <FileListLoadError reason={app.fileListResults}/> : <FileList fileList={app.fileListResults} onSelect={mori.partial(this.selectFile, true)}/>;
  }
  , onLoad: (editor) => {
    // this one doesn't work
    //editor.setOption({maxLines: Infinity});
    // use this form instead
    editor.setOption('maxLines', Infinity);
    editor.setKeyboardHandler('ace/keyboard/vim');
    // need to resize when getting new content or setting something like max-lines
    // TODO: Might need to have a resize get called when text changes
    editor.resize();
    const aceSession = editor.getSession();
    aceSession.setUseWrapMode('free');
    const vim = window.ace.define.modules['ace/keyboard/vim'].Vim;
    vim.map('j', 'gj');
    vim.map('k', 'gk');
  }
  , onChange: (newText) => {
    if(!reacting) {
      text = newText;
      reacting = true;
      app.render();
      reacting = false;
    }
  }
  , route: (newUrl) => {
    const fileName = newUrl.substring(newUrl.indexOf('#') + 2); // get past '#/'
    app.selectFile(false, fileName);
  }
  , render: () => {
    const fileListTag = app.getFileListTag();
    React.render(
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2">
            <div className="row vertical-window">
              <p className="col-sm-12 flex-window-title window-title-bar bg-info">
                <strong>Notes</strong>
              </p>
              <div className="inner-window-scrolling-content">
                <div className="file-list col-sm-12">
                  {fileListTag}
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-10 vertical-window">
            <div className="row inner-window-scrolling-content">
              <div className="inner-window col-sm-6 remove-horizontal-padding">
                <div className="row">
                  <p className="col-sm-12 bg-primary window-title-bar">
                    Editor
                  </p>
                  <div className="text-editor">
                    <AceEditor
                      mode="markdown"
                      name="ace-editor"
                      value={text}
                      onLoad={app.onLoad}
                      onChange={app.onChange}
                      width="100%"
                      />
                  </div>
                </div>
              </div>
              <div className="inner-window col-sm-6 remove-horizontal-padding">
                <div className="row">
                  <p className="col-sm-12 window-title-bar bg-success">
                    Markdown Preview
                  </p>
                  <div className="col-sm-12">
                    <MarkdownView className={'panel'} markdown={text}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      , document.body
    );
  }
};
app.fileListResults = [];
app.getFileList();

app.render();

window.onhashchange = (hashUrl) => {
  app.route(hashUrl.newURL);
};

setTimeout(mori.partial(app.route, window.location.href), 0);
module.exports = app;
