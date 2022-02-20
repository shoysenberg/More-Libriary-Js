'use strict';
HTMLDivElement.prototype.MoreBtn = function(options) {
    let params = {
        count_elems_row: options.count_elems_row ? options.count_elems_row : 2,
        count_elems_add: options.count_elems_add ? options.count_elems_add : 4,
        btn_more_text: options.btn_more_text ? options.btn_more_text : 'Показать ещё',
        btn_hide_text: options.btn_hide_text ? options.btn_hide_text : 'Скрыть', 
        class: {
            btn_more: options.class?.btn_more ? options.class.btn_more : 'btn_more',
            btn_hide: options.class?.btn_hide ? options.class.btn_hide : 'btn_hide',
            btn_wrap: options.class?.btn_wrap ? options.class.btn_wrap : 'more-btns-wrap',
            item: options.class?.item ? options.class.item : 'more-btn-item',
            item_active: options.class?.item_active ? options.class.item_active : 'active',
            item_non_active: options.class?.item_non_active ? options.class.item_non_active : 'non-active'
        }
    };
    const container =  this;
    const parent = container.parentElement;
    let firsChild = container.firstElementChild,
        curOffsetFirstItem = firsChild.offsetTop,
        lastChild = container.lastElementChild,
        children = Array.from(container.children),
        elems_in_row = 0,
        btn_more,
        btn_hide,
        btns_wrap,
        offsetBtns;

    container.classList.add('more-btn');
    container.setAttribute('style', 'max-height: ' + getMaxHeight(firsChild) + 'px');
    createBtns();
    btns_wrap = createWrap();
    parent.appendChild(btns_wrap);
    offsetBtns = btns_wrap.offsetTop;

    children.forEach(el => {
        if(curOffsetFirstItem == el.offsetTop) {
            elems_in_row++;
            curOffsetFirstItem = el.offsetTop;
        };
        el.offsetTop > offsetBtns ? el.setAttribute('class',el.classList + ' more-btn-item non-active') : el.setAttribute('class', el.classList + ' more-btn-item');
    });

    let count_row_to_add = params.count_elems_add / elems_in_row;

    btn_more.addEventListener('click', function(){
        container.setAttribute('style', 'max-height: ' + calculateMaxHeight(count_row_to_add) + 'px');
        let iterator = 1;
        children.forEach(item => {
            if(iterator % (params.count_elems_add + 1) != 0 && item.classList.contains('non-active')) {
                item.classList.remove('non-active');
                iterator++;
            };
        });
        btn_hide.style.display == 'none' ? toggleBtn(btn_hide) : '';
        if(!lastChild.classList.contains('non-active')) toggleBtn(btn_more);
    });

    btn_hide.addEventListener('click', function() {
        for(let i = elems_in_row * params.count_elems_row; i < children.length; i++) {
            children[i].classList.add('non-active');
        };
        container.setAttribute('style', 'max-height: ' + getMaxHeight(firsChild) + 'px');
        btn_more.style.display == 'none' ? btn_more.style.display = 'block' : '';
    });

    function createWrap() {
        let wrap = document.createElement('div');
        wrap.classList.add(params.class.btn_wrap);
        wrap.appendChild(btn_more);
        wrap.appendChild(btn_hide);

        return wrap;
    };
    
    function createBtns() {
        btn_more = createBtn('more');
        btn_more.initializeBtn(params.class.btn_more);
        btn_hide = createBtn('hide');
        btn_hide.initializeBtn(params.class.btn_hide);
        btn_hide.style.display = 'none';

        function createBtn(name) {
            let btn = document.createElement('button');
            name == 'more' ? btn.innerHTML = params.btn_more_text : btn.innerHTML = params.btn_hide_text;

            return btn;
        }
    };

    function getMaxHeight(firsChild) {
        let containerMaxHeight = 0
        for(let i = 0; i < params.count_elems_row; i++) {
            containerMaxHeight += firsChild.offsetHeight;
        }

        return containerMaxHeight;
    };

    function calculateMaxHeight(count_row_to_add) {
        if(count_row_to_add != Math.floor(count_row_to_add)) {
            let multiplier = Math.floor(count_row_to_add) + 1;
            let newHeight = firsChild.offsetHeight * multiplier;
            return getContainerHeight() + newHeight;
        } else {
            let multiplier = count_row_to_add;
            let newHeight = firsChild.offsetHeight * multiplier;
            return getContainerHeight() + newHeight;
        }
    };

    function toggleBtn(btn) {
        btn.style.display == 'none' ? btn.style.display = 'block' : btn.style.display = 'none';
    };

    function getContainerHeight() {
        return container.offsetHeight;
    };
}

HTMLButtonElement.prototype.initializeBtn = function(name) {
    this.setAttribute('class', 'more-lib-btn ' + name);
}