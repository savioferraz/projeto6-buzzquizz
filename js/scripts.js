verificaSeTemQuiz();

pegaQuizesDoServidor();

function topoPaginaInicial(){ 
    document.querySelector(".conteudo").innerHTML+=`
    <div class="todos-os-quizes">
        <h1 class="titulo">Todos os quizes</h1>
        <div class="quizes">
        </div>
    </div>`;

}

function quizesDoServidorNaTela(todosQuizes) {
    topoPaginaInicial();
   for (let i = 0; i < todosQuizes.data.length; i++) {
        document.querySelector(".todos-os-quizes .quizes").innerHTML +=` <div class="imagens"><img src="${todosQuizes.data[i].image}"><h2 class="legenda">${todosQuizes.data[i].title}</h2></div>`;
    }
   }


function pegaQuizesDoServidor(){
   const promessa = axios.get("https://mock-api.driven.com.br/api/v3/buzzquizz/quizzes");
    promessa.then(quizesDoServidorNaTela);
}

function verificaSeTemQuiz(){
    //aqui tera a condição que verifica se a mais quizes desse usuario como ainda não a sempre ira mostrrar atela inicial//
    if(false){
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

function criarQuiz(){

}