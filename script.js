function go(page){document.querySelectorAll('.page').forEach(x=>x.classList.toggle('active',x.id===page));document.querySelectorAll('nav button').forEach(x=>x.classList.toggle('active',x.dataset.go===page));window.scrollTo(0,0)}document.querySelectorAll('[data-go]').forEach(x=>x.addEventListener('click',()=>go(x.dataset.go)));document.getElementById('formJugadores').addEventListener('submit', e => {
    e.preventDefault();

    const formulario = e.target;
    const datos = new FormData(formulario);
    const jugador = Object.fromEntries(datos.entries());

    const jugadores = JSON.parse(localStorage.getItem('jugadoresClub') || '[]');
    jugadores.push(jugador);

    localStorage.setItem('jugadoresClub', JSON.stringify(jugadores));

    document.getElementById('mensajeJugador').textContent =
        'Jugador registrado correctamente.';

    formulario.reset();
});document.getElementById('guardarAsistencia').addEventListener('click',()=>document.getElementById('mensajeAsistencia').textContent='Ejemplo: asistencia guardada correctamente.');document.getElementById('buscar').addEventListener('click',()=>document.getElementById('mensajeAsistencia').textContent='Se muestran los jugadores de ejemplo.');

function mostrarJugadoresEnAsistencias() {
    const tabla = document.getElementById('listaAsistencias');
    const jugadores = JSON.parse(localStorage.getItem('jugadoresClub') || '[]');

    tabla.innerHTML = '';

    jugadores.forEach((jugador, indice) => {
        if (!jugador.nombre) return;

        const fila = document.createElement('tr');

        [indice + 1, jugador.nombre, jugador.posicion].forEach(dato => {
            const celda = document.createElement('td');
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        const celdaAsistencia = document.createElement('td');
        const casilla = document.createElement('input');
        casilla.type = 'checkbox';
        celdaAsistencia.appendChild(casilla);
        fila.appendChild(celdaAsistencia);

        tabla.appendChild(fila);
    });
}

mostrarJugadoresEnAsistencias();

document.getElementById('formJugadores').addEventListener(
    'submit',
    () => setTimeout(mostrarJugadoresEnAsistencias, 0)
);