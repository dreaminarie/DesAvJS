// datos [varios] de los libros en formato JSON
let biblioteca = {
    "libros": [
        {
            "titulo": "El Señor de los Anillos",
            "autor": "J.R.R. Tolkien",
            "genero": "Fantasía",
            "disponible": true //"true" = disponible 
        },
        {
            "titulo": "Harry Potter y la Piedra Filosofal",
            "autor": "J.K. Rowling",
            "genero": "Fantasía",
            "disponible": true
        },
        {
            "titulo": "1984",
            "autor": "George Orwell",
            "genero": "Distopía",
            "disponible": false // "false" = no disponible
        },
        {
            "titulo": "Los Juegos del Hambre",
            "autor": "Suzanne Collins",
            "genero": "Distopía",
            "disponible": true
        },
        {
            "titulo": "Rebelión en la granja",
            "autor": "George Orwell",
            "genero": "Distopía",
            "disponible": false
        }
    ]
};

// lectura de datos tipo JSON
// el callback se ejecutará cuando se terminen de "leer" los datos 
function leerDatos(callback){
    console.log("Leyendo datos de la biblioteca..."); //indicará en consola que se están leyendo los datos
    setTimeout(() => {
        // se simula una ejecución tardía
        console.log("Datos leídos exitosamente");
        // se ejecuta el callback con los datos leídos, se devuelven de forma asíncrona 
        callback(biblioteca);
    }, 1000); // 1000 ms = 1 seg, el tiempo que se tardará en "leer" los datos
}

// escribir/guardar datos tipo JSON
function escribirDatos(datos, callback){
    console.log("Guardando cambios en la biblioteca...");
    setTimeout(() => {
        biblioteca = datos; //se actualizan los datos con los nuevos
        console.log("Cambios guardados correctamente")
        if (callback) callback(); //se ejecuta el callback si es que se proporciona, es opcional
    }, 500); // el tiempo en que se ejecutará
}

// mostrar todos los libros
function mostrarLibros(){
    // se llama a la función para leer los datos actuales
    leerDatos((datos) => {
        console.log("=== Inventario de Libros ===");
        // verificar si sí hay libros (si no hay un array vacío)
        if (datos.libros.length === 0){
            console.log("No hay libros en la biblioteca.");
            return; //para que ya no ejecute más código
        }
        // recorrer los libros en el array con un forEach y mostrarlos (con sus respectivos datos)
        datos.libros.forEach((libro, index) => {
            // libro = el libro actual, index = la posición del libro en el array
            // index + 1 para que la numeración inicie desde 1
            console.log(`${index + 1}. "${libro.titulo}" - ${libro.autor}`);
            console.log(`Género: ${libro.genero}`);
            // se usará un operador condicional para que el mensaje en consola varíe según el estado:
            // true = disponible, false = prestado
            console.log(`Estado: ${libro.disponible ? 'Disponible' : 'Prestado'}`);
            // un salto de línea
            console.log('');
        });
    })
}

// para agregar nuevos libros, pidiendo los mismos parámetros
function agregarLibro(titulo, autor, genero, disponible = true){
    // si no se especifica que la disponibilidad es "false", entonces por automático, aunque no se indique, será true
    console.log(`Agregando el libro "${titulo}"`);
    // para comprobar que el libro no está ya en la biblioteca:
    leerDatos((datos) => {
        // uso del some() que devuelve true si alguno de los elementos del array cumple la condición
        const libroExiste = datos.libros.some(libro =>
            libro.titulo.toLowerCase() === titulo.toLowerCase() // uso del toLowerCase() para ignorar mayúsculas y minúsculas
        );
        // si el libro ya existe:
        if(libroExiste){
            console.log(`El libro "${titulo}" ya existe en la biblioteca.`);
            return; //para que ya no ejecute más código, para que salga de la función
        }
        // creación de un nuevo objeto con el libro agregado
        const nuevoLibro = {
            titulo, 
            autor,
            genero,
            disponible
        };
        // agregar el libro al final del array con un push()
        datos.libros.push(nuevoLibro);
        // guardar los cambios
        escribirDatos(datos, () => {
            // callback que se ejecutará cuando se termine de guardar:
            console.log(`El libro "${titulo}" ha sido agregado a la biblioteca.`);
        });
    });
}

// para cambiar la disponibilidad de algún libro, recibiendo título y estado
function actualizarDisponibilidad(titulo, nuevoEstado){
    console.log(`Actualizando la disponibilidad del libro "${titulo}"`);
    // búsqueda del libro con find() y toLowerCase() para ignorar mayúsculas y minúsculas
    leerDatos((datos) => {
        // uso de find() que arroja el primer elemento que cumpla la condición
        const libro = datos.libros.find(libro => libro.titulo.toLowerCase() === titulo.toLowerCase());
        // si no se encontró el libro:
        if(!libro) { // el uso de ! para negación, lo que podría entenderse como "si no hay cierto libro"
            console.log(`No se encontró el libro "${titulo}" en la biblioteca.`);
            return;
        }
        // si el libro ya tiene el estado solicitado:
        if(libro.disponible === nuevoEstado) {
            // los símbolos ? '' : '' indican el uso de un operador condicional: el mensaje varía dependiendo del estado
            console.log(`El libro "${titulo}" ya está "${nuevoEstado ? 'disponible' : 'prestado'}".`);
            return;
        }
        // actualizar los cambios hechos
        libro.disponible = nuevoEstado;
        // guardar cambios
        escribirDatos(datos, () =>{
            console.log(`Disponibilidad actualizada: ${titulo} ahora está ${nuevoEstado ? 'disponible' : 'prestado'}.`);    
        });
    });
}

// para buscar libros por autor, recibiendo el nombre completo o parte del nombre
function buscarPorAutor(autor){
    console.log(`Buscando libros de: ${autor}`);
    // con los datos actuales se usará un filter() para devolver un array con los elementos que cumplan la condición
    leerDatos((datos) => {
        const librosEncontrados = datos.libros.filter(libro =>
            // uso de includes() para buscar un string dentro de otro, "disecciona" los nombres y apellidos
            // es como si la frase "Hola buen día" se dividiera en "hola", "buen", "día"
            libro.autor.toLowerCase().includes(autor.toLowerCase())
        );
        // si no se encontrron libros:
        if(librosEncontrados.length === 0) {
            console.log(`No se encontraron libros de "${autor}" en la biblioteca.`);
            return;
        }
        // si se encontraron libros:
        console.log(`Libros encontrados de "${autor}":`);
        librosEncontrados.forEach((libro, index) => {
            // mostrar qué libros se encontraron:
            console.log(`${index + 1}. "${libro.titulo}" - ${libro.disponible ? 'disponible' : 'prestado'}`);
        }); 
    });
}

// demostración del sistema
console.log("Iniciando sistema de gestión de biblioteca...");

// se usarán setTimeout para ejecutar las funciones en secuencia y con delay distinto
setTimeout(() => {
    mostrarLibros();
}, 1000);

setTimeout(() => {
    agregarLibro("El extranjero", "Albert Camus", "Filosofía", false);
}, 5000);

setTimeout(() => {
    actualizarDisponibilidad("Los Juegos del Hambre", false);
}, 10000);

setTimeout(() => {
    buscarPorAutor("Orwell");
}, 15000);

setTimeout(() => {
    mostrarLibros(); // mostrar todos los cambios, el inventario final
}, 20000);