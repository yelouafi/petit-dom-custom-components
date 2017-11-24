import { h, mount, patch, unmount } from "petit-dom";

export default class Component {
  constructor(props = {}, content) {
    const self = this;
    this._tag = "x-" + this.constructor.name.toLowerCase();
    this.props = props;
    this.content = content;
  }

  mount() {
    this._vnode = h(this._tag, null, this.render());
    const node = mount(this._vnode);
    node.$$instance = this; // make instance accessible in devtools
    return node;
  }

  patch(node, props, oldProps, content, oldContent) {
    this.props = props;
    this.content = content;
    this.updateUI();
    return node;
  }

  unmount(node) {
    node.$$instance = null;
    return unmount(this._vnode);
  }

  updateUI() {
    const oldVnode = this._vnode;
    this._vnode = h(this._tag, null, this.render());
    patch(this._vnode, oldVnode);
  }
}
