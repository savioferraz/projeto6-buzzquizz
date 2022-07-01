 const quizes = [];

 let totalAcertos = 0;

 let totalJogadas = 0;

 const objeto = [];

 verificaSeTemQuiz();

 pegaQuizesDoServidor();


function quizesDoServidorNaTela(todosQuizes) {
    quizes.push(todosQuizes);
    topoPaginaInicial();
    for (let i = 0; i < todosQuizes.data.length; i++) {
        document.querySelector(".todos-os-quizes .quizes").innerHTML += ` <div class="imagens" onclick="selecionaQuiz(${i})" ><img src="${todosQuizes.data[i].image}"><h2 class="legenda">${todosQuizes.data[i].title}</h2></div>`;
    }
}

function pegaQuizesDoServidor() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes");
    promessa.then(quizesDoServidorNaTela);
}

function topoPaginaInicial() {
    document.querySelector(".conteudo").innerHTML += `
    <div class="todos-os-quizes">
        <h1 class="titulo">Todos os quizes</h1>
        <div class="quizes">
        </div>
    </div>`;
}

function baixoPaginainicial(retorno) {
    if (retorno === false) {
        document.querySelector(".conteudo").innerHTML = `
        <h1 class="titulo primeiro">Seus quizes</h1>
        <div class="quizes-usuario">
        </div>`;
        return;
    }

    document.querySelector(".conteudo").innerHTML = `
    <div class="seus-quizes">
    <div class="sem-nehum-quiz">
        <p>Você não criou nenhum <br> quiz ainda ;(</p>
        <button onclick="paginaDoQuestionario(this)" >Criar quizz</button>
    </div> 
</div>`;
}

function verificaSeTemQuiz() {
    //aqui tera a condição que verifica se a mais quizes desse usuario como ainda não a sempre ira mostrrar atela inicial//
    baixoPaginainicial(true);
}
function criarQuiz() {
}

function selecionaQuiz(numeroElemento) {
    objeto.push(quizes[0].data[numeroElemento]);
    colocaTelaDoquiz();
    colocaAsPerguntas();
}

function colocaTelaDoquiz() {
    document.querySelector(".conteudo").innerHTML = ` <div class="titulo-quiz">  <div class="imagem-titulo"><img src="${objeto[0].image}"> </div> <div class="titulo-imagem">${objeto[0].title}</div></div>`;
}

function colocaAsPerguntas() {
    for (let i = 0; i < objeto[0].questions.length; i++) {
        let caixaDePergunta = document.querySelector(".conteudo");
        caixaDePergunta.innerHTML += `<div class="caixa-perguntas"> <div class="titulo-pergunta" style="background-color:${objeto[0].questions[i].color} ;" >${objeto[0].questions[i].title} </div><div class="respostas"></div></div> `;
        for (let e = 0; e < objeto[0].questions[i].answers.length; e++) {
            caixaDePergunta.children[i + 1].querySelector(".respostas").innerHTML += `<div class="resposta-imagem"><img onclick="confereAcerto(this,${i},${e})" src="${objeto[0].questions[i].answers[e].image}"><div class="resposta-legenda">${objeto[0].questions[i].answers[e].text} </div></div>`;
        }
    }
}

function delayQuiz(todasCaixas,numerolistaClicado) {
    todasCaixas[numerolistaClicado + 2].querySelector(".respostas").scrollIntoView({ block: "end" });
}

function confereAcerto(elemento, numerolistaClicado, numeroElementoClicado) {
    let todasCaixas = document.querySelector(".conteudo").children;
    let listaDeImagens = elemento.parentNode.parentNode;
    totalJogadas++;
    if (objeto[0].questions[numerolistaClicado].answers[numeroElementoClicado].isCorrectAnswer) {
        totalAcertos++;
    }
    for (let i = 0; i < objeto[0].questions[numerolistaClicado].answers.length; i++) {
        listaDeImagens.children[i].querySelector(".resposta-legenda").style.color = "#FF4B4B";

        if (objeto[0].questions[numerolistaClicado].answers[numeroElementoClicado] !== objeto[0].questions[numerolistaClicado].answers[i]) {
            listaDeImagens.children[i].querySelector("img").classList.add("opaco");
            listaDeImagens.children[i].querySelector(".resposta-legenda").classList.add("opaco");
            listaDeImagens.children[i].querySelector("img").removeAttribute("onclick");

        }
        listaDeImagens.children[i].querySelector("img").removeAttribute("onclick");
        if (objeto[0].questions[numerolistaClicado].answers[i].isCorrectAnswer) {
            listaDeImagens.children[i].querySelector(".resposta-legenda").style.color = "#009C22";
        }

        console.log(objeto[0].questions[numerolistaClicado].answers[i].isCorrectAnswer);
    }
    if (objeto[0].questions.length === totalJogadas) {
        finalizaQuiz();
    }
    if (numerolistaClicado + 2 !== todasCaixas.length) {
        setTimeout(delayQuiz,2000 ,todasCaixas,numerolistaClicado);
        
    }
}

function finalizaQuiz() {
    const porcentagem = (totalAcertos * 100) / (objeto[0].questions.length)
    for (let i = 0; i < objeto[0].levels.length; i++) {
        if (porcentagem >= objeto[0].levels[i].minValue) {
            document.querySelector(".conteudo").innerHTML += `<div class="caixa-perguntas"> <div class="titulo-pergunta" >${porcentagem.toFixed(0)}% de acerto: ${objeto[0].levels[i].title} </div><div class="respostas"><div class="resposta-imagem"><img src="${objeto[0].levels[i].image}"><div class="resposta-legenda"> ${objeto[0].levels[i].text}</div></div></div></div> <div class="botão-reinicia" onclick="reiniciarQuiz()" >Reiniciar Quizz</div><div class="botão-volta-home" onclick="voltaHome()" >Voltar pra home</div>`;
            let ultimaDiv = document.querySelector(".conteudo").lastChild;
             setTimeout(ultimaDiv.scrollIntoView, 2000);
            return;
        }
    }
    for (let i = 0; i < objeto[0].levels.length; i++) {
        if (porcentagem <= objeto[0].levels[i].minValue) {
            document.querySelector(".conteudo").innerHTML += `<div class="caixa-perguntas"> <div class="titulo-pergunta" >${porcentagem.toFixed(0)}% de acerto: ${objeto[0].levels[i].title} </div><div class="respostas"><div class="resposta-imagem"><img src="${objeto[0].levels[i].image}"><div class="resposta-legenda">${objeto[0].levels[i].text} </div></div></div></div> `;
            document.querySelector(".conteudo").lastChild.scrollIntoView();
            return;
        }

    }


}

function reiniciarQuiz() {
    totalAcertos = 0;
    totalJogadas = 0;
    colocaTelaDoquiz();
    colocaAsPerguntas();
    document.querySelector(".titulo-quiz").scrollIntoView();

}

function voltaHome() {
    window.location.reload();
}
