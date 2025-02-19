import * as React from 'react';
import { useState } from 'react';

interface TaskFormProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({ setTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('https://slush-backend-iypg.onrender.com/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks((prevTasks) => [...prevTasks, data]);
        setTitle('');
        setDescription('');
      })
      .catch((err) => console.error('Error adding task:', err));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-4 rounded-lg"
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-4 rounded-lg"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700">
        Add Task
      </button>
    </form>
  );
};
