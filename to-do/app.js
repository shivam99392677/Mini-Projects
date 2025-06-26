let btn = document.querySelector(".btn-success");
let input = document.querySelector(".form-control");
let ul = document.querySelector(".list-group");

btn.addEventListener("click", () => {
  if (input.value != "") {
    let cancelBtn = document.createElement("button");

    addTask(input.value);
  } else {
    alert("Please enter any task to add.");
  }
});

// Adds a new task with checkbox to the given list
function addTask(task) {
  let li = document.createElement("li");
  let para = document.createElement("p");
  let check = document.createElement("input");
  let i = document.createElement("i");

  check.type = "checkbox";
  check.classList.add("form-check-input");

  i.classList.add("fa-duotone", "fa-solid", "fa-trash");

  para.innerText = task;
  para.addEventListener("dblclick",function(){
    enableEditing(para);
  });

  li.appendChild(check);
  li.appendChild(para);
  li.appendChild(i);
   ul.prepend(li);
  input.value = "";
 
  // Adds task at the top of the list
}

// enable inline editing on double click

function enableEditing(para){
  const currentText = para.textContent;

  //create input and save button
  let input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.classList.add("edit-input","form-control");

  let saveBtn = document.createElement("button");
  saveBtn.innerHTML = "💾";
  saveBtn.classList.add("saveBtn");
  
  //accessing the parent list element to edit it

  const parent = para.parentNode;
  parent.insertBefore(input, para);
  parent.insertBefore(saveBtn, para);
  parent.removeChild(para);
  input.focus();

  //save on enter button
  input.addEventListener("keydown",function(e){
    if(e.key === "Enter"){
      saveEditedTask(input,saveBtn);
    }
  });

  // save on icon click
  saveBtn.addEventListener("click",()=>{
    saveEditedTask(input,saveBtn);
  });
}

function saveEditedTask(input,saveBtn){
  const newText = input.value.trim();

  if(newText == ""){
    alert("Task cannot be empty!");
    return;
  }

  let para = document.createElement("p");
  para.innerText = newText;
  para.classList.add("task-text");

  //re-add double click event
  para.addEventListener("dblclick",function(){
    enableEditing(para);
  })

  let parent = input.parentNode;
  parent.insertBefore(para,input);
  parent.removeChild(input);
  parent.removeChild(saveBtn);

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
      input.value="";
    }
  });
