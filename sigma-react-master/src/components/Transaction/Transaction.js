import React from 'react';
import * as ynab from 'ynab';

const Transaction =  () => {
    
    const accessToken = "";
    const ynabAPI = new ynab.API(accessToken);
    
    (async function() {
      const budgetsResponse = await ynabAPI.budgets.getBudgets();
      const budgets = budgetsResponse.data.budgets;
      for (let budget of budgets) {
        console.log(`Budget Name: ${budget.name}`);

        (async function() {
            const payeesResponse = await ynabAPI.payees.getPayees(budget.id)
            const payees = payeesResponse.data.payees;
            for (let payee of payees) {
              console.log(`Payee Name: ${payee.name}, ID: ${payee.id}`);
              console.log(payee);
            }
          })();    
    


      }
    })();    

  

    return <div>Yo</div>;

};

export default Transaction;