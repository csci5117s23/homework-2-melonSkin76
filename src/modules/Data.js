/*
* Modified based on Tech-Stack-2-Kluver-Demo
*/
const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function getTodoItems(authToken) {
    const result = await fetch(backend_base+"/todo",{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function getTodoItem(authToken, todoItem) {
    const result = await fetch(backend_base+"/todo"+todoItem._id,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    if (result.ok) {
        return await result.json();
    } else {
        return null;
    }
}

export async function addTodoItem(authToken, todoItemText) {
    const result = await fetch(backend_base+"/todo",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({todoItem: todoItemText, isDone: false})
    })
    return await result.json();
}

export async function updateTodoItem(authToken, todoItem) {
    const result = await fetch(backend_base+"/todo/"+todoItem._id, {
        'method':'PUT',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify(todoItem)
    });
    return await result.json();
}