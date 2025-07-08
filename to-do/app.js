// =====================
// 📦 ELEMENT REFERENCES
// =====================
let btn = document.querySelector(".btn-success");
let input = document.querySelector("#floating-input");
let ul = document.querySelector(".list-group");
let tasks = [];
let labels = [
  { label: "Work", color: "blue" },
  { label: "Personal", color: "green" },
  { label: "Urgent", color: "red" },
  { label: "Study", color: "orange" },
];

// =====================
// 🟩 ADD TASK ON BUTTON CLICK
// =====================
btn.addEventListener("click", () => {
  if (input.value != "") {
    addTask(input.value);
  } else {
    alert("Please enter any task to add.");
  }
});

// =====================
// ⌨️ ENTER TO ADD TASK
// =====================


input.addEventListener("keydown",(e)=>{
  if(e.key === "Enter"){
    btn.click();
  }
});

// =====================
// SHOW THE LEBEL DORPDOWN
// =====================

let dropDown = document.getElementById("labelDropdown");
let selectedLabel = null;

input.addEventListener("focus", () => {
  dropDown.style.display = "inline";
});
//SHOW LABEL SELECTION
dropDown.querySelectorAll(".label").forEach((item) => {
  item.addEventListener("click", (e) => {
    selectedLabel = e.target.getAttribute("data-label");
    dropDown.querySelector("button").innerText = selectedLabel;
  });
});

// =====================
// ✅ FUNCTION: check box toggle logic
// =====================

function attachCheckboxHandler(check, para, taskId) {
  check.addEventListener("change", () => {
    if (check.checked) {
      para.classList.add("complete");
    } else {
      para.classList.remove("complete");
    }

    for (let task of tasks) {
      if (task.id == taskId) {
        task.complete = check.checked;
      }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}

// =====================
// ✅ FUNCTION: Add Task
// =====================
function addTask(
  task,
  status,
  taskId = Date.now(),
  isFromStorage = false,
  label = selectedLabel
) {
  let li = document.createElement("li");
  let para = document.createElement("p");
  let check = document.createElement("input");
  let i = document.createElement("i");

  check.type = "checkbox";
  check.classList.add("form-check-input");

  i.classList.add("fa-duotone", "fa-solid", "fa-trash");

  para.innerText = task;
  para.addEventListener("dblclick", function () {
    enableEditing(para);
  });
  // ADDING LABEL
  if (label) {
    let badge = document.createElement("span");
    badge.classList.add("badge", "ms-2", "rounded-pill");

    switch (label) {
      case "Work": {
        badge.classList.add("bg-primary");
        break;
      }
      case "Personal": {
        badge.classList.add("bg-success");
        break;
      }
      case "Urgent": {
        badge.classList.add("bg-danger");
        break;
      }
      case "Study": {
        badge.classList.add("bg-warning", "text-dark");
        break;
      }
      default: {
        badge.classList.add("bg-secondary");
      }
    }

    badge.innerText = label;
    para.appendChild(badge);
  }

  // APPLYING STATUS LOADED FROM LOCAL STORAGE
  if (status) {
    check.checked = true;
    para.classList.add("complete");
  }

  li.setAttribute("data-id", taskId);
  li.appendChild(check);
  li.appendChild(para);
  li.appendChild(i);
  ul.prepend(li);
  input.value = "";

  // SAVING TASK TO TASKS[] IF NEW
  const exists = tasks.some((t) => t.id == taskId);
  if (!isFromStorage) {
    tasks.push({
      id: taskId,
      text: task,
      complete: !!status,
      label: selectedLabel,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // //HIDE THE LABEL DROPDOWN
  selectedLabel = null;
  dropDown.style.display = "none";
  dropDown.querySelector("button").innerText = "Select Label";

  // ✅ Checkbox toggle
  attachCheckboxHandler(check, para, taskId);
}

// =====================
// ✏️ FUNCTION: Enable Editing
// =====================
function enableEditing(para) {
  const currentText = para.childNodes[0].nodeValue.trim();
  let input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.classList.add("edit-input", "form-control");

  let saveBtn = document.createElement("button");
  saveBtn.innerHTML = "💾";
  saveBtn.classList.add("saveBtn");

  const parent = para.parentNode;
  parent.insertBefore(input, para);
  parent.insertBefore(saveBtn, para);
  parent.removeChild(para);
  input.focus();

  // 💾 Save on Enter
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      saveEditedTask(input, saveBtn);
    }
  });

  // 💾 Save on Button Click
  saveBtn.addEventListener("click", () => {
    saveEditedTask(input, saveBtn);
  });
}

// =====================
// 💾 FUNCTION: Save Edited Task
// =====================
function saveEditedTask(input, saveBtn) {
  const newText = input.value.trim();

  if (newText == "") {
    alert("Task cannot be empty!");
    return;
  } else {
    const parent = input.parentNode;
    const id = parseInt(parent.getAttribute("data-id"));
    let taskObj = tasks.find((t) => t.id === id);
    if (taskObj) {
      taskObj.text = newText;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    let para = document.createElement("p");
    para.innerText = newText;
    para.classList.add("task-text");

    // 🟨 Re-add badge if the task has a label
    if (taskObj && taskObj.label) {
      let badge = document.createElement("span");
      badge.classList.add("badge", "ms-2", "rounded-pill");

      switch (taskObj.label) {
        case "Work":
          badge.classList.add("bg-primary");
          break;
        case "Personal":
          badge.classList.add("bg-success");
          break;
        case "Urgent":
          badge.classList.add("bg-danger");
          break;
        case "Study":
          badge.classList.add("bg-warning", "text-dark");
          break;
        default:
          badge.classList.add("bg-secondary");
      }

      badge.innerText = taskObj.label;
      para.appendChild(badge);
    }

    para.addEventListener("dblclick", function () {
      enableEditing(para);
    });

    parent.insertBefore(para, input);
    parent.removeChild(input);
    parent.removeChild(saveBtn);

    let check = parent.querySelector("input[type='checkbox']");
    let taskId = parent.getAttribute("data-id");
    attachCheckboxHandler(check, para, taskId);
  }
}

// =====================
// 🗑️ DELETE TASK (Move to Bin)
// =====================
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-duotone")) {
    let confirmation = confirm("Do you want to Delete task?");
    if (confirmation) {
      let taskItem = event.target.parentElement;
      const id = parseInt(taskItem.getAttribute("data-id"));

      // UPDATE LOCAL STORAGE
      tasks = tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      let bin = document.querySelector(".bin");
      event.target.remove();
      taskItem.remove();
      let li = document.createElement("li");
      li.appendChild(taskItem);
      bin.prepend(li);
    }
  }
});

// =====================
// ⌨️ FILTER TASK ACCORDING TO CHECKBOX
// =====================

let btns = document.querySelectorAll(" li button");
for (btn of btns) {
  if (btn.classList.contains("allItem")) {
    btn.addEventListener("click", () => {
      for (li of ul.querySelectorAll("li")) {
        li.style.display = "flex";
      }
    });
  } else if (btn.classList.contains("active")) {
    btn.addEventListener("click", () => {
      for (li of ul.querySelectorAll("li")) {
        if (li.querySelector("p").classList.contains("complete")) {
          li.style.display = "none";
        }
      }
    });
  } else if (btn.classList.contains("done")) {
    btn.addEventListener("click", () => {
      for (li of ul.querySelectorAll("li")) {
        let para = li.querySelector("p");
        if (para.classList.contains("complete")) {
          li.style.display = "flex";
        } else {
          li.style.display = "none";
        }
      }
    });
  }
}

// =====================
// ⌨️ LOAD THE TASKS ON PAGE RELOAD
// =====================

window.addEventListener("DOMContentLoaded", () => {
  let savedTask = JSON.parse(localStorage.getItem("tasks"));
  if (savedTask) {
    tasks = savedTask;
    for (let task of tasks) {
      addTask(task.text, task.complete, task.id, true, task.label);
    }
  }
});
