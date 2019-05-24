import React, { Component } from 'react';

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = { isEditing: true, checked: this.props.todo.checked, todoClassName: '' }
    if (this.props.todo.checked) {
      this.state.todoClassName = 'completed'
    }
    this.editInput = null;
    this.todoRef = null;
  }
  componentDidUpdate() {
    if (!this.isEditing) {
      this.editInput.focus();
    }
  }
  setEditInput = (e) => {
    this.editInput = e
  }
  changeState = () => {
    this.props.changeState(this.props.todo.id);

  }
  destroyTodo = () => {
    this.props.removeTodo(this.props.todo.id);
  }
  onEditing = (e) => {
    this.setState({ isEditing: true, todoClassName: 'editing' })
    this.todoRef.className = 'editing'
    this.editInput.value = this.props.todo.value;
  }
  doneInputTodo = (e) => {
    if (typeof e.keyCode !== 'undefined' && e.keyCode !== 13) return;
    if (e.target.value === '') {
      this.props.removeTodo(this.props.todo.id)
      return
    }
    this.props.editTodo(this.props.todo.id, e.target.value)
    if (this.props.todo.checked) {
      this.todoRef.className = 'completed'
    } else {
      this.todoRef.className = ''
    }
  }
  setTodoRef = (e) => {
    this.todoRef = e
  }
  render() {
    return (
      <li ref={this.setTodoRef} className={this.props.todo.checked ? 'completed' : ''}>
        < div className="view">
          <input checked={this.props.todo.checked} onChange={this.changeState} className="toggle" type="checkbox" />
          <label onDoubleClick={this.onEditing}>{this.props.todo.value}</label>
          <button className="destroy" onClick={this.destroyTodo}></button>
        </div >
        <input type="text" className="edit" ref={this.setEditInput} onKeyUp={this.doneInputTodo} onBlur={this.doneInputTodo} />
      </li >
    );
  }
}

export default Todo;
