const html = document.querySelector("html");

const focoBotao = document.querySelector(
  ".app__card-button.app__card-button--foco"
);
const curtoBotao = document.querySelector(
  ".app__card-button.app__card-button--curto"
);
const longoBotao = document.querySelector(
  ".app__card-button.app__card-button--longo"
);

const banner = document.querySelector(".app__image");

const titulo = document.querySelector(".app__title");

const botoes = document.querySelectorAll(".app__card-button");

const botaoMusica = document.getElementById("alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
musica.loop = true;

// Define o tempo inicial (25 minutos = 1500 segundos)
let tempoSegundos = 1500;
const start_pause_Botao = document.getElementById("start-pause");
let intervaloId = null;

const audioPlay = new Audio("/sons/play.wav");
const audioPausa = new Audio("/sons/pause.mp3");
const audioTempoFinalizado = new Audio("/sons/beep.mp3");

const imgIcon = start_pause_Botao.querySelector("img");

const temporizadorTela = document.getElementById("timer");

// Define o comportamento ao clicar nos botões de "Foco", "Descanso Curto" ou "Descanso Longo":
// Cada botão altera o tempo do temporizador, muda o tema da interface (imagem, cores e texto),
// atualiza o estado visual do botão ativo e aplica um atributo HTML para refletir o novo contexto.
focoBotao.addEventListener("click", () => {
  tempoSegundos = 1500;
  html.setAttribute("data-contexto", "foco");
  alterarContexto("foco");
  focoBotao.classList.add("active");
});

curtoBotao.addEventListener("click", () => {
  tempoSegundos = 300;
  html.setAttribute("data-contexto", "descanso-curto");
  alterarContexto("descanso-curto");
  curtoBotao.classList.add("active");
});

longoBotao.addEventListener("click", () => {
  tempoSegundos = 900;
  html.setAttribute("data-contexto", "descanso-longo");
  alterarContexto("descanso-longo");
  longoBotao.classList.add("active");
});

botaoMusica.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

// Altera o contexto visual e textual da interface
function alterarContexto(contexto) {
  mostarTempo();
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });

  // Altera o tema da página
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    // Altera o texto do título principal
    case "foco":
      titulo.innerHTML = `  Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;

    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;

    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície,<br>
                        <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;

    default:
      break;
  }
}

function contagemRegressiva() {
  if (tempoSegundos <= 0) {
    alert("Tempo finalizado");
    clearInterval(intervaloId);
    intervaloId = null;
    audioTempoFinalizado.play();
    return;
  }
  tempoSegundos -= 1;
  mostarTempo();
  console.log("Temporizador" + tempoSegundos);
  return tempoSegundos;
}

function iniciarOuPausarContagem() {
  const imgIcon = start_pause_Botao.querySelector("img"); // O querySelector('img') não depende da classe, ele simplesmente seleciona o primeiro elemento <img> encontrado dentro do botão, independentemente de sua
  const buttonText = start_pause_Botao.querySelector("span"); // Seleciona o texto dentro do botão

  if (intervaloId === null) {
    intervaloId = setInterval(contagemRegressiva, 1000);

    audioPlay.play();
    imgIcon.src = "/imagens/pause.png";
    buttonText.textContent = "Pausar";
  } else {
    clearInterval(intervaloId);
    intervaloId = null;
    audioPausa.play();
    imgIcon.src = "/imagens/play_arrow.png";
    buttonText.textContent = "Começar";
  }
}

start_pause_Botao.addEventListener("click", iniciarOuPausarContagem);

function mostarTempo() {
  const tempo = new Date(tempoSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-BR", {
    minute: "2-digit",
    second: "2-digit",
  });
  temporizadorTela.innerHTML = `${tempoFormatado}`;
}

mostarTempo();
