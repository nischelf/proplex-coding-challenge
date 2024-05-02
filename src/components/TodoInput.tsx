export default function TodoInput({
  title,
  details,
  titleChange,
  detailsChange,
  addTodoHandler,
  saveEditHandler,
  addMode,
  errorMsg,
  cancelHandler,
}: {
  title: string;
  details: string | null;
  titleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  detailsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTodoHandler: () => void;
  saveEditHandler: () => void;
  addMode: boolean;
  errorMsg: string | null;
  cancelHandler: () => void;
}) {
  return (
    // <div className="fixed left-0 top-0 flex w-full min-h-screen justify-center items-center">
    <div className="fixed left-0 top-1/3 flex flex-col w-full justify-center items-center">
      <div className="w-3/4 bg-white flex flex-col gap-2 rounded-lg p-2 items-center">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={titleChange}
          className="rounded border-2 border-gray-400 w-full p-1"
        />
        <input
          type="text"
          placeholder="Details"
          value={details || ""}
          onChange={detailsChange}
          className="rounded border-2 border-gray-400 w-full p-1"
        />
        {addMode ? (
          <button
            onClick={addTodoHandler}
            className="bg-green-500 rounded text-white p-0.5 w-full"
          >
            Hinzufügen
          </button>
        ) : (
          <button
            onClick={saveEditHandler}
            className="bg-green-500 rounded text-white p-0.5 w-full"
          >
            Speichern
          </button>
        )}
        <button
          onClick={cancelHandler}
          className="bg-red-500 rounded text-white p-0.5 w-full"
        >
          Cancel
        </button>
        <p className="text-red-500">{errorMsg}</p>
      </div>
    </div>
  );
}
