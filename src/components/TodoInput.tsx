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
    <div className="fixed left-1/4 top-1/2 flex flex-col bg-white w-1/2">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={titleChange}
      />
      <input
        type="text"
        placeholder="Details"
        value={details || ""}
        onChange={detailsChange}
      />
      {addMode ? (
        <button
          onClick={addTodoHandler}
          className="bg-green-500 rounded text-white p-0.5"
        >
          Hinzufügen
        </button>
      ) : (
        <button
          onClick={saveEditHandler}
          className="bg-green-500 rounded text-white p-0.5"
        >
          Speichern
        </button>
      )}
      <button
        onClick={cancelHandler}
        className="bg-red-500 rounded text-white p-0.5"
      >
        Cancel
      </button>
      <p className="text-red-500">{errorMsg}</p>
    </div>
  );
}
