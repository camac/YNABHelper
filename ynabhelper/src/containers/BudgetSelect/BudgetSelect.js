import React from 'react';

const budgetSelect = (props) => {

    if (!props.budgets) {
        return <div>No Budgets</div>;
    }

    const budgets = props.budgets.map(b => {
        return <div key={b.id}>{b.name} <button onClick={() => props.selected(b)}>Select</button></div>
    })

    return (<div>Budget Select {budgets}</div>);

};


export default budgetSelect;
