document.addEventListener('DOMContentLoaded', () => {

  // Modal para imagen ampliada
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCerrar = document.getElementById('modal-cerrar');

  document.querySelectorAll('.carousel img').forEach((img) => {
    img.addEventListener('click', () => {
      modal.hidden = false;
      modalImg.src = img.src;
      const card = img.closest('.tarjeta');
      const titulo = card.querySelector('h3')?.textContent || '';
      modalTitle.textContent = titulo;
    });
  });

  modalCerrar.addEventListener('click', () => {
    modal.hidden = true;
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.hidden = true;
    }
  });

  // Carrusel funcionamiento
  document.querySelectorAll('.carousel-container').forEach((container) => {
    const carousel = container.querySelector('.carousel');
    const images = container.querySelectorAll('.carousel img');
    const btnPrev = container.querySelector('.carousel-btn.prev');
    const btnNext = container.querySelector('.carousel-btn.next');
    let index = 0;

    function actualizar() {
      const offset = -index * 100;
      carousel.style.transform = `translateX(${offset}%)`;
    }

    btnNext.addEventListener('click', () => {
      index = (index + 1) % images.length;
      actualizar();
    });

    btnPrev.addEventListener('click', () => {
      index = (index - 1 + images.length) % images.length;
      actualizar();
    });

    actualizar();
  });

});
