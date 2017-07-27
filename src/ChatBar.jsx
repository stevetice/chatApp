import React, {Component} from 'react';
import uuid from 'uuid';

class ChatBar extends Component {
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const message = {
        id: uuid(),
        username: this.props.name,
        content: e.target.value
      }
      this.props.handleNewMessage(message);
    }
  }
  render() {
        console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" value={this.props.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress}/>
      </footer>
      );
  }
}
export default ChatBar;
