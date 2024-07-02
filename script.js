let taskButton = document.getElementById("taskButton");
let taskInput = document.getElementById("taskInput");
let tasks = document.getElementById("tasks");
let alert = document.querySelector(".alert");
let loading = document.getElementById("loading");
let taskEmpty = document.getElementById("taskEmpty");

// api key ->   6684207460a208ee1fdc2c5a

taskButton.addEventListener("click", function () {
  let task = {
    title: taskInput.value,
    apiKey: "6684207460a208ee1fdc2c5a",
  };
  sendTask(task);
});

async function sendTask(task) {
  let data = await fetch(`https://todos.routemisr.com/api/v1/todos`, {
    method: "post",
    body: JSON.stringify(task),
    headers: { "content-type": "application/json" },
  });
  let result = await data.json();
  if (result.message == "success") {
    getAllTodo();
    clear();
    alert.classList.replace("d-block", "d-none");
  } else {
    alert.classList.replace("d-none", "d-block");
  }
}

// all todo Api ====>  https://todos.routemisr.com/api/v1/todos/6684207460a208ee1fdc2c5a

async function getAllTodo() {
  setTimeout(() => {
    loading.style.display = "block";
    tasks.style.display = "none";
    if (result.todos.length != 0) {
      taskEmpty.style.display = "none";
    }
    displayTodo(result.todos);
  }, 1500);
  let data = await fetch(
    `https://todos.routemisr.com/api/v1/todos/6684207460a208ee1fdc2c5a`,
  );
  let result = await data.json();
  if (result.message == "success") {
    setTimeout(() => {
      loading.style.display = "none";
      tasks.style.display = "block";
      if (result.todos.length == 0) {
        taskEmpty.style.display = "block";
      }
      displayTodo(result.todos);
    }, 1500);
  }
}

function displayTodo(data) {
  let cartona = ``;
  for (let i = 0; i < data.length; i++) {
    cartona += `
           <div
          class="task ${
            data[i].completed ? "bg-success" : ""
          } my-3 d-flex justify-content-between align-items-center w-75 m-auto px-4 py-2 rounded-3"
        >
          <div>
            <p class="task-text m-0 p-0 ${
              data[i].completed ? "text-decoration-line-through" : ""
            }">${data[i].title}</p>
          </div>
          <div>
            <i  onclick="todoAction('${
              data[i]._id
            }' , 'put')" class="fa-regular fa-circle-check ${
      data[i].completed ? "d-none" : ""
    }"></i>
            <i onclick="todoAction('${
              data[i]._id
            }', 'delete')" class="fa-solid fa-trash"></i>
          </div>
        </div>
    `;
  }

  tasks.innerHTML = cartona;
}

async function todoAction(id, method) {
  let data = await fetch(`https://todos.routemisr.com/api/v1/todos`, {
    method,
    body: JSON.stringify({ todoId: id }),
    headers: { "content-type": "application/json" },
  });
  let result = await data.json();
  if (result.message == "success") {
    getAllTodo();
  }
}

function clear() {
  taskInput.value = null;
}
getAllTodo();
