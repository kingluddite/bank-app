import React, { useState } from 'react';

function Todos() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'walk the dog',
    },
  ]);
  const [todoText, setTodoText] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    // don't let user enter empty strings
    if (!todoText) return;
    setTodos([...todos, { text: todoText }]);
    setTodoText('');
  };
  return (
    <div>
      {todos.map((todo, index) => (
        <div key={index}>
          <input id="checkbox1" type="checkbox" />
          <label htmlFor="checkbox1">{todo.text}</label>
        </div>
      ))}
      <br />
      <form onSubmit={addTodo}>
        <input
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          type="text"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Todos;
