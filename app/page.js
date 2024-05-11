"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editedTodo, setEditedTodo] = useState('');
  const [editingId, setEditingId] = useState(null); // New state variable

  useEffect(() => {
    fetchTodos();
  }, []); // Add comma here
  
  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:8000/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (newTodo === '') return;
    await axios.post('http://localhost:8000/todos', { title: newTodo, completed: false });
    setNewTodo('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8000/todos/${id}`);
    fetchTodos();
  }

  const updateTodo = async () => { // Updated update function
    if (editedTodo === '' || editingId === null) return;
    await axios.put(`http://localhost:8000/todos/${editingId}`, { title: editedTodo });
    setEditedTodo('');
    setEditingId(null);
    fetchTodos();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Todo App</h1>
      <input
        type="text"
        className='text-black'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input 
              className='text-black' 
              type="text" 
              value={editingId === todo.id ? editedTodo : todo.title} 
              onFocus={() => {
                setEditingId(todo.id);
                setEditedTodo(todo.title);
              }}
              onChange={(e) => setEditedTodo(e.target.value)} 
            />
            
            <button
              className='ml-2 bg-slate-300 text-black rounded-md px-2 py-1'
              onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button 
              className='ml-2 bg-slate-300 text-black rounded-md px-2 py-1'
              onClick={updateTodo}>Update</button> 
          </li>
        ))}
      </ul>
    </main>
  );
}