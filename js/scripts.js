verificaSeTemQuiz();

pegaQuizesDoServidor();

function quizesDoServidorNaTela(todosQuizes){
    console.log(todosQuizes.data.length);
    for (let i = 0; i < todosQuizes.data.length; i++) {
        document.querySelector(".todos-os-quizes").innerHTML +=`<ul><img src=${todosQuizes.data[i].image}> </ul>`;
    }
}

function pegaQuizesDoServidor(){
   const promessa = axios.get("https://mock-api.driven.com.br/api/v3/buzzquizz/quizzes");
    promessa.then(quizesDoServidorNaTela);
}

function verificaSeTemQuiz(){
    //aqui tera a condição que verifica se a mais quizes desse usuario como ainda não a sempre ira mostrrar atela inicial//
    document.querySelector(".seus-quizes").innerHTML =`
    <div class="sem-nehum-quiz">
    <p>Você não criou nenhum <br> quizz ainda :(</p>
    <h2 onclick="criarQuiz()">Criar Quizz</h2>
</div>`;
}

function criarQuiz(){
    

}