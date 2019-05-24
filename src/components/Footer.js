import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <span className="todo-count"><strong>{this.props.todoCounter}</strong> items left</span>
        <ul className="filters">
          <li>
            <a href="#/" className={this.props.filter === 'all' ? 'selected' : ''} onClick={() => this.filter('all')}>All</a>
          </li>
          <li>
            <a href="#/active" className={this.props.filter === 'active' ? 'selected' : ''} onClick={() => this.filter('active')}>Active</a>
          </li>
          <li>
            <a href="#/completed" className={this.props.filter === 'completed' ? 'selected' : ''} onClick={() => this.filter('completed')}>Completed</a>
          </li>
        </ul>
        <button className="clear-completed" onClick={this.props.clearCompleted}>Clear completed</button>
      </footer>
    );
  }
  filter = (filter) => {
    this.props.changeFilter(filter);
  }
}

export default Footer;
