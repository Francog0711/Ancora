let precio = 0;
let operacion = 0;
let btnCalcular = document.getElementById('calcular');
let categoriaA = 0.64;
let honorarios = 0.08;


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
document.getElementById('calcular-1').addEventListener('click', (event) => {
    const metros1 = parseFloat(document.getElementById('mts-1').value);
    let permisoDeObra = 0.01*(metros1*precio);
    operacion = categoriaA * metros1 * precio * honorarios;
    const resultado1 = (operacion * 0.23) + permisoDeObra;
    document.getElementById('resultado-1').textContent = isNaN(resultado1) ? '0' : resultado1;

    // Verificar y agregar mensaje de contacto solo si no existe
    let mensajeExistente1 = document.getElementById('resultado-1').parentNode.querySelector('.mensaje-contacto');
    if (!mensajeExistente1) {
        const mensajeSpan1 = document.createElement('span');
        mensajeSpan1.textContent = 'Para más detalles, comunícate por WhatsApp o el formulario.';
        mensajeSpan1.className = 'mensaje-contacto';
        document.getElementById('resultado-1').parentNode.appendChild(mensajeSpan1);
    }

    event.stopPropagation();
});

// Event listener para el segundo botón de calcular
btnCalcular.addEventListener('click', (event) => {
    const metros2 = parseFloat(document.getElementById('mts-2').value);
    let regularizacion = 0.05*(metros2*precio);
    operacion = categoriaA * metros2 * precio * honorarios;
    const resultado2 = (operacion * 0.23) + regularizacion;
    document.getElementById('resultado-2').textContent = isNaN(resultado2) ? '0' : resultado2;

    // Verificar y agregar mensaje de contacto solo si no existe
    let mensajeExistente2 = document.getElementById('resultado-2').parentNode.querySelector('.mensaje-contacto');
    if (!mensajeExistente2) {
        const mensajeSpan2 = document.createElement('span');
        mensajeSpan2.textContent = 'Para más detalles, comunícate por WhatsApp o el formulario.';
        mensajeSpan2.className = 'mensaje-contacto';
        document.getElementById('resultado-2').parentNode.appendChild(mensajeSpan2);
    }

    event.stopPropagation();
});





