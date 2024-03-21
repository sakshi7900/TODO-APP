// Sample tasks array to store tasks
let tasks = [];

// Function to add a new task
function addTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('dueDate').value;
    let priority = document.getElementById('priority').value;

    let newTask = {
        id: Date.now(),
        title,
        description,
        dueDate,
        priority,
        completed: false,
    };
    tasks.push(newTask);
    displayTasks();
    clearForm();
}

function displayTasks() {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        let taskItem = document.createElement('div');
        taskItem.classList.add('task', task.completed ? 'completed' : '');

        taskItem.innerHTML = `
            <span>${task.title}</span>
            <span>${task.dueDate}</span>
            <span>${task.priority}</span>
            <button onclick="toggleCompletion(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;

        taskList.appendChild(taskItem);
        console.log(taskItem);
    });
}

// Function to toggle completion status of a task
function toggleCompletion(id) {
    let taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        displayTasks();
    }
}

// Function to edit a task
function editTask(id) {
    let taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        let editedTitle = prompt('Edit Title:', tasks[taskIndex].title);
        if (editedTitle !== null) {
            tasks[taskIndex].title = editedTitle;
            displayTasks();
        }
    }
}

// Function to delete a task with confirmation prompt
function deleteTask(id) {
    let confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
        tasks = tasks.filter(task => task.id !== id);
        displayTasks();
    }
}

// Function to clear the form after adding a task
function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('priority').value = 'low';
}

displayTasks();
document.getElementById('taskForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addTask();
});