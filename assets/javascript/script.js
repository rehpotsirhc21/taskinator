// create variables for the button and the task list
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
// function to add a new task item
var createTaskHandler = function () {
  // prevent refresh
  event.preventDefault();
  //   grab the value of the task name and type from the HTML form
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  //   create the list item using the input and var above
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  //   create div to hold task info and add to the list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
//   add new task to the html document
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskNameInput +
    "</h3><span class='task-type'>" +
    taskTypeInput +
    "</span>";
  listItemEl.appendChild(taskInfoEl);
// add entire list item to the list
  tasksToDoEl.appendChild(listItemEl);
};
// listen for the click
formEl.addEventListener("submit", createTaskHandler);
