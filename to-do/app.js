let btn = document.querySelector(".btn");
let input = document.querySelector(".form-control");
let ul = document.querySelector("ul");

btn.addEventListener("click",()=>{
    if(input.value != ""){
        let li = document.createElement("li");
        let para = document.createElement("p");
        let cancelBtn = document.createElement("button");


        para.innerText = input.value;
        li.appendChild(para);
        ul.prepend(li);
        cancelBtn.classList.add("btn");
        cancelBtn.classList.add("btn-danger");
        cancelBtn.innerText="Mark as Done";
        para.appendChild(cancelBtn);
    }else{
        alert("Please enter any task to add.")
    }
    
})