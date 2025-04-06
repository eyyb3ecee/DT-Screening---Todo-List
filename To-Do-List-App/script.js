document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    themeToggle.addEventListener('click', toggleTheme);

    // Function to create a new task
    function createTaskElement(taskText) {
        const li = document.createElement('li'); //create a new list item element

        const taskContent = document.createElement('div'); //create a new div element for the task content
        taskContent.className = 'task-content'; //add a class name to the task content div
        taskContent.textContent = taskText; //add the task text to the task content div

        const taskActions = document.createElement('div'); //create a new div element for the task actions
        taskActions.className = 'task-actions'; //add a class name to the task actions div

        // Complete button
        const completeButton = document.createElement('button'); //create a new button element
        completeButton.className = 'complete-btn'; //add a class name to the complete button
        completeButton.innerHTML = '<i class="fas fa-check"></i>'; //add an icon to the complete button
        completeButton.onclick = () => {
            taskContent.classList.toggle('completed'); //toggle the completed class on the task content div
        };

        // Delete button
        const deleteButton = document.createElement('button'); //create a new button element
        deleteButton.className = 'delete-btn'; //add a class name to the delete button
        deleteButton.innerHTML = '<i class="fas fa-times" style="color: #e53e3e;"></i>'; //add a red X icon to the delete button
        deleteButton.onclick = () => {
            li.classList.add('fade-out'); //add a fade-out class to the list item
            li.addEventListener('animationend', () => {
                li.remove(); //remove the list item from the DOM
            });
        };

        taskActions.appendChild(completeButton); //add the complete button to the task actions div
        taskActions.appendChild(deleteButton); //add the delete button to the task actions div

        li.appendChild(taskContent); //add the task content to the list item
        li.appendChild(taskActions); //add the task actions to the list item

        return li; //return the list item
    }

    // Function to add a new task with animation
    function addNewTask(taskText) {
        const newTask = createTaskElement(taskText); //create a new task element
        newTask.classList.add('fade-in'); //add a fade-in class to the new task
        taskList.appendChild(newTask); //add the new task to the task list
        taskInput.value = ''; //clear the task input
    }

    // Add task when clicking the Add button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim(); //get the task text from the task input
        if (taskText) { //if the task text is not empty
            addNewTask(taskText); //add the new task to the task list
        }
    });

    // Add task when pressing Enter
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') { //if the Enter key is pressed
            const taskText = taskInput.value.trim(); //get the task text from the task input    
            if (taskText) { //if the task text is not empty
                addNewTask(taskText); //add the new task to the task list                   
            }
        }
    });

    // Theme toggle functionality
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme'); //get the current theme
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'; //toggle the theme
        document.documentElement.setAttribute('data-theme', newTheme); //set the new theme
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'; //update the theme icon
    }
});
