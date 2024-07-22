import React from "react";
interface GenericCreateFormProps {
  title: string;
  state: string;
  parentComponent: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (event: React.FormEvent) => void;
}
const GenericCreateForm: React.FC<GenericCreateFormProps> = ({
  title,
  state,
  setTitle,
  onSubmit,
  parentComponent,
}) => {
  const containerClass = `w-[${
    parentComponent === "CreatePost" ? "300px" : "180px"
  }]`;
  return (
    <div className={containerClass}>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title-input">{title}</label>
          <input
            id="title-input"
            className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={state}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button
          className="mb-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default GenericCreateForm;
