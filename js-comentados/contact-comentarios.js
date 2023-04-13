
/**
 *  este objeto es la configuracion de la libreria validatejs que usamos
 * para validar el formulario
 * 
 * las reglas de validacion son las siguientes
 *  - input nombre: longitud mayor o igual a 3 caracteres
 *  - input email: tiene que ser de tipo email (el patron a cumplir es a@a.a como minimo, lo ideal una mejor validacion pero lleva tiempo)
 *  - input emailConf: tiene que ser igual al valor del input email
 *  - select motivo: quedo en 5 de cuando era texto pero cumple, mientras no se cambie el value dentro de los optiones del select
 *                  si alguno de los value de los options tuviera solo 3 letras y lo seleccionaramos no validaria
 *  - textarea mensaje: longitud mayor o igual a 10 caracteres
 * */
var constraints = {
  nombre: {
    length: {
      minimum: 3,
    }
  },
  email: {
    email:true
  },
  emailConf: { 
    equality: {
      attribute: "email"
    }
  },
  motivo: {
    length: {
      minimum: 5
    }
  },
  mensaje: {
    length: {
      minimum: 10
    }
  }
}

// buscamos en el DOM el formulario por su id
const contactForm = document.getElementById('contactForm');

/** 
 * creamos una funcion para limpiar todos los mensajes de error y 
 * sacarle el borde rojo a los inputs cada vez que apretamos el boton de enviar 
 * a esta funcion le pasos el formulario completo y todos los divs que contienen los errores 
 * (estos divs los vamos a buscar cuando presionemos el boton submit)
 * 
 * */
const limpiarErrores = (contactForm,invalidMessages) => {

  /**
   * en la siguiente linea lo que hacemos es separar cada elemento segun su name (IMPORTANTE) en una costante separada
   * IMPORTANTE: cada una de estas constantes es el input completo, no el valor. Esto permite aplicarle estilos
   * la linea de abajo equivale a hacer
   * - const nombre = contactForm.nombre
   * - const email = contactForm.email
   * - const emailConf = contactForm.emailConf
   * - const motivo = contactform.motivo
   * - const mensaje = contactForm.mensaje
   * 
   * si pusieramos const cualquier_cosa = contactForm.cualquier_cosa
   * al no estar cualquier_cosa dentro del formulario, obtendriamos undefined
   */
  const { nombre,email,emailConf,motivo,mensaje } = contactForm;

  /**
   * invalidMessages contiene todos los mensajes de error de los inputs identificados por su id
   * entonces para acceder a cada uno accedemos con invalidMessages.id_del_campo,
   * luego de eso tenemos que sacarle la el borde rojo a los inputs con error, 
   * ese borde rojo se aplica con la clase invalid-input y vamos a usar classList para acceder
   * a todas las clases del input y en este caso remove para eliminar una de ellas
   * 
   * estas lineas lo que hacen es:
   *  - con innerHTML = '' borran el contenido del mensaje
   *  - con classList.remove('invalid-input') eliminamos la clase de adentro de ( ) del input
   */
  
  invalidMessages.invalidNombre.innerHTML = '';
  nombre.classList.remove('invalid-input');
  
  invalidMessages.invalidEmail.innerHTML = '';
  email.classList.remove('invalid-input');
  
  invalidMessages.invalidEmailConf.innerHTML = '';
  emailConf.classList.remove('invalid-input');
  
  invalidMessages.invalidMotivo.innerHTML = '';
  motivo.classList.remove('invalid-input');
  
  invalidMessages.invalidMensaje.innerHTML = '';
  mensaje.classList.remove('invalid-input');
}

// escuchamos el evento submit del formulario para esperar a que se envie
contactForm.addEventListener('submit',(event) => {
  // evitamos el comportamiento por defecto que seria recargar la pagina
  event.preventDefault();


  // al igual que en la funcion mas arriba, generamos una constante por cada unput segun su name
  const { nombre,email,emailConf,motivo,mensaje } = contactForm;

  // validaciones

  // buscamos dentro del DOM todos los elementos que tengan la clase invalid-message
  const invalidMessages = document.getElementsByClassName('invalid-message');

  /**
   * llamamos a la funcion que definimos antes para limpiar todos los mensajes antes de validar nuevamente
   * esto se hace por si escribimos solamente el nombre y enviamos de nuevo, ese campo no deberia mostrar 
   * errores pero el resto de los campos si
   */
  limpiarErrores(contactForm,invalidMessages)


  /**
   * ahora pasamos a la validacion
   * generamos un objeto que va a contener la respuesta  de cada una de las validaciones que el enviemos en el objeto
   * la forma de usar validate es pasarle {campo1:valor1,campo2:valor2,etc} 
   * usando los que se declararon en las reglas de validacion (contraints), luego le pasamos las reglas
   * y por ultimo como queremos obtener la respuesta, en este caso la respuesta con todos los campos vacios seria algo como:
   * invalidInputs = {
   *     nombre: ["Nombre is too short (minimum is 3 characters)"],
   *     email: ["Email is not a valid email"],
   *     motivo: ["Motivo is too short (minimum is 5 characters)"],
   *     mensaje: ["Mensaje is too short (minimum is 10 characters)"]
   * }
   *
   * si completaramos el nombre responderia algo como esto
   * invalidInputs = {
   *     email: ["Email is not a valid email"],
   *     motivo: ["Motivo is too short (minimum is 5 characters)"],
   *     mensaje: ["Mensaje is too short (minimum is 10 characters)"]
   * }
   *
   */
  const invalidInputs = validate({
    nombre:nombre.value,
    email: email.value,
    emailConf: emailConf.value,
    motivo: motivo.value,
    mensaje: mensaje.value
  },constraints,{format:'grouped'});


  // una vez que tenemos la respuesta de las validaciones peroguntamos si contiene algo
  // si las validaciones estan bien invalidInputs = undefined y la condicion del if no se cumple
  if (invalidInputs) {
    // posteriormente vamos a ir preguntando input por input si paso la validacion
    // recordamos que si pasa la validacion no aparece en el array entonces invalidInputs.nombre = undefined
    if(invalidInputs.nombre){
      // si nombre tiene errores, escribimos el mensaje de error y agregamos la clase invalid-input al input
      // asi como con classList.remove eliminabamos una clase de un elemento, para agregar una clase es .add
      invalidMessages.invalidNombre.innerHTML = 'Ingrese su nombre (al menos 3 caracteres)';
      nombre.classList.add('invalid-input');
    }

    if(invalidInputs.email){
      invalidMessages.invalidEmail.innerHTML = 'Ingrese su correo con un formato válido';
      email.classList.add('invalid-input');
    }

    if(invalidInputs.emailConf){
      invalidMessages.invalidEmailConf.innerHTML = 'Los correos ingresados no coinciden';
      emailConf.classList.add('invalid-input');
    }

    if(invalidInputs.motivo){
      invalidMessages.invalidMotivo.innerHTML = 'Seleccione un motivo de consulta';
      motivo.classList.add('invalid-input');
    }

    if(invalidInputs.mensaje){
      invalidMessages.invalidMensaje.innerHTML = 'Ingrese su mensaje o consulta (al menos 10 caracteres)';
      mensaje.classList.add('invalid-input');

    }
    // si entro aca significa que hay errores, por lo tanto ponemos un return para que no continue con
    // lo que seria un envio de mail, este return corta la ejecucion y no sigue con las lineas de abajo
    return;
  }

  // validaciones

  // buscamos el elemento btn-enviar en DOM para hacer una pequeña animacion
  // que cuando "enviamos" un mail, el boton diga "enviando..." mientras lo procesa
  const btnEnviar = document.getElementById('btn-enviar');
  // cambiamos el texto del boton
  btnEnviar.value = 'Enviando...';

  // generamos un objeto que seria el que tendriamos que enviar al backend para que haga el envio del mail
  // notese que no es necesario agregar en el objeto la confirmacion del email, ese campo lo usamos para
  // validar que el cliente haya no se haya equivocado cuando escribio el mail
  // al haber generado una constante por cada input por separado, accedemos a sus valores con value
  const consulta = {
    nombre: nombre.value,
    email: email.value,
    motivo: motivo.value,
    mensaje: mensaje.value
  }
  
  /**
   * setTimeout usado para simular una demora como si se tuviera que enviar un correo de verdad
   */
  setTimeout(() => {
    // esto es sweetAlert2 para hacer un poco mas lindas las alertas. usarlo es sumamente facil y tiene muuuuuchas configuraciones
    // Swal.fire() dispara la alerta, dentro de ( ) tiene que ir un objeto de configuracion, en este caso:
    // title: titulo (formato string),
    // text: mensaje que vamos a mostrar (formato string),
    // icon: el icono que se va a mostrar (formato string con valores predefindos ['success','info','error',y algunos mas que no  me acuerdo ja])
    
    // las ultimas 3 configuraciones son opciones, pero interesantes
    // allowOutsideClick: true o false, esta opcion permite o no cerrar la alerta haciendo click afuera de ella
    // showCloseButton: true o false, esta opcion muestra o no la X para cerrar la alerta en la esquina superior derecha
    // confirmButtonText: texto del boton (formato string) 

    Swal.fire({
      title: '¡Formulario completo!',
      text: `Se va a enviar mail a ${consulta.nombre} (${consulta.email}).\nEn consola se puede ver el objeto completo`,
      icon: 'success',
      allowOutsideClick: false,
      showCloseButton: true,
      confirmButtonText: 'Cerrar'
    })

    // despues de "enviado" el mail, volvemos a cambiar el texto del boton a Enviar que es el valor original
    btnEnviar.value = 'Enviar';
  }, 1000);

})

