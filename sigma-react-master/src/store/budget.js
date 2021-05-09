import { createSlice } from '@reduxjs/toolkit';

const budgetSlice = createSlice({
    name: 'budget',
    initialState: {
        budgets: [],
        budget: {},
        payees: [],
        accounts: [],
        categories: [],
        uncategorized: []
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
        },
        setpayees(state, action) {
            state.payees = action.payload;
        },
        setaccounts(state, action) {
            state.accounts = action.payload;
        },
        setcategories(state, action) {
            state.categories = action.payload;
        },
        setuncategorized(state, action) {
            state.uncategorized = action.payload;
        }
    }
});

export const budgetActions = budgetSlice.actions;

export default budgetSlice.reducer;