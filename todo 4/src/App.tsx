import React, { useState, useCallback, useEffect } from 'react';
import TodoList from './Components/TodoList/TodoList';
import AddTodoForm from './Components/AddTodoForm/AddTodoForm';
import { Todo } from './Components/Todo/Todo';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  }, []);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  const updateTodo = useCallback((id: number, newText: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  }, []);

  return (
    <div className='containerr'>
      <div className='intro'>
        <h1>Todo App</h1>
        <p>Control your tasks efficiently by adding them to the todo app.</p>
      </div>
      <div className="app-content">
        <h1>Add Task</h1>
        <AddTodoForm addTodo={addTodo} />
        <div className='added-task'>
          <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
        </div>
      </div>
    </div>
  );
};

export default App;