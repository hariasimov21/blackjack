// PATRÓN MÓDULO
// función anónima autoinvocada
const miModulo = (() => {
    'use strict';


    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K']

    let puntosJugadores = [];
    /* 
        let puntosJugador = 0;
        let puntosComputadoras = 0; */

    // referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas');
    const puntosHTML = document.querySelectorAll('small');


    // Esta función Inicializa el Juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    };


    // esta funcion crea un nuevo deck
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos) {
            for (let esp of especiales)
                deck.push(esp + tipo);
        }

        return _.shuffle(deck);

    }

    // Esta función me permite tomar na carta

    const pedircarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        return deck.pop(); /* [Math.floor(Math.random() * deck.length)] */
        // deck.splice(carta, 1);

    }

    //valor carta

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 :
            valor * 1;

        /*     isNaN(valor) ? (puntos = (valor === 'A') ? 11 : 10) : (puntos = valor * 1)
    
            console.log(puntos); */
    };

    // acumular puntos
    // turno: 0 = primer jugador y el ultimo sera la PC

    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);

    }

    // TURNO DE LA COMPUTADORA

    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadoras = 0;

        do {
            const carta = pedircarta();
            puntosComputadoras = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputadoras < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();

    };

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadoras] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadoras === puntosMinimos) {
                alertify.alert('ATENCIÓN', 'nadie gana :(');
            } else if (puntosMinimos > 21) {
                alertify.alert('ATENCIÓN', 'Computadora gana');
            } else if (puntosComputadoras > 21) {
                alertify.alert('ATENCIÓN', 'Jugador Gana');
            } else {
                alertify.alert('ATENCIÓN', 'Computadora Gana');

            };

        }, 10);
    }

    // eventos

    btnPedir.addEventListener('click', () => {
        const carta = pedircarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });

    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);

    });

    btnNuevo.addEventListener('click', () => {

        inicializarJuego();

    });

    return {
        nuevoJuego: inicializarJuego
    }

})();




/* <img class="carta" src="assets/cartas/2C.png" alt="carta"> */