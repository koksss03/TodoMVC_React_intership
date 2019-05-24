import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  onEnterTodo = (e) => {
    if (typeof e.keyCode !== 'undefined' && e.keyCode !== 13) return;
    this.props.addTodo(e.target.value)
    e.target.value = ''
  }
  onToggleAll = (e) => {
    this.props.onToggleAll(this.props.stateToggleAll);
  }
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo" placeholder="What needs to be done?" onKeyUp={this.onEnterTodo} onBlur={this.onEnterTodo} autoFocus />
        <input id="toggle-all" className="toggle-all" type="checkbox" checked={this.props.stateToggleAll} onChange={this.onToggleAll} />
        <label htmlFor="toggle-all" style={{ display: this.props.showToggleAll ? 'block' : 'none' }} >Mark all as complete</label>
      </header>
    );
  }
}

export default Header;
