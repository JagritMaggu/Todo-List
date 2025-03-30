const inputBox = document.getElementById("inputBox");
const  addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
let editTodo = null;


function addTodo(){
    const inputText = inputBox.value.trim();
    if(inputText.length <= 0){
        alert("Hello Sir/Ma'am, Please add something to your todo list");
        return false;
    }

    if(addBtn.value === "Confirm Edit"){
        editTodo.target.previousElementSibling.innerHTML = inputText;
        editLocalTodo(inputText);
        addBtn.value = "Add";
        inputBox.value = "";
    }
    else{
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    
    
    const li = document.createElement("li");
    const p = document.createElement("p");
    
   
    deleteBtn.classList.add("btn","deleteBtn");
    editBtn.classList.add("btn","editBtn");
   
    p.innerHTML= inputText;
    li.appendChild(p);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    
    deleteBtn.innerText= "Remove";
    editBtn.innerText="Edit";
    inputBox.value="";
    localTodo(inputText);
    }
}
function editRemoveTodo(e){
if(e.target.innerHTML === "Remove"){
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodo(e.target.parentElement);
}
if(e.target.innerHTML === "Edit"){
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Confirm Edit";
    editTodo=e;
}
}
function localTodo(todo){
    let todos;
    if(localStorage.getItem("todos")=== null){
       todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
   
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodo(){
    let todos;
    if(localStorage.getItem("todos")=== null){
       todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            const editBtn = document.createElement("button");
            const deleteBtn = document.createElement("button");
            
            
            const li = document.createElement("li");
            const p = document.createElement("p");
            
           
            deleteBtn.classList.add("btn","deleteBtn");
            editBtn.classList.add("btn","editBtn");
           
            p.innerHTML= todo;
            li.appendChild(p);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
        
            todoList.appendChild(li);
            
            deleteBtn.innerText= "Remove";
            editBtn.innerText="Edit";
        });
    }

}
function deleteLocalTodo(todo){
    let todos;
    if(localStorage.getItem("todos")=== null){
       todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function editLocalTodo(todo){
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}
document.addEventListener('DOMContentLoaded', getLocalTodo)
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', editRemoveTodo);
