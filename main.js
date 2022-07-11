const formulario = document.getElementById("form");
let datosUsuario = {};
const carrito = [];

// Aquí está todo lo del form y el listener 
formulario.addEventListener("submit", (e) => {

    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;
    const confirmarDireccion = document.getElementById("confirmarDireccion").value;
    const telefono = document.getElementById("telefono").value;
   
    e.preventDefault();
    
    datosUsuario = {
        nombre,
        direccion,
        confirmarDireccion,
        telefono,
    }

    console.log(datosUsuario)

    const infoUserJson = JSON.stringify(datosUsuario);
    localStorage.setItem("datosDeUsuario", infoUserJson);

    alert(`Has ingresado tus datos, vamos a tu proceso de compra ${datosUsuario.nombre}`);

    
    document.body.removeChild(formulario);
    
    // Aquí y en el de mostrar productos puedes usar lo de la función oculta 
    // imprimirDatos(datosUsuario);

    
})

// Esta funcion imprime los datos que necesites despues de dar el submit
// Preferi que solo imprimiera entonces quito la función
// function imprimirDatos (datosUsuario){
//     let datosEnPantalla = document.getElementById("datosUsuarioPantalla");
//     datosEnPantalla.innerHTML = `<ul id = "datosFinales">
//                             <hr>
//                             <li class="datoImpreso"> Nombre: ${datosUsuario.nombre} </li>
//                             <li class="datoImpreso"> Dirección: ${datosUsuario.direccion} </li>
//                             <li class="datoImpreso"> Telefono: (${datosUsuario.telefono}) </li>
//                             <br>
//                             <br>
//                             <hr>
//                         </ul>`;
//     document.body.appendChild(datosEnPantalla);
// };

   // Esta función imprime las cards con DOM y las divide para su edicion en CSS

function mostrarProductos (){
    const contenedor = document.getElementById("producto-contenedor");
    productos.forEach( producto => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `<div class="card-image" id="supTotal">
                            <img class="imgCards" id="suplemento${producto.id}" src=${producto.img}>
                            <br>
                            <span class="cardText" id="card-title" >Producto: ${producto.nombre}</span>
                            <br>
                            <span class="cardText" id="card-precio">Precio: ${producto.precio}</span>
                            <br>
                            <span class="cardText" id="card-marca">Marca de producto: ${producto.marca}</span>
                            <br>
                            <span class="cardText" id="card-descripcion">Descripcion: ${producto.descripcion}</span>
                            <br>
                            <br>
                            <button type="button" class="botonCard" onclick="agregarProductoAlCarrito(${producto.id})" id="botonDeCompra${producto.id}">Comprar ahora</button>
                            <br>
                            <a href="${producto.video}" target="blank" id="esParaTi">¿Este producto es para mi?</a>
                        </div>
                        `
        contenedor.appendChild(div);
        
    });
    
};


// Cards y mostrarProductos(); FALTA QUITAR EL BOTON

let botonDeProductos = document.getElementById("botonProductos");
    botonDeProductos.addEventListener("click", () => {

        let presentacionDeProductos = document.getElementById("carrito");
            presentacionDeProductos.innerHTML = `<p>${mostrarProductos()}</p>`
                document.body.appendChild(presentacionDeProductos);
                document.body.removeChild(botonDeProductos)
                    // FALTA QUITAR ESTE BOTON
    });

    // Ya agregamos los productos a un carrito de compras, mas adelante esta la funcion que lo renderiza

function agregarProductoAlCarrito(id) {
    let producto = productos.find(producto => producto.id === id);
    let productoEnCarrito = carrito.find(productoEnCarrito => productoEnCarrito.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad ++
        console.log(carrito)
    }else{
        productoEnCarrito = 1;
        carrito.push(producto)
            console.log(carrito)
    }
    renderProductos();
    renderTotal();
    calcularTotal();
}

// FALTA AGREGAR UN ALERT CUANDO PICAN EL BOTON DE ES PARA MI
// function desplegarInformacion(id) {
//     console.log(`diste click descriptivo en ${id}`)   
// }


// Aqui ya se renderizan los productos del carrito, falta mejorar css 
function renderProductos(){
    let carritoHTML = document.getElementById("carrito")
    let HTMLcarrito = ""
    carrito.forEach((producto, id) =>{
        HTMLcarrito += `
        <div class="card-carrito" id="supComprado">
                            <span class="cardText" id="card-title" > Compra: ${producto.nombre}</span>
                            <br>
                            <br>
                            <span class="cardText" id="card-precio">Precio: ${producto.precio}</span>
                            <br>
                            <br>
                            <span class="cardText" id="card-precio">Cantidad comprado: ${producto.cantidad}</span>
                            <br>
                            <br>
                            <button type="button" class="botonEliminar" onclick="eliminarProducto(${id})" id="botonEliminar${producto.id}">Eliminar</button>
                        </div>
        `
    })

    carritoHTML.innerHTML = HTMLcarrito

    document.body.appendChild(carritoHTML)

}

function renderTotal(){
    let totalHTML = document.getElementById("totales")
   totalHTML.innerHTML = `            
   <div>
    <h2 id="totalCompra"></h2>
    </div>
    `
    document.body.appendChild(totalHTML)

}

// Con esto ya se pueden eliminar los productos, ya no hay errores con esto
function eliminarProducto(id) {
    carrito[id].cantidad--;
    if (carrito[id].cantidad == 0){
        carrito.splice(id, 1);
    }
    renderProductos();
    calcularTotal();
}



// Esta parte ya calcula los totales de mi producto y los imprime
function calcularTotal(){
    let total = 0;
    carrito.forEach((producto) =>{
        total += producto.precio * producto.cantidad
    })
    

    const totalFinal = document.getElementById("totalCompra")
    totalFinal.innerHTML = `<h3> Total de compra: $${total} 
                            <button type="button" class="botonCompraTotal" onclick="comprarProductos()" id="botonDeCompraFinal">Finalizar Compra</button>
                            <h3/>
    `
}

function comprarProductos(){
    alert(`Gracias por tu compra ${datosUsuario.nombre}, 
    tu(s) producto(s) se enviarán a la direccion ubicada en ${datosUsuario.direccion}, 
    cualquier inconveniente o emergencia nos contactaremos contigo al numero ${datosUsuario.telefono}`)
}
