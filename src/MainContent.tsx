import React, { Component } from 'react';
import TodoList from './TodoList';
import DoneList from './DoneList';
import CreateTodo from './CreateTodo';

interface MainContentProps {
  todoTaskArray: string[];
  doneTaskArray: string[];
  handleTaskStatusChange: (task: string, isDone: boolean) => void;
  handleAnotherUser: () => void;
  setTodoTaskArray: React.Dispatch<React.SetStateAction<string[]>>;
}

interface MainContentState {
  createToDo: boolean;
  value: string;
}

class MainContent extends Component<MainContentProps, MainContentState> {
  constructor(props: MainContentProps) {
    super(props);
    this.state = {
      createToDo: false,
      value: '',
    };
  }

  handleClick = () => {
    this.setState(prevState => ({ createToDo: !prevState.createToDo }));
  };

  handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  handleTodo = () => {
    const { value } = this.state;
    const { todoTaskArray, setTodoTaskArray } = this.props;

    if (value === "") {
      return alert("Please enter a Task");
    }

    setTodoTaskArray([...todoTaskArray, value]);
    this.setState({ createToDo: false, value: '' });
  };

  render() {
    const { todoTaskArray, doneTaskArray, handleTaskStatusChange, handleAnotherUser } = this.props;
    const { createToDo, value } = this.state;

    return (
      <>
        <div className="py-8 md:flex justify-between space-y-2 max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold">Things to get done</h2>
          <button
            className="bg-yellow-500 px-4 py-2 text-white rounded text-sm font-semibold hover:bg-yellow-600"
            onClick={handleAnotherUser}
          >
            Refresh
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <TodoList
            todoTaskArray={todoTaskArray}
            handleTaskStatusChange={handleTaskStatusChange}
          />
          {createToDo ? (
            <CreateTodo
              handleValue={this.handleValue}
              value={value}
              handleTodo={this.handleTodo}
              handleClick={this.handleClick}
            />
          ) : (
            <button
              className="bg-yellow-500 px-4 py-2 text-white rounded-full mt-4 text-sm font-semibold hover:bg-yellow-600"
              onClick={this.handleClick}
            >
              + Add a todo
            </button>
          )}
          <DoneList
            doneTaskArray={doneTaskArray}
            handleTaskStatusChange={handleTaskStatusChange}
          />
        </div>
      </>
    );
  }
}

export default MainContent;
