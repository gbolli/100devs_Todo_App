const deleteBtn = document.querySelectorAll('.fa-trash');

Array.from(deleteBtn).forEach((e) => {
    e.addEventListener('click', deleteItem);
})

async function deleteItem() {
    const itemText = this.parentNode.childNodes[1].innerText;  // 2 spans in li - need to go up to li, then down to first span(1)
    console.log(`itemText: ${itemText}`)

    try {
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                itemFromJS: itemText
            })
        })
        const data = await response.json();
        console.log(data);
        location.reload();
    }

    catch (err) {
        console.log(err);
    }
}