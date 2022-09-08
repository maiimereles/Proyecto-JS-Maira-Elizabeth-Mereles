const contenedorTarjetas = document.querySelector(".contenedorTarjetas"),
  btnSaludo = document.getElementById("btnSaludo"),
  nombreUsuario = document.getElementById("nombreUsuario"),
  nombreIngresado = document.getElementById("nombreIngresado"),
  nombreAlumno = document.getElementById("nombreAlumno"),
  apellidoAlumno = document.getElementById("apellidoAlumno"),
  divisionAlumno = document.getElementById("divisionAlumno"),
  notaMatematicas = document.getElementById("notaMatematicas"),
  notaLengua = document.getElementById("notaLengua"),
  notaIngles = document.getElementById("notaIngles"),
  btnAceptar = document.getElementById("btnAceptar");

let listAlumnos = [];

//Saludo de bienvenida al docente
function saludar(nombre) {
  nombreUsuario.innerText = nombre;
}
btnSaludo.addEventListener("click", () => {
  let nombre = nombreIngresado.value;
  saludar(nombre);
});
//fin de saludo de bienvenida al docente

class Alumno {
  constructor(id,nombre,division,notaMate,notaLeng,notaIng,promedio,imagen,aprobado) {
    this.id = id;
    this.nombre = nombre.toUpperCase();
    this.division = division.toUpperCase();
    this.notaMate = notaMate;
    this.notaLeng = notaLeng;
    this.notaIng = notaIng;
    this.promedio = promedio;
    this.imagen = imagen;
    this.aprobado = aprobado;
  }
}

btnAceptar.addEventListener("click", () => {
    let nombreAl = nombreAlumno.value,
    divisionAl = divisionAlumno.value,
    notaMate = parseInt(notaMatematicas.value),
    notaLeng = parseInt(notaLengua.value),
    notaIng = parseInt(notaIngles.value),
    imagen = "./img/alumna.webp",
    newId = listAlumnos[listAlumnos.length-1].id + 1;
    const suma = (a, b, c) => a + b + c;
    const dividir = (a, b) => a / b;
    let promedio = dividir(suma(notaMate, notaLeng, notaIng), 3);
    const alumno = new Alumno(newId,nombreAl,divisionAl,notaMate,notaLeng,notaIng,promedio,imagen,aprobacion(promedio));
    listAlumnos.push(alumno);
    crearTarjetas(listAlumnos, contenedorTarjetas);
});

function aprobacion (promedio){   
  return promedio >= 6 ? "Aprobado":"Desaprobado"; 
}

function guardarDatos () {
    localStorage.setItem("alumnos",JSON.stringify(listAlumnos));
}

function recuperarDatos () {
    let arrayAlumnos = JSON.parse(localStorage.getItem("alumnos"));
    if(arrayAlumnos != null){
      listAlumnos.splice(0);
      listAlumnos.push(...arrayAlumnos)
      crearTarjetas(listAlumnos, contenedorTarjetas);
    }else{
      createFetch()
    }
}

function createFetch (){
    fetch("../js/data.json")
        .then(response => response.json().then(data => {
          listAlumnos.push(...data)
          crearTarjetas(listAlumnos, contenedorTarjetas);
          
        }))
        .catch(err => console.log(err))
}

function crearTarjetas(listAlumnos, contenedorTarjetas) {
  guardarDatos ();
  contenedorTarjetas.innerHTML = "";
  for (const item of listAlumnos) {
  let tarjeta = document.createElement("div");
  tarjeta.className = "card my-5 bg-light";
  tarjeta.id = `${item.id}`;
  tarjeta.innerHTML = `
      <h4 class="card-header">${item.nombre}</h4>
      <img src="${item.imagen}" class="card-img-top imagenProducto" alt="${item.descripcion_corta}">
      <div class="card-body">
          <p class="card-text">Nota matemáticas:${item.notaMate}</p>
          <p class="card-text">Nota lengua:${item.notaLeng}</p>
          <p class="card-text">Nota inglés:${item.notaIng}</p>
          <span id="promedio">Promedio:${item.promedio}</span>
          <p class="card-text">Aprobado:${item.aprobado}</p>
      </div>
      <div class="card-footer"><a href="promedio.html" class="btn btn-warning">Más información</a></div>`;
    contenedorTarjetas.append(tarjeta);
  }
}

//Bucador
function buscar(array, criterio, input) {
  return array.filter((item) => item[criterio].includes(input));
}
window.onload=()=>{
  recuperarDatos () ;
}
let busqueda = document.querySelectorAll(".inputBusqueda");
busqueda.forEach((input) => {
  input.addEventListener("input", () => {
    let cadena = input.value.toUpperCase();
    console.log(cadena);
    crearTarjetas(buscar(listAlumnos, input.id, cadena), contenedorTarjetas);
  });
}); 
//Fin buscador
