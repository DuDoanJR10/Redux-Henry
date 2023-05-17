import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { 
    todosSelector, 
    markCompleted, 
    deleteTodo,
    getTodos
} from '../store/reducers/todoSlice';
import TodoForm from './TodoForm';

const Todo = () => {
    const todos = useSelector(todosSelector);
    const dispatch = useDispatch();

    const toggleTodoCompleted = (todoId) => {
        dispatch(markCompleted(todoId));
    }

    const deleteSingleTodo = (todoId) => {
        dispatch(deleteTodo(todoId));
    }
    useEffect(() => {
        dispatch(getTodos());
    }, 
    [dispatch])

    return (
        <div className='todo-list'>
            <TodoForm />
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={todo.completed ? 'completed': ''}>
                        {todo.title}
                        <input type="checkbox" value={todo.id} checked={todo.completed} onChange={toggleTodoCompleted.bind(this, todo.id)}/>
                        <button onClick={deleteSingleTodo.bind(this, todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Todo;
