// global variabel som hanterar sparfunktionen
var saveArr =[];

var kanban = document.getElementsByClassName('kanban');
kanban = Array.from(kanban);

// När sidan laddas eller laddas om
// så skall vi hämta vad som finns i LOCAL STORAGES
window.addEventListener("DOMContentLoaded", initContent);

function initContent(){

const kanbanContent = localStorage.getItem("kanban");
// gör om texten från LS till array/objekt
const kanbanContentArr = JSON.parse(kanbanContent);


//ta oss igenom hela arrayen
for(let i in kanbanContentArr)
{
    console.log(kanbanContentArr[i]);
    let template = document.getElementById('todoTemplate');
    let clonedTemplate = template.cloneNode(true);
    //ändra id
    clonedTemplate.id = kanbanContentArr[i].id;
    //ändra klass
    clonedTemplate.className = kanbanContentArr[i].className;
    //lägg till innehåll
    clonedTemplate.innerHTML = kanbanContentArr[i].content;

    //lägg till dragEvents
    clonedTemplate.addEventListener("dragstart",dragStart);
    clonedTemplate.addEventListener("dragend",dragEnd);



    kanban[ kanbanContentArr[1].kanbanIndex ].appendChild(clonedTemplate);



}

}




for(let i in kanban)
{
    console.log(kanban[i]);

    kanban[i].addEventListener("dragover", dragOver);
    kanban[i].addEventListener("drop", drop);

}


// Lägg till click på knapp

const newTaskButton = document.getElementById('saveNewTask');
newTaskButton.addEventListener("click",saveNewTask);

function saveNewTask(){

    // hämta ny task från textarea
    const newTaskText = document.getElementById('newTask').value;
    // hämta din template
    const myTemplate = document.getElementById('todoTemplate');
    // kopiera din template till ett nytt element
    let newTemplate =  myTemplate.cloneNode(true);
    newTemplate.children[0].innerHTML = newTaskText;
    newTemplate.className = "todoTemplate";
    let id = "_"+ Date.now();
    newTemplate.id = id;
    // hämta första kanban
    let kanban = document.getElementsByClassName('kanban')[0];
    // lägg till newTemplate till kanban nr 1 [0]
    kanban.appendChild(newTemplate);

    // lägg till dragevent på nyskapad task
    
    newTemplate.addEventListener("dragstart" , dragStart);
    newTemplate.addEventListener("dragend" , dragEnd);

    saveToLocal(newTemplate,0);

}

var draggedEl = "";

function dragStart(){
    draggedEl = this;
}
function dragEnd(){  
}

function dragOver(ev){
    ev.preventDefault();
}

function drop(){
    this.appendChild(draggedEl);
}


function saveToLocal(taskObj, kanbanIndex)
{
    // Objekt som är skapat och som skall sparas: taskObj
    // Index där objektet ligger är: kanbanIndex

    var tmpObj = {};
    tmpObj.id = taskObj.id;
    tmpObj.kanbanIndex = kanbanIndex;
    tmpObj.content = taskObj.innerHTML;
    tmpObj.className = taskObj.className;
    tmpObj.draggeble = true;


    saveArr.push(tmpObj);

    console.log(saveArr);

    localStorage.setItem("kanban", JSON.stringify(saveArr) );


}
