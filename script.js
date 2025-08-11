// script.js

const taskInput = document.getElementById("task_input");
const dateInput = document.getElementById("date_input");
const timeInput = document.getElementById("time_input");
const addtask = document.getElementById("add_task");
const tasklist = document.getElementById("task_list");

addtask.addEventListener("click", addTask);
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskText = taskInput.value.trim();
  const dateText = dateInput.value;
  const timeText = timeInput.value;

  if (taskText === "" || dateText === "" || timeText === "") {
    alert("Please enter all details");
    return;
  }

  addTaskToDOM(taskText, dateText, timeText);
  saveTask(taskText, dateText, timeText);

  taskInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
}

function addTaskToDOM(taskText, dateText, timeText) {
  const li = document.createElement("li");
  li.textContent = `${dateText} - ${taskText} - ${timeText} `;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    li.remove();
    deleteTask(taskText, dateText, timeText);
  });

  li.appendChild(deleteButton);
  tasklist.appendChild(li);
}

function saveTask(taskText, dateText, timeText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ task: taskText, date: dateText, time: timeText });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(t => {
    addTaskToDOM(t.task, t.date, t.time);
  });
}

function deleteTask(taskText, dateText, timeText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => !(t.task === taskText && t.date === dateText && t.time === timeText));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
/*
Changes I made:

1. loadTasks() → Reads tasks from localStorage and calls addTaskToDOM() for each.


2. addTaskToDOM() → A helper function that adds a task to the UI (so you can reuse it for both new and saved tasks).


3. deleteTask() → Updates localStorage when a task is deleted.



With this, your tasks will:

Be saved in localStorage

Reload when the page refreshes

Also be removable both from UI and localStorage



---

If you want, I can also add an "Edit" feature so you can change tasks without deleting them. That would make your to-do list more complete.
*/