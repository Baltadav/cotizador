export function obtenerDiferenciaYear(year) {
    return new Date().getFullYear() - year;
};

//total a pagar segun marca. americano 15% || asiatic 5% || europeo 30% 

export function calcularMarca(marca) {
    let incremento;
    
    switch(marca){
        case 'europeo':
            incremento = 1.30;
            break;
        case 'americano':
            incremento = 1.15;
            break;
        case 'asiatico':
            incremento = 1.05;
            break;

        default:
            break;
    }

    return incremento;
}

//Calcular tipo de seguro
export function calcularPlan(plan){
    return (plan === 'basico')? 1.20 : 1.50;    
}

//Muestra la primer letra mayus

export function primeraMayuscula (texto){
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}