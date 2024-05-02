import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import { PlusSquare } from "@phosphor-icons/react";
import TodoList from "./components/TodoList";

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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [addMode, setAddMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      setTodos(JSON.parse(localTodos));
    }
  }, []);

  function addTodoHandler() {
    if (!title) {
      setErrorMsg("Titel ist erforderlich!");
      return;
    }
    setTodos([...todos, { title, details, done }]);
    localStorage.setItem(
      "todos",
      JSON.stringify([...todos, { title, details, done }]),
    );
    setTitle("");
    setDetails("");
    setErrorMsg(null);
    setAddMode(false);
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
    if (!title) {
      setErrorMsg("Titel ist erforderlich!");
      return;
    }
    const newTodos = todos.map((todo, i) => {
      if (i === editIndex) {
        return { title: title, details: details, done: done };
      }
      return todo;
    });
    setTodos(newTodos as Todo[]);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setEditMode(false);
    setEditIndex(null);
    setTitle("");
    setDetails("");
    setErrorMsg(null);
  }

  function cancelHandler() {
    setAddMode(false);
    setEditMode(false);
    setEditIndex(null);
    setTitle("");
    setDetails("");
    setErrorMsg(null);
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
    <main className="flex flex-col min-h-screen  items-center w-full">
      <header className="flex justify-between  w-full mt-12 border-b-2 border-blue-500 md:w-3/4 p-2 mb-4">
        <h1 className="text-4xl font-bold">Todo's</h1>
        <button
          onClick={() => setAddMode(!addMode)}
          className="bg-green-500 rounded text-white py-0.5 px-2 flex gap-2 items-center hover:bg-green-700 active:bg-green-700 transition-colors duration-300 ease-in-out"
        >
          <p className="font-bold">Neu</p>
          <PlusSquare size={24} weight="bold" alt={"Todo hinzufügen"} />
        </button>
      </header>

      {(addMode || editMode) && (
        <div>
          {addMode ? (
            <div
              className="fixed w-full h-full top-0 left-0  backdrop-blur-[2px] bg-gray-700 bg-opacity-40"
              onClick={cancelHandler}
            ></div>
          ) : (
            <div
              className="fixed w-full h-full top-0 left-0  backdrop-blur-[2px] bg-gray-700 bg-opacity-40"
              onClick={cancelHandler}
            ></div>
          )}

          <TodoInput
            title={title}
            details={details}
            titleChange={titleChange}
            detailsChange={detailsChange}
            addTodoHandler={addTodoHandler}
            saveEditHandler={saveEditHandler}
            errorMsg={errorMsg}
            addMode={addMode}
            cancelHandler={cancelHandler}
          />
        </div>
      )}

      <TodoList
        todos={todos}
        deleteTodoHandler={deleteTodoHandler}
        editTodoHandler={editTodoHandler}
        doneChange={doneChange}
      />
    </main>
  );
}
