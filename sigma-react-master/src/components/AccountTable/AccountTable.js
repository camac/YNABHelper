import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import classes from './AccountTable.module.css';

const AccountTable = (props) => {

    const [selectedAccount, setSelectedAccount] = useState(null);

    return (
        <div>
            <div className="card">
                <DataTable 
                    header="Accounts"
                    tableClassName={classes.AccountTable}
                    value={props.accounts}
                    dataKey="id" 
                    selectionMode="single" 
                    selection={selectedAccount} 
                    onSelectionChange={e => setSelectedAccount(e.value)}
                >
                    <Column field="name" header="Name" filter filterPlaceholder="Account" filterMatchMode="contains"></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default AccountTable;