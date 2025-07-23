/* project :todo-list-app */
/* author : Abdul basit aly */
const form = document.getElementById("form");    
const taskInput = document.getElementById("task"); 
const list = document.getElementById("list");      


let tasks = [];

 
form.addEventListener("submit", function (e) {
  e.preventDefault(); 

  const text = taskInput.value.trim(); 
   if (!text) return
  const newTask = {
    id: Date.now(), 
    text: text      
  };

  tasks.push(newTask); 
  saveTasks();         
  renderTask(newTask); 
  taskInput.value = "";
});

function renderTask(task) {
  const li = document.createElement("li");
  li.className = "item";
  li.setAttribute("data-id", task.id); 

  const span = document.createElement("span");
  span.className = "txt";
  span.textContent = task.text;

  const btnDiv = document.createElement("div");
  btnDiv.className = "btns";

  const editBtn = document.createElement("button");
  editBtn.className = "edit";
  editBtn.textContent = "Edit";

  const delBtn = document.createElement("button");
  delBtn.className = "del";
  delBtn.textContent = "Delete";

  editBtn.addEventListener("click", function () {
    const newText = prompt("Edit Task:", task.text);
    if (newText && newText.trim()) {
      task.text = newText.trim();
      span.textContent = task.text;
      saveTasks(); 
    }
  });

  
  delBtn.addEventListener("click", function () {
    tasks = tasks.filter((t) => t.id !== task.id);
    li.remove(); 
    saveTasks(); 
  });

  btnDiv.appendChild(editBtn);
  btnDiv.appendChild(delBtn);

  li.appendChild(span);
  li.appendChild(btnDiv);
  list.appendChild(li);
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.addEventListener("load", function () {
  const data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data); 
    tasks.forEach(renderTask); 
}
});
