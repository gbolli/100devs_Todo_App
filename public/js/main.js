const deleteBtn = document.querySelectorAll('.fa-trash');
const items = document.querySelectorAll('.item span.incomplete');
const itemsCompleted = document.querySelectorAll('.item span.completed');

Array.from(deleteBtn).forEach((e) => {
    e.addEventListener('click', deleteItem);
})

Array.from(items).forEach((e) => {
    e.addEventListener('click', markComplete);
})

Array.from(itemsCompleted).forEach((e) => {
    e.addEventListener('click', markIncomplete);
})

async function deleteItem() {
    const itemText = this.parentNode.childNodes[1].innerText;  // 2 spans in li - need to go up to li, then down to first span(1)

    try {
        const response = await fetch('todos/deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
        })
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (err) {
        console.log(err);
    }
}

async function markComplete() {
    const itemText = this.parentNode.childNodes[1].innerText;

    try {
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
        })
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (err) {
        console.error(err);
    }
}

async function markIncomplete() {
    const itemText = this.parentNode.childNodes[1].innerText;

    try {
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
        })
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (err) {
        console.error(err);
    }
}