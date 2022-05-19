//Stan aplikacji:
let containerSelector = document.querySelector(".root");
let filter = "ALL"; // one of ALL, DONE, NOT-DONE
let sort = "ASCENDING"; // ASCENDING or DESCENDING
let searchPhrase = "";
let searchInputIsFocused=false
newToDoInputIsFocused = false


const generateId = () => {
  return Math.floor(Math.random() * 100000);
};
let tasks = [
  { id: generateId(), name: "Zrobić zakupy", isCompleted: false },
  {
    id: generateId(),
    name: "Wynieść śmieci",
    isCompleted: true,
  },
];

// Ogólne / funkcje pomocnicze

const focus = function (condition, element) {
  if (condition) {
    setTimeout(function () {
      element.focus();
    }, 0);
  }
};

const appendArray = function (array, container) {
  array.forEach(function (element) {
    container.appendChild(element);
  });
};

const renderInputElement = (
  onChange,
 condition,
  className,
  type,
  placeholder
) => {
  const input = document.createElement("input");
  input.setAttribute("type", type);
  input.setAttribute("placeholder", placeholder);
  input.classList.add(className);
  input.addEventListener("input", onChange);
  focus(condition, input);
  return input;
};

const renderButtonElement = (onClick, className, label) => {
  const button = document.createElement("button");
  button.classList.add(className);
  button.addEventListener("click", onClick);
  button.innerHTML = label;
  return button;
};

const renderFormElement = () => {
  const container = document.createElement("div");
  container.classList.add("container");
  const form = document.createElement("form");
  form.classList.add("form");
  searchInputIsFocused=false
  newToDoInputIsFocused = true;
  const inputElement = renderInputElement(
    null,
    newToDoInputIsFocused,
    "input",
    "text",
    "Enter your task"
  );
  const buttonElement = renderButtonElement(addTask, "button", "Add");
  form.appendChild(inputElement);
  form.appendChild(buttonElement);
  container.appendChild(form);
  return container;
};
// Funkcje zmiany stanu

const filterByCompleted = function (task) {
  if (filter === 'ALL') return true

  if (filter === 'DONE') return task.isCompleted

  if (filter === 'NOT-DONE') return !task.isCompleted

  return true
}
const selectFilter = (e) => {
  filter = e.target.innerHTML
  update()
}

renderButtonsFilter=()=>{
  const container = document.createElement("div");
  container.classList.add("container");
  const buttonAll = renderButtonElement(selectFilter, "button-filter", "ALL");
  const buttonDone = renderButtonElement(selectFilter, "button-filter", "DONE");
  const buttonNotDone = renderButtonElement(selectFilter, "button-filter", "NOT-DONE");
  container.appendChild(buttonAll);
  container.appendChild(buttonDone);
  container.appendChild(buttonNotDone);
  return container;
}

const onSearchPhraseChange = function (event) {
  
  searchInputIsFocused = true
  newToDoInputIsFocused = false
  searchPhrase = event.target.value
  console.log(searchPhrase)
  update()
}

const filterBySearchPhrase = function (task) {
  const name = task.name.toLowerCase()
  const search = searchPhrase.toLowerCase()

  if (name.includes(search)) return true

  return false
}

renderInputSearch = () => {
  const container = document.createElement("div");
  container.classList.add("container");
  const input = renderInputElement(
    onSearchPhraseChange,
    searchInputIsFocused,
    "input-search",
    "text",
    "Search🔎"
  );
  container.appendChild(input);
  return container;
}

const renderTask = (task) => {
  const li = document.createElement("li");
    li.classList.add("list-item");
  const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
  const span = document.createElement("span");
  span.classList.add("task-name");
  span.dataset.id = task.id;
  span.innerHTML = task.name;
  if(task.isCompleted === true){
    span.classList.add("completed");
  }
  span.addEventListener("click", onToggleIsCompleted);
  const button = renderButtonElement(deleteTask, "button-delete", "X");
  button.dataset.id = task.id;
  wrapper.append(span, button);
  li.appendChild(wrapper);
  return li;
};

const addTask = (e) => {
  e.preventDefault();
  containerSelector.innerHTML = "";
  const newTask = e.target.parentNode.firstChild.value;
  if(newTask === ""){
    alert("Wpisz nazwę zadania");
  }else{
  tasks = tasks.concat({ id: generateId(), name: newTask, isCompleted: false });
  
  }
  update()
};

const onToggleIsCompleted = (e) => {
e.preventDefault();
  const id = Number(e.target.dataset.id);
  tasks = tasks.map((task) => {
    if (task.id === id) {
      if (task.isCompleted === false) {
        task.isCompleted = true;
        
      } else {
        task.isCompleted = false;
       
      }
    }
    return task;
  });
  update();
};

const deleteTask = (e) => {
  let idDelete = Number(e.target.dataset.id);
  tasks = tasks.filter((task) => task.id !== idDelete);
  update();
};

const renderTasks = (tasks) => {
  const container = document.createElement("ol");
    container.classList.add("container-list");
  const newTasks = tasks.map((el, index) => renderTask(el, index));
  appendArray(newTasks, container);
  return container;
};

const update = function () {
  containerSelector.innerHTML = "";
  render(containerSelector);
};

const render = (containerSelector) => {
  const filteredTasks = tasks
  .filter(filterByCompleted)
  .filter(filterBySearchPhrase);

  containerSelector.appendChild(renderButtonsFilter());
  containerSelector.appendChild(renderInputSearch());
  containerSelector.appendChild(renderFormElement());
  containerSelector.appendChild(renderTasks(filteredTasks));
 

};
update();


