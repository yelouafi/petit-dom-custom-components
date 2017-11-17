/* @jsx h */
import { h } from "petit-dom";
import Component from "./component";

function delay(ms) {
  return new Promise(res => {
    setTimeout(res, ms);
  });
}

export default class Counter extends Component {
  count = 0;
  steps = 0;

  increment() {
    this.count++;
    this.updateUI();
  }

  async incrementAsync() {
    this.steps = 5;
    this.updateUI();
    while (this.steps > 0) {
      await delay(1000);
      this.steps--;
      this.updateUI(() => console.log("update callback: step ", this.steps));
      console.log("incrementAsync: step ", this.steps);
    }
    this.count++;
    this.updateUI();
  }

  onPatch(props) {
    if (props.title === "Counter 0") {
      this.updateUI();
    }
  }

  render() {
    return (
      <div>
        <p style={`color: ${this.steps > 0 ? "red" : "black"}`}>
          {this.props.title}
          {": "}
          {this.count}
        </p>
        <button disabled={this.steps} onclick={this.increment}>
          Increment
        </button>
        <button disabled={this.steps} onclick={this.incrementAsync}>
          Increment after 5s ({this.steps})
        </button>
      </div>
    );
  }
}
