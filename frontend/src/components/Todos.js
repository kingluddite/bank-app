import React, { useState } from 'react';

function Todos() {
  const [todos, setTods] = useState([
    {
      id: 1,
      text: 'yo homee',
    },
  ]);

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
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
