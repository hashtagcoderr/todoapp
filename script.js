let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");
let taskEditInput = null;
let taskEditItem = null;

function addTask() {
  let taskText = taskInput.value;
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }
  let taskItem = createTaskItem(taskText);
  taskList.appendChild(taskItem);
  taskInput.value = "";
}


function createTaskItem(taskText) {





  
  let taskItem = document.createElement("li");
  let taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.addEventListener("change", function() {
    taskItem.classList.toggle("completed");
  });
  let taskSpan = document.createElement("span");

  taskSpan.textContent = taskText;
  taskSpan.addEventListener("dblclick", function() {
    editTask(taskItem, taskSpan);
  });
  let taskDeleteButton = document.createElement("button");
  taskDeleteButton.textContent = "Delete";
  taskDeleteButton.onclick = function() {
    taskList.removeChild(taskItem);
  };
  taskItem.appendChild(taskCheckbox);
  taskItem.appendChild(taskSpan);
  taskItem.appendChild(taskDeleteButton);
  return taskItem;
}

function editTask(item, span) {
  if (taskEditInput) {
    // another task is already being edited
    return;
  }
  taskEditItem = item;
  taskEditInput = document.createElement("input");
  taskEditInput.type = "text";
  taskEditInput.value = span.textContent;
  taskEditInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      saveTaskEdit();
    } else if (event.key === "Escape") {
      cancelTaskEdit();
    }
  });
  item.replaceChild(taskEditInput, span);
  taskEditInput.focus();
}

function saveTaskEdit() {
  let taskText = taskEditInput.value;
  if (taskText === "") {
    cancelTaskEdit();
    return;
  }
  let newSpan = document.createElement("span");
  newSpan.textContent = taskText;
  taskEditItem.replaceChild(newSpan, taskEditInput);
  taskEditInput = null;
  taskEditItem = null;
}

function cancelTaskEdit() {
  let oldSpan = document.createElement("span");
  oldSpan.textContent = taskEditItem.querySelector("span").textContent;
  taskEditItem.replaceChild(oldSpan, taskEditInput);
  taskEditInput = null;
  taskEditItem = null;
}
