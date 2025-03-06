"use client";

import type React from "react";

import { useState, useEffect } from "react";

interface TaskFormProps {
  onSubmit: (title: string) => void;
  initialValue?: string;
  isEditing?: boolean;
  onCancel?: () => void;
}

const TaskForm = ({ onSubmit, initialValue = "", isEditing = false, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState(initialValue);

    useEffect(() => {
    setTitle(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task title"
        />
      </div>
      <div className="flex justify-center gap-2">
        {isEditing ? (
          <>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-300 text-black rounded-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Update Task
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Task
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
