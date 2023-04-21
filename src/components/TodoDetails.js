import { updateTodoItem } from '@/modules/Data';
import React, { useState } from 'react';
import { useAuth } from '@clerk/nextjs';

export function TodoDetails({todoItem, refresh}){
    const { getToken } = useAuth();
    const [isDone, setIsDone] = useState(todoItem.isDone);
    const [todoItemText, setTodoItemText] = useState(todoItem.todoItem);

    async function editText(){
        console.log("Editing text...")

        const authToken = await getToken({ template: "codehooks" });

        // update todoItemText for backend
        todoItem.todoItem = todoItemText;
        await updateTodoItem(authToken, todoItem);

        refresh(todoItemText)
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
                    <h2 id="detailsContent" className="idTitle">To-do Item: { todoItem.todoItem }</h2>
                    <textarea className='saveInput' cols="100" rows="10" value={todoItemText} onChange={e => setTodoItemText(e.target.value)}></textarea>
                    <div className='detailsGroup'>
                        <button className='saveButton' onClick={editText}>Save</button>
                        <button className='buttonMark buttonMarkN' onClick={toggleIsDone}>Mark as Not Done</button>
                    </div>
                </div>
            </>
        );
    } else {
        return(
            <>
                <div>
                    <h2 id="detailsContent" className="idTitle">To-do Item: { todoItem.todoItem }</h2>
                    <textarea className='saveInput' cols="100" rows="10" value={todoItemText} onChange={e => setTodoItemText(e.target.value)}></textarea>
                    <div className='detailsGroup'>
                        <button className='saveButton' onClick={editText}>Save</button>
                        <button className='buttonMark buttonMarkY' onClick={toggleIsDone}>Mark as Done</button>
                    </div>
                </div>
            </>
        );
    }
}
