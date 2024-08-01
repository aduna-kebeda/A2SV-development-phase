import React, { useState } from 'react';
import './AddTodoForm.css';

interface AddTodoFormProps {
  addTodo: (text: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === '') {
      setError('Todo text cannot be empty');
      return;
    }
    addTodo(text);
    setText('');
    setError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container" aria-label="Add Todo Form">
      <div className="form-group">
        <label htmlFor="todo-input" className="hidden-label">New Todo:</label>
        <input
          id="todo-input"
          type="text"
          value={text}
          onChange={handleChange}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby="error-message"
          className="input-add-task"
          placeholder="Enter new todo..."
        />
        <button type="submit" className="button-add-task">Add Todo</button>
      </div>
      {error && (
        <p id="error-message" className="error-message">
          {error}
        </p>
      )}
    </form>
  );
};

export default AddTodoForm;
