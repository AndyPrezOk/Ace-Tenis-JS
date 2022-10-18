// Variables
//array para crear las cards de la pagina de inicio

const seccion_clases = document.querySelector('.contenedor-clases');
const seccion_reservadas = document.querySelector('.reservadas');
const contenido = document.querySelector('contenido');
const listado_reservadas = [];
const divisa = '$';
let form = document.getElementById("form");
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let correo = document.getElementById("correo");
let cod = document.getElementById("codigo");
let cant = document.getElementById("cantidad");

const tipo = document.querySelector("#tipo");
const dia = document.querySelector("#dia");
const hora = document.querySelector("#hora");
const datos_alumnos = document.querySelector("#datos");
const datos_filtrados = document.querySelector(".filtro");
let alumnos = [];
let nuevo_array = [];

if (localStorage.alumnos != null) {
    alumnos = alumnos = JSON.parse(localStorage.alumnos);

}


const clases = [
    {
        cod: 1,
        name: "Clases particulares",
        price: 2000,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo3WuTEcSfwIagYewXbUOCOFORyevnfuS-pg&usqp=CAU"
    },
    {
        cod: 2,
        name: "Escuela de tenis",
        price: 1500,
        img: "https://libertadsunchales.com.ar/wp-content/uploads/2020/03/FB_IMG_1583364253805.jpg"
    },
    {
        cod: 3,
        name: "Clases de entrenamiento",
        price: 2000,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMsPQ3sNhxdA4tIjUs24mawhxm2sSO49JyTQ&usqp=CAU"
    },

];
//Eventos 
document.addEventListener('DOMContentLoaded', () => {
    mostrar_clases();
})

//Funciones
function mostrar_clases() {
    clases.forEach(function (clase) {
        //Scripting
        const div_clase = document.createElement('div');
        div_clase.classList.add('card');


        const img_clase = document.createElement('img');
        img_clase.src = clase.img;
        img_clase.classList.add('img_clase');

        const titulo_clase = document.createElement('h2');
        titulo_clase.textContent = clase.name;
        titulo_clase.className = "titulo-card";

        /* const precio_clase = document.createElement('span');
        precio_clase.textContent = clase.precio;
        precio_clase.className = "titulo-card"; */

        const precio_clase = document.createElement('p');
        precio_clase.classList.add('card-text');
        precio_clase.textContent = `${divisa}${clase.price}`;


        const btn_reserva = document.createElement('a');
        btn_reserva.className = "btn-reserva btn-lg";
        btn_reserva.textContent = "Reservar clases";

        btn_reserva.onclick = function () {
            mostrar_reservas(clase.cod)


        }

        div_clase.appendChild(img_clase);
        div_clase.appendChild(titulo_clase);
        div_clase.appendChild(precio_clase);
        div_clase.appendChild(btn_reserva);

        seccion_clases.appendChild(div_clase);

    })

}

function mostrar_reservas(filtro = 'default') {
    let clasesLista = (filtro !== "default") ?
        clases.filter(clase => clase.cod == filtro) :
        clases;


    let constructor = ``;
    clasesLista.forEach((clase) => {
        constructor = `
        <div class="text-center id="${clase.name}">
            <h5 class=" titulo mensaje">Seleccionaste: ${clase.name}</h5>
        </div>
            
        <div><a class="btn btn-info btn-lg " href="formulario.html">Completa el formulario</a> </div>` 



    });
    document.getElementById("contenido").innerHTML = constructor;

}

let contenedor = document.getElementById("clima");

fetch("https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires&units=metric&appid=3ffd09edd113986d5fc1a6855fff7eb2")
    .then(response => response.json())
    .then(data => {
        contenedor.innerHTML = `<p> ${data.name}
                                 ${data.main.temp}°C </p>`;

    });

class Clases_tenis {
    constructor(nombre, apellido, tipo, dia, hora, correo) {
        // this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.tipo = tipo;
        this.dia = dia;
        this.hora = hora;
        this.correo = correo;

    }
}


form.addEventListener("submit", function (e) {
    e.preventDefault();

    //const id =document.getElementById();

    if (correo.value == "") {
        Swal.fire({
            title: "Completa el correo para poder contactarnos",
            icon: "warning",
            button: "OK",
        })


    } else {
        Swal.fire({
            title: 'Inscripción exitosa',
            icon: "success",
            button: "OK",
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        }) 

        let clases = new Clases_tenis(nombre.value, apellido.value, tipo.value, dia.value, hora.value, correo.value);
        alumnos.push(clases);

        form.reset();
        actualizar_storage();
        leer_storage();
        
    }
   
    function actualizar_storage() {
        let alumnos_JSON = JSON.stringify(alumnos);
        localStorage.setItem("alumnos", alumnos_JSON);

    }

    function leer_storage() {

        if (localStorage.getItem('alumnos') !== null) {
            let recuperando_alumnos = localStorage.getItem("alumnos");
            recuperando_alumnos = JSON.parse(recuperando_alumnos);
            mostrar_alumnos(recuperando_alumnos);
           
        }
    }


})
function mostrar_alumnos(alumnos) {
    datos_alumnos.innerHTML = " ";

    const titulo_datalle = document.createElement("h4");
    titulo_datalle.textContent = "Detalle";
    datos_alumnos.appendChild(titulo_datalle);

    alumnos.forEach(function (alumno) {

        //const divlista = document.createElement("div");
        const texto = document.createElement("p");
        texto.textContent = `${alumno.nombre + " "}${alumno.apellido + " "}${alumno.tipo + " "} ${alumno.dia + " "}${alumno.hora}`;
        datos_alumnos.appendChild(texto);

    })
    const boton_exit = document.createElement("a");
    boton_exit.textContent = 'Finalizar';
    boton_exit.className = "btn btn-info btn-lg"; href = "formulario.html"
    boton_exit.onclick = function () {
        borrar_storage();
    }
    datos_alumnos.appendChild(boton_exit);
}

function borrar_storage() {
    
    localStorage.clear();
    datos_alumnos.textContent = '';
    window.location.href = 'index.html';
    
}



