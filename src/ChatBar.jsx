import React, {Component} from 'react';
import uuid from 'uuid';

class ChatBar extends Component {

  handleMessageKeyPress = (e) => {
    if (e.key === 'Enter') {
      const message = {
        id: uuid(),
        name: this.props.name,
        content: e.target.value
      }
      this.props.handleNewMessage(message);
    }
  }

  handleNameKeyPress = (e) => {
    if (e.key === 'Enter') {
      const name = {
        id: uuid(),
        name: e.target.value
      }
      this.props.handleNewUser(name);
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
