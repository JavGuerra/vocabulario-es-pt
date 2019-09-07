// v.0.2

$(document).ready(function () {

    // Variables

    // conmuta: false = lang1 al inicio
    // conmuta: true = lang2 al inicio
    var conmuta = false;
    var respuesta = ""; // contiene la respuesta recibida
    var claves = []; // contiene las claves del diccionario
    // var clave contiene la clave aleatoria
    var valor = ""; // contiene el valor de la clave
    // var diccionario contiene el diccionario de palabras
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
    // inicializa el conmutador por si se recarga la página
    $("#conmutador").prop("checked", false);
    // Inicia el texto de la interfaz
    ponerTextoInterfaz();


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
        ponerTextoInterfaz();
    });

    // Al abrir la ventana, pone el foco en el botón
    $('#ventana').on('shown.bs.modal', function (e) {
        $('#txt5').focus();
    });

    // Al cerrar la ventana, limpia y pone el foco en el cuadro
    $('#ventana').on('hidden.bs.modal', function (e) {
        // ¿Una nueva traducción?
        if ($("#icono").attr("alt") != "Ops...") nuevaTraduccion();
        // Limpia los datos de la ventana tras cerrarse
        $("#icono").attr("alt", "icono");
        $("#clave").empty();
        $("#respuesta").empty();
        $("#valor").empty();
        // Pone el foco y activa el botón
        $("#traduccion").val('').focus();
        $('#txt3').prop("disabled", false);
    });


    // Funciones

    // Comprueba si la respuesta dada es correcta
    function comprobar() {
        respuesta = $("#traduccion").val();
        // ¿Respuesta vacía o sólo con espacios?
        if (respuesta == null || respuesta.length == 0 || /^\s*$/.test(respuesta)) {
            if (!conmuta) {
                i = nada1;
            } else {
                i = nada2;
            }
            $("#respuesta").text(i);
            $("#icono").attr("src", "img/warning.svg");
            $("#icono").attr("alt", "Ops...");
        } else {
            $("#clave").text(clave);
            respuesta = respuesta.trim();
            // Si desea comprobar literalmente, debe usar la siguiente línea:
            // if (respuesta == valor) {
            // En la línea siguiente no toma en cuenta mayúsculas y minúsciulas
            if (respuesta.toLowerCase() == valor.toLowerCase()) {
                // Si respuesta correcta...
                $("#icono").attr("src", "img/check.svg");
                $("#icono").attr("alt", "OK");
                $("#respuesta").text(valor);
            } else {
                // Si respuesta errónea...
                if (!conmuta) {
                    i = debio1;
                } else {
                    i = debio2;
                }
                $("#icono").attr("src", "img/circle-x.svg");
                $("#icono").attr("alt", "Error");
                $("#respuesta").text(respuesta);
                $("#valor").html(i + "<b>" + valor + "</b>");
            }
        }
        // Muestra la ventana de resultado
        $("#ventana").modal('show');
    }


    // Pone la interfaz en el idioma correcto
    function ponerTextoInterfaz() {
        i = 1;
        if (!conmuta) {
            $("html").attr("lang", lang1);
            for (var clave in interfaz) {
                $("#txt" + i).text(clave);
                i++;
            }
        } else {
            $("html").attr("lang", lang2);
            for (var clave in interfaz) {
                $("#txt" + i).text(interfaz[clave]);
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
