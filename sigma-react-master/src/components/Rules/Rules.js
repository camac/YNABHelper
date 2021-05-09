import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../firebase';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

import NewRule from './NewRule';

const Rules = () => {

    const budget = useSelector((state) => state.budget.budget);

    const [rules, setRules] = useState(null);
    const [selectedRule, setSelectedRule] = useState(null);

    const [newRule, setNewRule] = useState({
        payee: 'Payee',
        payeeName: 'Payee',
        account: 'Account',
        accountName: 'Account Name',
        pattern: 'Pattern',
        description: 'Description'
    });

    const addRule = () => {

        firebase.post('/rules.json', newRule)
        .then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });

        loadRules();

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

    useEffect(() => { 

        loadRules();

    }, [budget.id]);


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
    </DataTable>);


    }

    return (
        <div>
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <h5>Rules</h5>
                    <p>These rules will be used to automatically categorise transactions</p>
                </div>
            </div>
            <div className="p-col-12">
                <div className="card">
                    {rulesoutput}
                </div>
            </div>

        </div>
        <NewRule></NewRule>

        </div>
    );
}

export default Rules;