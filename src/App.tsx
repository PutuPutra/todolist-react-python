"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Task as TaskUI } from "./types";

interface TaskBackend {
  id: number;
  title: string;
  description: string;
  is_done: boolean;
  created_at: string;
}


const mapTask = (task: TaskBackend): TaskUI => ({
  ...task,
  completed: task.is_done,
});

const App = () => {
  const [tasks, setTasks] = useState<TaskUI[]>([]);
  const [editingTask, setEditingTask] = useState<TaskUI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseURL = "http://localhost:8000/todos";


  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<TaskBackend[]>(`${baseURL}/`);
      const mappedTasks = response.data.map(mapTask);
      setTasks(mappedTasks);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error fetching tasks. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const addTask = async (title: string) => {
    try {
      const response = await axios.post<TaskBackend>(`${baseURL}/`, {
        title,
        description: "",
        is_done: false,
      });
      const newTask = mapTask(response.data);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err) {
      console.error(err);
      setError("Error adding task. Please try again.");
    }
  };

  const updateTask = async (id: number, title: string) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) return;
    try {
      const response = await axios.put<TaskBackend>(`${baseURL}/${id}`, {
        title,
        is_done: taskToUpdate.completed,
      });
      const updatedTask = mapTask(response.data);
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? updatedTask : task)));
      setEditingTask(null);
    } catch (err) {
      console.error(err);
      setError("Error updating task. Please try again.");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error(err);
      setError("Error deleting task. Please try again.");
    }
  };

  const toggleTaskCompletion = async (id: number) => {
    const taskToToggle = tasks.find((task) => task.id === id);
    if (!taskToToggle) return;
    try {
      const response = await axios.put<TaskBackend>(`${baseURL}/${id}`, {
        title: taskToToggle.title,
        is_done: !taskToToggle.completed,
      });
      const updatedTask = mapTask(response.data);
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (err) {
      console.error(err);
      setError("Error updating task status. Please try again.");
    }
  };

  const startEditing = (task: TaskUI) => {
    setEditingTask(task);
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  const ongoingTasks = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  const completedTasks = tasks
    .filter((task) => task.completed)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-8">Task Management</h1>

      <TaskForm
        onSubmit={editingTask ? (title) => updateTask(editingTask.id, title) : addTask}
        initialValue={editingTask ? editingTask.title : ""}
        isEditing={!!editingTask}
        onCancel={cancelEditing}
      />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-4">Loading tasks...</div>
      ) : (
        <>
          <TaskList
            title="Ongoing Task"
            tasks={ongoingTasks}
            onDelete={deleteTask}
            onToggle={toggleTaskCompletion}
            onEdit={startEditing}
          />

          <TaskList
            title="Completed Task"
            tasks={completedTasks}
            onDelete={deleteTask}
            onToggle={toggleTaskCompletion}
            onEdit={startEditing}
          />
        </>
      )}
    </div>
  );
};

export default App;
