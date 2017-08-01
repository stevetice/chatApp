import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {

  render() {
  console.log('Rendering <MessageList/>');

  // Determines how to display message by type received
  let messages = this.props.messages.map((message, index) => message.type == "incomingMessage"
    ? <Message key={message.id} username={message.username} message={message.content}/>
    : <div className="message system" key={message.id}>{message.content}</div>
  );
    return (
      <div>
        <main className="messages">
          {messages}
        </main>
      </div>
    );
  }
}
export default MessageList;
