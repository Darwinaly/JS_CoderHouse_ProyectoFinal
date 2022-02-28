
//EVENTO DE CLIC EN EL BOTON DE ENVIAR PARA HACER EL CALCULO
 
$("#buttonCalcular").click(function(){
    var interes = $("#tasaInteres").val();     
    var monto = $("#inputInversion").val();    
    var tiempo = $("#inputPlazo").val();  

    $("#alertaTasaInteres").slideUp(200);
    $("#alertaInputInversion").slideUp(200);
    $("#alertaInputPlazo").slideUp(200);
    
    // Evaluo si lo campos fueron completados
    if (interes === ""){
        $("#alertaTasaInteres").slideDown(500);
    }
    if (monto === ""){
        $("#alertaInputInversion").slideDown(500);
    }
    if (tiempo === ""){
        $("#alertaInputPlazo").slideDown(500);
    }
    if (interes > 1){
        $("#alertaTasaInteres").slideUp(200);
    }
    if (monto > 1){
        $("#alertaInputInversion").slideUp(200);
    }
    if (tiempo > 1){
        $("#alertaInputPlazo").slideUp(200);
    }

    //Convierto la variable interes en un valor calculable
    interes=(1+(interes/100));                 
    
    //Calculo de la ganancia final
    var resultado = parseFloat(monto * (interes)**tiempo).toFixed(2);         
 
    //Muestro el resultado en la tarjeta HTML
    if (interes>=1 && monto>=1 && tiempo>=1){
        let resultadoEjercicio = $("#resultadoEjercicio"); 
        resultadoEjercicio.text("Segun los datos provistos, usted recibira: " + resultado+ " de la moneda deseada en base a la inversion, tasa y plazo indicados"); 
        $("#aside").slideDown(1000);
    }
    
});


//==> CLIC EN ELIMINAR

$("#buttonEliminar").click(function(){
    $("#tasaInteres").val("");     
    $("#inputInversion").val("");    
    $("#inputPlazo").val("");  
    $("#alertaTasaInteres").slideUp(200);
    $("#alertaInputInversion").slideUp(200);
    $("#alertaInputPlazo").slideUp(200);
    $("#resultadoEjercicio").text("Aun no hay resultados"); 
    $("#aside").slideUp(200);
});

$("#buttonEliminar2").click(function(){
    $("#envioNombre").val(""); 
    $("#envioCorreo").val(""); 
    $("#envioTelefono").val(""); 
    $("#alertaNombre").slideUp(200); 
    $("#alertaCorreo").slideUp(200); 
    $("#alertaTelefono").slideUp(200); 
    $("#contacto").slideUp(1000);
    $("#aside").slideUp(1500);
    $("#cardbody").text("No realizo ejercicios de inversion."); 
});


// ==> CLIC EN CONTACTAR

$("#buttonContactar").click(function(){
    $("#contacto").slideDown(2000);
    window.scrollTo({top: 0, behavior: 'smooth'});
});

// ==> CLIC EN CERRAR CONTACTAR

$("#buttonClose").click(function(){
    $("#contacto").slideUp(2000);
});

// ==> EFECTO DE ANIMACION EN TITULO H4
$("h4").animate({
    opacity: '1'},
    "slow",
);

//==> EFECTO DE ANIMACION EN CUERPO DE LA CARD
$("#card-body").animate({
    height: '200px'},
    "slow",
);




//==> DEFINO UNA CLASE PARA GUARDAR LOS DATOS DEL FORMULARIO DE LA CALCULADORA COMO OBJETO | REALIZADO A PEDIDO DE LA TUTORA
class Calculos  {
    constructor(interes, monto, plazo){
        this.interes = interes;
        this.monto = monto;
        this.plazo = plazo;
    }
}

//==> CREO Y GUARDO EL OBJETO EN UN LOCAL STORAGE Y POSTERIORMENTE MODIFICO UNA TARJETA DE RESULTADOS QUE APARECE EN EL FORMULARIO DE CONTACTO
$("#buttonCalcular").click(function(){                                                                               //Activo el proceso con el boton de calcular
    if ($("#tasaInteres").val() != "" || $("#inputInversion").val() != "" || $("#inputPlazo").val() != ""){          // Si los campos fueron completados avanza con la creacion.
        calculos = new Calculos($("#tasaInteres").val(), $("#inputInversion").val(), $("#inputPlazo").val())         // Creo el objeto
        calculosJson = JSON.stringify(calculos);                                                                     // Lo convierto en Json
        localStorage.setItem("calculos", calculosJson);                                                              // Guardo el objeto en un local storage
    }


    // TOMO LOS DATOS DEL LOCAL STORAGE PARA CREAR UNA TARJETA QUE APARECERA EN EL FORMULARIO DE CONTACTO
    let resumenResultados = JSON.parse(calculosJson);
    let interes = resumenResultados.interes;
    let monto = resumenResultados.monto;
    let plazo = resumenResultados.plazo;
    let carbody = $("#cardbody"); 
    carbody.text("Se enviara el ultimo ejercicio realizado. Tasa de interes del: "+interes+"% | Inversion de: $"+monto+" | Perdiodo de: "+plazo+" años"); 
});


// MODIFICO LA INFORMACION DE LAS OPCIONES DE INVERSION EN BASE A SI SON LOCALES O INTERNACIONALES
// TOMO LA INFO DEL ARCHIVO JSON

const URLGET = "js/datos.json";
$("#local").click(function(){
    $.get(URLGET, function(respuesta, estado) {
        if(estado === "success") {
            let misDatos = respuesta;
            for (const dato of misDatos){
                if(dato.id === 0){
                    let btn1 = $("#btn1"); 
                    btn1.text(dato.nombre);
                    btn1.val(dato.value);
                }
                if(dato.id === 1){
                    let btn2 = $("#btn2"); 
                    btn2.text(dato.nombre);
                    btn2.val(dato.value);
                }
                if(dato.id === 2){
                    let btn3 = $("#btn3"); 
                    btn3.text(dato.nombre);
                    btn3.val(dato.value);
                }
            }
        }
    })
});

$("#internacional").click(function(){
    $.get(URLGET, function(respuesta, estado) {
        if(estado === "success") {
            let misDatos = respuesta;
            for (const dato of misDatos){
                if(dato.id === 3){
                    let btn1 = $("#btn1"); 
                    btn1.text(dato.nombre);
                    btn1.val(dato.value);
                }
                if(dato.id === 4){
                    let btn2 = $("#btn2"); 
                    btn2.text(dato.nombre);
                    btn2.val(dato.value);
                }
                if(dato.id === 5){
                    let btn3 = $("#btn3"); 
                    btn3.text(dato.nombre);
                    btn3.val(dato.value);
                }
            }
        }
    })
});

// ENVENTOS DE CLICS EN LOS BOTONES PARA ASIGNAR LA TASA DE INTERES AL FORM

$("#btn1").click(function() {
    $("#tasaInteres").val(btn1.value);
});

$("#btn2").click(function(){
    $("#tasaInteres").val(btn2.value);
});

$("#btn3").click(function(){
    $("#tasaInteres").val(btn3.value);
});



//==> CREACION DE UNA CLASE PARA GUARDAR LOS DATOS DEL FORM DE CONTACTO Y PUJARLOS AL JSON


class envioFormulario  {
    constructor(nombre, correo, telefono, ejercicio){
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.ejercicio = ejercicio;
    }
}



$("#buttonEnviar").click(function(){                                                                              
    if ($("#envioNombre").val() != "" && $("#envioCorreo").val() != "" && $("#envioTelefono").val() != ""){
        contacto = new envioFormulario ($("#envioNombre").val(), $("#envioCorreo").val(), $("#envioTelefono").val(), $("#cardbody").text())       
        contactoJson = JSON.stringify(contacto); 
        console.log(contactoJson);
        $("#envioNombre").val(""); 
        $("#envioCorreo").val(""); 
        $("#envioTelefono").val(""); 
        $("#cardbody").text("No realizo ejercicios de inversion."); 
        $("#contacto").slideUp(2000);
        $("#tasaInteres").val("");     
        $("#inputInversion").val("");    
        $("#inputPlazo").val(""); 
        $("#resultadoEjercicio").text("Aun no hay resultados");
        $("#aside").slideUp(1500); 
        $("#notificacionEnviado").delay(3000).slideDown(1000).delay(3000).slideUp(3000);

    }


    // ALERTAS
    $("#alertaNombre").slideUp(500);
    $("#alertaCorreo").slideUp(500);
    $("#alertaTelefono").slideUp(500);
    if ($("#envioNombre").val() === ""){
        $("#alertaNombre").slideDown(1000);
    }
    if ($("#envioCorreo").val() === ""){
        $("#alertaCorreo").slideDown(1000);
    }
    if ($("#envioTelefono").val() === ""){
        $("#alertaTelefono").slideDown(1000);
    }    
    $("#alertaNombre").slideUp(1500);
    $("#alertaCorreo").slideUp(1500);
    $("#alertaTelefono").slideUp(1500);
});    

