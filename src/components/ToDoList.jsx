import React from "react";

const ToDoList = ({ toDoList, removeItem, clearList }) => {
  console.log("my todoList", toDoList);
  return (
    <>
      {toDoList.map((item) => {
        return (
          <article key={item.id}>
            <p>{item.text}</p>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </article>
        );
      })}
      <p>
        <button onClick={() => clearList()}>Clear list</button>
      </p>
    </>
  );
};

export default ToDoList;
