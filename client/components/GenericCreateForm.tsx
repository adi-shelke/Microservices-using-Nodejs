import React from "react";
interface GenericCreateFormProps {
  title: string;
  state: string;
  parentComponent: string;
  postId?: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (event: React.FormEvent, postId?: string, content?: string) => void;
}
const GenericCreateForm: React.FC<GenericCreateFormProps> = ({
  title,
  state,
  setState,
  onSubmit,
  postId,
  parentComponent,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (parentComponent === "CreateComment" && postId) {
      onSubmit(event, postId, state);
    } else {
      onSubmit(event);
    }
  };
  const containerClass =
    parentComponent === "CreatePost" ? "w-full mb-6" : "w-[180px] mb-6";
  return (
    <div className={containerClass}>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="title-input">{title}</label>
          <br />
          <input
            id="title-input"
            className="my-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={state}
            required
            onChange={(e) => setState(e.target.value)}
            placeholder={parentComponent === "CreateComment" ? "Add a comment" : "Enter a title"}
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
