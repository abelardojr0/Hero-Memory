const input = document.querySelector("[data-input]");
const button = document.querySelector("[data-button]");
const form = document.querySelector("[data-form]");
let selecionarEscolha = false;

function validarInput({ target }) {
  // VALIDANDO TAMANHO DO NICKNAME DIGITADO
  if (target.value.length >= 3) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "");
  }
}

function enviarSubmit(event) {
  // ENTRANDO NO JOGO
  event.preventDefault();
  localStorage.setItem("player", input.value); // GUARDO O NOME DO JOGADOR NO LS

  escolhas.forEach((escolha) => {
    // CHECANDO QUAL TEMA O JOGADOR ESCOLHEU
    if (
      escolha.previousElementSibling.getAttribute("id") === "marvel" &&
      escolha.className.includes("escolha-ativa") // SE A ESCOLHA É A MARVEL E ELA TA ATIVADA,
    ) {
      window.location = "pages/marvel.html"; //ENTÃO VAI PARAR A PÁGINA DA MARVEL
    } else if (
      escolha.previousElementSibling.getAttribute("id") === "dc" &&
      escolha.className.includes("escolha-ativa")
    ) {
      window.location = "pages/dc.html";
    }
  });

  dificuldades.forEach((dificuldade) => {
    // CHECANDO QUAL DIFICULDADE FOI SELECIONADA
    if (
      dificuldade.getAttribute("for") === "facil" &&
      dificuldade.className.includes("dificuldade-ativa")
    ) {
      localStorage.setItem("dificuldade", "Fácil");
    } else if (
      dificuldade.getAttribute("for") === "medio" &&
      dificuldade.className.includes("dificuldade-ativa")
    ) {
      localStorage.setItem("dificuldade", "Médio");
    } else if (
      dificuldade.getAttribute("for") === "dificil" &&
      dificuldade.className.includes("dificuldade-ativa")
    ) {
      localStorage.setItem("dificuldade", "Difícil");
    }
  });
}

input.addEventListener("input", validarInput);
form.addEventListener("submit", enviarSubmit);

//ESCOLHA DE TEMA
const escolhas = document.querySelectorAll("[data-escolha]");

function ativarEscolha({ target }) {
  if (target.parentNode.previousElementSibling.getAttribute("id") === "dc") {
    selecionarEscolha = true;
    target.parentNode.classList.add("escolha-ativa");
    target.parentNode.nextElementSibling.nextElementSibling.classList.remove(
      "escolha-ativa"
    );
  } else if (
    target.parentNode.previousElementSibling.getAttribute("id") === "marvel"
  ) {
    selecionarEscolha = true;
    target.parentNode.classList.add("escolha-ativa");
    target.parentNode.previousElementSibling.previousElementSibling.classList.remove(
      "escolha-ativa"
    );
  }
}
escolhas.forEach((escolha) => {
  escolha.addEventListener("click", ativarEscolha);
});

//ESCOLHA DE DIFICULDADE

const dificuldades = document.querySelectorAll("[data-dificuldade]");

function ativarDificuldade({ target }) {
  if (target.getAttribute("for") === "facil") {
    target.classList.add("dificuldade-ativa");
    target.nextElementSibling.nextElementSibling.classList.remove(
      "dificuldade-ativa"
    );
    target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
      "dificuldade-ativa"
    );
  } else if (target.getAttribute("for") === "medio") {
    target.classList.add("dificuldade-ativa");
    target.nextElementSibling.nextElementSibling.classList.remove(
      "dificuldade-ativa"
    );
    target.previousElementSibling.previousElementSibling.classList.remove(
      "dificuldade-ativa"
    );
  } else if (target.getAttribute("for") === "dificil") {
    target.classList.add("dificuldade-ativa");
    target.previousElementSibling.previousElementSibling.classList.remove(
      "dificuldade-ativa"
    );
    target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.classList.remove(
      "dificuldade-ativa"
    );
  }
}

dificuldades.forEach((dificuldade) => {
  dificuldade.addEventListener("click", ativarDificuldade);
});
