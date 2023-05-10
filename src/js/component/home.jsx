import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/alesanchezr")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.log(error));
  }, []);

  const inputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addTask = () => {
    if (inputValue.trim() === "") {
      return;
    }
    setTasks([...tasks, { title: inputValue.trim(), completed: false }]);
    setInputValue("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
  };

  const toggleComplete = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const incompleteTask = tasks.filter((task) => !task.completed).length;

  return (
    <div className="App">
      <h1>todos</h1>
      <div className="todo-box">
        <div className="input-container">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={inputChange}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                addTask();
              }
            }}
          />
        </div>
        <TodoList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
        <div className="task-left">{incompleteTask} items left</div>
      </div>
    </div>
  );
};

export default TodoList;
