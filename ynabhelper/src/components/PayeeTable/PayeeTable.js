import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import classes from './PayeeTable.module.css';

const PayeeTable = (props) => {

    const [selectedPayee, setSelectedPayee] = useState(null);

    return (
        <div>
            <div className="card">
                <DataTable 
                    header="Payees"
                    tableClassName={classes.PayeeTable}
                    value={props.payees}
                    dataKey="id" 
                    selectionMode="single" 
                    selection={selectedPayee} 
                    onSelectionChange={e => setSelectedPayee(e.value)}
                >
                    <Column field="name" header="Name" filter filterPlaceholder="Payee" filterMatchMode="contains"></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default PayeeTable;