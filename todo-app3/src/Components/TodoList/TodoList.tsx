import React, { useState } from 'react';
import { Todo } from '../types';
import './TodoList.css';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, newText: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo, updateTodo }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newText, setNewText] = useState<string>('');

  const handleEdit = (id: number, text: string) => {
    setEditingId(id);
    setNewText(text);
  };

  const handleSave = (id: number) => {
    updateTodo(id, newText);
    setEditingId(null);
    setNewText('');
  };

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className="todo-item">
          {editingId === todo.id ? (
            <>
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="edit-input"
              />
              <button className="save-button" onClick={() => handleSave(todo.id)}>Save</button>
            </>
          ) : (
            <>
              <span
                className={`todo-text ${todo.completed ? 'completed' : ''}`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <div className="todo-actions">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(todo.id, todo.text)}
                >
                  Edit
                </button>
                <button className="delete-button" onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
