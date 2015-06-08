'use strict';

import React from 'react';
import ace from 'ace';

const Ace = React.createClass({
  render: function() {
    //setTimeout(() => ace.editor('editor'), 100);
    return (
      <div>
        <div id="editor"></div>
      </div>
    );
  }
});


module.exports = Ace;
