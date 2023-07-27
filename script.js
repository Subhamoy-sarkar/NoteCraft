const addBtn=document.querySelector('#btn');
const notebox=document.querySelector('.notebox');

const updateData=()=>{
    const textAreaData=document.querySelectorAll('textarea');
    // console.log(textAreaData);
    const notes=[];
    textAreaData.forEach((note)=>{
        notes.push(note.value);
    })
    // console.log(notes);

    localStorage.setItem('notes',JSON.stringify(notes));
    //the localStorage and sessionStorage  properties allow to save key/value pairs in a web browser. The localStorage object stores data with no exception date . the data will not be deleted when the browser is closed, and will be available the next day, week, or year.
}
const addNewNote=(text='')=>{
    const note=document.createElement('div');
    note.classList.add('note');
    const htmlData=`
    <div class="operation">
        <button class="delete"><i class="fas fa-trash-alt fa-2x"></i></button>
        <button class="edit"><i class="fas fa-edit fa-2x"></i></button>
    </div>
    <div class="main ${text ? "":"hidden"} "> </div>
    <div class="text_area ${text ? "hidden":""}">
        <textarea class="text"></textarea>
    </div>`;
    note.insertAdjacentHTML('afterbegin',htmlData);
    // console.log(note);

    //reference getting :
    const del_btn=note.querySelector('.delete');
    const edit_btn=note.querySelector('.edit');
    const text_area=note.querySelector('textarea');
    const text_area_div=note.querySelector('.text_area');
    const main_Div=note.querySelector('.main');

  
    //deleting the node : 
    del_btn.addEventListener('click',()=>{
        const val=note.querySelector('textarea');
        note.remove();                             //removing the current note from html/website


        //removing the current note from localStorage
        const element_to_remove=val.value;
        const storedArr=JSON.parse(localStorage.getItem('notes'));
        const updatedArr=storedArr.filter(item=>item!==element_to_remove);
        console.log(updatedArr);
        localStorage.setItem('notes',JSON.stringify(updatedArr));  //updating the local storage

    });

    //toggle using edit button : 
    text_area.value=text;
    main_Div.innerHTML=text;
    edit_btn.addEventListener('click',()=>{
        main_Div.classList.toggle('hidden');
        text_area_div.classList.toggle('hidden');
    })
    text_area.addEventListener('change',(event)=>{
        const value=event.target.value;
        main_Div.innerHTML=value;

        updateData();
    })
    notebox.appendChild(note); //it appends the node as the last child of a node
}

// Getting data back from localStorage:
const notes=JSON.parse(localStorage.getItem('notes'));
if(notes){notes.forEach((note)=>{
    addNewNote(note);
})}
addBtn.addEventListener('click',()=>addNewNote());
