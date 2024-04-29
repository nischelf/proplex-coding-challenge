import { useState, useEffect } from "react";

interface Todo {
  title: string;
  details: string | null;
}

function App() {
  localStorage.setItem(
    "todos",
    JSON.stringify([
      { title: "Learn React", details: null },
      { title: "Learn TypeScript", details: "Interfaces, Types" },
    ]),
  );

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      setTodos(JSON.parse(localTodos));
    }
  }, []);

  return (
    <main className=" min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl">Todos</h1>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <h2 className="text-2xl">{todo.title}</h2>
              <p>{todo.details}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No todos</p>
      )}
    </main>
  );
}

export default App;
