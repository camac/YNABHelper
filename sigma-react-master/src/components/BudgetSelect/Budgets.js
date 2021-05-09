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

        dispatch(budgetActions.setbudget(b));

        // Load Categories
        mynab.categories.getCategories(b.id)
            .then(res => {

                let arr = [];
                
                res.data.category_groups.forEach(v => {

                    const mapped = v.categories.map(e => {
                        return {...e, category_group_name: v.name};
                    })

                    arr = [...arr, ...mapped];
                });

                dispatch(budgetActions.setcategories(arr));

            }).catch(e => {
                console.log(e);
            });

        // Load Payees
        mynab.payees.getPayees(b.id)
            .then(res => {
                dispatch(budgetActions.setpayees(res.data.payees));
            }).catch(e => {
                console.log(e);
            });
        
        // Load Uncategorized Transactions
        mynab.transactions.getTransactionsByType(b.id,"uncategorized")
            .then(res => {
                dispatch(budgetActions.setuncategorized(res.data.transactions))
            }).catch(e => {
                console.log(e);
            });


    }


    let budgetsout = "";

    if (budgets) {
  budgetsout = budgets.map(b => {
        return <div key={b.id}>{b.name} <button onClick={() => budgetSelectedHandler(b)}>Select</button></div>
    })
}

    const bs = (budget.id) ? <p>Selected Budget is: {budget.name} </p> : <p>Please Select a Budget</p>;

    return (
        <div>
            <div className="p-grid">
                <div className="p-col-9">
                    <div className="card">
                        <button onClick={loadbudgets}>Load Budgets</button>
                        {budgetsout}
                    </div>
                </div>
                <div className="p-col-3">
                    <div className="card">
                        {bs}
                    </div>
                </div>
                <div className="p-col-12">
                    <div className="card">
                        <h3>YNAB Transaction Matching</h3>
                        <p>This is how it will work</p>
                        <ul>
                            <li>Select a Budget</li>
                            <li>Budget + Payees + Categories + Uncoded Transactions will load into redux store</li>
                            <ul>
                                <li>1 Request for Budgets</li>
                                <li>1 Request for Payees</li>
                                <li>1 Request for Categories</li>
                                <li>1 Request for Uncoded Transactions</li>
                            </ul>
                            <li>View List of Rules and Uncoded Transactions at the same time</li>
                            <li>Run Auto-matching</li>
                            <li>Remove transactions from matched if necessary</li>
                            <li>Create new Rules as necessary</li>
                            <li>When happy ... Save Changes to Budget</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default Budgets;