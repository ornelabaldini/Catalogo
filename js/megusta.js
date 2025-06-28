// megusta.js - controla la lista Me Gusta, contador y panel lateral con auto cierre

const btnVerMeGusta = document.getElementById('ver-megusta');
const panelMeGusta = document.getElementById('lista-megusta');
const btnCerrarMeGusta = document.getElementById('cerrar-megusta');
const listaMeGusta = document.getElementById('megusta-listado');
const contadorMeGusta = document.getElementById('contador-megusta');

let productosMeGusta = [];
let timeoutCerrar = null;

// Actualiza el contador visible en el botón Me Gusta
function actualizarContador() {
  const cantidad = productosMeGusta.length;
  if (cantidad === 0) {
    contadorMeGusta.hidden = true;
  } else {
    contadorMeGusta.hidden = false;
    contadorMeGusta.textContent = cantidad;
  }
}

// Renderiza la lista de Me Gusta en el panel lateral
function renderizarLista() {
  listaMeGusta.innerHTML = '';
  productosMeGusta.forEach((producto) => {
    const li = document.createElement('li');
    li.textContent = producto;
    listaMeGusta.appendChild(li);
  });
}

// Muestra el panel Me Gusta y programa cierre automático
function mostrarPanel() {
  panelMeGusta.classList.add('activo');
  if (timeoutCerrar) clearTimeout(timeoutCerrar);
  timeoutCerrar = setTimeout(() => {
    ocultarPanel();
  }, 5000);
}

// Oculta el panel Me Gusta y cancela cierre automático
function ocultarPanel() {
  panelMeGusta.classList.remove('activo');
  if (timeoutCerrar) {
    clearTimeout(timeoutCerrar);
    timeoutCerrar = null;
  }
}

// Toggle panel al click en el corazón
btnVerMeGusta.addEventListener('click', () => {
  if (panelMeGusta.classList.contains('activo')) {
    ocultarPanel();
  } else {
    mostrarPanel();
  }
});

// Cierra panel con botón ✖️
btnCerrarMeGusta.addEventListener('click', () => {
  ocultarPanel();
});

// Agrega producto a lista Me Gusta al hacer click en botón
document.querySelectorAll('.agregar-carrito').forEach((boton) => {
  boton.addEventListener('click', (e) => {
    const tarjeta = e.target.closest('.tarjeta');
    if (!tarjeta) return;

    const nombreProducto = tarjeta.querySelector('h3').textContent;

    if (!productosMeGusta.includes(nombreProducto)) {
      productosMeGusta.push(nombreProducto);
      actualizarContador();
      renderizarLista();
      mostrarPanel(); // mostrar panel cuando agrego
    }
  });
});

// Inicialización
actualizarContador();
renderizarLista();
