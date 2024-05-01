import { Trash, Pencil } from "@phosphor-icons/react";

interface Todo {
  title: string;
  details: string | null;
  done: boolean;
}

export default function TodoList({
  todos,
  doneChange,
  deleteTodoHandler,
  editTodoHandler,
}: {
  todos: Todo[];
  doneChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void;
  deleteTodoHandler: (index: number) => void;
  editTodoHandler: (index: number) => void;
}) {
  return todos.length > 0 ? (
    <>
      <ul className="w-3/4 flex flex-col gap-2 justify-center">
        {todos.map(
          (todo, index) =>
            todo.done === false && (
              <li
                key={index}
                className="flex flex-col gap-2 border-2 border-gray-400 rounded-lg p-2 w-full break-words"
              >
                <h2 className="text-2xl font-bold">{todo.title}</h2>
                {!todo.done && <p>{todo.details}</p>}
                <div className="flex gap-2 justify-between">
                  <div className="flex gap-2 items-center">
                    <p>Erledigt</p>
                    <input
                      type="checkbox"
                      onChange={(event) => doneChange(event, index)}
                      checked={todo.done}
                      className="w-6 h-6"
                    />
                  </div>
                  {!todo.done && (
                    <div className="flex gap-4">
                      <button
                        className="rounded bg-red-500 text-white p-1 flex w-fit"
                        onClick={() => deleteTodoHandler(index)}
                      >
                        <Trash size={24} />
                      </button>
                      <button
                        className="rounded bg-blue-500 text-white p-1 flex w-fit"
                        onClick={() => editTodoHandler(index)}
                      >
                        <Pencil size={24} />
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ),
        )}
      </ul>
      <ul className="w-3/4 flex flex-col gap-2 justify-center">
        {todos.map(
          (todo, index) =>
            todo.done === true && (
              <li
                key={index}
                className="flex flex-col gap-2 border-2 border-gray-400 rounded-lg p-2 w-full break-words bg-gray-400"
              >
                <h2 className="text-2xl font-bold">{todo.title}</h2>
                {!todo.done && <p>{todo.details}</p>}
                <div className="flex gap-2 justify-between">
                  <div className="flex gap-2 items-center">
                    <p>Erledigt</p>
                    <input
                      type="checkbox"
                      onChange={(event) => doneChange(event, index)}
                      checked={todo.done}
                      className="w-6 h-6"
                    />
                  </div>
                  {!todo.done && (
                    <div className="flex gap-4">
                      <button
                        className="rounded bg-red-500 text-white p-1 flex w-fit"
                        onClick={() => deleteTodoHandler(index)}
                      >
                        <Trash size={24} />
                      </button>
                      <button
                        className="rounded bg-blue-500 text-white p-1 flex w-fit"
                        onClick={() => editTodoHandler(index)}
                      >
                        <Pencil size={24} />
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ),
        )}
      </ul>
    </>
  ) : (
    <p>No todos</p>
  );
}
