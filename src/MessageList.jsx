import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {

  render() {
  console.log("Rendering <MessageList/>");
  let messages = this.props.messages.map((message, index) =>
    <Message key={message.id} username={message.username} message={message.content}/>
  );
    return (
      <div>
        <main className="messages">
          {messages}
        <div className="message system">
          {this.props.messagesystem}
        </div>
        </main>
      </div>
    );
  }
}
export default MessageList;
