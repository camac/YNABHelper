import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useSelector } from 'react-redux';

const Uncoded = (props) => {

    const transactions = useSelector((state) => state.budget.uncategorized);

    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const amountTemplate = (rowData) => {
        if (rowData.amount) {
            return (rowData.amount / 1000).toFixed(2);
        }
        return null;
    }
   
    let output = <p>Transactions loading...</p>;

    if (transactions) {
        output = <div className="card">

        <DataTable 
            header={transactions.length + ' Transactions'}
            value={transactions}
            dataKey="id" 
            autoLayout="true"
            selectionMode="single" 
            selection={selectedTransaction} 
            className="p-datatable-sm"
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
            {output}
        </div>
    );
}

export default Uncoded;