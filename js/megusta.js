const btnVerMeGusta = document.getElementById('ver-megusta');
const panelMeGusta = document.getElementById('lista-megusta');
const btnCerrarMeGusta = document.getElementById('cerrar-megusta');
const listaMeGusta = document.getElementById('megusta-listado');
const contadorMeGusta = document.getElementById('contador-megusta');

let productosMeGusta = [];
let timeoutCerrar = null;

function actualizarContador() {
  const cantidad = productosMeGusta.length;
  contadorMeGusta.hidden = cantidad === 0;
  contadorMeGusta.textContent = cantidad;
}

function renderizarLista() {
  listaMeGusta.innerHTML = '';
  productosMeGusta.forEach((producto, index) => {
    const li = document.createElement('li');
    li.textContent = producto;

    // Botón para eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '❌';
    btnEliminar.setAttribute('aria-label', `Quitar ${producto} de Me Gusta`);
    btnEliminar.style.marginLeft = '10px';
    btnEliminar.style.cursor = 'pointer';
    btnEliminar.style.background = 'none';
    btnEliminar.style.border = 'none';
    btnEliminar.style.color = '#bc1888';
    btnEliminar.style.fontWeight = 'bold';

    btnEliminar.addEventListener('click', () => {
      productosMeGusta.splice(index, 1);
      actualizarContador();
      renderizarLista();
    });

    li.appendChild(btnEliminar);
    listaMeGusta.appendChild(li);
  });
}

function mostrarPanel() {
  panelMeGusta.classList.add('activo');
  if (timeoutCerrar) clearTimeout(timeoutCerrar);
  timeoutCerrar = setTimeout(ocultarPanel, 5000);
}

function ocultarPanel() {
  panelMeGusta.classList.remove('activo');
  if (timeoutCerrar) {
    clearTimeout(timeoutCerrar);
    timeoutCerrar = null;
  }
}

btnVerMeGusta.addEventListener('click', () => {
  if (panelMeGusta.classList.contains('activo')) {
    ocultarPanel();
  } else {
    mostrarPanel();
  }
});

btnCerrarMeGusta.addEventListener('click', ocultarPanel);

document.querySelectorAll('.megusta-btn').forEach((boton) => {
  boton.addEventListener('click', (e) => {
    const tarjeta = e.target.closest('.tarjeta');
    if (!tarjeta) return;
    const nombreProducto = tarjeta.querySelector('h3').textContent;
    if (!productosMeGusta.includes(nombreProducto)) {
      productosMeGusta.push(nombreProducto);
      actualizarContador();
      renderizarLista();
      mostrarPanel();
    }
  });
});
