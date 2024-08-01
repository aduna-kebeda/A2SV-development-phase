const addButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskValue => {
        addTaskToDOM(taskValue);
    });
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li span').forEach(taskText => {
        tasks.push(taskText.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTaskToDOM(taskValue) {
    const taskItem = document.createElement('li');

    const taskText = document.createElement('span');
    taskText.textContent = taskValue;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-task');
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        saveTasks();
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-task');
    editButton.addEventListener('click', () => {
        const newTaskValue = prompt("Edit your task:", taskText.textContent.trim());
        if (newTaskValue !== null && newTaskValue.trim() !== "") {
            taskText.textContent = newTaskValue.trim();
            saveTasks();
        }
    });

    taskItem.appendChild(taskText);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

function addTask() {
    const taskInput = document.getElementById('task');
    const taskValue = taskInput.value.trim();

    console.log("Add Task Button Clicked");
    console.log("Task Value:", taskValue);

    if (taskValue !== "") {
        addTaskToDOM(taskValue);
        saveTasks();
        taskInput.value = '';
    }
}

addButton.onclick = addTask;
loadTasks();