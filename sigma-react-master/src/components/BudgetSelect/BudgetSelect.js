import React, { Component } from 'react';
import mynab from '../../mynab';

import Budgets from './Budgets';

import { budgetActions } from '../../store/index';

class BudgetSelect extends Component {

    state = {
        budgets: [],
        currentBudget: null
      }

      componentDidMount() {

        mynab.budgets.getBudgets()
          .then(res => {
            this.setState({ budgets: res.data.budgets });

            budgetActions.setbudgets(res.data.budgets);

            console.log('Budgets Updated');
          }).catch(e => {
            console.log(e);
          })
    
    
      }
      budgetSelected = (selectedBudget) => {

        this.setState({ currentBudget: selectedBudget });
    
        budgetActions.setbudget(selectedBudget);

        console.log("budget Selected")
        console.log(selectedBudget);
    
      }
    

    render() {
    if (!this.state.budgets) {
        return <div>No Budgets
        </div>;
    }

    console.log(this.state.budgets);

    const budgets = this.state.budgets.map(b => {
        return <div key={b.id}>{b.name} <button onClick={() => this.budgetSelected(b)}>Select</button></div>
    })

    return (<div>Budget Select <Budgets></Budgets>  {budgets}</div>);
}

};


export default BudgetSelect;
