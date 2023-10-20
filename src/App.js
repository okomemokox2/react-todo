import { useState, useRef } from "react";
import TodoList  from "./TodoList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  const handleAddTodo = () => {
    //タスクを追加する操作
    const name = todoNameRef.current.value;
    if(name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
  // 状態変数はそのまま加工しない方がいいので、コピー
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClearTodo = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };
  return (
    <div>
      <div>ALL TASKS</div>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={handleClearTodo}>完了したタスクの削除</button>
      <div>飛永楽登の</div>
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
      
    </div>
  );
}

export default App;
