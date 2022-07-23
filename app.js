const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-option");

document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("input",filterTodo);

function addTodo(event){
    event.preventDefault();
    
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.Value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    saveLocalTodos(todoInput.Value);

    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complet-btn");
    todoDiv.appendChild(completeButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-check"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    todoInput.Value = "";

}

function deleteCheck(e){
    const item = e.target;

    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove();
        });
    }

    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");

    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.Value){
            case"all":
            todo.style.display = "flex";
            break;
            case "complete":
                if(todo.classList.contains("completed")){
                    todo.style.display ="flex";

                }else{
                    todo.style.display = "none";
                }
                break;

        }
    });
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos =[];
    }else{
        todo = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo= document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completeButton = document.createElement("button");
        completeButton.innerHTML = '<i classe ="fas fa-check"></i>';
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);

        const trashButton = document.createElement("button");
        completeButton.innerHTML = '<i classe ="fas fa-check"></i>';
        completeButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);



    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todo")=== null){
        todos = [];

    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
}