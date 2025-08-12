# To-Do-LIst-Project

// Fix the event listener for sorting (use 'change' or 'click' on a button instead of "Sortdate")
//dateInput.addEventListener("change", sortdate);

// Function to sort tasks by date and update the displayed list
function sortdate() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Sort tasks by date first, then time (both ascending)
  tasks.sort((a, b) => {
    if (a.date === b.date) {
      return a.time.localeCompare(b.time);
    }
    return a.date.localeCompare(b.date);
  });

  // Clear the current task list display
  tasklist.innerHTML = "";

  // Re-add sorted tasks to DOM
  tasks.forEach(t => addTaskToDOM(t.task, t.date, t.time));
}
