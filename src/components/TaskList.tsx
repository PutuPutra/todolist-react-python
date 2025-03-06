import { Pencil, X, Check } from "lucide-react";
import type { Task } from "../types";

interface TaskListProps {
  title: string;
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskList = ({ title, tasks, onDelete, onToggle, onEdit }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-500 text-center py-4">No tasks found</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 bg-gray-200 rounded-md"
          >
            <div className="flex items-center gap-2">
              <span className={`${task.completed ? "line-through text-gray-500" : ""}`}>
                {task.title}
              </span>
              <button onClick={() => onEdit(task)} className="text-gray-600 hover:text-gray-900" title="Edit task">
                <Pencil size={16} />
              </button>
              <div className="text-xs text-gray-500">
                {new Date(task.created_at).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onDelete(task.id)}
                className="p-1 rounded-full hover:bg-gray-300"
                aria-label="Delete task"
              >
                <X size={20} />
              </button>
              <button
                onClick={() => onToggle(task.id)}
                className="p-1 rounded-full hover:bg-gray-300"
                aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                <Check size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
