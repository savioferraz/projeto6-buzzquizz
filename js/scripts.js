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
        document.querySelector(".todos-os-quizes .quizes").innerHTML +=` <div class="imagens" onclick="selecionaQuiz(${i})" ><img src="${todosQuizes.data[i].image}"><h2 class="legenda">${todosQuizes.data[i].title}</h2></div>`;
    }
}

function pegaQuizesDoServidor(){
   const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promessa.then(quizesDoServidorNaTela);
}

function topoPaginaInicial(){ 
    document.querySelector(".conteudo").innerHTML+=`
    <div class="todos-os-quizes">
        <h1 class="titulo">Todos os quizes</h1>
        <div class="quizes">
        </div>
    </div>`;
}

function baixoPaginainicial(retorno){
    if(retorno === false){
        document.querySelector(".conteudo").innerHTML =`
        <h1 class="titulo primeiro">Seus quizes</h1>
        <div class="quizes-usuario">
        </div>`;
        return;
    }
    
    document.querySelector(".conteudo").innerHTML =`
    <div class="seus-quizes">
    <div class="sem-nehum-quiz">
        <p>Você não criou nenhum <br> quiz ainda ;(</p>
        <button onclick="paginaDoQuestionario(this)" >Criar quizz</button>
    </div> 
</div>`;
}

function verificaSeTemQuiz(){
    //aqui tera a condição que verifica se a mais quizes desse usuario como ainda não a sempre ira mostrrar atela inicial//
    baixoPaginainicial(true);   
}
function criarQuiz(){
}

function selecionaQuiz(numeroElemento){
    objeto.push(quizes[0].data[numeroElemento]);
    colocaTelaDoquiz();
    colocaAsPerguntas();
}

function colocaTelaDoquiz(){
    document.querySelector(".conteudo").innerHTML =` <div class="titulo-quiz">  <div class="imagem-titulo"><img src="${objeto[0].image}"> </div> <div class="titulo-imagem">${objeto[0].title}</div></div>`;  
}

function colocaAsPerguntas(){
    for (let i = 0; i < objeto[0].questions.length; i++) {
        let caixaDePergunta = document.querySelector(".conteudo");
        caixaDePergunta.innerHTML +=`<div class="caixa-perguntas"> <div class="titulo-pergunta">${objeto[0].questions[i].title} </div><div class="respostas"></div></div> `;
        
        console.log(caixaDePergunta.children);
        for (let e = 0; e < objeto[0].questions[i].answers.length ; e++) {
            caixaDePergunta.children[i+1].querySelector(".respostas").innerHTML +=`<div class="resposta-imagem"><img onclick="confereAcerto(this,${i},${e})" src="${objeto[0].questions[i].answers[e].image}"><div class="resposta-legenda">${objeto[0].questions[i].answers[e].text} </div></div>`;
        }
    }
}

function confereAcerto(elemento,numerolistaClicado,numeroElementoClicado){  
    let listaDeImagens = elemento.parentNode.parentNode;
    totalJogadas++;
    if (objeto[0].questions[numerolistaClicado].answers[numeroElementoClicado].isCorrectAnswer) {
        totalAcertos++;
    }
    for (let i = 0; i < objeto[0].questions[numerolistaClicado].answers.length; i++) {
        if (objeto[0].questions[numerolistaClicado].answers[numeroElementoClicado] !== objeto[0].questions[numerolistaClicado].answers[i]) {
            console.log(listaDeImagens);
            listaDeImagens.children[i].querySelector("img").classList.add("opaco");
            listaDeImagens.children[i].querySelector("img").removeAttribute("onclick");
        }
        listaDeImagens.children[i].querySelector("img").removeAttribute("onclick");
        
    }
    
}
// cixa a div.respostas
// cixaDePergunta tem que apontar respostas
