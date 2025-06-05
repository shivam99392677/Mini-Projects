let btn = document.querySelector(".btn-success");
let input = document.querySelector(".form-control");
let ul = document.querySelector(".list-group");

btn.addEventListener("click",()=>{
    if(input.value != ""){
       
        let cancelBtn = document.createElement("button");

        addTask(input.value,ul);
        input.value = "";
        
        let para = document.querySelector("p");

        cancelBtn.classList.add("btn");
        cancelBtn.classList.add("btn-danger");
        cancelBtn.innerText="Mark as Done";

        para.appendChild(cancelBtn);
        
    }else{
        alert("Please enter any task to add.")
    }
    
})
//function to add task to given paths
function addTask(task,path){
     let li = document.createElement("li");
        let para = document.createElement("p");

        para.innerText = task;
        li.appendChild(para);
        path.prepend(li);
       
}

document.addEventListener("click",(event)=>{
    if(event.target.classList.contains("btn-danger")){
        let taskItem = event.target.parentElement;//select the <p> element
        let bin = document.querySelector(".bin");// reference to the deleted ul

        event.target.remove();//remove delete btn
        taskItem.parentElement.remove();

        let li = document.createElement("li");

        li.appendChild(taskItem);

        bin.prepend(li);// now move the <p>

    }
})