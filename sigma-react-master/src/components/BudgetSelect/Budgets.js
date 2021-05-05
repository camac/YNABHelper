import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import mynab from '../../mynab';

import { budgetActions } from '../../store/budget';

const Budgets = () => {

    const dispatch = useDispatch();

    const budgets = useSelector((state) => state.budget.budgets);
    const budget = useSelector((state) => state.budget.budget);

    const loadbudgets = () => {

        mynab.budgets.getBudgets()
        .then(res => {
          dispatch(budgetActions.setbudgets(res.data.budgets));
          console.log('Budgets Updated');
        }).catch(e => {
          console.log(e);
        })

    }
    const budgetSelectedHandler = (b) => {
        console.log(b);
        dispatch(budgetActions.setbudget(b));
    }

    console.log(budgets);

    let budgetsout = "";

    if (budgets) {
  budgetsout = budgets.map(b => {
        return <div key={b.id}>{b.name} <button onClick={() => budgetSelectedHandler(b)}>Select</button></div>
    })
}

    if (budget.id) {
        return <p>You selected {budget.name}</p>
    }

    return (
        <div><button onClick={loadbudgets}>Load Budgets</button>
        <p>This will work{budgetsout}</p></div>
    );

}

export default Budgets;