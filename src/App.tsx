import { useState, useEffect } from "react";

interface Todo {
  title: string;
  details: string | null;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      setTodos(JSON.parse(localTodos));
    }
  }, []);

  function addTodoHandler() {
    setTodos([...todos, { title, details }]);
    localStorage.setItem(
      "todos",
      JSON.stringify([...todos, { title, details }]),
    );
    setTitle("");
    setDetails("");
  }

  function titleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function detailsChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDetails(event.target.value);
  }

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
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={titleChange}
      />
      <input
        type="text"
        placeholder="Details"
        value={details}
        onChange={detailsChange}
      />
      <button onClick={addTodoHandler}>Add Todo</button>
    </main>
  );
}

export default App;
