import React from 'react';

import Auxo from '../Auxo/Auxo'

const layout = (props) => (

    <Auxo>

        <header>YNAB Helper</header>
        {props.children}
    </Auxo>

)

export default layout;
