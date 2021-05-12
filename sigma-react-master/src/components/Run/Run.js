import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import mynab from '../../mynab';
import firebase from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { budgetActions } from '../../store/budget';

const Run = (props) => {

    const dispatch = useDispatch();

    const budget = useSelector((state) => state.budget.budget);
    const transactions = useSelector((state) => state.budget.uncategorized);
    const updatedTransactions = useSelector((state) => state.budget.updatedTransactions);

    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [selectedRule, setSelectedRule] = useState(null);

    const [displayTransactionType, setDisplayTransactionType] = useState("matched");

    const [rules, setRules] = useState(null);
    const [summary, setSummary] = useState({
        unmatched: [],
        matched: [],
        rules: []
    })

    // method, dependencies
    useEffect(() => { 

        if (budget.id) {
            loadRules();
            runRules();
        } else {
            console.log('budget is not selected');
        }

    }, [budget.id]);

    useEffect(() => {
        runRules();
    }, [rules]);

    const amountTemplate = (rowData) => {
        if (rowData.amount) {
            return (rowData.amount / 1000).toFixed(2);
        }
        return null;
    }

    const matchedBody = (rowData) => {
        if (rowData.matched) {
            console.log('we here');
            return rowData.matched.length;
        }
        return null;
    }


    const loadRules = () => {

        if (budget.id) {

            console.log('Load Rules');

            firebase.get('/rules.json')
                .then(response => {

                    if (response.data) {

                    const mapped = Object.keys(response.data).map(key => {
                        return {...response.data[key], id: key};
                    });

                    console.log(mapped);
                    setRules(mapped);

                }

                }).catch(error => {
                    console.log(error);
                })

        } else {
            console.log('budget is not selected');
        }


    }

    const saveSelectedRuleTransactionsHandler = () => {

        if (selectedRule) {

            const r = selectedRule;
            const transactionsToUpdate = [];           

            if (r.matched) {

                r.matched.forEach(t => {

                    let newt = {...t};
                    newt.payee_id = r.payeeId;
                    newt.category_id = r.categoryId;
                    transactionsToUpdate.push(newt);

                });

                console.log('About to Update ' + transactionsToUpdate.length + ' Transactions');

                mynab.transactions.updateTransactions(budget.id,{
                    transactions: transactionsToUpdate
                }).then(res => {
                    console.log('worked!');
                    console.log(res);
                    console.log(res.header);
                    console.log('about to register updated');
                    dispatch(budgetActions.registerUpdated(res.data));

                }).catch(e => {
                    console.log('Did not work');
                    console.log(e);
                });


            }

        } else {
            console.log('no rule selected');
        }

        
    }

    const runRules = () => { 

        console.log('running the rules');

        let unmatchedtransactions = [];
        let matchedtransactions = [];
        let updatedTransactions = [];

        if (rules && transactions) {

            transactions.forEach(t => {

                let matched = false;

                rules.forEach(r => {

                    if (!matched) {

                    if (!r.account_id || r.account_id === t.account_id) {

                        let re = new RegExp(r.pattern);

                        if (t.memo) {
                            if (t.memo.match(re)) {
    
                                matched = true;
    
                                if (r.matched) {
                                    r.matched = [...r.matched, t];
                                } else {
                                    r.matched = [t];
                                }
    
                            }
                        }    

                    }

                }

                });

                if (!matched) {
                    unmatchedtransactions.push(t);
                } else {
                    matchedtransactions.push(t);
                }

            });

            const matchedrules = rules.filter(r => r.matched && r.matched.length > 0);

            setSummary({
                unmatched: unmatchedtransactions,
                matched: matchedtransactions,
                rules: matchedrules
            })

        } else {
            console.log('there are no rules');
        }

    }

    const displayUnmatchedHandler = () => {
        setDisplayTransactionType('unmatched');
    }

    const displayMatchedHandler = () => {
        setDisplayTransactionType('matched');
    }

    const displayUpdatedHandler = () => {
        setDisplayTransactionType('updated');
    }

    const selectRuleHandler = (rule) => {

        setSelectedRule(rule);

    }

    let output = <p><ProgressSpinner></ProgressSpinner></p>;

    if (rules) {
        output = <div className="p-grid p-fluid dashboard">
            <div className="p-col-12 p-lg-4">
                <div className="card summary" onClick={displayMatchedHandler}>
                    <span className="title">Matched</span>
                    <span className="detail">Transactions Matched to Rules</span>
                    <span className="count revenue">{summary.matched.length}</span>
                </div>
            </div>
            <div className="p-col-12 p-lg-4">
                <div className="card summary" onClick={displayUnmatchedHandler}>
                    <span className="title">Unmatched</span>
                    <span className="detail">Did not match any rules</span>
                    <span className="count purchases">{summary.unmatched.length}</span>
                </div>
            </div>
            <div className="p-col-12 p-lg-4">
                <div className="card summary" onClick={displayUpdatedHandler}>
                    <span className="title">Updated</span>
                    <span className="detail">Transactions Updated in this Session</span>
                    <span className="count visitors">{updatedTransactions.length}</span>
                </div>
            </div>           
        </div>;
    }

    let transactiontable = "";

    if (displayTransactionType == 'unmatched') {

        transactiontable = <DataTable 
                value={summary.unmatched}
                dataKey="id" 
                autoLayout={true}
                selectionMode="single" 
                selection={selectedTransaction} 
                className="p-datatable-sm"
                onSelectionChange={e => setSelectedTransaction(e.value)}>
            <Column field="memo" header="Memo" filter filterPlaceholder="Memo" filterMatchMode="contains"></Column>
            <Column field="amount" header="Amount" filter filterPlaceholder="Amount" filterMatchMode="contains" body={amountTemplate}></Column>
            <Column field="date" header="Date" filter filterPlaceholder="Date" filterMatchMode="contains"></Column>
            <Column field="account_name" header="Account" filter filterPlaceholder="Account" filterMatchMode="contains"></Column>            
        </DataTable>
    } else if (displayTransactionType == 'matched') {

        let selectedRuleTransactions = "";

        if (selectedRule) {
            selectedRuleTransactions = 
            <div>
                <div><Button onClick={saveSelectedRuleTransactionsHandler}>Save Transactions</Button></div>
            <DataTable 
                value={selectedRule.matched}
                dataKey="id" 
                autoLayout="true"
                selectionMode="single" 
                selection={selectedTransaction} 
                className="p-datatable-sm"
                onSelectionChange={e => setSelectedTransaction(e.value)}>
                <Column field="memo" header="Memo" filter filterPlaceholder="Memo" filterMatchMode="contains"></Column>
                <Column field="amount" header="Amount" filter filterPlaceholder="Amount" filterMatchMode="contains" body={amountTemplate}></Column>
                <Column field="date" header="Date" filter filterPlaceholder="Date" filterMatchMode="contains"></Column>
                <Column field="account_name" header="Account" filter filterPlaceholder="Account" filterMatchMode="contains"></Column>            
            </DataTable>
            </div>;
        }

        transactiontable = <div>        
            <DataTable 
                rows="5"
                paginator
                value={summary.rules}
                dataKey="id" 
                selectionMode="single" 
                className="p-datatable-sm"
                selection={selectedRule} 
                onSelectionChange={e => selectRuleHandler(e.value)}>
            <Column field="pattern" header="Pattern" filter filterPlaceholder="Pattern" filterMatchMode="contains"></Column>
            <Column field="payeeName" header="Payee" filter filterPlaceholder="Payee" filterMatchMode="contains"></Column>
            <Column field="categoryName" header="Category" filter filterPlaceholder="Category" filterMatchMode="contains"></Column>
            <Column field="account_name" header="Account" filter filterPlaceholder="Account" filterMatchMode="contains"></Column>            
            <Column field="matched" header="Matched" body={matchedBody}></Column>
            </DataTable>
            {selectedRuleTransactions}
        </div>;
        
    }

    if (!budget) {
        output = <p>Budget is not selected</p>;
    }

    return (
        <div>
            {output}
            {transactiontable}
        </div>
    );
}

export default Run;