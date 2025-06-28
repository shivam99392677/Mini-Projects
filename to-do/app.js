// =====================
// 📦 ELEMENT REFERENCES
// =====================
let btn = document.querySelector(".btn-success");
let input = document.querySelector(".form-control");
let ul = document.querySelector(".list-group");

// =====================
// 🟩 ADD TASK ON BUTTON CLICK
// =====================
btn.addEventListener("click", () => {
  if (input.value != "") {
    let cancelBtn = document.createElement("button");
    addTask(input.value);
  } else {
    alert("Please enter any task to add.");
  }
});

// =====================
// ✅ FUNCTION: Add Task
// =====================
function addTask(task) {
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

  li.appendChild(check);
  li.appendChild(para);
  li.appendChild(i);
  ul.prepend(li);
  input.value = "";

  // ✅ Checkbox toggle
  check.addEventListener("change", function () {
    if (check.checked) {
      para.classList.add("complete");
    } else {
      para.classList.remove("complete");
    }
  });
}

// =====================
// ✏️ FUNCTION: Enable Editing
// =====================
function enableEditing(para) {
  const currentText = para.textContent;
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
  }

  let para = document.createElement("p");
  para.innerText = newText;
  para.classList.add("task-text");

  para.addEventListener("dblclick", function () {
    enableEditing(para);
  });

  let parent = input.parentNode;
  parent.insertBefore(para, input);
  parent.removeChild(input);
  parent.removeChild(saveBtn);
}

// =====================
// 🗑️ DELETE TASK (Move to Bin)
// =====================
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-duotone")) {
    let confirmation = confirm("Do you want to Delete task?");
    if (confirmation) {
      let taskItem = event.target.parentElement;
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
// ⌨️ ENTER TO ADD TASK
// =====================
document.getElementById("floating-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.querySelector(".btn-success").click();
  }
});
