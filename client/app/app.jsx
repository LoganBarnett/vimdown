'use strict';

const React = require('react');
const MarkdownView = require('./markdown_view');
const AceEditor = require('react-ace');
const brace = require('brace');
require('brace/mode/markdown');
brace.acequire('ace/mode/markdown');
require('brace/keybinding/vim');
brace.acequire('ace/keybinding/vim');

let text = '';
let reacting = false;

const app = {
  onLoad: (editor) => {
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
    React.render(
      <div>
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

app.render();
