// script.js

const taskInput = document.getElementById("task_input");
const dateInput = document.getElementById("date_input");
const timeInput = document.getElementById("time_input");
const addtask = document.getElementById("add_task");
const tasklist = document.getElementById("task_list");

dateInput.addEventListener("change", sortTasksByDate);


document.addEventListener("DOMContentLoaded", loadTasks, sortTasksByDate);

addtask.addEventListener("click", addTask);


function addTask() {
  // Adds a task to the list and saves it to localStorage
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
  li.textContent = `  ${dateText} - ${taskText} - ${timeText} `;

  const deleteBtn = document.createElement("button"); //delete button
  deleteBtn.textContent = `Delete ${taskText}`;
  deleteBtn.addEventListener("click", () => {
    li.remove();
    deleteTask(taskText, dateText, timeText);
  });

  li.appendChild(deleteBtn);
  tasklist.appendChild(li);

  const editbtn = document.createElement("button"); //edit button
  editbtn.textContent = "Edit";
  editbtn.addEventListener("click", () => {
    taskInput.value = taskText;
    dateInput.value = dateText;
    timeInput.value = timeText;
    li.remove();
    deleteTask(taskText, dateText, timeText);
  });
  li.appendChild(editbtn);
}

function saveTask(taskText, dateText, timeText) {
  // Save task
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ task: taskText, date: dateText, time: timeText });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  // Load tasks
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((t) => {
    addTaskToDOM(t.task, t.date, t.time);
  });
}

function deleteTask(taskText, dateText, timeText) {
  // Delete task
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(
    (t) => !(t.task === taskText && t.date === dateText && t.time === timeText)
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function sortdate() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

}
 

//Each task should be listed under the corresponding date heading, as shown in the provided image.
function sortTasksByDate() {
  // Sort tasks by date
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Clear the current task list and re-add sorted tasks
  tasklist.innerHTML = "";
  tasks.forEach((t) => {
    addTaskToDOM(t.task, t.date, t.time);
  });
}

timeInput.addEventListener("time format change",timeformat);
/*
function timeformat(){
  const timeInpu = JSON.parse(localStorage.getItem("timeinput")) || [];

}
*/