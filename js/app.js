const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito ");
const listaCursos = document.querySelector("#lista-cursos");

let agregarArticuloscarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //CUANDO AGREGAS UN CURSO PRESIONANDO AGREGAR
  listaCursos.addEventListener("click", agregarCurso);
  //ELIMINA CURSOS DE CARRITO
  carrito.addEventListener("click", eliminarCurso);

  vaciarCarritoBtn.addEventListener("click",()=>{
    // reiniciamos el arreglo
    agregarArticuloscarrito=[]
    limpiarHtml();
  })
}

//FINCIONES
function agregarCurso(e) {
  e.preventDefault(); // para  que no se  suba  al incio  de la pagina  cuando el boton  no tiene  enlace
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement; // navegar  hasta  el padre
    leerDatosCurso(cursoSeleccionado);
  }
}

// funcion para elieminar  cursos del carrito
function eliminarCurso(e){
console.log(e.target.classList)
if(e.target.classList.contains('borrar-curso')){
  const cursoId=e.target.getAttribute('data-id')
  //elimina  del arreglo de articuloscarrito  por el dataid filter
  agregarArticuloscarrito = agregarArticuloscarrito.filter(curso=>curso.id_curso !== cursoId)
 // console.log(agregarArticuloscarrito)
//se vuelve  a interar  sobre  el html del carrito  para actualizar
carritoHtml();
  
}
}

//funcion la  cual va eliminar los cursos seleccionado por el usuario
//LEE EL CONTENIDO  DEL HTML  QUE SE LE DIO CLICK Y EXTRAE LA INFORMACION COMO NOMBRE,IMAGEN,PRECIO
function leerDatosCurso(cursoSeleccionado) {
  console.log(cursoSeleccionado);
  // se va  crear un objeto  con el contenido del curso seleccionado
  const infoCurso = {
    imagen: cursoSeleccionado.querySelector("img").src,
    titulo: cursoSeleccionado.querySelector("h4").textContent, //textconte  se utiliza para extraer el texto
    precio: cursoSeleccionado.querySelector(".precio span").textContent, //textconte  se utiliza para extraer el texto
    id_curso: cursoSeleccionado.querySelector("a").getAttribute("data-id"), // seleccionamos  el id  de cada  curso
    cantidad: 1,
  };
  console.log(infoCurso);
  // revisa  si  un curso ya  esta en el carrito
  //.some   verifica  si  id_curso es igual idcurso de  objeto infocurso
  const existe = agregarArticuloscarrito.some(
    (curso) => curso.id_curso === infoCurso.id_curso
  );
  console.log(existe);
  if (existe) {
    // se actualiza la cantidad
    console.log("ya existe");
    const cursos = agregarArticuloscarrito.map((curso) => {
      if (curso.id_curso === infoCurso.id_curso) {
        curso.cantidad = curso.cantidad + 1;
        return curso; // retorna  los productos  duplicados
      } else {
        return curso; // retorna  los productos no  duplicados
      }
      agregarArticuloscarrito = [...cursos];
    });
  } else {
    // agregamos  el elemento en el carrito
    // se va llenar  el arreglo
    agregarArticuloscarrito = [...agregarArticuloscarrito, infoCurso]; // se le hace una  copia  al arreglo de agregar articulos y se le  ingresa la info del objeto
  }
  console.log(agregarArticuloscarrito);
  
  carritoHtml();


}

//  esta fun cion Muestra en el icono de carrito la informacion de  cada  articulo seleccionado
function carritoHtml() {
  //limpiar  el html
  limpiarHtml();
  //recorreo  y genera el html
  // se va interar  el arreglo  de los  articulos
  agregarArticuloscarrito.forEach((curso) => {
    const row = document.createElement("tr"); // se va crera un tr  en el tbody de html
    row.innerHTML = `
   <td> <img src="${curso.imagen}"width='100'></td>
   <td> ${curso.titulo}</td>
   <td> ${curso.precio}</td>
   <td> ${curso.cantidad}</td>
    <td> <a href="#" class="borrar-curso" data-id="${curso.id_curso}">x</td>
  `;
    //AGREGA EL HTML  EL EN  TBODY
    contenedorCarrito.appendChild(row);
  });
}
//elimina o borra los  duplicados  de os  cursos en html
function limpiarHtml() {
  //contenedorCarrito.innerHTML = ''; forma lenta
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
