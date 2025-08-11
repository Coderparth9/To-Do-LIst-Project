const taskInput = document.getElementById("task_input");
const dateInput = document.getElementById("date_input");
const timeInput = document.getElementById("time_input");
const addtask = document.getElementById("add_task");
const tasklist = document.getElementById("task_list");

/*
addtask.addEventListener("click", empty);

function empty() {
  const taskText = taskInput.value.trim();
  if (taskText === "" || dateInput.value === "" || timeInput.value === "") {
    alert("Please enter all details");
    return;
  }
  
};*/

addtask.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  const dateText = dateInput.value;
  const timeText = timeInput.value;

  if (taskText === "" || dateText === "" || timeText === "") {
    alert("Please enter all details");
    return;
  }
//delete task
  const li = document.createElement("li");
  li.textContent = `${dateText} - ${taskText} - ${timeText} `;
  
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    tasklist.removeChild(li);
  });

  li.appendChild(deleteButton);

  
  tasklist.appendChild(li);

  taskInput.value = "";
  dateInput.value = "";
  timeInput.value = "";

  //savetask to localStorage
    saveTask(taskText, dateText, timeText);
}  

function saveTask() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({
        task: taskText,
        date: dateText,
        time: timeText
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }