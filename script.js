//BOTON BORRAR ELEMENTOS FORMULARIO
let textoNombre = document.getElementById("nombre");
let textoEmail = document.getElementById("email");

const botonBorrar = document.getElementById("btnBorrar");
botonBorrar.onclick = () => {
    textoNombre.value = "";
    textoEmail.value = "";
}

//MENSAJE DE ADVERTENCIA EMAIL
textoEmail.oninput = () => {
    if(!textoEmail.value.includes('@') || !textoEmail.value.includes('.')){
        document.getElementById('mensaje').style.color = "red";
        document.getElementById('mensaje').innerText = "No olvides el @ ni el .";
    }
    else{
        document.getElementById('mensaje').innerText = "";
    }
}

//VALIDACION DE FORMULARIO
let formulario = document.getElementById('formulario');
formulario.addEventListener('submit', validar);

function validar(ev){
    if(textoNombre.value == '' || textoEmail.value == ''){
        ev.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese nombre o email faltante.',
        })
    }
}

