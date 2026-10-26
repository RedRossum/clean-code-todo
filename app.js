const taskInput = document.getElementById("new-task");
const addTaskButton = document.getElementsByTagName("button")[0];
const incompleteTasksContainer = document.getElementById("incompleteTasks");
const completeTasksContainer = document.getElementById("completed-tasks");

const createDeleteButtonElement = function () {
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "Delete task";
  deleteButton.appendChild(deleteButtonImg);

  return deleteButton;
};

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = createDeleteButtonElement();

  label.innerText = taskString;
  label.className = "task";

  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTasksContainer.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");
  const isEditMode = listItem.classList.contains("editMode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
};

const taskCompleted = function () {
  const listItem = this.parentNode;
  completeTasksContainer.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;
  incompleteTasksContainer.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

addTaskButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem, onCheckboxChange) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = onCheckboxChange;
};

const initializeContainerTasks = function (container, onCheckboxChange) {
  for (const taskElement of container.children) {
    bindTaskEvents(taskElement, onCheckboxChange);
  }
};

initializeContainerTasks(incompleteTasksContainer, taskCompleted);
initializeContainerTasks(completeTasksContainer, taskIncomplete);
