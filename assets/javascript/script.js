// global variables
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasks = [];
// function to add a new task item
var taskFormHandler = () => {
  // prevent refresh
  event.preventDefault();

  //   grab the value of the task name and type from the HTML form
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  var isEdit = formEl.hasAttribute("data-task-id");
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do",
    };
    createTaskEl(taskDataObj);
  }
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
  taskDataObj.id = taskIdCounter;
  tasks.push(taskDataObj);
  //save changes
  saveTasks();
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
    deleteTask(taskId);
  }
};

var deleteTask = (taskId) => {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();
  var updatedTaskArr = [];

  //loop to find the correct task to delete
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i] != parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }
  tasks = updatedTaskArr;
  saveTasks();
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

// complete edit function

var completeEditTask = (taskName, taskType, taskId) => {
  //find the task list item
  var taskSelected = document.querySelector(
    ".task-item[data-task-id = '" + taskId + "']"
  );
  //set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;
  // loop through the tasks and add new content
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }
  //save task
  saveTasks();
  alert("Task Updated!");
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};

// change task function
var taskStatusChangeHandler = (event) => {
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
  //update the array
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
  saveTasks();
};
//dave tasks to local storage
var saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
// get tasks
// convert to an object- done
// iterate through to rebuild the tasks array
// use createTaskEl
var loadTasks = () => {
  tasks = localStorage.getItem("tasks");

  if (!tasks) {
    tasks = [];
    return false;
  }
  tasks = JSON.parse(tasks);
  

  for (let i = 0; i < tasks.length; i++) {
    tasks[i].id = taskIdCounter;

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", tasks[i].id);
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML =
      "<h3 class = 'task-name'>" +
      tasks[i].name +
      "</h3><span class='task-type'>" +
      tasks[i].type +
      "</span>";
    listItemEl.appendChild(taskInfoEl);
    var taskActionsEl = createTaskActions(tasks[i].id)
    listItemEl.appendChild(taskActionsEl);
    if (tasks[i].status === "to do") {
      listItemEl.querySelector("select[name ='status-change']").selectedIndex = 0; 
      tasksToDoEl.appendChild(listItemEl);
    } else if (tasks[i].status === "in progress") {
      listItemEl.querySelector("select[name = 'status-change']").selectedIndex = 1;
      tasksInProgressEl.appendChild(listItemEl);
    } else if (tasks[i].status === "completed") {
      listItemEl.querySelector("select[name = 'status-change']").selectedIndex = 2;
      tasksCompletedEl.appendChild(listItemEl);
    }
    taskIdCounter++
    console.log(listItemEl);
  }
  
};
pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);
loadTasks();
