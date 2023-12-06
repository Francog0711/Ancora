const elementoInput = document.getElementById("metros-cuadrados");
const btnCalculo = document.getElementById("calcular");
const res = document.querySelector("#monto");

btnCalculo.addEventListener('click', (e) => {
    e.preventDefault();
    const valorInput = parseInt(elementoInput.value);

    if (isNaN(valorInput)) {
        alert("Ingrese un valor válido");
    } else {
        const resultado = Math.round(valorInput * 237081.6) 
        
        res.innerHTML = resultado;
    }
});
