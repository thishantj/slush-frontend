import React from "react";
import axios from "axios";

const TaskItem: React.FC<{ task: any; onDelete: (id: number) => void }> = ({ task, onDelete }) => {
  const handleDelete = () => {
    axios.delete(`https://slush-backend-iypg.onrender.com/tasks/${task.id}`).then(() => onDelete(task.id));
  };

  return (
    <li className="flex justify-between p-2 border rounded-lg">
      <span>{task.title}</span>
      <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
