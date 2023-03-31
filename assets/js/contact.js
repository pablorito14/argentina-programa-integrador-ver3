
var constraints = {
  nombre: {
    length: {
      minimum: 3,
    }
  },
  email: {
    email:true
  },
  confEmail: { 
    // email:true,
    equality: {
      attribute: "email"
    }
  },
  motivo: {
    // presence: true
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

const contactForm = document.getElementById('contactForm');

// contactForm.nombre.value = 'Pablo';
// contactForm.email.value = 'pablo@pablo.com';
// contactForm.confEmail.value = 'pablo@pablo.com';
// contactForm.motivo.value = 'prestamo'
// contactForm.mensaje.value = 'asldkjasdkas\nkjkasdasda'


contactForm.addEventListener('submit',(event) => {
  event.preventDefault();

  const { nombre,email,confEmail,motivo,mensaje } = contactForm;

  // validaciones
  const invalid = document.getElementsByClassName('invalid-message');
  invalid.invalidNombre.innerHTML = '';

  const invalidInputs = validate({
    nombre:nombre.value,
    email: email.value,
    confEmail: confEmail.value,
    motivo: motivo.value,
    mensaje: mensaje.value
  },constraints,{format:'grouped'});

  if (invalidInputs) {
    if(invalidInputs.nombre){
      invalid.invalidNombre.innerHTML = 'Nombre invalido'
    }

    if(invalidInputs.email){
      invalid.invalidEmail.innerHTML = 'Email invalido'
    }

    if(invalidInputs.confEmail){
      invalid.invalidConfEmail.innerHTML = 'Los correos son diferentes'
    }

    if(invalidInputs.motivo){
      invalid.invalidMotivo.innerHTML = 'Motivo invalido'
    }

    if(invalidInputs.mensaje){
      invalid.invalidMensaje.innerHTML = ' mensaje invalido'
    }
    // console.log(invalidInputs.nombre,invalidInputs.email);
    // nombre.classList.add('invalid-input')
    // nombre.previousElementSibling.classList.add('invalid-label')
    return;
  }

  // validaciones

  const btnEnviar = document.getElementById('btn-enviar');
  // btnEnviar.attr. = true;



  // $('#btn-enviar').attr('disabled',true)
  const consulta = {
    nombre: nombre.value,
    email: email.value,
    motivo: motivo.value,
    mensaje: mensaje.value
  }

  console.log(consulta)
  return;
  setTimeout(() => {
    alert(`Se va a enviar mail a ${consulta.nombre} (${consulta.email}).\nEn consola se puede ver el objeto completo`)
    // $('.spinner-border').hide();
    // $('#btn-enviar').attr('disabled',false)
  }, 1000);

})

