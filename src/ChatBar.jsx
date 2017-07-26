import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (




      <footer>
        <form>
          <input type="text" className="inputUsername" placeholder="Your Name (Optional)" />
          <input type="text" className="inputMessage" placeholder="Type a message and press ENTER" />
        </form>
      </footer>
    );
  }
}
export default ChatBar;
