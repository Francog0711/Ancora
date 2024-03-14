let precio = 0;
let operacion = 0;
let btnCalcular1 = document.getElementById('calcular-1');
let btnCalcular2 = document.getElementById('calcular-2');
let categoriaA = 1; // Nueva definición de categoría A
let categoriaB = 0.64;
let categoriaC = 0.64;
let categoriaD = 0.64;
let honorariosA = 0.08;
let honorariosB = 0.08;
let honorariosC = 0.03;
let honorariosD = 0.03;

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

const fetchData = async () => {
    try {
        const res = await fetch('calcular.json');
        const data = await res.json();
        precio = data[0].precio;
        console.log(`Precio cargado: ${precio}`);
    } catch (error) {
        console.log(error);
    }
};

// Event listener para el primer botón de calcular
btnCalcular1.addEventListener('click', (event) => {
    const metros1 = parseFloat(document.getElementById('mts-1').value);
    const msjCat1 = document.getElementById('categoria-1');
    if (metros1 > 150) {
        msjCat1.textContent = ': es CATEGORIA A (>150m2) computa x1';
        operacion = categoriaA * metros1 * precio * honorariosA;
    } else if (metros1 > 80) {
        msjCat1.textContent = ': es CATEGORIA B (>80m2) computa x0,64';
        operacion = categoriaB * metros1 * precio * honorariosB;
    } else if (metros1 > 60) {
        msjCat1.textContent = ': es CATEGORIA C (>60m2) computa x0,64';
        operacion = categoriaC * metros1 * precio * honorariosC;
    } else {
        msjCat1.textContent = ': es CATEGORIA D (<60m2) computa x0,64';
        operacion = categoriaD * metros1 * precio * honorariosD;
    }

    const permisoDeobra = precio * metros1 * 0.01;
    const resultado1 = (operacion * 0.23 + permisoDeobra);
    document.getElementById('resultado-1').textContent = isNaN(resultado1) ? '0' : resultado1;

    event.stopPropagation();
});

// Event listener para el segundo botón de calcular
btnCalcular2.addEventListener('click', (event) => {
    const metros2 = parseFloat(document.getElementById('mts-2').value);
    const msjCat1 = document.getElementById('categoria-2');
    if (metros2 > 150) {
        msjCat1.textContent = ': es CATEGORIA A (>150m2) computa x1';
        operacion = categoriaA * metros2 * precio * honorariosA;
    } else if (metros2 > 80) {
        msjCat1.textContent = ': es CATEGORIA B (>80m2) computa x0,64';
        operacion = categoriaB * metros2 * precio * honorariosB;
    } else if (metros2 > 60) {
        msjCat1.textContent = ': es CATEGORIA C (>60m2) computa x0,64';
        operacion = categoriaC * metros2 * precio * honorariosC;
    } else {
        msjCat1.textContent = ': es CATEGORIA D (<60m2) computa x0,64';
        operacion = categoriaD * metros2 * precio * honorariosD;
    }

    const regularizar = precio * metros2 * 0.05;
    const resultado2 = (operacion * 0.23 + regularizar);
    document.getElementById('resultado-2').textContent = isNaN(resultado2) ? '0' : resultado2;

    event.stopPropagation();
});




