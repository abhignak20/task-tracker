const BASE_URL = "http://127.0.0.1:8000/api";

// GET all tasks
export async function getTasks() {
  const res = await fetch(`${BASE_URL}/tasks/`);
  return await res.json();
}

// CREATE a task
export async function createTask(data) {
  const res = await fetch(`${BASE_URL}/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

// CREATE dependency
export async function createDependency(data) {
  const res = await fetch(`${BASE_URL}/dependencies/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}
