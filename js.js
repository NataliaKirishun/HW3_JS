(function () {
    'use strict';
    let buttonAddTag = document.getElementById('buttonAdd');
    let inputAreaValue = document.getElementById('addItems');
    let parentTag = document.getElementById('parentOfTags');
    let set = new Set();
    buttonAddTag.addEventListener('click', addItem);
    parentTag.addEventListener('click', removeItem);

    function addItem() {
        let value = inputAreaValue.value;
        if (value !== '') {
            set.add(value);
            inputAreaValue.value = '';
            let arrayOfTags = Array.from(set);
            arrayOfTags.sort();
            parentTag.innerHTML = '';
            arrayOfTags.forEach(function (tag) {
                let btnGroup = document.createElement('span');
                btnGroup.id = 'btnGroupWrapper';
                let btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = tag;
                let cancel = document.createElement('button');
                cancel.className = 'cancelBtn';
                cancel.innerHTML = 'X';
                parentTag.appendChild(btnGroup);
                btnGroup.appendChild(btn);
                btnGroup.appendChild(cancel);
            });
        }
    };

    function removeItem(event) {
        console.log(event);
        let isRemoveTag = event.target.className === 'cancelBtn';
        if (isRemoveTag) {
            let item = event.target.closest('#btnGroupWrapper');
            if (item) {
                parentTag.removeChild(item);
                let neighborTag = event.target.previousElementSibling;
                set.delete(neighborTag.innerHTML);
            }
        }
    };

    let inputArea = document.getElementById('selectItems');
    inputArea.addEventListener('keyup', completeList);

    let list = document.getElementById('autoList');
    list.addEventListener('click', selectWord);

    let listOfTags = document.getElementById('parentTagsSelected');

    function completeList(event) {
        let val = inputArea.value.trim().toLowerCase();
        let newArrayTags = Array.from(set);
        if (val) {
            let listOfWords = newArrayTags.filter(function (item) {
                return item.toLowerCase().indexOf(val) === 0;
            });
            getComplete(listOfWords);
            list.style.display = 'block';
            if (event.keyCode === 13){
                listOfTags.innerHTML +=  inputArea.value + '<br>';
                inputArea.value='';
            }
        }
        else {
            list.style.display = 'none';
        }
    };

    function getComplete(words) {
        list.innerHTML = '';
        for (let i = 0; i < words.length; i++) {
            let newItem = document.createElement('div');
            newItem.innerHTML = words[i];
            list.appendChild(newItem);
        }
        return list.innerHTML;
    };

    function selectWord(event) {
        let targ = event.target;
        console.log(targ.innerHTML);
        if (targ.parentNode === list) {
            listOfTags.innerHTML += targ.innerHTML + '<br>';
            list.removeChild(targ);
            inputArea.value='';
            list.style.display = 'none';
        }
    }


}());