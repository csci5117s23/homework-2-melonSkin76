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
    if (todoItem.isdone) {
        return(
            <>
                <div>
                    <Link href={ itemRelUrl }>{ todoItem.todoItem }</Link>
                    <button onClick={ toggleIsDone }>Mark as Not Done</button>
                </div>
            </>
        );
    }
    else{
        return(
            <>
                <div>
                    <Link href={ itemRelUrl }>{ todoItem.todoItem }</Link>
                    <button onClick={ toggleIsDone }>Mark as Done</button>
                </div>
            </>
        );
    }
}
