import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { primeraMayuscula } from '../helper';

const ContendorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00939f;
    color : #FFF;
    margin-top: 1rem;
`;

const Resumen = ({data}) => {

    const {marca, year, plan} = data;

    if(marca.trim() === '' || year.trim() === '' || plan.trim() === '') return null

    return ( 
        <ContendorResumen>
            <h2>Resumen de cotizacion</h2>
            <ul>
                <li>Marca : {primeraMayuscula(marca)}</li>
                <li>Plan : {primeraMayuscula(plan)}</li>
                <li>Año : {year}</li>
            </ul>
        </ContendorResumen>
     );
}

Resumen.propTypes = {
    data: PropTypes.object.isRequired
}
export default Resumen;