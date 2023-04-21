import { getTodoItems, updateTodoItem } from '@/modules/Data';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAuth } from '@clerk/nextjs';

export function TodoItem({todoItem, refresh}){
    const { getToken } = useAuth();
    const [isDone, setIsDone] = useState(todoItem.isDone);

    async function toggleIsDone(){
        const authToken = await getToken({ template: "codehooks" });

        // update isDone for backend
        todoItem.isDone = !todoItem.isDone;
        await updateTodoItem(authToken, todoItem);
        
        // update isDone for frontend useState
        setIsDone(!isDone);

        // fetch the updated list of items from backend and refresh the frontend
        const updatedItems = await getTodoItems(authToken);
        refresh(updatedItems);
    }

    const itemRelUrl = '/todo/' + todoItem._id;
    if (isDone) {
        return(
            <>
                <div>
                    <Link className='contentPreview' href={ itemRelUrl }>{ todoItem.todoItem }</Link>
                    <div className='doneButton'>
                        <button className='buttonMark buttonMarkN' onClick={ toggleIsDone }>Mark as Not Done</button>
                    </div>
                </div>
            </>
        );
    }
    else{
        return(
            <>
                <div>
                    <Link className='contentPreview' href={ itemRelUrl }>{ todoItem.todoItem }</Link>
                    <div className='doneButton'>
                        <button className='buttonMark buttonMarkY' onClick={ toggleIsDone }>Mark as Done</button>
                    </div>
                </div>
            </>
        );
    }
}
