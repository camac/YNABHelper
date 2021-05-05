import  { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter';
import budgetReducer from './budget';

const store = configureStore({
    reducer: { budget: budgetReducer, counter: counterReducer}
});

export default store;