import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import classes from './RulesTable.module.css';

const RulesTable = (props) => {

    const [selectedRule, setSelectedRule] = useState(null);

    const matchedTemplate = (rowData) => {
        if (rowData.matchedTransactions) {
            return rowData.matchedTransactions.length;
        }
        return 0;
    }

    return (
        <div>
            <div className="card">
                <DataTable 
                    header="Rules"
                    tableClassName={classes.RulesTable}
                    value={props.rules}
                    dataKey="id" 
                    selectionMode="single" 
                    selection={selectedRule} 
                    onSelectionChange={e => setSelectedRule(e.value)}
                >
                    <Column field="payee.name" header="Payee" filter filterPlaceholder="Payee" filterMatchMode="contains"></Column>
                    <Column field="account.name" header="Account" filter filterPlaceholder="Payee" filterMatchMode="contains"></Column>
                    <Column field="pattern" header="Pattern" filter filterPlaceholder="Filter Pattern" filterMatchMode="contains"></Column>
                    <Column field="matched" body={matchedTemplate} header="Matched Transactions" ></Column>
                    
                </DataTable>
            </div>
        </div>
    );
}

export default RulesTable;