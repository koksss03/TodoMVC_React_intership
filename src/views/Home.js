import React, { Component } from 'react';
import Header from '../components/Header'
import Todo from '../components/Todo'
import Footer from '../components/Footer'
import '../assets/styles/index.css';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { todoList: this.restoreState() || [], filter: 'all' }
  }
  componentDidUpdate() {
    if (!this.isEditing) {
      this.saveState();
    }
  }
  addTodo = (value) => {
    if (value === '') return
    this.setState({ todoList: this.state.todoList.concat({ value, checked: false, id: new Date().getTime() }) })
    this.saveState();
  }
  changeTodoState = (id) => {
    let { todoList } = this.state;
    let index = todoList.findIndex(todo => todo.id === id);
    todoList[index].checked = !todoList[index].checked
    this.setState({ todoList })
  }
  removeTodo = (id) => {
    this.setState({ todoList: this.state.todoList.filter(todo => todo.id !== id) })
  }
  editTodo = (id, value) => {
    let { todoList } = this.state;
    let index = todoList.findIndex(todo => todo.id === id);
    todoList[index].value = value;
    this.setState({ todoList })
  }
  removeCompletedTodo = () => {
    let { todoList } = this.state;
    let uncompletedTodoList = todoList.filter(todo => !todo.checked)
    this.setState({ todoList: uncompletedTodoList })
  }
  changeStateAllTodo = (toggleAllState) => {
    let { todoList } = this.state;
    todoList = todoList.concat()
    for (let i = 0; i < todoList.length; i++) {
      todoList[i].checked = !toggleAllState;
    }
    this.setState({ todoList })
  }
  changeFilter = (newFilter) => {
    if (newFilter === this.state.filter) return
    this.setState({ filter: newFilter })
  }
  saveState = () => {
    try {
      return localStorage.setItem(`todo-react`, JSON.stringify(this.state.todoList));
    } catch (e) { }
  }
  restoreState = () => {
    try {
      return JSON.parse(localStorage.getItem(`todo-react`));
    } catch (e) { }
  }
  todoFilter = (filter) => {
    switch (filter) {
      case 'active':
        return this.state.todoList.filter(todo => !todo.checked)
      case 'completed':
        return this.state.todoList.filter(todo => todo.checked)
      default:
        return this.state.todoList
    }
  }
  render() {
    const { todoList } = this.state;
    return (
      <>
        <section className="todoapp">
          <Header addTodo={this.addTodo} stateToggleAll={todoList.filter(todo => todo.checked).length === todoList.length} showToggleAll={!!todoList.length} onToggleAll={this.changeStateAllTodo} />
          <section className="main">
            <ul className="todo-list">
              {this.todoFilter(this.state.filter).map(todo => (
                <Todo todo={todo} key={todo.id} changeState={this.changeTodoState} removeTodo={this.removeTodo} editTodo={this.editTodo} />
              ))}
            </ul>
          </section>
          {(() => {
            if (todoList.length) {
              return <Footer todoCounter={todoList.filter(todo => !todo.checked).length} clearCompleted={this.removeCompletedTodo} changeFilter={this.changeFilter} filter={this.state.filter} />
            }
          })()}
        </section>
        <footer className="info">
          <p>Double-click to edit a todo</p>
          <p>
            Created by <a href="http://twitter.com/oscargodson">Oscar Godson</a>
          </p>
          <p>
            Refactored by
            <a href="https://github.com/cburgmer">Christoph Burgmer</a>
          </p>
          <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
      </>
    )
  }
}

export default Home;
