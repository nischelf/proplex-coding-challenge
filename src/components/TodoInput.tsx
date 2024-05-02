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
    <div className="fixed left-0 top-1/3 flex flex-col w-full justify-center items-center">
      <div className="w-3/4 bg-white flex flex-col gap-2 rounded-lg p-2">
        <label htmlFor="title" className="md:text-xl lg:text-normal">
          Titel:
        </label>
        <input
          type="text"
          placeholder="Einkaufen"
          value={title}
          id="title"
          onChange={titleChange}
          className="rounded border-2 border-gray-400 w-full p-1 md:text-xl lg:text-base"
        />
        <label htmlFor="details" className="md:text-xl lg:text-normal">
          Details:
        </label>
        <input
          type="text"
          placeholder="Brot, Milch, Eier"
          value={details || ""}
          id="details"
          onChange={detailsChange}
          className="rounded border-2 border-gray-400 w-full p-1 md:text-xl lg:text-base"
        />
        {addMode ? (
          <button
            onClick={addTodoHandler}
            className="bg-green-500 rounded text-white p-0.5 w-full md:text-xl lg:text-base hover:bg-green-700 active:bg-green-700 transition-colors duration-300 ease-in-out"
          >
            Hinzufügen
          </button>
        ) : (
          <button
            onClick={saveEditHandler}
            className="bg-green-500 rounded text-white p-0.5 w-full md:text-xl lg:text-base hover:bg-green-700 active:bg-green-700 transition-colors duration-300 ease-in-out"
          >
            Speichern
          </button>
        )}
        <button
          onClick={cancelHandler}
          className="bg-red-500 rounded text-white p-0.5 w-full md:text-xl lg:text-base hover:bg-red-700 active:bg-red-700 transition-colors duration-300 ease-in-out"
        >
          Abbrechen
        </button>
        <p className="text-red-500 font-bold">{errorMsg}</p>
      </div>
    </div>
  );
}
