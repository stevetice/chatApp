import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div>
        <span className="username">USERNAME: </span>
        <span className="message">message text </span>
      </div>
    );
  }
}
export default Message;
