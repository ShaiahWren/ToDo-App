import React, { Component } from "react";
import ToDoList from "./ToDoList";
//make an interface IState to typesafe pieces of state.
// interface IState {
//   toDoInput: string;
//   toDoList: Array<string>;
// }

export default class ToDo extends Component {
  
  // constructor: pieces of state to manipulate. inputBox and the toDo array.
  // listData;
  constructor(props) {
    super(props);
    this.state = {
      toDoInput: "",
      toDoList: [],
    };
  }
  submitToDo = (e) => {
    e.preventDefault();
        // conditionally render only if input field is full
if (this.state.toDoInput !== '') {

    const newList = [...this.state.toDoList, {text: this.state.toDoInput, id: Math.floor(Math.random() * 10000)}];
    console.log("clickk", newList);
    localStorage.setItem('list', JSON.stringify(newList))
    this.setState({ toDoList: newList, toDoInput: "" });

} else {
    alert('Enter input')
}
  };

  handleInputChange = (e) => {
    this.setState({ toDoInput: e.target.value });
  };
  removeItem = (id) => {
    const filteredItems = this.state.toDoList.filter((item) => {
      return item.id !== id;
    })
    console.log(filteredItems)
    
    // slice(0, index).concat(this.state.toDoList.slice(index + 1, this.state.toDoList.length))
    localStorage.setItem('list', JSON.stringify(filteredItems))

    this.setState({toDoList: filteredItems})

  };

clearList = () => {
    console.log('clear list')
    localStorage.setItem('list', JSON.stringify([]))

    this.setState({toDoList: []})

    // clear out the list, but only if the list is not empty
    // perhaps I can make the button disappear with css if the array is empty
}
  componentDidMount() {

    if (localStorage.getItem('list')) {
      const listData = JSON.parse(localStorage.getItem('list'));
      console.log(listData)
      this.setState({toDoList: listData})
    } else {
      this.setState({toDoList: []})
    }
  }
  render() {
    return (
      <div>
        <h1>ToDo App</h1>
        <form onSubmit={this.submitToDo}>
          <input
            type="text"
            value={this.state.toDoInput}
            onChange={this.handleInputChange}
          />
          <input type="submit" value="Add" />
        </form>
        <ToDoList toDoList={this.state.toDoList} removeItem={this.removeItem} clearList={this.clearList} />
      </div>
    );
  }
}
