class Node {
    constructor(todo) {
        this.todo = todo; 
        this.next = null; 
    }
}

class LinkedList {
    constructor() {
        this.head = null; 
        this.size = 0;  
    }

    add(todo){
        const newNode = new Node(todo);
        if(!this.head)
        {
            this.head = newNode;
        }
        else{
            let current = this.head;
            while(current.next){
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    delete(index){
        if(index < 0 || index >= this.size)
        {
            return;
        }
        if(index === 0){
            this.head = this.head.next;
        }
        else{
            let current = this.head;
            let prev = NULL;
            for(let i = 0 ; i < index ; i++){
                prev = current;
                current = current.next;
            }
            prev.next = current.next;
        }
        this.size--;
    }

    completedTask(index){
        let current = this.head;
        for(let i = 0 ; i < index ; i++){
            current = current.next;
        }
        if(current){
            current.todo.completed = !current.todo.completed;
        }
    }

    AllTasksArray() {
        const todos = [];
        let current = this.head;
        while (current) {
            todos.push(current.todo);
            current = current.next;
        }
        return todos;
    }
}


const todoListLinkedList = new LinkedList();

const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");


function createTodoItem(todo, index) {
    const todoId = "todo-" + index;
    const todoLI = document.createElement("li");
    todoLI.className = "todo-list";
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}" ${todo.completed ? "checked" : ""}>
        <label for="${todoId}" class="check-box">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
        <label for="${todoId}" class="list-tasks" style="${todo.completed ? 'text-decoration: line-through; color: var(--secondary-color);' : ''}">
            ${todo.text}
        </label>
        <button class="delete-button" data-index="${index}">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
    `;
    return todoLI;
}

function updateTodoList() {
    todoList.innerHTML = "";
    const todosArray = todoListLinkedList.AllTasksArray();
    todosArray.forEach((todo, index) => {
        const todoItem = createTodoItem(todo, index);
        todoList.appendChild(todoItem);
        const deleteButton = todoItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            todoListLinkedList.delete(index);
            updateTodoList();
        });

        const checkbox = todoItem.querySelector("input[type='checkbox']");
        checkbox.addEventListener("change", () => {
            todoListLinkedList.completedTask(index);
            updateTodoList();
        });
    });
}

addButton.addEventListener("click", (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText) {
        const todo = { text: todoText, completed: false };
        todoListLinkedList.add(todo);
        updateTodoList();
        todoInput.value = "";
    }
});

updateTodoList();


// // تحميل المهام المخزنة محليًا
// function loadTodos() {
//     const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
//     storedTodos.forEach((todo) => todoListLinkedList.add(todo));
//     updateTodoList();
// }

// // حفظ المهام في Local Storage
// function saveTodos() {
//     const todosArray = todoListLinkedList.AllTasksArray();
//     localStorage.setItem("todos", JSON.stringify(todosArray));
// }