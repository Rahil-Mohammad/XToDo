import './App.css';

import React, { Component } from 'react';
import Header from './Header';
import MainContent from './MainContent';

interface AppState {
  todoTaskArray: string[];
  doneTaskArray: string[];
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      todoTaskArray: JSON.parse(localStorage.getItem('todoTaskArray') || '[]') || [
        "Check emails and messages",
        "Review today's agenda and prioritize tasks",
        "Review meeting notes",
        "Implement new features",
        "Update documentation"
      ],
      doneTaskArray: JSON.parse(localStorage.getItem('doneTaskArray') || '[]') || []
    };
  }

  componentDidUpdate(_: {}, prevState: AppState) {
    if (
      prevState.todoTaskArray !== this.state.todoTaskArray ||
      prevState.doneTaskArray !== this.state.doneTaskArray
    ) {
      localStorage.setItem('todoTaskArray', JSON.stringify(this.state.todoTaskArray));
      localStorage.setItem('doneTaskArray', JSON.stringify(this.state.doneTaskArray));
    }
  }

  handleTaskStatusChange = (task: string, isDone: boolean) => {
    if (isDone) {
      this.setState(prevState => ({
        doneTaskArray: prevState.doneTaskArray.filter(item => item !== task),
        todoTaskArray: [...prevState.todoTaskArray, task]
      }));
    } else {
      this.setState(prevState => ({
        todoTaskArray: prevState.todoTaskArray.filter(item => item !== task),
        doneTaskArray: [...prevState.doneTaskArray, task]
      }));
    }
  };

  handleAnotherUser = () => {
    this.setState({
      todoTaskArray: ["Make a todo List for today"],
      doneTaskArray: ["Todo created by another user"]
    });
  };

  render() {
    return (
      <div className="min-h-screen">
        <Header />
        <MainContent
          todoTaskArray={this.state.todoTaskArray}
          doneTaskArray={this.state.doneTaskArray}
          handleTaskStatusChange={this.handleTaskStatusChange}
          handleAnotherUser={this.handleAnotherUser}
          setTodoTaskArray={todoTaskArray => this.setState({ todoTaskArray })}
        />
      </div>
    );
  }
}

export default App;
