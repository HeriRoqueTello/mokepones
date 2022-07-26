const sectionAttacts = document.getElementById('select-attack');
//Activamos el hidden de la seccion de ataques
const sectionRestart = document.getElementById('menu');

// Asignar el mokepon del jugador a una variable
const btnMokeponPlayer = document.getElementById('btn__select');
// Asignar el btn__restart a una variable
const btnRestart = document.getElementById('btn__restart');

// Asignar btn select a una variable
const btnSelectMokepon = document.getElementById('select-mokepon');

const spanMokeponPlayer = document.getElementById('mokeponPlayer');
const spanMokeponEnemy = document.getElementById('mokeponEnemy');

// Variable asignada para los ataques seleccionados
const msgAttackEnemy = document.getElementById('attackSelectEnemy');
const msgAttackPlayer = document.getElementById('attackSelectPlayer');
// Declarar las variables para la vida de los mokepones
const spanLifesPlayer = document.getElementById('lifesPlayer');
const spanLifesEnemy = document.getElementById('lifesEnemy');

//Variables asignados para el historial de ataques
const seccionMessage = document.getElementById('result');
const messageAttackPlayer = document.getElementById('messageAttackPlayer');
const messageAttackEnemy = document.getElementById('messageAttackEnemy');

const containerCards = document.getElementById('containerCards');
const cardAttacks = document.getElementById('cardAttacks');

const sectionViewMap = document.getElementById('viewMap');
const mapa = document.getElementById('mapa');

let jugadorId = null;
let enemigoId = null;
// Variable con todos los mokepones
let mokepones = [];
// Variables globales
let mokeponesEnemigos = [];
let attackPlayer = [];
let attackEnemy = [];
let optionDeMokepones;
let mokeponPlayer;
let optionAttacks;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let inputLagnostelvis;
let inputTucapalma;
let inputPydos;
let mascotaJugadorObjeto;
let attackMokeponEnemy;
let btnAttackFire;
let btnAttackWater;
let btnAttackGround;
let botones = [];
let indexAttackPlayer;
let indexAttackEnemy;

let victoriasJugador = 0;
let victoriasEnemigo = 0;
// Variable de vidas
let lifePlayer = 3;
let lifeEnemy = 3;

let lienzo = mapa.getContext('2d');
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = './assets/mokemap.png';

let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 750;

if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueBuscamos = (anchoDelMapa * 600) / 800;
mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

// Variable de numero de combates realizados
let numberCombat;

class Mokepon {
  constructor(name, photo, life, type, fotoMapa, id = null) {
    this.id = id;
    this.name = name;
    this.photo = photo;
    this.life = life;
    this.type = type;
    this.attacks = [];
    this.width = 40;
    this.height = 40;
    this.x = aleatorio(0, mapa.width - this.width);
    this.y = aleatorio(0, mapa.height - this.height);
    this.mapPhoto = new Image();
    this.mapPhoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  pintarMokepon() {
    lienzo.drawImage(this.mapPhoto, this.x, this.y, this.width, this.height);
  }
}

let hipodoge = new Mokepon(
  'Hipodoge',
  './assets/mokepons_mokepon_hipodoge_attack.png',
  '3',
  'Agua',
  'https://raw.githubusercontent.com/platzi/curso-programacion-basica/65-clases-methods/programar/mokepon/assets/hipodoge.png'
);
let capipepo = new Mokepon(
  'Capipepo',
  './assets/mokepons_mokepon_capipepo_attack.png',
  '3',
  'Fuego',
  'https://raw.githubusercontent.com/platzi/curso-programacion-basica/65-clases-methods/programar/mokepon/assets/capipepo.png'
);
let ratigueya = new Mokepon(
  'Ratigueya',
  './assets/mokepons_mokepon_ratigueya_attack.png',
  '3',
  'Tierra',
  'https://raw.githubusercontent.com/platzi/curso-programacion-basica/65-clases-methods/programar/mokepon/assets/ratigueya.png'
);
let lagnostelvis = new Mokepon(
  'Lagnostelvis',
  'https://raw.githubusercontent.com/platzi/curso-programacion-basica/59-detalles-finales-again/programar/mokepon/assets/mokepons_mokepon_langostelvis_attack.png',
  '4',
  'Fuego y Agua',
  'https://raw.githubusercontent.com/platzi/curso-programacion-basica/59-detalles-finales-again/programar/mokepon/assets/mokepons_mokepon_langostelvis_attack.png'
);
let tucapalma = new Mokepon(
  'Tucapalma',
  'https://raw.githubusercontent.com/platzi/curso-programacion-basica/59-detalles-finales-again/programar/mokepon/assets/mokepons_mokepon_tucapalma_attack.png',
  '4',
  'Agua y Tierra',
  'https://raw.githubusercontent.com/platzi/curso-programacion-basica/59-detalles-finales-again/programar/mokepon/assets/mokepons_mokepon_tucapalma_attack.png'
);
let pydos = new Mokepon(
  'Pydos',
  'https://raw.githubusercontent.com/platzi/curso-programacion-basica/59-detalles-finales-again/programar/mokepon/assets/mokepons_mokepon_pydos_attack.png',
  '4',
  'Tierra y Fuego',
  'https://raw.githubusercontent.com/platzi/curso-programacion-basica/59-detalles-finales-again/programar/mokepon/assets/mokepons_mokepon_pydos_attack.png'
);

const hipogodeAtaques = [
  { nombre: '💧', id: 'btn__water' },
  { nombre: '💧', id: 'btn__water' },
  { nombre: '💧', id: 'btn__water' },
  { nombre: '🔥', id: 'btn__fire' },
  { nombre: '🌱', id: 'btn__ground' },
];

hipodoge.attacks.push(...hipogodeAtaques);

const capipepoAtaques = [
  { nombre: '🌱', id: 'btn__ground' },
  { nombre: '🌱', id: 'btn__ground' },
  { nombre: '🌱', id: 'btn__ground' },
  { nombre: '💧', id: 'btn__water' },
  { nombre: '🔥', id: 'btn__fire' },
];

capipepo.attacks.push(...capipepoAtaques);

const ratigueyaAtaques = [
  { nombre: '🔥', id: 'btn__fire' },
  { nombre: '🔥', id: 'btn__fire' },
  { nombre: '🔥', id: 'btn__fire' },
  { nombre: '💧', id: 'btn__water' },
  { nombre: '🌱', id: 'btn__ground' },
];
ratigueya.attacks.push(...ratigueyaAtaques);

const lagnostelvisAtaques = [
  { nombre: '🔥', id: 'btn__fire' },
  { nombre: '💧', id: 'btn__water' },
  { nombre: '🔥', id: 'btn__fire' },
  { nombre: '💧', id: 'btn__water' },
  { nombre: '🌱', id: 'btn__ground' },
];

lagnostelvis.attacks.push(...lagnostelvisAtaques);

const tucapalmaAtaques = [
  { nombre: '🔥', id: 'btn__fire' },
  { nombre: '💧', id: 'btn__water' },
  { nombre: '🌱', id: 'btn__ground' },
  { nombre: '💧', id: 'btn__water' },
  { nombre: '🌱', id: 'btn__ground' },
];

tucapalma.attacks.push(...tucapalmaAtaques);

const pydosAtaques = [
  { nombre: '🔥', id: 'btn__fire' },
  { nombre: '🌱', id: 'btn__fire' },
  { nombre: '🔥', id: 'btn__fire' },
  { nombre: '💧', id: 'btn__water' },
  { nombre: '🌱', id: 'btn__ground' },
];

pydos.attacks.push(...pydosAtaques);

mokepones.push(hipodoge, capipepo, ratigueya, lagnostelvis, tucapalma, pydos);

//  Iniciar juego de Mokepon
function startGame() {
  // Activamos el hidden de la seccion de ataques
  sectionAttacts.style.display = 'none';
  sectionRestart.style.display = 'none';
  sectionViewMap.style.display = 'none';

  mokepones.forEach((mokepon) => {
    optionDeMokepones = `
      <input type="radio" class="mokepon" name="mokepon" id="${mokepon.name}" />
      <label class="card__mokepon" for="${mokepon.name}">
        <p>${mokepon.name}</p>
        <img src="${mokepon.photo}" alt="${mokepon.name}"/>
      </label>
    `;
    containerCards.innerHTML += optionDeMokepones;
    inputHipodoge = document.getElementById('Hipodoge');
    inputCapipepo = document.getElementById('Capipepo');
    inputRatigueya = document.getElementById('Ratigueya');
    inputLagnostelvis = document.getElementById('Lagnostelvis');
    inputTucapalma = document.getElementById('Tucapalma');
    inputPydos = document.getElementById('Pydos');
  });

  // Agregamos el evento click al botton
  btnMokeponPlayer.addEventListener('click', selectMokeponPlayer);
  // Agregamos el evento click al botton
  btnRestart.addEventListener('click', restartGame);
  unirseAlJuego();
  // Declarar las variables para la vida de los mokepones
  let spanLifesPlayer = document.getElementById('lifesPlayer');
  let spanLifesEnemy = document.getElementById('lifesEnemy');
}

function unirseAlJuego() {
  fetch('http://localhost:8080/unirse').then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta);
        jugadorId = respuesta;
      });
    }
  });
}

// Funcion seleccionar Mokepon del jugador
function selectMokeponPlayer() {
  // Validar el mokepon seleccionado y escribirlo en un span
  if (inputHipodoge.checked) {
    // Asignamos el mokepon al span con el textContent, tambien se puede hacer con el innerHMTL
    spanMokeponPlayer.textContent = inputHipodoge.id;
    mokeponPlayer = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    // Asignamos el mokepon al span con el textContent, tambien se puede hacer con el innerHMTL
    spanMokeponPlayer.textContent = inputCapipepo.id;
    mokeponPlayer = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    // Asignamos el mokepon al span con el textContent, tambien se puede hacer con el innerHMTL
    spanMokeponPlayer.textContent = inputRatigueya.id;
    mokeponPlayer = inputRatigueya.id;
  } else if (inputLagnostelvis.checked) {
    spanMokeponPlayer.textContent = inputLagnostelvis.id;
    mokeponPlayer = inputLagnostelvis.id;
  } else if (inputTucapalma.checked) {
    spanMokeponPlayer.textContent = inputTucapalma.id;
    mokeponPlayer = inputTucapalma.id;
  } else if (inputPydos.checked) {
    spanMokeponPlayer.textContent = inputPydos.id;
    mokeponPlayer = inputPydos.id;
  } else {
    alert('No seleccionaste ningun Mokepon!');
    return;
  }
  btnSelectMokepon.style.display = 'none';
  seleccionarMokepon(mokeponPlayer);
  //Canvas/Lienzo del mapa
  sectionViewMap.style.display = 'flex';
  iniciarMapa();
  extraerAtaques(mokeponPlayer);

  // Llamamos a la funcion blockAttackMokepon para bloquear los ataques que no tiene el mokepon elegido
  //blockAttackMokepon();
}

function seleccionarMokepon(mokeponPlayer) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mokepon: mokeponPlayer,
    }),
  });
}

function extraerAtaques(mokeponPlayer) {
  let attacks;
  for (let i = 0; i < mokepones.length; i++) {
    if (mokeponPlayer === mokepones[i].name) {
      attacks = mokepones[i].attacks;
    }
  }
  mostrarAtaques(attacks);
}
function mostrarAtaques(attacks) {
  attacks.forEach((attacks) => {
    optionAttacks = `
    <button class="btn__attack btnAtaque" id="${attacks.id}">${attacks.nombre}</button>
    `;
    cardAttacks.innerHTML += optionAttacks;
  });
  // Asignar el ataque del jugador a una variable
  btnAttackFire = document.getElementById('btn__fire');
  // Asignar el ataque del jugador a una variable
  btnAttackWater = document.getElementById('btn__water');
  // Asignar el ataque del jugador a una variable
  btnAttackGround = document.getElementById('btn__ground');

  botones = document.querySelectorAll('.btnAtaque');
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      if (e.target.textContent === '🔥') {
        attackPlayer.push('🔥');
        console.log(attackPlayer);
        boton.style.background = '#112f58';
        boton.disabled = true;
        //btnAttackFire.style.cursor = 'not-allowed';
      } else if (e.target.textContent === '💧') {
        attackPlayer.push('💧');
        console.log(attackPlayer);
        boton.style.background = '#112f58';
        boton.disabled = true;
        //btnAttackWater.style.cursor = 'not-allowed';
      } else if (e.target.textContent === '🌱') {
        attackPlayer.push('🌱');
        console.log(attackPlayer);
        boton.style.background = '#112f58';
        boton.disabled = true;
        //btnAttackGround.style.cursor = 'not-allowed';
      }
      if (attackPlayer.length === 5) {
        enviarAtaques();
      }
    });
  });
}

function enviarAtaques() {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ataques: attackPlayer,
    }),
  });

  intervalo = setInterval(obtenerAtaques, 50);
}
function obtenerAtaques() {
  fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`).then(function (res) {
    if (res.ok) {
      res.json().then(function ({ ataques }) {
        if (ataques.length === 5) {
          attackEnemy = ataques;
          mokeponCombat();
        }
      });
    }
  });
}
// Funcion para seleccionar aleatoriamente el mokepon enemigo
function selectMokeponEnemy(enemigo) {
  spanMokeponEnemy.innerHTML = enemigo.name;
  attackMokeponEnemy = enemigo.attacks;
  // let randomMokeponEnemy = aleatorio(0, mokepones.length - 1);
  // spanMokeponEnemy.innerHTML = mokepones[randomMokeponEnemy].name;
  // attackMokeponEnemy = mokepones[randomMokeponEnemy].attacks;
  secuenciaAtaque();
}

// Funcion para seleccionar el ataque enemigo aleatoriamente
function randomAttackEnemy() {
  let randomAttackEnemy;
  while (attackEnemy.length < 5) {
    randomAttackEnemy = aleatorio(0, attackMokeponEnemy.length - 1);
    attackEnemy.push(attackMokeponEnemy[randomAttackEnemy].nombre);
  }
  console.log(attackEnemy);
  startCombat();
}

function startCombat() {
  if (attackPlayer.length === 5) {
    mokeponCombat();
  }
}

function indexAmbasJugadas(player, enemy) {
  indexAttackPlayer = attackPlayer[player];
  indexAttackEnemy = attackEnemy[enemy];
}

// Funcion para el combate de los ataques
function mokeponCombat() {
  clearInterval(intervalo);
  for (let i = 0; i < attackPlayer.length; i++) {
    if (attackPlayer[i] === attackEnemy[i]) {
      indexAmbasJugadas(i, i);
      createMessage('EMPATE');
    } else if (attackPlayer[i] == '🔥' && attackEnemy[i] == '🌱') {
      indexAmbasJugadas(i, i);
      createMessage('GANASTE');
      victoriasJugador++;
      spanLifesPlayer.innerHTML = victoriasJugador;
    } else if (attackPlayer[i] == '💧' && attackEnemy[i] == '🔥') {
      indexAmbasJugadas(i, i);
      createMessage('GANASTE');
      victoriasJugador++;
      spanLifesPlayer.innerHTML = victoriasJugador;
    } else if (attackPlayer[i] == '🌱' && attackEnemy[i] == '💧') {
      indexAmbasJugadas(i, i);
      createMessage('GANASTE');
      victoriasJugador++;
      spanLifesPlayer.innerHTML = victoriasJugador;
    } else {
      indexAmbasJugadas(i, i);
      createMessage('PERDISTE');
      victoriasEnemigo++;
      spanLifesEnemy.innerHTML = victoriasEnemigo;
    }
  }

  // Llamamos a la funcion statusMokepon para saber si un mokepon murio
  statusMokepon();
}

// Funcion para verificar que el mokepon sigue con vidas
function statusMokepon() {
  if (victoriasJugador === victoriasEnemigo) {
    createMessageWin(
      'Resultado del combate: <span>Empate!</span> <p>Tu mokepon ' +
        spanMokeponPlayer.textContent +
        ' y el mokepon enemigo ' +
        spanMokeponEnemy.textContent +
        ' siguen vivos ✌!</p>'
    );
  } else if (victoriasJugador > victoriasEnemigo) {
    createMessageWin(
      'Resultado del combate: <span>Ganaste!</span> <p>Tu mokepon ' +
        spanMokeponPlayer.textContent +
        ' asesino al mokepon ' +
        spanMokeponEnemy.textContent +
        ' del enemigo 🏆!</p>'
    );
  } else {
    createMessageWin(
      'Resultado del combate: <span>Perdiste!</span> <p>Tu mokepon ' + spanMokeponPlayer.textContent + ' murio 😭!</p>'
    );
  }
}
// Funcion para crear mensajes para el historial de combates
function createMessage(message) {
  let newAttackPlayer = document.createElement('p');
  let newAttackEnemy = document.createElement('p');

  seccionMessage.innerHTML = message;
  newAttackPlayer.innerHTML = indexAttackPlayer;
  newAttackEnemy.innerHTML = indexAttackEnemy;

  // let newMessage = document.createElement('p');
  //newMessage.textContent = 'Combate: ' + attackPlayer + ' vs ' + attackEnemy + '! ' + message;
  messageAttackPlayer.appendChild(newAttackPlayer);
  messageAttackEnemy.appendChild(newAttackEnemy);
}
// Funcion para crear mensaje de WIN
function createMessageWin(messageEnd) {
  seccionMessage.innerHTML = messageEnd;

  sectionRestart.style.display = '';
}
// Funcion para reiniciar el juego
function restartGame() {
  location.reload();
}
// Funcion para generar numero aleatorio entre el min y max
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarCanvas() {
  mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;

  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
  lienzo.drawImage(
    mascotaJugadorObjeto.mapPhoto,
    mascotaJugadorObjeto.x,
    mascotaJugadorObjeto.y,
    mascotaJugadorObjeto.width,
    mascotaJugadorObjeto.height
  );
  mascotaJugadorObjeto.pintarMokepon();

  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

  mokeponesEnemigos.forEach(function (mokepon) {
    mokepon.pintarMokepon();
    revisarColision(mokepon);
  });
}

function enviarPosicion(x, y) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      x,
      y,
    }),
  }).then(function (res) {
    if (res.ok) {
      res.json().then(function ({ enemigos }) {
        console.log(enemigos);

        mokeponesEnemigos = enemigos.map(function (enemigo) {
          let mokeponEnemigo = null;
          const mokeponNombre = enemigo.mokepon.nombre || '';
          if (mokeponNombre === 'Hipodoge') {
            mokeponEnemigo = new Mokepon(
              'Hipodoge',
              './assets/mokepons_mokepon_hipodoge_attack.png',
              '3',
              'Agua',
              'https://raw.githubusercontent.com/platzi/curso-programacion-basica/65-clases-methods/programar/mokepon/assets/hipodoge.png',
              enemigo.id
            );
          } else if (mokeponNombre === 'Capipepo') {
            mokeponEnemigo = new Mokepon(
              'Capipepo',
              './assets/mokepons_mokepon_capipepo_attack.png',
              '3',
              'Fuego',
              'https://raw.githubusercontent.com/platzi/curso-programacion-basica/65-clases-methods/programar/mokepon/assets/capipepo.png',
              enemigo.id
            );
          } else if (mokeponNombre === 'Ratigueya') {
            mokeponEnemigo = new Mokepon(
              'Ratigueya',
              './assets/mokepons_mokepon_ratigueya_attack.png',
              '3',
              'Tierra',
              'https://raw.githubusercontent.com/platzi/curso-programacion-basica/65-clases-methods/programar/mokepon/assets/ratigueya.png',
              enemigo.id
            );
          } else if (mokeponNombre === 'Lagnostelvis') {
            mokeponEnemigo = new Mokepon(
              'Lagnostelvis',
              'https://raw.githubusercontent.com/platzi/curso-programacion-basica/59-detalles-finales-again/programar/mokepon/assets/mokepons_mokepon_langostelvis_attack.png',
              '4',
              'Fuego y Agua',
              'https://raw.githubusercontent.com/platzi/curso-programacion-basica/59-detalles-finales-again/programar/mokepon/assets/mokepons_mokepon_langostelvis_attack.png',
              enemigo.id
            );
          } else if (mokeponNombre === 'Tucapalma') {
            mokeponEnemigo = new Mokepon(
              'Tucapalma',
              'https://raw.githubusercontent.com/platzi/curso-programacion-basica/59-detalles-finales-again/programar/mokepon/assets/mokepons_mokepon_tucapalma_attack.png',
              '4',
              'Agua y Tierra',
              'https://raw.githubusercontent.com/platzi/curso-programacion-basica/59-detalles-finales-again/programar/mokepon/assets/mokepons_mokepon_tucapalma_attack.png',
              enemigo.id
            );
          } else if (mokeponNombre === 'Pydos') {
            mokeponEnemigo = new Mokepon(
              'Pydos',
              'https://raw.githubusercontent.com/platzi/curso-programacion-basica/59-detalles-finales-again/programar/mokepon/assets/mokepons_mokepon_pydos_attack.png',
              '4',
              'Tierra y Fuego',
              'https://raw.githubusercontent.com/platzi/curso-programacion-basica/59-detalles-finales-again/programar/mokepon/assets/mokepons_mokepon_pydos_attack.png',
              enemigo.id
            );
          }

          mokeponEnemigo.x = enemigo.x;
          mokeponEnemigo.y = enemigo.y;
          return mokeponEnemigo;
        });
      });
    }
  });
}

function moverDerecha() {
  mascotaJugadorObjeto.velocidadX = 5;
}
function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = 5;
}
function moverIzquierda() {
  mascotaJugadorObjeto.velocidadX = -5;
}
function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -5;
}

function detenerMovimiento() {
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(event) {
  switch (event.key) {
    case 'a':
      moverIzquierda();
      break;
    case 'd':
      moverDerecha();
      break;
    case 'w':
      moverArriba();
      break;
    case 's':
      moverAbajo();
      break;
    default:
      break;
  }
}

function iniciarMapa() {
  mascotaJugadorObjeto = obtenerObjetoMascota(mokeponPlayer);
  intervalo = setInterval(pintarCanvas, 50);
  window.addEventListener('keydown', sePresionoUnaTecla);
  window.addEventListener('keyup', detenerMovimiento);
}

function obtenerObjetoMascota(mokeponPlayer) {
  for (let i = 0; i < mokepones.length; i++) {
    if (mokeponPlayer === mokepones[i].name) {
      return mokepones[i];
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.height;
  const derechaEnemigo = enemigo.x + enemigo.width;
  const izquierdaEnemigo = enemigo.x;

  const arribaMascota = mascotaJugadorObjeto.y;
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.height;
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.width;
  const izquierdaMascota = mascotaJugadorObjeto.x;
  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }
  detenerMovimiento();
  clearInterval(intervalo);
  enemigoId = enemigo.id;
  sectionAttacts.style.display = 'flex';
  sectionViewMap.style.display = 'none';
  // Llamamos a la funcion selectMokeponEnemy para seleccionar al mokepon enemigo
  selectMokeponEnemy(enemigo);
}

// Evento de carga, para inicar el juego
window.addEventListener('load', startGame);
