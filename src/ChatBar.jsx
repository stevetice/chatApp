import React, {Component} from 'react';
import uuid from 'uuid';

class ChatBar extends Component {
  handleMessageKeyPress = (e) => {
    if (e.key === 'Enter') {
      const message = {
        id: uuid(),
        username: this.props.name,
        content: e.target.value
      }
      this.props.handleNewMessage(message);
    }
  }

  handleNameKeyPress = (e) => {
    if (e.key === 'Enter') {
      const username = {
        username: e.target.value
      }
      this.props.handleNewUser(username);
    }
  }
  render() {
        console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Name (Optional)" onKeyPress={this.handleNameKeyPress}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleMessageKeyPress}/>
      </footer>
      );
  }
}
export default ChatBar;
