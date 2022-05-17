const containerSelector = document.querySelector("body");
let tasks = [
  {
    name: "Zrobić zakupy",
    isCompleted: false,
  },
  {
    name: "Wynieść śmieci",  
    isCompleted: false,
  },
]

const appendArray = function (array,container) {
    array.forEach(function (element) {
        container.appendChild(element)
    })
}

const addTask = (e) => {
    e.preventDefault();
    containerSelector.innerHTML = ""
    const newTask=e.target.parentNode.firstChild.value
    tasks=tasks.concat({name:newTask,isCompleted:false})
    render(containerSelector)
}

const onToggleList = (e) => {
    if(tasks.isCompleted===false){
    e.target.classList.remove("completed");
    tasks.isCompleted=true;
    }
    else{
        e.target.classList.add("completed");
        tasks.isCompleted=false;
    }
    
}

const deleteTask = (e) => {
   let indexDelete=Number(e.target.dataset.index)
   tasks = tasks.filter( (task, index)=> index!==indexDelete)
    containerSelector.innerHTML = ""
render(containerSelector)
}

const renderInputElement = (onChange,className,type,placeholder) => {
    const input = document.createElement("input");
    input.setAttribute("type", type);
    input.setAttribute("placeholder", placeholder);
    input.classList.add(className);
    input.addEventListener("change", onChange);
    return input;
}

const renderButtonElement = (onClick,className,label) => {
const button = document.createElement("button");
button.classList.add(className);
button.addEventListener("click", onClick);
button.innerHTML = label;
return button;
}

const renderFormElement = () => {
    const container = document.createElement("div")
    container.classList.add("container")
    const form = document.createElement("form")
    form.classList.add("form")
    const inputElement=renderInputElement(null,"input","text","Enter your task")
    const buttonElement=renderButtonElement(addTask,"button","Add")
    form.appendChild(inputElement)
    form.appendChild(buttonElement)
    container.appendChild(form)
   return container
}

const renderTask=(task,index)=>{      
const li = document.createElement("li");
const wrapper = document.createElement("div");
const span = document.createElement("span");
span.dataset.index=index
span.innerHTML = task.name;
span.addEventListener("click", onToggleList);
const button = renderButtonElement(deleteTask,"button","X")
button.dataset.index=index
wrapper.append(span,button)
li.appendChild(wrapper)
return li
}

const renderTasks = (tasks) => {
    const container = document.createElement("ol");
    const newTasks=tasks.map((el,index) => renderTask(el,index))
    appendArray(newTasks , container)
    return container
}

const render = (containerSelector) => {
containerSelector.appendChild(renderFormElement())
containerSelector.appendChild(renderTasks(tasks))
}

render(containerSelector)