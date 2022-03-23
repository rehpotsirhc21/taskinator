var pageContentEl = document.querySelector("#page-content");

// create a counter for task id
var taskIdCounter = 0;

// create variables for the button and the task list
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// function to add a new task item
var taskFormHandler = function () {
  // prevent refresh
  event.preventDefault();

  //   grab the value of the task name and type from the HTML form
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  //create a varibale thats the object to put into create task function
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
  };

  //validate there is input
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  //reset after add
  formEl.reset();

  //send variable as an argument into the other function
  createTaskEl(taskDataObj);
};

//create task function
var createTaskEl = (taskDataObj) => {
  //   create the list item using the input and var above
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // add a custom Id
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  //   create div to hold task info and add to the list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";

  //   add new task to the html document
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";
  listItemEl.appendChild(taskInfoEl);

  // add entire list item to the list
  tasksToDoEl.appendChild(listItemEl);
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  tasksToDoEl.appendChild(listItemEl);
  // increase task ID counter
  taskIdCounter++;
};

var createTaskActions = (taskId) => {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create button to edit
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);

  // create button to delete
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);

  // create a drop down list
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(statusSelectEl);

  //create the drop down options
  var statusChoices = ["To do", "In Progress", "Completed"];
  for (let i = 0; i < statusChoices.length; i++) {
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusSelectEl.appendChild(statusOptionEl);
  }
  return actionContainerEl;
};

// listen for the click
formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = () => {
  //get target element from event
  var targetEl = event.target;

  //edit button
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }

  if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    delteTask(taskId);
  }
};

var delteTask = (taskId) => {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();
};

var editTask = (taskId) => {
  //get task list item element
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // get content from task name and type for editing
  var taskName = taskSelected.querySelector("h3.task-name").textContent;

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskId);
};
pageContentEl.addEventListener("click", taskButtonHandler);
