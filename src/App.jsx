import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.handleNewMessage=this.handleNewMessage.bind(this);
    this.incomingMessage=this.incomingMessage.bind(this);
    this.handleNewUser=this.handleNewUser.bind(this);
  }

  incomingMessage(event) {
    const receivedMessage = JSON.parse(event.data);
    console.log(receivedMessage);
    const messages = this.state.messages.concat(receivedMessage)
    this.setState({messages: messages})
  }

  handleNewMessage(message) {
  console.log(message);
  const messages = this.state.messages.concat(message)
  const msg = {
    id:   message.id,
    type: "message",
    username: message.username,
    content: message.content
  };
  // Send the msg object as a JSON-formatted string.
    this.ws.send(JSON.stringify(msg));
    // this.setState({messages: messages});
  }

  handleNewUser(username) {
    console.log(username);
    // const currentUser = username;

    this.setState({currentUser: {name: username.username}});
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
    this.ws = new WebSocket("ws://localhost:3001");
    console.log('Connected to server');
    this.ws.onmessage = this.incomingMessage
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages= {this.state.messages}/>
        <ChatBar name= {this.state.currentUser.name} handleNewMessage={this.handleNewMessage} handleNewUser={this.handleNewUser}/>
      </div>
    );
  }
}
export default App;
