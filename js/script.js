let valor = 0.000;
let activo = false;
let intervalo = null;
let incrementoPorSegundo = 0.00221;


function actualizarIncrementoPorSalario() {
    const salario = parseFloat(document.getElementById("salarioMensualInput").value);
    if (!isNaN(salario) && salario > 0) {
        incrementoPorSegundo = salario / 576000; // 160 h/mes * 60 min * 60 s
        localStorage.setItem('salarioMensual', salario); // Guardar salario
        alert(`Nuevo incremento por segundo: ${incrementoPorSegundo.toFixed(6)} €`);
    } else {
        alert("Introduce un salario mensual válido.");
    }
}

const salarioGuardado = localStorage.getItem('salarioMensual');
if (salarioGuardado) {
    incrementoPorSegundo = parseFloat(salarioGuardado) / 576000;
    document.getElementById("salarioMensualInput").value = salarioGuardado;
}

let ultimoTiempo = Date.now();

const contadorElem = document.getElementById("contador");
const btnReanudar = document.getElementById("btnReanudar");
const estadoTexto = document.getElementById("estadoTexto");

// Cargar valor y estado previo
if (localStorage.getItem("valorContador")) {
    valor = parseFloat(localStorage.getItem("valorContador"));
}
if (localStorage.getItem("ultimoTiempo")) {
    ultimoTiempo = parseInt(localStorage.getItem("ultimoTiempo"));
}

function actualizarContador() {
    contadorElem.textContent = valor.toFixed(3) + " €";
    localStorage.setItem("valorContador", valor.toFixed(3));
}

function actualizarEstadoVisual() {
    if (activo) {
        btnReanudar.classList.add("activo");
        btnReanudar.textContent = "En marcha";
        estadoTexto.textContent = "En marcha";
    } else {
        btnReanudar.classList.remove("activo");
        btnReanudar.textContent = "Reanudar";
        estadoTexto.textContent = "En pausa";
    }
}

function calcularTodas() {
    const dias = parseInt(document.getElementById("diasInput").value) || 0;
    const horas = parseInt(document.getElementById("horasInput").value) || 0;
    const minutos = parseInt(document.getElementById("minutosInput").value) || 0;

    const segundosDias = dias * 8 * 60 * 60;
    const segundosHoras = horas * 60 * 60;
    const segundosMinutos = minutos * 60;

    const gananciaDias = segundosDias * incrementoPorSegundo;
    const gananciaHoras = segundosHoras * incrementoPorSegundo;
    const gananciaMinutos = segundosMinutos * incrementoPorSegundo;

    const total = gananciaDias + gananciaHoras + gananciaMinutos;

    document.getElementById("resultadoGanancia").textContent = `Ganancia por días: ${gananciaDias.toFixed(2)} €`;
    document.getElementById("resultadoGananciaHoras").textContent = `Ganancia por horas: ${gananciaHoras.toFixed(2)} €`;
    document.getElementById("resultadoGananciaMinutos").textContent = `Ganancia por minutos: ${gananciaMinutos.toFixed(2)} €`;
    document.getElementById("resultadoTotal").textContent = `Ganancia total estimada: ${total.toFixed(2)} €`;

    document.getElementById("montoAgregar").value = total.toFixed(4);
}


function loop() {
    const ahora = Date.now();
    const segundosPasados = (ahora - ultimoTiempo) / 1000;
    ultimoTiempo = ahora;

    if (activo) {
        valor += incrementoPorSegundo * segundosPasados;
        actualizarContador();
    }

    localStorage.setItem("ultimoTiempo", ultimoTiempo.toString());
    requestAnimationFrame(loop); // más fiable que setInterval
}

function pausarContador() {
    activo = false;
    actualizarEstadoVisual();
}

function reanudarContador() {
    activo = true;
    ultimoTiempo = Date.now();
    actualizarEstadoVisual();
}

function limpiarContador() {
    pausarContador();
    valor = 0.000;
    actualizarContador();
}

function agregarDinero() {
    const monto = parseFloat(document.getElementById("montoAgregar").value);
    if (!isNaN(monto)) {
        valor += monto;
        actualizarContador();
        document.getElementById("montoAgregar").value = "";
    } else {
        alert("Introduce una cantidad válida.");
    }
}

// Guardar antes de cerrar
window.addEventListener("beforeunload", () => {
    localStorage.setItem("valorContador", valor.toFixed(3));
    localStorage.setItem("ultimoTiempo", Date.now().toString());
});

actualizarContador();
actualizarEstadoVisual();
requestAnimationFrame(loop); // empieza la lógica

function calcularGanancia() {
    let dias = parseInt(document.getElementById("diasInput").value);
    if (!isNaN(dias) && dias > 0) {
        let segundosTotales = dias * 60 * 60 * 8;
        let ganancia = segundosTotales * incrementoPorSegundo;
        document.getElementById("resultadoGanancia").textContent =
            `Ganancia estimada en ${dias} día(s): ${ganancia.toFixed(2)} €`;
    } else {
        alert("Introduce un número válido de días.");
    }
}

function calcularGananciaHoras() {
    let horas = parseInt(document.getElementById("horasInput").value);
    if (!isNaN(horas) && horas > 0) {
        let segundosTotales = horas * 60 * 60;
        let ganancia = segundosTotales * incrementoPorSegundo;
        document.getElementById("resultadoGananciaHoras").textContent =
            `Ganancia estimada en ${horas} hora(s): ${ganancia.toFixed(2)} €`;
    } else {
        alert("Introduce un número válido de horas.");
    }
}

function calcularGananciaMinutos() {
    let minutos = parseInt(document.getElementById("minutosInput").value);
    if (!isNaN(minutos) && minutos > 0) {
        let segundosTotales = minutos * 60;
        let ganancia = segundosTotales * incrementoPorSegundo;
        document.getElementById("resultadoGananciaMinutos").textContent =
            `Ganancia estimada en ${minutos} hora(s): ${ganancia.toFixed(2)} €`;
    } else {
        alert("Introduce un número válido de minutos.");
    }
}



//Inverso



let modoInverso = false;

function alternarModo() {
    modoInverso = !modoInverso;

    document.getElementById("calculadoraNormal").style.display = modoInverso ? "none" : "block";
    document.getElementById("calculadoraInversa").style.display = modoInverso ? "block" : "none";
}

function calcularInverso() {
    const monto = parseFloat(document.getElementById("montoInverso").value);
    const resultadoDiv = document.getElementById("resultadoInverso");

    resultadoDiv.innerHTML = "";

    if (isNaN(monto) || monto <= 0) {
        resultadoDiv.textContent = "Introduce un monto válido mayor a 0.";
        return;
    }



    const segundosTotales = monto / incrementoPorSegundo;

    const dias = Math.floor(segundosTotales / (8 * 60 * 60));
    const restoDespuesDias = segundosTotales % (8 * 60 * 60);

    const horas = Math.floor(restoDespuesDias / (60 * 60));
    const restoDespuesHoras = restoDespuesDias % (60 * 60);

    const minutos = Math.floor(restoDespuesHoras / 60);

    if (dias > 0) resultadoDiv.innerHTML += `🕒 ${dias} jornada(s) de 8h<br>`;
    if (horas > 0) resultadoDiv.innerHTML += `🕓 ${horas} hora(s)<br>`;
    if (minutos > 0) resultadoDiv.innerHTML += `🕔 ${minutos} minuto(s)<br>`;

    if (dias === 0 && horas === 0 && minutos === 0) {
        resultadoDiv.textContent = "Ese monto es demasiado pequeño para representar tiempo.";
    }
}

const contenedorCalculadoras = document.getElementById("contenedorCalculadoras");
const flechaToggle = document.getElementById("flechaToggle");

flechaToggle.addEventListener("click", () => {
    contenedorCalculadoras.classList.toggle("oculto");

    if (contenedorCalculadoras.classList.contains("oculto")) {
        flechaToggle.innerHTML = '<i class="fa-solid fa-plus"></i>';
    } else {
        flechaToggle.innerHTML = '<i class="fa-solid fa-minus"></i>';
    }
});

let dias = parseInt(localStorage.getItem("contadorDias")) || 0;
const inputDias = document.getElementById("inputDias");

// Mostrar valor inicial
inputDias.value = dias;

// Botones + y –
function cambiarDias(delta) {
  dias = Math.max(0, dias + delta);
  actualizarDias();
}

// Cambios manuales en el input
inputDias.addEventListener("input", () => {
  let nuevoValor = parseInt(inputDias.value);
  dias = isNaN(nuevoValor) || nuevoValor < 0 ? 0 : nuevoValor;
  actualizarDias();
});

function actualizarDias() {
  inputDias.value = dias;
  localStorage.setItem("contadorDias", dias);
}

