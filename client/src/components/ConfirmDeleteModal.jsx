import React, { useState } from "react";

const ConfirmDeleteModal = ({ scheduleTitle, onDelete, onCancel }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const handleDelete = () => {
    if (inputValue === scheduleTitle) {
      onDelete();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-neutral-900 bg-opacity-85 flex justify-center items-center font-syne z-20">
      <div className="bg-white text-222 dark:bg-neutral-700 dark:text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Are you sure you want to delete this schedule?
        </h2>
        <p className="mb-4">
          To proceed, enter the exact title of the schedule.
        </p>
        <input
          type="text"
          value={inputValue}
          placeholder={scheduleTitle}
          onChange={(e) => setInputValue(e.target.value)}
          className={`w-full p-2 border dark:bg-neutral-600 dark:text-white ${
            error ? "border-salmon" : "border-gray-300"
          } rounded`}
        />
        {error && (
          <p className="text-salmon mt-2">Entered text does not match "{scheduleTitle}"</p>
        )}
        <p className="my-2 text-neutral-400">
          This action cannot be undone! Seriously!
        </p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded mr-2 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-salmon text-white py-2 px-4 rounded hover:bg-[#e24e2a]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
