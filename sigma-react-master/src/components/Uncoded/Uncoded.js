import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import mynab from '../../mynab';
import firebase from '../../firebase';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { RulesService } from '../../service/RulesService';

const Uncoded = (props) => {

    const budget = useSelector((state) => state.budget.budget);

    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [selectedRule, setSelectedRule] = useState(null);

    const [transactions, setTransactions] = useState(null);
    const [rules, setRules] = useState(null);

    // method, dependencies
    useEffect(() => { 

        if (budget.id) {

            const rs = new RulesService();

            mynab.transactions.getTransactionsByType(budget.id,"uncategorized")
            .then(res => {
                setTransactions(res.data.transactions);
            }).catch(e => {
                console.log(e);
            });

            loadRules();

        } else {
            console.log('budget is not selected');
        }

    }, [budget.id]);

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

    const saveMatched = () => {

        if (selectedRule) {

            const r = selectedRule;

            if (r.matched) {

                r.matched.forEach(t => {

                    let newt = {...t};
                    newt.payee_id = r.payeeId;
                    newt.category_id = r.categoryId;

                    mynab.transactions.updateTransaction(budget.id, t.id, {
                        transaction: newt
                    }).then(res => {
                        console.log(res);
                    }).catch(e => {
                        console.log(e);
                    });
    
                });

            }

        } else {
            console.log('no rule selected');
        }


    }

    const runRules = () => { 

        console.log('here I run the rules');

        if (rules && transactions) {

            transactions.forEach(t => {
                
                rules.forEach(r => {

                    let re = new RegExp(r.pattern);

                    if (t.memo) {
                        if (t.memo.match(re)) {

                            if (r.matched) {
                                r.matched = [...r.matched, t];
                            } else {
                                r.matched = [t];
                            }

                        }
                    }

                });

            });

        } else {
            console.log('there are no rules');
        }

    }

    let output = <p>Transactions loading...</p>;

    let rulesoutput = 'Loading...';

    if(rules) {

        rulesoutput = (

        <DataTable 
        value={rules}
        dataKey="id" 
        selectionMode="single" 
        selection={selectedRule} 
        onSelectionChange={e => setSelectedRule(e.value)}
    >
        <Column field="pattern" header="Pattern" filter filterPlaceholder="Pattern" filterMatchMode="contains"></Column>
        <Column field="payeeName" header="Payee" filter filterPlaceholder="Payee" filterMatchMode="contains"></Column>
        <Column field="categoryName" header="Category" filter filterPlaceholder="Category" filterMatchMode="contains"></Column>
        <Column field="matched" header="Matched" body={matchedBody}></Column>
    </DataTable>);


    }


    if (transactions) {
        output = <div className="card">

        <Button onClick={runRules}>Run Rules</Button>
        <Button onClick={saveMatched}>Save!</Button>

        <DataTable 
            header={transactions.length + ' Transactions'}
            value={selectedRule ? selectedRule.matched : transactions}
            dataKey="id" 
            selectionMode="single" 
            selection={selectedTransaction} 
            onSelectionChange={e => setSelectedTransaction(e.value)}
        >
            <Column field="memo" header="Memo" filter filterPlaceholder="Memo" filterMatchMode="contains"></Column>
            <Column field="amount" header="Amount" filter filterPlaceholder="Amount" filterMatchMode="contains" body={amountTemplate}></Column>
            <Column field="date" header="Date" filter filterPlaceholder="Date" filterMatchMode="contains"></Column>
            <Column field="account_name" header="Account" filter filterPlaceholder="Account" filterMatchMode="contains"></Column>            
        </DataTable>
    </div>;

    }

    return (
        <div>
            {rulesoutput}
            {output}
        </div>
    );
}

export default Uncoded;