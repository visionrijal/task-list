const form = document.querySelector('#task-form');
let taskList = document.querySelector('.collection');
let clearBtn = document.querySelector('.clear-tasks');
let filter = document.querySelector('#filter');
let taskInput = document.querySelector('#task');
// load event listeners
loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit', addTask);
    document.addEventListener('DOMContentLoaded',getTasks);
}
//gettasks from local storage
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
        //add to class 
        li.classList.add('collection-item')
        // create text node and append to li
        li.appendChild(document.createTextNode(task));
        // create new link element to del
        const link = document.createElement('a');
        // add class
        link.classList = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append link to li
        li.appendChild(link);
        // append to ul
        taskList.appendChild(li);
    })
}


function addTask(e) {

    if (taskInput.value === '') {
        alert('add a task');
    }

    // create li element
    const li = document.createElement('li');
    //add to class 
    li.classList.add('collection-item')
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element to del
    const link = document.createElement('a');
    // add class
    link.classList = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);
    // append to ul
    taskList.appendChild(li);

    //store to local storage
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(taskInput.value);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';

    e.preventDefault();

}

//delete item on click icon
taskList.addEventListener('click', function remove(e) {

    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
    }
    //remove from local storage
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
      
    }
    taskList = e.target.parentElement.parentElement;
    console.log(tasks);
    tasks.forEach( function(task,index)  {
        if (taskList.textContent === task) {
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();


});
//clear all tasks
clearBtn.addEventListener('click', function clearTasks(e) {
    e.preventDefault();
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
})

