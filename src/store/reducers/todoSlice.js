import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

// Reducer Thunk
export const getTodos = createAsyncThunk('todos/todosFetched', async() => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    return res.data;
})

export const addTodo = createAsyncThunk('todos/todoAdded', async(title) => {
    const newTodo = {
        id: nanoid(),
        title,
        completed: false,
    }
    await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo)
    console.log('newTodo: ', newTodo)
    return newTodo;
})

export const deleteTodo = createAsyncThunk('todos/todoDeleted', async(todoId) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
    console.log('todoId: ', todoId)
    return todoId;
})

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        allTodos: []
    }, reducers: {
        // addTodo: {
        //     reducer(state, action) {
        //         state.allTodos.unshift(action.payload)
        //     }, 
        //     prepare(title) {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 title,
        //                 completed: false,
        //             }
        //         }
        //     }
        // },
        markCompleted(state, action) {
            const todoId = action.payload
            state.allTodos = state.allTodos.map(todo => {
                if (todo.id === todoId) todo.completed = !todo.completed 
                return todo;
            })
        },
        // deleteTodo(state, action) {
        //     const todoId = action.payload;
        //     state.allTodos = state.allTodos.filter(todo => todo.id !== todoId)
        // },
        // todosFetched(state, action) {
        //     state.allTodos = action.payload;
        // }
    },
    extraReducers: {
        // Get all todos
        [getTodos.pending]: (state, action) => { console.log('Fetching todos ...') },
        [getTodos.fulfilled]: (state, action) => {
            console.log('Done');
            state.allTodos = action.payload;
        },
        [getTodos.rejected]: (state, action) => { console.log('Failed to get todos!') },
        // Add todo
        [addTodo.fulfilled]: (state, action) => {
            state.allTodos.unshift(action.payload)
        },
        // Delete todo
        [deleteTodo.fulfilled]: (state, action) => {
            const todoId = action.payload;
            state.allTodos = state.allTodos.filter(todo => todo.id !== todoId);
        }
    }
})

// Async action creator, action and reducer dispatch
// export const getTodos = () => async dispatch => { // Action creator
//     // Action
//     try {
//         const res = await axios.get(
//             'https://jsonplaceholder.typicode.com/todos?_limit=5'
//         )
//         dispatch(todosFetched(res.data))    // reducer dispatch
//     } catch (error) {
//         console.log(error);
//     }
// }

const todosReducer = todosSlice.reducer;

export const todosSelector = state => state.todosReducer.allTodos;

export const { 
    // addTodo,
    // deleteTodo, 
    markCompleted, 
    todosFetched 
} = todosSlice.actions;

export default todosReducer;
