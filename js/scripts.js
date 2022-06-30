const quizes = [];

verificaSeTemQuiz();

pegaQuizesDoServidor();


function quizesDoServidorNaTela(todosQuizes) {
    quizes.push(todosQuizes);
    topoPaginaInicial();
   for (let i = 0; i < todosQuizes.data.length; i++) {
        document.querySelector(".todos-os-quizes .quizes").innerHTML +=` <div class="imagens" onclick="selecionaQuiz(this,${i})" ><img src="${todosQuizes.data[i].image}"><h2 class="legenda">${todosQuizes.data[i].title}</h2></div>`;
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

function selecionaQuiz(elemento, numeroElemento){
    let objeto = quizes[0].data[numeroElemento];
    colocaTelaDoquiz(objeto);
    colocaAsPerguntas(objeto);
}

function colocaTelaDoquiz(objeto){
    document.querySelector(".conteudo").innerHTML =` <div class="titulo-quiz">  <div class="imagem-titulo"><img src="${objeto.image}"> </div> <div class="titulo-imagem">${objeto.title}</div></div><div class="caixa-perguntas">  </div>`;  
}

function colocaTelaDoquiz(objeto){
    document.querySelector(".conteudo").innerHTML =` <div class="titulo-quiz">  <div class="imagem-titulo"><img src="${objeto.image}"> </div> <div class="titulo-imagem">${objeto.title}</div></div><div class="caixa-perguntas">  </div>`;  
}

function colocaAsPerguntas(objeto){
    const numero = objeto;
    for (let i = 0; i < objeto.questions.length; i++) {
        let caixaDePergunta = document.querySelector(".caixa-perguntas");
        caixaDePergunta.innerHTML +=`<div class="titulo-pergunta">${objeto.questions[i].title} </div><div class="respostas"></div> `;
        for (let e = 0; e < objeto.questions[i].answers.length ; e++) {
            console.log(objeto.questions[i].answers[e].text);
            caixaDePergunta.lastElementChild.innerHTML +=`<div class="resposta-legenda">${objeto.questions[i].answers[e].text} </div><div class="resposta-imagem"><img src="${objeto.questions[i].answers[e].image}"></div></div></div></div>`;
   
       }
    }
}