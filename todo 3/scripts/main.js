var addButton = document.getElementById('add-task-button');
var taskList = document.getElementById('task-list');
if (addButton && taskList) {
    function loadTasks() {
        var tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(function (taskValue) {
            addTaskToDOM(taskValue);
        });
    }
    function saveTasks() {
        var tasks = [];
        document.querySelectorAll('#task-list li span').forEach(function (taskText) {
            tasks.push(taskText.textContent || '');
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    function addTaskToDOM(taskValue) {
        if (!taskList)
            return;
        var taskItem = document.createElement('li');
        var taskText = document.createElement('span');
        taskText.textContent = taskValue;
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-task');
        deleteButton.addEventListener('click', function () {
            taskList.removeChild(taskItem);
            saveTasks();
        });
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-task');
        editButton.addEventListener('click', function () {
            var _a;
            var newTaskValue = prompt("Edit your task:", ((_a = taskText.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '');
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
        var taskInput = document.getElementById('task');
        if (!taskInput)
            return;
        var taskValue = taskInput.value.trim();
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
}
else {
    console.error("Required DOM elements are missing.");
}
