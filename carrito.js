let tablaCarrito = document.getElementById("tablacarrito");
let carro = JSON.parse(localStorage.getItem('carro')) || [];
let totalCarrito = document.getElementById("total");
let resultado = 0;
//PRIMER RENDERIZADO DEL CARRITO
if (carro.length != 0) {
    Agregar();
}

//FUNCION AGREGAR CARRITO
function Agregar() {
    
    for (const producto of carro) {
        //agregar fila a la tabla de carrito
        tablaCarrito.innerHTML += `
            <tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.precio * producto.cantidad}</td>
            </tr>
        `;

        //CALCULO DEL TOTAL
        resultado += producto.precio * producto.cantidad;
    }

    totalCarrito.innerHTML = "";
    //RESULTADO
    totalCarrito.innerHTML += `
    Total a pagar $: ${resultado}
    `;
}

//FINALIZAR COMPRA
let botonFinalizar = document.getElementById("btnFinalizarCompra");
console.log(botonFinalizar);
botonFinalizar.onclick = () => {
    //AVISO CON TOASTIFY
    Toastify({
        text: "Tu pedido fue realizado. Lo recibirás dentro de 48hs.",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)"
        }
        }).showToast();

    //VACIAR CARRO Y TABLA
    carro = [];
    tablaCarrito.innerHTML = "";
    totalCarrito.innerText = "Total a pagar $: ";
    localStorage.removeItem("carro");
}