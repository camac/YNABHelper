import React, { Component } from 'react';
import PayeeTable from '../../components/PayeeTable/PayeeTable';
import TransactionTable from '../../components/TransactionTable/TransactionTable';
import AccountTable from '../../components/AccountTable/AccountTable';
import RulesTable from '../../components/RulesTable/RulesTable';
import mynab from '../../mynab';
import classes from './BulkAssignPayees.module.css';

class BulkAssignPayees extends Component {

    state = {
        payees: [],
        transactions: [],
        rules: [
            {
                id: 'ruleid',
                payeeId: 'test',
                payee: {
                    name: 'test payee'
                },
                accountId: 'account',
                account: {
                    name: 'Test account',
                },
                pattern: 'betty',
                matched: []
            }
        ]
    }

    matchTransactions = () => {

        const myrules = [...this.state.rules];
        const mytrans = [...this.state.transactions];

        myrules.forEach(r => {
            console.log(r.payee.name);
            r.matchedTransactions = mytrans.filter(it => new RegExp(r.pattern, "i").test(it.memo));
            console.log(r.matchedTransactions.length);
        })

        this.setState({rules: myrules});

    }

    debugPayee = (payee) => {

    }

    componentDidMount() {

        console.log('BulkAssignPayees Mounted');
        console.log(this.props);

        if (this.props.budget) {

            mynab.payees.getPayees(this.props.budget.id)
                .then(res => {
                    const respayees = res.data.payees;
                    this.setState({ payees: respayees })
                })
                .catch(e => {
                    console.log(e);
                });

            mynab.transactions.getTransactions(this.props.budget.id, "2021-01-01", "uncategorized")
                .then(res => {
                    const restrans = res.data.transactions;

                    restrans.sort((a, b) => a.memo > b.memo);

                    this.setState({ transactions: restrans });
                })
                .catch(e => {
                    console.log(e);
                });

            mynab.accounts.getAccounts(this.props.budget.id)
                .then(res => {

                    this.setState({ accounts: res.data.accounts });

                })
                .catch(e => {
                    console.log(e);
                });

        }

    }

    render() {

        return (
            <div>
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/">Rules</a></li>
                            <li><a href="/">Payees</a></li>
                            <li><a href="/">Transactions</a></li>
                        </ul>
                    </nav>
                </header>
                <div className={classes.Container}>
                    <button onClick={this.matchTransactions}>Match Transactions</button>
                </div>
                <div className={classes.Container}>
                    <div>
                        <RulesTable rules={this.state.rules}></RulesTable>
                    </div>
                </div>
                <div className={classes.Container}>
                    <div className={classes.PayeesDiv}>
                        <PayeeTable payees={this.state.payees}></PayeeTable>
                    </div>
                    <div className={classes.AccountsDiv}>
                        <AccountTable accounts={this.state.accounts}></AccountTable>
                    </div>
                    <div className={classes.TransactionsDiv}>
                        <TransactionTable data={this.state.transactions}></TransactionTable>
                    </div>
                </div>
            </div>);
    }


};

export default BulkAssignPayees;