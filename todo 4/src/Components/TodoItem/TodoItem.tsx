// import React from 'react';
// import TodoItem from './TodoItem';
// import { Todo } from '../Todo/Todo';

// interface TodoListProps {
//   todos: Todo[];
//   toggleTodo: (id: number) => void;
//   deleteTodo: (id: number) => void;
//   updateTodo: (id: number, newText: string) => void;
// }

// const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo, updateTodo }) => {
//   return (
//     <div className="todo-list">
//       <h3>Todo List</h3>
//       {todos.map(todo => (
//         <TodoItem
//           key={todo.id}
//           todo={todo}
//           toggleTodo={toggleTodo}
//           deleteTodo={deleteTodo}
//           updateTodo={updateTodo}
//         />
//       ))}
//     </div>
//   );
// };

// export default TodoList;