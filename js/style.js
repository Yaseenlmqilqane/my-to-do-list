


let tasks = [
    {
        "titel": "مشروعي",
        "date": "12/12/2022",
        "isDone": false,
    },
    {
        "titel": "اقراء",
        "date": "30/12/2022",
        "isDone": false,
    },
    {
        "titel": "للمعرفة",
        "date": "23/12/2022",
        "isDone": false,
    },
    {
        "titel": "ياسين",
        "date": "23/12/2022",
        "isDone": true,
    },
]

function getTasksFromStorage(){
    let retrievedTasks = JSON.parse(localStorage.getItem("tasks"))
    // if(retrievedTasks == null){
    //     tasks = []
    // }else {
    //     tasks = retrievedTasks
    // }    
    tasks = retrievedTasks ?? []
}

getTasksFromStorage()

function fillTasksOnThePage(){
    document.getElementById("tasks").innerHTML = ""
    let index = 0
    for(tasl of tasks) {
    let contunt = 
`
        <div class="task ${tasl.isDone ? 'done' : ''}">
            <!-- Task info -->
            <div class="info">
                <h4>${tasl.titel}</h4>
                <div class="time">
                    <span><i class="fa-regular fa-calendar-minus"></i></span>
                    <span>${tasl.date}</span>
                </div>
            </div>
            <!-- // Task info // -->
            <!-- Task action -->
            <div class="action">
                <button onclick="deletTask(${index})" class="circular btn1"><i class="fa-solid fa-trash faka1"></i></button>
                ${tasl.isDone ? `
                    <button onclick="comletedTask(${index})" class="circular btn2" style="background-color: rgb(182,47,144); color: white;"><i class="fa-sharp fa-solid fa-xmark"></i></button>
                ` : `
                    <button onclick="comletedTask(${index})" class="circular btn2"><i class="fa-solid fa-check faka2"></i></button>
                `}
                <button onclick="editTask(${index})" class="circular btn3"><i class="fa-solid fa-pen-to-square faka3"></i></button>
            </div>
            <!-- // Task action // -->
        </div>
`
    document.getElementById("tasks").innerHTML += contunt
    index++
    }
}
fillTasksOnThePage()

document.getElementById("btn-add").addEventListener("click", function(){
    let now = new Date()
    let date = now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear()
    let taskName = prompt("الرجاء ادخال عنوان المهمة")
    let taskOj = {
        "titel": taskName,
        "date": date,
        "isDone": false,
    }
    if(taskName) {
        tasks.push(taskOj)
        storeTasks()
        fillTasksOnThePage()
    }
})

function deletTask(index) {
    let task = tasks[index] 
    let isConfirm = confirm("هل انت متاكد من حذف:" + " " + task.titel)
    if(isConfirm) {
        tasks.splice(index, 1)
        storeTasks()
        fillTasksOnThePage()
    }
}

function editTask(index) {
    let task = tasks[index]
    let newTaskTitle = prompt("الرجاء تحديد عنوان المهمةالجديد", task.titel)
    if(newTaskTitle) {
        task.titel = newTaskTitle
        storeTasks()
        fillTasksOnThePage()
    }
}

function comletedTask(index) {
    let task = tasks[index]
    task.isDone = !task.isDone
    storeTasks()
    fillTasksOnThePage()
}


// ======= Storage Function =========

function storeTasks(){
    let taskString = JSON.stringify(tasks)
    localStorage.setItem("tasks", taskString)
}
