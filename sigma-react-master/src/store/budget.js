import { createSlice } from '@reduxjs/toolkit';

const budgetSlice = createSlice({
    name: 'budget',
    initialState: {
        rateLimit: null,
        rateLimitRemaining: null,
        budgets: [],
        budget: {},
        payees: [],
        accounts: [],
        categories: [],
        uncategorized: [],
        updatedTransactions: []
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
        },
        setratelimit(state, action) {

            state.rateLimit = 50;
            state.rateLimitRemaining = 12;
        },
        registerUpdated(state, action) {

            console.log('register updated');

            console.log(action.payload);

            const ids = action.payload.transaction_ids;

            const newuncat = state.uncategorized.filter(t => !ids.includes(t.id));

            state.uncategorized = newuncat;

            // Add the Updated Transactions to the Updated List
            state.updatedTransactions.push(...action.payload.transactions);

        }
    }
});

export const budgetActions = budgetSlice.actions;

export default budgetSlice.reducer;