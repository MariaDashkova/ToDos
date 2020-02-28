let forma = document.getElementById("forma");

function show() {
  forma.style.display = "block";
}

function hide() {
  forma.style.display = "none";
}


let todoItems = []; 

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    inProgress: false,
    id: Date.now(),
  };

  todoItems.push(todo);

  const list = document.querySelector('.js-todo-list');
  list.insertAdjacentHTML('beforeend', `
    <li class="todo-item" data-key="${todo.id}">
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>

      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="progress js-prog "></label>


      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">
        <svg><use href="#delete-icon"></use></svg>
      </button>
    </li>
  `);
}

function toggleDone(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;

  const item = document.querySelector(`[data-key='${key}']`);
  if (todoItems[index].checked) {
    item.classList.add('checked');
  } else {
    item.classList.remove('checked');
  }
}

function toggleDoneProg(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  todoItems[index].inProgress = !todoItems[index].checked;
  const item = document.querySelector(`[data-key='${key}']`);
  if (todoItems[index].inProgress) {
    item.classList.add('inProgress');
  } else {
    item.classList.remove('inProgress');
  }
}


function deleteTodo(key) {
  todoItems = todoItems.filter(item => item.id !== Number(key));
   const item = document.querySelector(`[data-key='${key}']`);
   item.remove();
  
  const list = document.querySelector('.js-todo-list');
  if (todoItems.length === 0) list.innerHTML = '';
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.js-todo-input');

  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
  
  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }

  if (event.target.classList.contains('js-prog')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDoneProg(itemKey);
  }

});



function doFilter(el){
    let value = el.options[el.selectedIndex].value;
    let filtered ={};
    if (value != "all"){
       filtered = todoItems.filter(item => item[value] == true);
 
  }else{
    filtered = todoItems;
  }

    const list = document.querySelector('.js-todo-list');
    list.innerHTML = '';
    for( item in filtered){
  
      list.insertAdjacentHTML('beforeend', `
    <li class="todo-item" data-key="${filtered[item].id}">
      <input id="${filtered[item].id}" type="checkbox"/>
      <label for="${filtered[item].id}" class="tick js-tick"></label>
      <input id="${filtered[item].id}" type="checkbox"/>
      <label for="${filtered[item].id}" class="progress js-prog "></label>
      <span>${filtered[item].text}</span>
      <button class="delete-todo js-delete-todo">
        <svg><use href="#delete-icon"></use></svg>
      </button>
    </li>
  `);
      const flex = document.querySelector(`[data-key='${filtered[item].id}']`);
      if( filtered[item].checked == true) {flex.classList.add('checked')};
      if( filtered[item].inProgress == true) {flex.classList.add('inProgress')};
    }

}