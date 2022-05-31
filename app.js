const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event lisnteners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrCheckTodo);
filterOption.addEventListener('click', filterTodos);

function addTodo(event){
    event.preventDefault();
    
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    saveTodosToLocal(todoInput.value);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = '';
}

function deleteOrCheckTodo(event){
    const item = event.target;
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeFromLocalStorage(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }

    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        if(todo.classList[1] === "completed"){
            removeCheckedTodoFromLocalStorage(todo)
            console.log('delete')
        }else{
            saveCheckedTodosToLocal(todo.children[0].innerText)
        }

        
        
        todo.classList.toggle("completed");
    }
}

function filterTodos(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = 'flex'
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveTodosToLocal(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    console.log(todos)
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

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });

    markCheckedTodosOnLoad()
    
}

function removeFromLocalStorage(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeCheckedTodoFromLocalStorage(todo){
    let todos;
    if(localStorage.getItem("checked") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("checked"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("checked", JSON.stringify(todos));
}

function saveCheckedTodosToLocal(todo){
    let todos;
    console.log(todos)
    if(localStorage.getItem("checked") === null){
        todos = [];
        console.log(todos)
    }else{
        todos = JSON.parse(localStorage.getItem("checked"));
        console.log(todos)
    }
    console.log(todo)
    todos.push(todo);
    console.log(todos)
    localStorage.setItem("checked", JSON.stringify(todos));
}

function markCheckedTodosOnLoad(){
    let todos = [];

    if(localStorage.getItem("todos") !== null){
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let checkedTodos = [];

    if(localStorage.getItem("checked") !== null){
        checkedTodos = JSON.parse(localStorage.getItem("checked"));
    }

    let listTodos = todoList.childNodes;
    listTodos.forEach(function(todo){
        for (let i = 0; i < checkedTodos.length; i++) {
            if(checkedTodos[i] === todo.children[0].innerText){
                todo.classList.toggle('completed')
            }
        }
    })
}