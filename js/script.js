$(document).ready(function () {

    // Variables

    // conmuta si false = español al inicio
    // conmuta si true = portugués al inicio
    var conmuta = false;
    var respuesta = ""; // contiene la respuesta recibida
    var claves = []; // contiene las claves del diccionario
    // var clave contiene la clave aleatoria
    var valor = ""; // contiene el valor de la clave
    // var diccionario contiene el diccionario de palabras
    var idioma = { // contiene las traducciones de la interfaz
        "Vocabulario": "Vocabulário",
        "Escriba en portugués:": "Escreva em espanhol:",
        "Comprobar": "Cheque",
        "Cambiar para traducir del portugués al español": "Alterar para traduzir do espanhol para o português",
        "Aceptar": "Aceitar"
    };
    var aleatorio = 0; // contiene el número aleatorio
    var ld = 0; // contiene la longitud de diccionario
    var i = 1; // para iteraciones y apoyo


    // Inicio

    // Obtiene array de las claves del diccionario
    for (var clave in diccionario) {
        if (diccionario.hasOwnProperty(clave)) { //comprueba si tiene clave
            claves.push(clave);
        }
    }
    ld = claves.length;
    // Inicia el texto de la interfaz
    ponerTexto();


    // Eventos

    // Al pulsar el botón "Comprobar"...
    $('#txt3').click(function (e) {
        event.preventDefault(); // No ejecutes el botón
        this.disabled = true;
        comprobar();
    });

    // Al pulsar el checkbox...
    $('#conmutador').click(function (e) {
        conmuta = !conmuta; // swich
        ponerTexto();
    });

    // Al abrir la ventana, pone el foco en el botón
    $('#ventana').on('shown.bs.modal', function (e) {
        $('#txt5').focus();
    });

    // Al cerrar la ventana, limpia y pone el foco en el cuadro
    $('#ventana').on('hidden.bs.modal', function (e) {
        $("#traduccion").val('').focus();
        $("#icono").attr("alt", "icono");
        $("#clave").empty();
        $("#respuesta").empty();
        $("#valor").empty();
        $('#txt3').prop("disabled", false);
    });


    // Funciones

    // Comprueba si la respuesta dada es correcta
    function comprobar() {
        respuesta = $("#traduccion").val();
        if (respuesta == null || respuesta.length == 0 || /^\s*$/.test(respuesta)) {
            if (!conmuta) {
                i = "No hay nada escrito";
            } else {
                i = "Não há nada escrito";
            }
            $("#respuesta").text(i);
            $("#icono").attr("src", "img/warning.svg");
            $("#icono").attr("alt", "Ummm");
            $("#ventana").modal('show');
            $("#txt5").focus();
        } else {
            respuesta = respuesta.trim();
            if (respuesta == valor) {
                $("#icono").attr("src", "img/check.svg");
                $("#icono").attr("alt", "OK");
            } else {
                if (!conmuta) {
                    i = "Debió decir: ";
                } else {
                    i = "Deveria ter dito: ";
                }
                $("#icono").attr("src", "img/circle-x.svg");
                $("#icono").attr("alt", "Error");
                $("#valor").html(i + "<b>" + valor + "</b>");
            }
            $("#clave").text(clave);
            $("#respuesta").text(respuesta);
            $("#ventana").modal('show');
            nuevaTraduccion();
        }
    }


    // Pone el texto de la interfaz en el idioma correcto
    function ponerTexto() {
        i = 1;
        if (!conmuta) {
            for (var clave in idioma) {
                $("#txt" + i).text(clave);
                i++;
            }
        } else {
            for (var clave in idioma) {
                $("#txt" + i).text(idioma[clave]);
                i++;
            }
        }
        nuevaTraduccion();
    }


    // Obtiene y pone una nueva traducción
    function nuevaTraduccion() {
        // Obtiene un número entre 0 y la longitud del diccionario menos 1
        aleatorio = Math.floor(Math.random() * ld);
        clave = claves[aleatorio];
        valor = diccionario[clave];
        if (conmuta) {
            valor = [clave, clave = valor][0]; // intercambia las variables clave y valor
        }
        $("#traduccion").val('').focus();
        $("#palabra").text(clave).hide().fadeIn(300);
    }

});
