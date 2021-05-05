import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: { counter: 10 },
    reducers: {
        increment(state) {
            console.log('we increment');
            console.log(state.counter);
            state.counter++;
        },
        decrement(state) {
            console.log('we decrement');
            console.log(state.counter);
            state.counter--;
        }

    }

});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;