import { updateTodoItem } from '@/modules/Data';
import React, { useState } from 'react';
import { useAuth } from '@clerk/nextjs';

export function TodoDetails({todoItem}){
    const { getToken } = useAuth();
    const [isDone, setIsDone] = useState(todoItem.isDone);
    const [todoItemText, setTodoItemText] = useState(todoItem.todoItem);

    async function editText(){
        const authToken = await getToken({ template: "codehooks" });

        // update todoItemText for backend
        todoItem.todoItem = todoItemText;
        await updateTodoItem(authToken, todoItem);
    }

    async function toggleIsDone(){
        const authToken = await getToken({ template: "codehooks" });

        // update isDone for backend
        todoItem.isDone = !todoItem.isDone;
        await updateTodoItem(authToken, todoItem);
        
        // update isDone for frontend useState
        setIsDone(!isDone);
    }

    // The text input handling in the following blocks is referenced from https://stackoverflow.com/questions/55757761/handle-an-input-with-react-hooks
    if (isDone) {
        return(
            <>
                <div>
                    <input value={todoItemText} onChange={e => setTodoItemText(e.target.value)}></input>
                    <button onClick={editText}>Save</button>
                    <button onClick={toggleIsDone}>Mark as Not Done</button>
                </div>
            </>
        );
    } else {
        return(
            <>
                <div>
                    <input value={todoItemText} onChange={e => setTodoItemText(e.target.value)}></input>
                    <button onClick={editText}>Save</button>
                    <button onClick={toggleIsDone}>Mark as Done</button>
                </div>
            </>
        );
    }
}
