// create variables for the button and the task list
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");
// function to add a new task item
var createTaskHandler = function () {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "this is a new task";
  tasksToDoEl.appendChild(listItemEl);
};
// listen for the click
buttonEl.addEventListener("click", createTaskHandler);
