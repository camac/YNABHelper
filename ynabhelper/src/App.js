import React, { Component } from 'react';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import BulkAssignPayees from './containers/BulkAssignPayees/BulkAssignPayees';
import BudgetSelect from './containers/BudgetSelect/BudgetSelect';
import Layout from './hoc/Layout/Layout';
import mynab from './mynab';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class App extends Component {

  state = {
    budgets: [],
    currentBudget: null
  }

  budgetSelected = (selectedBudget) => {

    this.setState({ currentBudget: selectedBudget });

    console.log("budget Selected")
    console.log(selectedBudget);

  }

  componentDidMount() {

    mynab.budgets.getBudgets()
      .then(res => {
        this.setState({ budgets: res.data.budgets });
        console.log('Budgets Updated');
      }).catch(e => {
        console.log(e);
      })


  }

  render() {

    let content = <BudgetSelect budgets={this.state.budgets} selected={this.budgetSelected} />

    if (this.state.currentBudget) {
      content = <BulkAssignPayees budget={this.state.currentBudget} />
    }

    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <nav>
              <ul>
                <li><NavLink to="/" exact>Home</NavLink></li>
                <li><NavLink to="/rules">Rules</NavLink></li>
                <li><NavLink to="/payees">Payees</NavLink></li>
                <li><NavLink to="/transactions">Transactions</NavLink></li>
              </ul>
            </nav>
          </header>

          <Layout>
            <Route path="/" exact component={BudgetSelect}></Route>
            {content}
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
