import { createSlice } from '@reduxjs/toolkit';

const budgetSlice = createSlice({
    name: 'budget',
    initialState: {
        budgets: [],
        budget: {}
    },
    reducers: {
        setbudget(state, action) {
            //allowed to mutate state
            console.log('set budget in the store');
            state.budget = action.payload;
        },
        setbudgets(state, action) {
            console.log('set budgets in the storee');
            console.log(action.payload);
            state.budgets = action.payload;
        }
    }
});

export const budgetActions = budgetSlice.actions;

export default budgetSlice.reducer;