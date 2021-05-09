import firebase from '../firebase';

export class RulesService {

    getRules() {

        let rules = null;

        firebase.get('/rules.json')
        .then(response => {
    
            if (response.data) {
    
                rules = Object.keys(response.data).map(key => {
                    return {...response.data[key], id: key};
                });

                return rules;
    
            }
    
        }).catch(error => {
            console.log(error);
        })

        return rules;

    }

}