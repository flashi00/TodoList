const todoApp = document.querySelector(".todo-app");
const todoInput = document.querySelector(".todo-app-input");
const todoBtn = document.querySelector(".todo-app-btn");
const todoList = document.querySelector(".todo-app-list");


$(todoBtn).on("click", addTodoList);
$(todoList).on("click", TodoAction);

document.addEventListener("DOMContentLoaded", getTodosLocal);


function addTodoList(event) {


    const todoNewDiv = document.createElement("div");
    $(todoNewDiv).addClass("todo-app-item-list");

    //Adding comleted task icone
    const todoNewInput = document.createElement("span");
    $(todoNewInput).html('<i class="bi bi-app"></i>');
    $(todoNewDiv).append(todoNewInput);

    //Adding text(Task)
    const todoNewP = document.createElement("p");
    $(todoNewP).text(todoInput.value);
    $(todoNewDiv).append(todoNewP);
    saveTodoLocal(todoInput.value);

    //Adding delete icone
    const todoNewAction = document.createElement("span");
    $(todoNewAction).html('<i class="bi bi-trash3-fill close"></i>');
    $(todoNewDiv).append(todoNewAction);

    //Adding all elements to the div
    $(todoList).append(todoNewDiv);
    todoInput.value = "";

    $("span").hover(function() {
        $(this).css('cursor','pointer');
    }, function() {
        $(this).css('cursor','auto');
    });
}


function TodoAction(e) {
    const todoItem = e.target;

    //Task completed

    if (todoItem.classList[1] === "bi-app") {
        $(todoItem).toggleClass('bi-check2-square');
        const todoComplete = todoItem.parentElement;
        const todoCompleted = todoComplete.parentElement;
        $(todoCompleted).toggleClass('completed');
    }

    // Deleting Todo Task

    if (todoItem.classList[2] === "close") {
        const todoDeleteElement = todoItem.parentElement;
        const todoDeleteElementTask = todoDeleteElement.parentElement;

        todoDeleteElementTask.remove();
        deleteTodosLocal(todoDeleteElementTask);
    }
}


function saveTodoLocal(todoItem) {
    let todo;
    if (localStorage.getItem('todo') === null) {
        todo = [];
    }
    else {
        todo = JSON.parse(localStorage.getItem('todo'));
    }

    todo.push(todoItem);
    localStorage.setItem("todo", JSON.stringify(todo));
}


function getTodosLocal(todoItem) {
    let todo;
    if (localStorage.getItem('todo') === null) {
        todo = [];
    }
    else {
        todo = JSON.parse(localStorage.getItem('todo'));
    }

    todo.forEach(function (todo) {
        const todoNewDiv = document.createElement("div");
        $(todoNewDiv).addClass("todo-app-item-list");

        const todoNewInput = document.createElement("span");
        $(todoNewInput).html('<i class="bi bi-app"></i>');
        $(todoNewDiv).append(todoNewInput);

        const todoNewP = document.createElement("p");
        $(todoNewP).text(todo);
        $(todoNewDiv).append(todoNewP);

        const todoNewAction = document.createElement("span");
        $(todoNewAction).html('<i class="bi bi-trash3-fill close"></i>');
        $(todoNewDiv).append(todoNewAction);

        $(todoList).append(todoNewDiv);
    });

    $("span").hover(function() {
        $(this).css('cursor','pointer');
    }, function() {
        $(this).css('cursor','auto');
    });
}

//Delete Todo Item from Local Storage

function deleteTodosLocal(todoDelete) {
    let todo;
    if (localStorage.getItem('todo') === null) {
        todo = [];
    }
    else {
        todo = JSON.parse(localStorage.getItem('todo'));
    }
    const todoDeleteIndex = todoDelete.children[1].innerHTML;
    todo.splice(todo.indexOf(todoDeleteIndex), 1);

    localStorage.setItem('todo', JSON.stringify(todo));
}
