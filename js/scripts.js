verificaSeTemQuiz();

pegaQuizesDoServidor();


function quizesDoServidorNaTela(todosQuizes) {
    const i = todosQuizes;
   for (let i = 0; i < todosQuizes.data.length; i++) {
<<<<<<< HEAD
        document.querySelector(".seus-quizes").innerHTML +=` <div class="imagens"><img src="${todosQuizes.data[i].image}"><h2 class="legenda">${todosQuizes.data[i].title}</h2></div>`;
=======
        document.querySelector(".quizes .com-quiz").innerHTML +=` <div class="imagens"><img src="${todosQuizes.data[i].image}"><h2 class="legenda">${todosQuizes.data[i].title}</h2></div>`;
>>>>>>> bb670b65cc8295ff24c84ec55ed8cd49ddd95503
    }
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