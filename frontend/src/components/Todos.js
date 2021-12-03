import React, { useState } from 'react';

function Todos() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'yo homee',
    },
  ]);

  return (
    <div>
      {todos.map((todo, index) => (
        <div key={index}>
          <input id="chkbx-task" type="checkbox" />
          <label htmlFor="chkbx-task">{todo.text}</label>
        </div>
      ))}
      <br />
      <input type="text" />
      <button>Add</button>
    </div>
  );
}

export default Todos;
