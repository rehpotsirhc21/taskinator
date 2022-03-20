// create variables for the button and the task list
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
// function to add a new task item
var createTaskHandler = function () {
    event.preventDefault();
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "this is a new task";
  tasksToDoEl.appendChild(listItemEl);
 
};
// listen for the click
formEl.addEventListener("submit", createTaskHandler);
