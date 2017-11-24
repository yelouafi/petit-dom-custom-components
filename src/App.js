/* @jsx h */
import { h } from "petit-dom";
import Component from "./Component";
import Counter from "./Counter";

class App extends Component {
  title = "My counter";

  changeTitle = e => {
    this.title = e.target.value;
    this.updateUI();
  };

  render() {
    return (
      <div>
        <p>
          Type a title
          <input value={this.title} oninput={this.changeTitle} />
          <hr />
          <Counter title={this.title} />
        </p>
      </div>
    );
  }
}

export default App;
