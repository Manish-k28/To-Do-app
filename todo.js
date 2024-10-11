// Array to store tasks
let tasks = [];

// Dynamic Time and Date for Navbar
function updateTimeAndDate() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateString = now.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });

    timeElement.textContent = timeString;
    dateElement.textContent = dateString;
}

setInterval(updateTimeAndDate, 1000); // Update every second
updateTimeAndDate(); // Initial call to set the time immediately

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskName = taskInput.value.trim();
    
    if (taskName === "") return;

    const task = {
        id: Date.now(),
        name: taskName,
        completed: false,
        addedTime: new Date().toLocaleString(),
        completedTime: null
    };

    tasks.push(task);
    taskInput.value = ""; // Clear input
    renderTasks(); // Update the UI
}

// Function to render tasks
function renderTasks() {
    const pendingTasksList = document.getElementById("pending-tasks");
    const completedTasksList = document.getElementById("completed-tasks");
    
    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    tasks.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <div class="task-content">
                <div>${task.name}</div>
                <div class="time-stamp">Added: ${task.addedTime}</div>
                ${task.completed ? `<div class="time-stamp">Completed: ${task.completedTime}</div>` : ''}
            </div>
            <div class="task-actions">
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                <button class="complete-btn ${task.completed ? 'completed' : ''}" onclick="completeTask(${task.id})">Complete</button>
            </div>
        `;

        if (task.completed) {
            completedTasksList.appendChild(taskItem);
        } else {
            pendingTasksList.appendChild(taskItem);
        }
    });
}

// Function to complete a task
function completeTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = true;
            task.completedTime = new Date().toLocaleString(); // Add completion time
        }
        return task;
    });
    renderTasks(); // Update the UI
}

// Function to edit a task
function editTask(id) {
    const taskToEdit = tasks.find(task => task.id === id);
    const newTaskName = prompt("Edit Task:", taskToEdit.name);
    
    if (newTaskName) {
        taskToEdit.name = newTaskName.trim();
        renderTasks(); // Update the UI
    }
}

// Function to delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks(); // Update the UI
}

// Function to handle "Enter" key press for adding task
function handleEnter(event) {
    if (event.key === "Enter") {
        addTask();
    }
}

// Add event listener for "Add Task" button
document.getElementById("add-task-btn").addEventListener("click", addTask);
