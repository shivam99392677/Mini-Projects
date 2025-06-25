let btn = document.querySelector(".btn-success");
let input = document.querySelector(".form-control");
let ul = document.querySelector(".list-group");

btn.addEventListener("click", () => {
  if (input.value != "") {
    let cancelBtn = document.createElement("button");

    addTask(input.value, ul);
  } else {
    alert("Please enter any task to add.");
  }
});

// Adds a new task with checkbox to the given list
function addTask(task, path) {
  let li = document.createElement("li");
  let para = document.createElement("p");
  let check = document.createElement("input");
  let i = document.createElement("i");

  check.type = "checkbox";
  check.classList.add("form-check-input");

  i.classList.add("fa-duotone", "fa-solid", "fa-trash");

  para.innerText = task;

  li.appendChild(check);
  li.appendChild(para);
  li.appendChild(i);
  input.value = "";
  path.prepend(li);
  // Adds task at the top of the list
}

// Moves the task to the 'bin' list when 'Mark as Done' is clicked
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-duotone")) {
    let confirmation = confirm("Do you want to Delete task?");
    if (confirmation) {
      let taskItem = event.target.parentElement;
      let bin = document.querySelector(".bin"); // Target list for completed tasks

      event.target.remove(); // Removes 'Mark as Done' button
      taskItem.remove(); // Removes the task from the current list

      let li = document.createElement("li");
      li.appendChild(taskItem);

      bin.prepend(li); // Moves completed task to top of bin list
    }
  }
});

//press enter key to add task

document
  .getElementById("floating-input")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      document.querySelector(".btn-success").click();
    }
  });
