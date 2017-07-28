import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ''}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      messagesystem: [],
      userCount: []
    };
    this.handleNewMessage=this.handleNewMessage.bind(this);
    this.incomingMessage=this.incomingMessage.bind(this);
    this.handleNewUser=this.handleNewUser.bind(this);
    this.incomingNotification=this.incomingNotification.bind(this);
    this.incomingCount=this.incomingCount.bind(this);
  }

  incomingMessage(eventData) {
    console.log(eventData);
    const messages = this.state.messages.concat(eventData)
    this.setState({messages: messages})
  }

  incomingNotification(eventData) {
    console.log(eventData);
    this.setState({messagesystem: eventData.content})
  }

  incomingCount(eventData) {
    console.log(eventData);
    this.setState({userCount: eventData.users})
  }

  handleNewMessage(message) {
    const messages = this.state.messages.concat(message)
    const msg = {
      id:   message.id,
      type: "postMessage",
      username: message.name,
      content: message.content
    };
    this.ws.send(JSON.stringify(msg));
  }

  handleNewUser(nameObj) {
    function checkName(name) {
      return name === '' ? 'Anonymous': name;
    }
    const newName = checkName(nameObj.name.trim());
    const oldName = this.state.currentUser.name;

    const user = {
      id: name.id,
      content: `${oldName} changed their name to ${newName}.`,
      type: "postNotification"
    }
    this.ws.send(JSON.stringify(user));
    this.setState({currentUser: {name: newName}});
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.ws = new WebSocket("ws://localhost:3001");

    this.ws.onopen = (event) => {
      console.log('Connected to server');
    }

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch(data.type) {
        case "incomingMessage":
          this.incomingMessage(data);
          break;
        case "incomingNotification":
          this.incomingNotification(data);
          break;
        case "incomingCount":
        console.log(data);
          this.incomingCount(data);
          break;
        default:
          // show error in console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    }
    this.incomingMessage
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <span className="counter"> Users Online: {this.state.userCount}</span>
        </nav>
        <MessageList messages= {this.state.messages} messagesystem={this.state.messagesystem}/>
        <ChatBar name= {this.state.currentUser.name} handleNewMessage={this.handleNewMessage} handleNewUser={this.handleNewUser}/>
      </div>
    );
  }
}
export default App;
