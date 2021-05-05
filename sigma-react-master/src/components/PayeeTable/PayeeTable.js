import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import classes from './PayeeTable.module.css';
import mynab from '../../mynab';
import { useSelector } from 'react-redux';

const PayeeTable = (props) => {

    const budget = useSelector((state) => state.budget.budget);

    const [selectedPayee, setSelectedPayee] = useState(null);

    const [payees, setPayees] = useState(null);

    // method, dependencies
    useEffect(() => { 

        if (budget.id) {

        console.log('payeetable useeffect');

        mynab.payees.getPayees(budget.id)
            .then(res => {
                setPayees(res.data.payees);
            }).catch(e => {
                console.log(e);
              });


        //const payees = payeesResponse.data.payees;
        //for (let payee of payees) {
          //console.log(`Payee Name: ${payee.name}, ID: ${payee.id}`);
          //console.log(payee);
        //}
    } else {
        console.log('budget is not selected');
    }


    }, []);

    let output = <p>Payees loading...</p>;

    if (payees) {
        output = <div className="card">
        <DataTable 
            header="Payees"
            tableClassName={classes.PayeeTable}
            value={payees}
            dataKey="id" 
            selectionMode="single" 
            selection={selectedPayee} 
            onSelectionChange={e => setSelectedPayee(e.value)}
        >
            <Column field="name" header="Name" filter filterPlaceholder="Payee" filterMatchMode="contains"></Column>
        </DataTable>
    </div>;

    }

    return (
        <div>
            {output}
        </div>
    );
}

export default PayeeTable;