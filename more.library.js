let btn_more = document.querySelector('.btn-more'),
    btn_hide = document.querySelector('.btn-hide'),
    items, 
    last_index, 
    last_item,
    container = document.querySelector('.container'),
    height_container = container.offsetHeight,
    items_height = container.offsetHeight; 

container.style.maxHeight = height_container + 'px';
initMas();
     
btn_more.addEventListener('click', function(){
    toggleBtn(btn_hide);
    container.style.maxHeight = calcuateMaxHeight(container, items_height);
    addNewPersons(items);
    if(!last_item.classList.contains('non-active')) toggleBtn(btn_more);
});

btn_hide.addEventListener('click', function(){
    hidePersons(items);
    container.style.maxHeight = height_container + 'px';
    toggleBtn(btn_hide);
    toggleBtn(btn_more);
});    

function addNewPersons(mas) {
    let count = 1;
    mas.forEach((item) => {
        if(count % 5 != 0 && item.classList.contains('non-active')) {
            item.classList.remove('non-active');
            count++;
        }
    })
}

function hidePersons(mas) {
    for(let i = 4; i < mas.length; i++) {
        mas[i].classList.add('non-active');
    }
}

function initMas() {
    items = document.querySelectorAll('.item');
    items = Array.from(items);
    last_index = items.length - 1;
    last_item = items[last_index];
}

function calcuateMaxHeight(container, items_height) {
    let calculated_height = container.offsetHeight + items_height;
    return calculated_height + 'px';
}

function findStr(str, symb) {
    if(typeof str === undefined || typeof str === null) {throw "String not found"}
    else if(typeof symb === undefined || typeof symb === null) {throw "Substring not found"};
    for(var count = -1, index = 0; index != -1; count++, index = str.indexOf(symb, index + 1));
    return count;
}

function toggleBtn(btn, display = 'block') {
    if(typeof btn === undefined || typeof btn === null) throw "Btn not found";
    btn.style.display != 'none' ? btn.style.display = 'none' : btn.style.display = display;
}