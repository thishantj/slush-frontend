import * as React from 'react';
import { useState, useEffect } from 'react';
import { TaskForm } from './TaskForm';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5011/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const toggleCompletion = (id: number) => {
    fetch(`http://localhost:5011/tasks/toggle-completion/${id}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? data : task))
        );
      })
      .catch((err) => console.error('Error toggling completion:', err));
  };

  const deleteTask = (id: number) => {
    fetch(`http://localhost:5011/tasks/${id}`, { method: 'DELETE' })
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((err) => console.error('Error deleting task:', err));
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => setFormVisible(!isFormVisible)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
      >
        Add New Task
      </button>

      {isFormVisible && <TaskForm setTasks={setTasks} />}

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between p-4 border rounded shadow-md">
            <div>
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => toggleCompletion(task.id)}
                className={`${
                  task.completed ? 'bg-green-500' : 'bg-yellow-500'
                } text-white px-4 py-2 rounded hover:bg-opacity-80`}
              >
                {task.completed ? 'Completed' : 'Mark as Completed'}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-opacity-80"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
