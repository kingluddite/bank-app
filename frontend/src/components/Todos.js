import React, { useState, useContext, useEffect } from 'react';
import { CredentialsContext } from '../App';

function Todos() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'yo homee',
      checked: false,
    },
  ]);
  const [todoText, setTodoText] = useState('');
  const [credentials] = useContext(CredentialsContext);
  const [filter, setFilter] = useState('uncomplete');
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
    newTodoList[index].checked = !newTodoList[index].checked;
    setTodos(newTodoList);
    persist(newTodoList);
  };

  const getTodos = () => {
    return todos;
  };

  const changeFilter = (newFilter) => {
    console.log('here!', newFilter);
    setFilter(newFilter);
  };

  return (
    <div>
      <select onChange={(e) => changeFilter(e.target.value)}>
        <option value="completed">Completed</option>
        <option value="uncomplete">Uncomplete</option>
      </select>
      {getTodos().map((todo, index) => (
        <div key={index}>
          <input
            id="chkbx-task"
            checked={todo.checked}
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
