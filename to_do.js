let task = [];

const saveTask = () => {
    localStorage.setItem('task', JSON.stringify(task));
};

const loadTask = () => {
    const saved = localStorage.getItem('task');
    if (saved) task = JSON.parse(saved);
};

const addTask = () => {
    const taskInput = document.getElementById('taskinput');
    const text = taskInput.value.trim();

    if (text) {
        task.push({ text: text, completed: false });
        taskInput.value = '';
        updateTaskList();
        updateState();
        saveTask();
    }
};

const toggleTaskComplete = (index) => {
    task[index].completed = !task[index].completed;
    updateTaskList();
    updateState();
    saveTask();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskinput');
    taskInput.value = task[index].text;
    task.splice(index, 1);
    updateTaskList();
    updateState();
    saveTask();
};

const deleteTask = (index) => {
    task.splice(index, 1);
    updateTaskList();
    updateState();
    saveTask();
};

const updateState = () => {
    const completedTask = task.filter(t => t.completed).length;
    const totalTask = task.length;
    const progress = totalTask > 0 ? (completedTask / totalTask) * 100 : 0;

    const progressBar = document.getElementById('progres');
    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completedTask} / ${totalTask}`;
};

const updateTaskList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    task.forEach((t, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="taskitem">
                <div class="task ${t.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${t.completed ? "checked" : ""} />
                    <p>${t.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/pen.svg" alt="Edit" class="edit-btn" />
                    <img src="./img/trash.svg" alt="Delete" class="delete-btn" />
                </div>
            </div>
        `;

        listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));
        listItem.querySelector('.edit-btn').addEventListener('click', () => editTask(index));
        listItem.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));

        taskList.appendChild(listItem);
    });
};

document.getElementById('newtask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});

window.addEventListener('DOMContentLoaded', () => {
    loadTask();
    updateTaskList();
    updateState();
});
