import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import classes from './Payees.module.css';
import { useSelector } from 'react-redux';

const Payees = (props) => {

    const budget = useSelector((state) => state.budget.budget);

    const payees = useSelector((state) => state.budget.payees);

    const [selectedPayee, setSelectedPayee] = useState(null);

    let output = <p>Please Select the Budget</p>;

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

export default Payees;