// DECLARACION DE VARIABLES
let contenedorProds = document.getElementById("prods");
let tablaCarrito = document.getElementById("tablacarrito");
let carro = JSON.parse(localStorage.getItem('carro')) || [];
let totalCarrito = document.getElementById("total");
let resultado = 0;

//RENDER PRODUCTOS
renderProductos();

//ORDENAR MAYOR A MENOR
function mayorMenor(){
    productos.sort((a,b) => b.precio - a.precio);
    contenedorProds.innerHTML = "";
    renderProductos(productos);
}

//ORDENAR MENOR A MAYOR
function menorMayor(){
    productos.sort((a,b) => a.precio - b.precio);
    contenedorProds.innerHTML = "";
    renderProductos(productos);
}

//BOTONES CONFIGURACION ORDEN DE PRODUCTOS
const boton1 = document.getElementById("btnMenorMayor");
const boton2 = document.getElementById("btnMayorMenor");

boton1.onclick = () => menorMayor();
boton2.onclick = () => mayorMenor();


//FETCH

async function fetchProductoData(producto) {
    try {
        const urlFotosLibros = `https://covers.openlibrary.org/b/isbn/${producto.isbn}-M.jpg`;
        const responseBlob = await fetch(urlFotosLibros);
        const imageBlob = await responseBlob.blob();

        const urlLibros = `https://openlibrary.org/isbn/${producto.isbn}.json`;
        const responseData = await fetch(urlLibros);
        const dataLibro = await responseData.json();

        return { imageBlob, dataLibro };
    } catch (error) {
        console.error("Fetch error:", error);
        return { imageBlob: null, dataLibro: null };
    }
}

async function renderProductos() {
    for (const producto of productos) {
        const { imageBlob, dataLibro } = await fetchProductoData(producto);

        if (dataLibro && imageBlob) {
            const imageUrlObject = URL.createObjectURL(imageBlob);
            contenedorProds.innerHTML += `
                <div class="card m-2" style="width: 18rem;">
                <img src="${imageUrlObject}" class="card-img-top" alt="${dataLibro.title}">
                <div class="card-body">
                    <h5 class="card-title">${dataLibro.title}</h5>
                    <p class="card-text">Páginas: ${dataLibro.number_of_pages} <br> $${producto.precio}</p>
                    <button id=${producto.id} class="btn btn-primary compra">Comprar</button>
                </div>
                </div>
            `;
        }

        let botones = document.getElementsByClassName('compra');
        // AGREGAR PRODUCTOS AL CARRO
        for (const boton of botones) {
            boton.onclick = async () => {
                const prodACarro = productos.find((producto) => producto.id == boton.id);
                agregarACarrito(prodACarro);
            };
        }
    }
}

// DOM
resultado = 0;

// function renderizarProductos() {
//     let botones = document.getElementsByClassName('compra');
//     for (const boton of botones){
//         // PARA AGREGAR PRODUCTOS AL CARRO
//         boton.onclick = () =>{
//             const prodACarro = productos.find((producto) => producto.id == boton.id);
//             agregarACarrito(prodACarro);
//         }
//     }
// }

// PARA SUBIR LOS ELEMENTOS AL CARRO
function agregarACarrito(producto){
    let found = carro.find(item => item.id === producto.id)
    if (found) {
        found.cantidad++;
        localStorage.setItem("carro", JSON.stringify(carro));
    } else {
        producto.cantidad = 1;
        carro.push(producto);
        localStorage.setItem("carro", JSON.stringify(carro));
    }
}