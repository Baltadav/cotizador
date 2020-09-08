import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { obtenerDiferenciaYear, calcularMarca, calcularPlan } from '../helper';



const Campo = styled.div `
    display:flex;
    margin-bottom:1rem;
    align-items:center;
`;

const Label = styled.label`
    flex:0 0 100px;
`;

const Select = styled.select `
    display:block;
    width: 100%;
    padding:1rem;
    border: 1px solid #e1e1e1;
    --webkit-appearance: none;
`;

const InputRadio = styled.input `
    margin: 0 1rem;
`;

const Button = styled.button`
    background-color: #00838F;
    font-size: 15px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;
    
    &:hover {
        background-color: #26C6DA; 
        cursor:pointer;
    }
`;

const Error = styled.div`
    background-color:red;
    color: white;
    padding: 1rem;
    margin-bottom: 2rem;
    width: 100%;
    text-transform: center
`;

const Formulario = ({setResumen, setCargando}) => {

    const [data, setData] = useState({
        marca: '',
        year: '',
        plan: ''
    })
    const [error, setError] = useState(false);
    

    //extraer valores del state

    const {marca, year, plan} = data;

    //leer datos del formularios y meterlos en el state  

    const obtenerInformacion = e =>{
        setData({
          ...data,
            [e.target.name]: e.target.value
        })
    }

    //on submit
    const cotizarSeguro = e =>{
        e.preventDefault();

        if(marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
            setError(true);
            return;
        }

        setError(false);

        //precio base del seguro = 2000
        let resultado = 2000;

        //obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(year);

        //restar por cada año 3%
        resultado -= ((diferencia * 3) * resultado) /100;

        //americano 15% || asiatic 5% || europeo 30% 
        resultado = calcularMarca(marca) * resultado;

        //basico 20% || completo 50% 
        let incrementoPlan = calcularPlan(plan);

        //total
        resultado = parseFloat( resultado * incrementoPlan ).toFixed(2);
        
        //agrega el spinner
        setCargando(true);

        setTimeout(()=>{
            //elimina el spinner
            setCargando(false);

            //pasa la info al componente principal
            setResumen({
            cotizacion : Number(resultado) ,
            data 
            });
        },3000)
    }


    return ( 
        <form
            onSubmit={cotizarSeguro}
        >
            {error ? <Error>Todos los campos son obligatorios</Error> : null}
            
            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">--Seleccione--</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio 
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={obtenerInformacion}
                /> Basico
                <InputRadio 
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={obtenerInformacion}
                /> Completo
            </Campo>
            
            <Button type="submit">Cotizar</Button>
        </form>
     );
}

Formulario.propTypes = {
    setResumen: PropTypes.func.isRequired,
    setCargando: PropTypes.func.isRequired
}

export default Formulario;