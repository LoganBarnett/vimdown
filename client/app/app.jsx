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
let fileListResults = [];
let fileListError = false;

const app = {
  getFileList: () => {
    return FileBrowser.getList().then((fileList) => {
      try {
        fileListResults = mori.map(f => {
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
      fileListResults = error;
    });
  }
  , selectFile: (fileName) => {
    //fileListResults = FileSelection.selectFile(fileName, fileListResults);
    //window.location.hash = '#/' + fileName;
  }
  , getFileListTag: function() {
    return fileListError ? <FileListLoadError reason={fileListResults}/> : <FileList fileList={fileListResults} onSelect={this.selectFile}/>;
  }
  , onLoad: (editor) => {
    editor.setKeyboardHandler('ace/keyboard/vim');
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
    fileListResults = FileSelection.selectFile(fileName, fileListResults);
  }
  , render: () => {
    const fileListTag = app.getFileListTag();
    React.render(
      <div>
        <div className="panel">
          {fileListTag}
        </div>
        <div className="panel panel-wide">
          <AceEditor
            mode="markdown"
            name="ace-editor"
            value={text}
            onLoad={app.onLoad}
            onChange={app.onChange}
            />
        </div>
        <div className="panel panel-wide">
          <MarkdownView className={'panel'} markdown={text}/>
        </div>
      </div>
      , document.body
    );
  }
};
app.getFileList();

app.render();

window.onhashchange = (hashUrl) => {
  app.route(hashUrl.newURL);
};

setTimeout(mori.partial(app.route, window.location.href), 0);
module.exports = app;
