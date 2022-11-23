const gridDc = document.querySelector("[data-grid-dc]");
let primeiroCardDc = "";
let segundoCardDc = "";
const jogador = document.querySelector("[data-jogador]");
const tempo = document.querySelector("[data-tempo]");
const modo = document.querySelector("[data-modo]");
const tentativas = document.querySelector("[data-tentativas]");
let vitoria = false;

const vencedores = localStorage.getItem("vencedores") || [];
const modal = document.querySelector("[data-container-modal]");
const mensagem = document.querySelector("[data-mensagem]");
const jogarNovamente = document.querySelector("[data-jogar-novamente]");
const modalNick = document.querySelector("[data-modal-nick]");
const modalTempo = document.querySelector("[data-modal-tempo]");
const modalTentativas = document.querySelector("[data-modal-tentativas]");

const personargens = [
  "aquaman",
  "arlequina",
  "batman",
  "flash",
  "lanterna-verde",
  "mulher-gato",
  "mulher-maravilha",
  "coringa",
  "supergirl",
  "super-homem",
];

function criarElemento(tag, classe) {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  return elemento;
}

function criarCard(personargem) {
  const card = criarElemento("div", "card");
  const front = criarElemento("div", "face front");
  const back = criarElemento("div", "face back-dc");

  front.style.backgroundImage = `url(../images/dc/${personargem}.png)`;
  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revelarCard);
  card.setAttribute("data-personargem", personargem);
  return card;
}

function revelarCard({ target }) {
  if (target.parentNode.className.includes("revelarCard")) {
    return;
  }
  if (primeiroCardDc === "") {
    target.parentNode.classList.add("revelarCard");
    primeiroCardDc = target.parentNode;
  } else if (segundoCardDc === "") {
    target.parentNode.classList.add("revelarCard");
    segundoCardDc = target.parentNode;

    checarCards();
  }
}

function checarCards() {
  if (
    primeiroCardDc.dataset.personargem === segundoCardDc.dataset.personargem
  ) {
    primeiroCardDc.firstChild.classList.add("desabilitarCard");
    segundoCardDc.firstChild.classList.add("desabilitarCard");
    primeiroCardDc = "";
    segundoCardDc = "";

    checarVitoria();
  } else {
    setTimeout(() => {
      primeiroCardDc.classList.remove("revelarCard");
      segundoCardDc.classList.remove("revelarCard");
      primeiroCardDc = "";
      segundoCardDc = "";
    }, 1000);
  }
  tentativas.innerHTML -= 1;
  if (tentativas.innerHTML <= 0 && vitoria === false) {
    clearInterval(this.loop);

    setTimeout(() => {
      mensagem.innerText = "Infelizmente, você perdeu";
      modalNick.innerText = localStorage.getItem("player");
      modalTempo.innerText = tempo.innerHTML;
      modalTentativas.innerText = "0";
      modal.classList.add("ativo");
    }, 500);
  }
}

function checarVitoria() {
  const cardsDesabilitados = document.querySelectorAll(".desabilitarCard");
  let numeroTentativas = 0;
  if (modo.innerHTML === "Fácil") {
    numeroTentativas = 20;
  } else if (modo.innerHTML === "Médio") {
    numeroTentativas = 16;
  } else if (modo.innerHTML === "Difícil") {
    numeroTentativas = 12;
  }
  if (cardsDesabilitados.length === 20) {
    vitoria = true;
    clearInterval(this.loop);
    setTimeout(() => {
      mensagem.innerText = "Infelizmente, você perdeu";
      modalNick.innerText = localStorage.getItem("player");
      modalTempo.innerText = tempo.innerHTML;
      modalTentativas.innerText = tentativas.innerText;
      mensagem.innerText = "Parabéns, você ganhou!";
      modal.classList.add("ativo");
    }, 500);
    vencedores.push({
      jogador: localStorage.getItem("player"),
      tempo: tempo.innerHTML,
      modo: modo.innerHTML,
    });
    localStorage.setItem("vencedores", JSON.stringify(vencedores));
  }
}

function carregarJogo() {
  const duplicarPersonargens = [...personargens, ...personargens];
  const embaralharArray = duplicarPersonargens.sort(() => Math.random() - 0.5);
  embaralharArray.forEach((personargem) => {
    const card = criarCard(personargem);
    gridDc.appendChild(card);
  });
}

function fecharModal() {
  modal.classList.remove("ativo");
}

function comecarTempo() {
  this.loop = setInterval(() => {
    const tempoAtual = +tempo.innerHTML;
    tempo.innerHTML = tempoAtual + 1;
  }, 1000);
}

window.onload = () => {
  jogador.innerHTML += localStorage.getItem("player");
  modo.innerHTML = localStorage.getItem("dificuldade");
  if (modo.innerHTML === "Fácil") {
    tentativas.innerHTML = 30;
  } else if (modo.innerHTML === "Médio") {
    tentativas.innerHTML = 25;
  } else if (modo.innerHTML === "Difícil") {
    tentativas.innerHTML = 20;
  }
  carregarJogo();
  comecarTempo();
};
