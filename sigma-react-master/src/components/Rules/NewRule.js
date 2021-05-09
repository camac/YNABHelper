import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import firebase from '../../firebase';

const NewRule = () => {

    const patternRef = useRef();
    const descriptionRef = useRef();

    const payees = useSelector((state) => state.budget.payees);
    const categories = useSelector((state) => state.budget.categories);

    const [selectedPayee, setSelectedPayee] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

 
   const addRule = () => {
        console.log('add rule');

        const pattern = patternRef.current.value;
        const description = descriptionRef.current.value;

        console.log(pattern);
        console.log(description);

        if (selectedPayee && selectedCategory) {
            console.log(selectedPayee);
            console.log(selectedCategory);    

            const newRule = {
                pattern: pattern,
                description: description,
                payeeId: selectedPayee.id,
                payeeName: selectedPayee.name,
                categoryId: selectedCategory.id,
                categoryName: selectedCategory.name
            }

            firebase.post('/rules.json', newRule)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });

        } else {
            console.log("Select Payee and Category");
        }

   }

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card p-fluid">
                    <h5>New Rule</h5>
                    <div className="p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="name2">Pattern</label>
                            <InputText id="name2" type="text" ref={patternRef}/>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="email2">Description</label>
                            <InputText id="email2" type="text" ref={descriptionRef}/>
                        </div>
                    </div>
                    <div>
                        <Button label="Add Rule" onClick={addRule} className="p-mr-2 p-mb-2"></Button>
                    </div>
                </div>
                    
            </div>
            <div className="p-col-6">
                <div className="card">
                    <h5>Select Payee</h5>
                    <DataTable 
            value={payees}
            dataKey="id" 
            selectionMode="single" 
            selection={selectedPayee} 
            onSelectionChange={e => setSelectedPayee(e.value)}>
            <Column field="name" header="Name" filter filterPlaceholder="Payee" filterMatchMode="contains"></Column>
        </DataTable>

                </div>

            </div>
            <div className="p-col-6">
                <div className="card">
                    <h5>Select Category</h5>
                    <DataTable 
            value={categories}
            dataKey="id" 
            selectionMode="single" 
            selection={selectedCategory} 
            onSelectionChange={e => setSelectedCategory(e.value)}>
            <Column field="name" header="Name" filter filterPlaceholder="Category" filterMatchMode="contains"></Column>
        </DataTable>

                </div>
            </div>

        </div>
    );

}

export default NewRule;