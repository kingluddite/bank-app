import React, { useState } from 'react';

function Todos() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'yo homee',
    },
  ]);
  const [todoText, setTodoText] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    // prevent empty tasks
    if (!todoText) return;
    // create a new todo
    const newTodo = { checked: false, text: todoText };
    setTodos([...todos, newTodo]);
    setTodoText('');
  };

  const toggleTodo = (index) => {
    // get all todos
    const newTodoList = [...todos];
    // toggle opposite checked value
    newTodoList[index].checked = !newTodoList[index];
    setTodos(newTodoList);
  };

  return (
    <div>
      {todos.map((todo, index) => (
        <div key={index}>
          <input
            id="chkbx-task"
            onChange={() => toggleTodo(index)}
            type="checkbox"
          />
          <label htmlFor="chkbx-task">{todo.text}</label>
        </div>
      ))}
      <br />
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Todos;
