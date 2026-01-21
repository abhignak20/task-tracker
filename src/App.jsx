import { useEffect, useState } from "react";
import Graph from "./Graph";
import {
  getTasks,
  createTask,
  createDependency,
} from "./api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [dependencies, setDependencies] = useState([]);
  const [title, setTitle] = useState("");
  const [taskId, setTaskId] = useState("");
  const [dependsOnId, setDependsOnId] = useState("");

  useEffect(() => {
    loadData();
  }, []);

 async function addTask() {
  console.log("Clicked Add, title:", title);

  if (!title.trim()) {
    alert("Title empty");
    return;
  }

  const res = await createTask({ title });
  console.log("API response:", res);

  setTitle("");
  loadTasks();
}


  async function addTask() {async function addTask() {
  console.log("Add task clicked", title);

  if (!title) return;

  const res = await createTask({ title });
  console.log("Create task response:", res);

  setTitle("");
  loadData();
}

    if (!title) return;
    await createTask({ title });
    setTitle("");
    loadData();
  }

  async function addDependency() {
    if (!taskId || !dependsOnId || taskId === dependsOnId) {
      alert("Select two different tasks");
      return;
    }

    const res = await createDependency({
      task: taskId,
      depends_on: dependsOnId,
    });

    if (res.error) {
      alert(res.error);
    } else {
      alert("Dependency added");
      loadData();
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Task Dependency Manager
      </h1>

      {/* ADD TASK */}
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4"
        >
          Add
        </button>
      </div>

      {/* ADD DEPENDENCY */}
      <div className="border p-4 rounded mb-6">
        <h2 className="font-semibold mb-2">
          Add Dependency
        </h2>

        <div className="flex gap-2 mb-2">
          <select
            className="border p-2 flex-1"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
          >
            <option value="">Task</option>
            {tasks.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>

          <select
            className="border p-2 flex-1"
            value={dependsOnId}
            onChange={(e) => setDependsOnId(e.target.value)}
          >
            <option value="">Depends On</option>
            {tasks.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>

          <button
            onClick={addDependency}
            className="bg-green-500 text-white px-4"
          >
            Link
          </button>
        </div>
      </div>

      {/* TASK LIST */}
      <ul className="space-y-2 mb-6">
        {tasks.map((t) => (
          <li
            key={t.id}
            className="border p-2 rounded flex justify-between"
          >
            <span>{t.title}</span>
            <span className="text-sm text-gray-500">
              {t.status}
            </span>
          </li>
        ))}
      </ul>

      {/* GRAPH */}
      <Graph tasks={tasks} dependencies={dependencies} />
    </div>
  );
}
