import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useSelector } from 'react-redux';

const Categories = () => {

    const categories = useSelector((state) => state.budget.categories);

    const [selectedCategory, setSelectedCategory] = useState(null);

    return  <div className="card">
                <DataTable 
                    header="Categories"
                    value={categories}
                    dataKey="id" 
                    selectionMode="single" 
                    selection={selectedCategory} 
                    onSelectionChange={e => setSelectedCategory(e.value)}
                >
                    <Column field="name" header="Name" filter filterPlaceholder="Category" filterMatchMode="contains"></Column>
                    <Column field="category_group_name" header="Group" filter filterPlaceholder="Category Group" filterMatchMode="contains"></Column>
                </DataTable>
            </div>;

}

export default Categories;