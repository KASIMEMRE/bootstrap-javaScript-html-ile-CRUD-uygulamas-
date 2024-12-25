

document.addEventListener("DOMContentLoaded", loadTasks);
        
        const themeToggleButton = document.getElementById('themeToggle');

       
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.replace('light-theme', 'dark-theme');
            
        }

       
        themeToggleButton.addEventListener('click', () => {
            if (document.body.classList.contains('light-theme')) {
                document.body.classList.replace('light-theme', 'dark-theme');
                localStorage.setItem('theme', 'dark'); 
            } else {
                
                document.body.classList.replace('dark-theme', 'light-theme');
                localStorage.setItem('theme', 'light'); 
            }
        });

document.getElementById("addButton").addEventListener("click", addTask);
document.getElementById("taskInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => renderTask(task));
}


function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskValue = taskInput.value.trim();

    if (taskValue === "") {
        alert("Görev boş olamaz!");
        return;
    }

    
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskValue);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    
    renderTask(taskValue);
    taskInput.value = "";
}


function renderTask(taskValue) {
    const taskList = document.getElementById("taskList");
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";
    listItem.innerHTML = `
        <span>${taskValue}</span>
        <div>
            <button class="btn btn-sm btn-primary edit-btn me-2"><i class="fa fa-edit"></i> Düzenle</button>
            <button class="btn btn-sm btn-danger delete-btn"><i class="fa fa-trash"></i> Sil</button>
        </div>
    `;

    taskList.appendChild(listItem);

    
    listItem.querySelector(".edit-btn").addEventListener("click", () => editTask(listItem));
    listItem.querySelector(".delete-btn").addEventListener("click", () => deleteTask(listItem));
}


function editTask(taskItem) {
    const taskSpan = taskItem.querySelector("span");
    const oldTask = taskSpan.textContent;
    const newTask = prompt("Görevi düzenle:", oldTask);

    if (newTask !== null && newTask.trim() !== "") {
        taskSpan.textContent = newTask.trim();

        
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const taskIndex = tasks.indexOf(oldTask);
        if (taskIndex !== -1) {
            tasks[taskIndex] = newTask.trim();
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
}


function deleteTask(taskItem) {
    const taskSpan = taskItem.querySelector("span");
    const taskValue = taskSpan.textContent;

    if (confirm("Bu görevi silmek istediğinize emin misiniz?")) {
        taskItem.remove();

       
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const filteredTasks = tasks.filter((task) => task !== taskValue);
        localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    }
}

