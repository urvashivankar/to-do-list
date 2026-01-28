let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function addTask() {
  const title = taskInput.value.trim();
  if (!title) return alert("Enter a task");

  tasks.push({
    id: Date.now(),
    title,
    due: dueDate.value,
    priority: priority.value,
    completed: false
  });

  taskInput.value = "";
  save();
}

function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  save();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
}
function updateCounter() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  document.getElementById("counter").innerText =
    `${total} tasks | ${completed} completed`;
}


function editTask(id) {
  const newTitle = prompt("Edit task");
  if (!newTitle) return;

  tasks = tasks.map(t =>
    t.id === id ? { ...t, title: newTitle } : t
  );
  save();
}

function filterTasks(type) {
  currentFilter = type;
  render();
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
}

function render() {
  taskList.innerHTML = "";

  let filtered = tasks.filter(t =>
    currentFilter === "all" ||
    (currentFilter === "active" && !t.completed) ||
    (currentFilter === "completed" && t.completed)
  );

  filtered.forEach(t => {
    const li = document.createElement("li");
    li.className = t.completed ? "completed" : "";

    li.innerHTML = `
      <div>
        <strong>${t.title}</strong><br>
        <span class="badge ${t.priority}">${t.priority}</span>
      </div>
      <div class="actions">
        <button onclick="toggleTask(${t.id})">✔</button>
        <button onclick="editTask(${t.id})">✏️</button>
        <button onclick="deleteTask(${t.id})">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

render();
updateCounter();
   
