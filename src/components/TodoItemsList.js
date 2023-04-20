import { TodoItem } from "./TodoItem";

export function TodoItemsList({todoItems, refresh}){
    return(
        <>
            <ul>
                {
                    todoItems.map(todoItem => (
                        <li key={todoItem.todoItem}>
                            <TodoItem todoItem={ todoItem } refresh={ refresh }></TodoItem>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}