import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import classes from './TransactionTable.module.css';

const TransactionTable = (props) => {

    const [selectedTransactions, setSelectedTransactions] = useState(null);

    const amountTemplate = (rowData) => {
        if (rowData.amount) {
            return (rowData.amount / 1000).toFixed(2);
        }
        return null;
    }

    return (
        <div>
            <div className="card">
                <DataTable 
                    header="Transactions"
                    tableClassName={classes.TransactionTable}
                    value={props.data}
                    dataKey="id" 
                    selectionMode="multiple" 
                    selection={selectedTransactions} 
                    onSelectionChange={e => setSelectedTransactions(e.value)}
                    metaKeySelection={false}
                >
                    <Column field="memo" header="Memo" filter filterPlaceholder="Memo" filterMatchMode="contains"></Column>
                    <Column field="amount" header="Amount" body={amountTemplate}></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default TransactionTable;