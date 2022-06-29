verificaSeTemQuiz();

pegaQuizesDoServidor();

function quizesDoServidorNaTela(todosQuizes){
    console.log(todosQuizes.data[0]);
    document.querySelector(".todos-os-quizes ul").innerHTML =`<a href="${todosQuizes.data[0].image}" src=""></a>`;
}

function pegaQuizesDoServidor(){
   const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promessa.then(quizesDoServidorNaTela);
}

function verificaSeTemQuiz(){
    //aqui tera a condição que verifica se a mais quizes desse usuario como ainda não a sempre ira mostrrar atela inicial//
//     document.querySelector(".seus-quizes").innerHTML =`
//     <div class="sem-nehum-quiz">
//     <p>Você não criou nenhum <br> quizz ainda :(</p>
//     <h2 onclick="criarQuiz()">Criar Quizz</h2>
// </div>`;
}

function criarQuiz(){

}