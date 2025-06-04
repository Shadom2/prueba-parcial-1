document.addEventListener('DOMContentLoaded', () => {
  const temaBtn = document.getElementById('temaBtn');
  const body = document.body;
  const form = document.getElementById('registroForm');
  const nombreInput = document.getElementById('nombre');
  const correoInput = document.getElementById('correo');
  const carreraInput = document.getElementById('carrera');
  const listaParticipantes = document.getElementById('listaParticipantes');

  // Cambiar tema claro/oscuro
  temaBtn.addEventListener('click', () => {
    body.classList.toggle('tema-oscuro');
  });

  // Validar formulario antes de enviar
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (
      nombreInput.value.trim() === '' ||
      correoInput.value.trim() === '' ||
      carreraInput.value.trim() === ''
    ) {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }

    alert(`¡Gracias por registrarte, ${nombreInput.value}!`);
    form.reset();
  });

  // Cargar participantes aleatorios de la API
  fetch('https://randomuser.me/api/?results=5')
    .then(response => response.json())
    .then(data => {
      const participantes = data.results;
      participantes.forEach(persona => {
        const div = document.createElement('div');
        div.classList.add('participante');

        div.innerHTML = `
          <img src="${persona.picture.medium}" alt="Foto de ${persona.name.first} ${persona.name.last}">
          <p>${persona.name.first} ${persona.name.last}</p>
        `;

        listaParticipantes.appendChild(div);
      });
    })
    .catch(error => {
      listaParticipantes.innerHTML = '<p>No se pudieron cargar los participantes.</p>';
      console.error('Error al cargar participantes:', error);
    });
});
