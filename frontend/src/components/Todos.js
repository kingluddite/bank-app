import React, { useState, useContext, useEffect } from 'react';
import { CredentialsContext } from '../App';

function Todos() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'yo homee',
    },
  ]);
  const [todoText, setTodoText] = useState('');
  const [credentials] = useContext(CredentialsContext);

  const persist = (newTodos) => {
    fetch(`http://localhost:4000/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(newTodos),
    }).then(() => {});
  };

  useEffect(() => {
    fetch(`http://localhost:4000/todos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, [credentials.username, credentials.password]);

  const addTodo = (e) => {
    e.preventDefault();
    // prevent empty tasks
    if (!todoText) return;
    // create a new todo
    const newTodo = { checked: false, text: todoText };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodoText('');
    persist(newTodos);
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
