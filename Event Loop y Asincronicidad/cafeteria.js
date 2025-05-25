//obtener elementos del DOM
const ListaOrdenes = document.getElementById('ListaOrdenes');
const addOrdenBoton = document.getElementById('addOrdenBoton');

// para generar ID's únicos de cada pedido
let ordenId = 1; //aumenta conforme aumentan los pedidos

// para manejar los clicks del botón
addOrdenBoton.addEventListener('click', () => {
    // crear un nuevo objeto con id y estado
    const orden = { id: ordenId++, status: 'En Proceso' }; //con ordenId++ aumenta el ID al crear cada pedido
    // llamar funciones de añadir y procesar las órdenes
    addOrden(orden); // agrega el pedido a la lista
    procesarOrden(orden); // simula la preparación del pedido -de forma asíncrona-
});

// función para agregar un pedido a la lista
function addOrden(orden) {
    // crear un elemento de la lista
    const listaItem = document.createElement('li');
    listaItem.id = `orden-${orden.id}`; //asignar el ID a cada pedido: orden-1, orden-2, etc.
    listaItem.textContent = `Pedido #${orden.id}: ${orden.status}`; //texto de la lista: Pedido #1: En Proceso
    ListaOrdenes.appendChild(listaItem); //indica que 'li' se agrega a la lista, como hijo
}

// actualizar el estado de un pedido ya hecho
function actOrdenStatus(orden, status) {
    // para buscar el elemento de la lista que corresponda a un cierto pedido
    const listaItem = document.getElementById(`orden-${orden.id}`);
    // comprobar que el elemento exista
    if (listaItem) {
        // actualizar el texto con el nuevo estado
        listaItem.textContent = `Pedido #${orden.id}: ${status}`;
        if (status === 'Completado') {
            listaItem.style.color = 'green'; // El texto se volverá verde cuando esté completado
        }
    }
}

// función asíncrona que va a simular la preparación de un pedido
async function procesarOrden(orden) {
    try{
        // se va a generar un tiempo aleatorio entre 2 y 6 seg., se usa Math.random() * (max - min) + min
        const tiempoPreparacion = Math.floor(Math.random() * 4000) + 2000;

        // el tiempo que se tarde se va a mostrar en la consola
        console.log(`El pedido #${orden.id} tardará ${tiempoPreparacion / 1000} segundos en completarse.`);

        // se va a crear una promise que se resuelve después del tiempo aleatorio con un setTimeout
        await new Promise(resolve => {
            setTimeout(() => {
                // lo que se va a mostrar en pantalla cuando se complete la preparación (se agote el setTimeout)
                console.log(`Se completó el pedido #${orden.id}.`);
                resolve(); //se resuelve la promise, permite seguir con el await
            }, tiempoPreparacion);
        });

        //cuando se resuelve la promise, se actualiza el estado del pedido
        orden.status = 'Completado';
        //se actualiza la visualización en el DOM  
        actOrdenStatus(orden, 'Completado');
        //se muestra en pantalla la notificación de que el pedido se ha completado
        console.log(`¡Pedido #${orden.id} completado!`);

    } catch (error){
        // errores que se mostrarán si algo se procesa mal
        console.error(`Error procesando el pedido #${orden.id}: ${error.message}`);
        // actualización del estado del pedido a error
        orden.status = 'Error';
        // actualización de la visualización en el DOM del error
        actOrdenStatus(orden, 'Error');
    }
}