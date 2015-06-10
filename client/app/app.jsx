'use strict';

const React = require('react');
const MarkdownView = require('./markdown_view');
const AceEditor = require('react-ace');
const brace = require('brace');
import FileList from './file_list';
import FileListLoadError from './file_list_load_error';
import FileBrowser from './file_browser';
require('brace/mode/markdown');
brace.acequire('ace/mode/markdown');
require('brace/keybinding/vim');
brace.acequire('ace/keybinding/vim');

let text = '';
let reacting = false;
let fileListResults = null;
let fileListError = false;

const app = {
  getFileList: () => {
    FileBrowser.getList().then((fileList) => {
      fileListResults = fileList.data;
      fileListError = false;
      app.render();
    })
    .catch((error) => {
      fileListError = true;
      fileListResults = error;
    });
  }
  , getFileListTag: () => {
    return fileListError ? <FileListLoadError reason={fileListResults}/> : <FileList fileList={fileListResults} />;
  }
  , onLoad: (editor) => {
    editor.setKeyboardHandler('ace/keyboard/vim');
  }
  , onChange: (newText) => {
    if(!reacting) {
      console.log('text changed', newText);
      text = newText;
      reacting = true;
      app.render();
      reacting = false;
    }
  }
  , render: () => {
    const fileListTag = app.getFileListTag();
    console.log('file list', fileListTag);
    React.render(
      <div>
        <div className="panel">
          {fileListTag}
        </div>
        <div className={'panel'}>
          <AceEditor
            mode="markdown"
            name="ace-editor"
            value={text}
            onLoad={app.onLoad}
            onChange={app.onChange}
            />
        </div>
        <div className={'panel'}>
          <MarkdownView className={'panel'} markdown={text}/>
        </div>
      </div>
      , document.body
    );
  }
};
app.getFileList();

app.render();
