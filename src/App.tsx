import { useState, useEffect } from "react";

interface Todo {
  title: string;
  details: string | null;
  done: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState<string | null>("");
  const [done, setDone] = useState<boolean>(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      setTodos(JSON.parse(localTodos));
    }
  }, []);

  function addTodoHandler() {
    setTodos([...todos, { title, details, done }]);
    localStorage.setItem(
      "todos",
      JSON.stringify([...todos, { title, details, done }]),
    );
    setTitle("");
    setDetails("");
  }

  function deleteTodoHandler(index: number) {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  function editTodoHandler(index?: number) {
    setEditMode(!editMode);
    if (!editMode) {
      if (index === undefined) {
        return;
      } else {
        const i = index as number;
        setTitle(todos[i].title);
        setDetails(todos[i].details);
        setEditIndex(i);
      }
    } else {
      setTitle("");
      setDetails("");
    }
  }

  function saveEditHandler() {
    const newTodos = todos.map((todo, i) => {
      if (i === editIndex) {
        return { title: title, details: details };
      }
      return todo;
    });
    setTodos(newTodos as Todo[]);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setEditMode(false);
    setEditIndex(null);
    setTitle("");
    setDetails("");
  }

  function titleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function detailsChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDetails(event.target.value);
  }

  function doneChange(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    setDone(event.target.checked);

    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, done: event.target.checked };
      }
      return todo;
    });
    setTodos(newTodos as Todo[]);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setDone(false);
  }

  return (
    <main className=" min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl">Todos</h1>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className="flex flex-col gap-2">
              <h2 className="text-2xl">{todo.title}</h2>
              <p>{todo.details}</p>
              <div>
                <p className="inline">Done </p>
                <input
                  type="checkbox"
                  onChange={() => doneChange(event, index)}
                  checked={todo.done}
                />
              </div>
              <button
                className="rounded bg-red-500 text-white p-0.5"
                onClick={() => deleteTodoHandler(index)}
              >
                Delete
              </button>
              <button
                className="rounded bg-orange-500 text-white p-0.5"
                onClick={() => editTodoHandler(index)}
              >
                Edit
              </button>
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
      {editMode ? (
        <div className="flex gap-2">
          <button
            onClick={saveEditHandler}
            className="bg-green-500 rounded text-white p-0.5"
          >
            Save
          </button>
          <button
            onClick={editTodoHandler}
            className="bg-red-500 rounded text-white p-0.5"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={addTodoHandler}
          className="bg-green-500 rounded text-white p-0.5"
        >
          Add Todo
        </button>
      )}
    </main>
  );
}
