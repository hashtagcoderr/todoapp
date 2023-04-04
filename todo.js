const tasksList = [];
let isEditable = false;
let activeIndex = -1;

const userInput = document.getElementById("user-input");


const keyPressListener = (event) => {
  if (event.key === "Enter") {
    // add task
    const { value } = document.getElementById("user-input");

    if (!isEditable) {
      addTask(value);
    } else {
      updateText(value);
    }
  }
};
// adding event listener
document.addEventListener("keypress", keyPressListener);

const addTask = (taskText) => {
  tasksList.push(taskText);
  console.log(tasksList);

  // create a new list item (li)

  const taskItem = document.createElement("li");

  // taskItem.classList.add("task-item")
  taskItem.className = "task-item";
  taskItem.id = `item_${tasksList.length - 1}`;

  // inner text set
  taskItem.innerHTML = `<div class="checkbox"></div>
    <span>${taskText}</span>
    <button id="edit_${tasksList.length - 1}" onclick="updateTask(${
    tasksList.length - 1
  })">Edit</button>
    <button>Delete</button>`;

  // acces list (ul)
  const list = document.querySelector(".tasks-list");

  // append the new li to existing ul
  list.appendChild(taskItem);

  resetInputField();
};

const updateTask = (index) => {
  userInput.value = tasksList[index];
  isEditable = true;
  activeIndex = index;
};

const updateText = (taskText) => {
  tasksList[activeIndex] = taskText;

  const activeSpan = document.querySelector(`#item_${activeIndex} span`)

  activeSpan.innerText = taskText;

  isEditable = false;

  resetInputField();

  console.log(tasksList);
};

const resetInputField = () => {
  // clearInputField
  userInput.value = "";
};
