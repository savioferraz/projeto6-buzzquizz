verificaSeTemQuiz()

function verificaSeTemQuiz(){
    //aqui tera a condição que verifica se a mais quizes desse usuario como ainda não a sempre ira mostrrar atela inicial//
    document.querySelector(".seus-quizes").innerHTML =`
    <div class="sem-nehum-quiz">
    <p>Você não criou nenhum <br> quizz ainda :(</p>
    <h2 onclick="criarQuiz()">Criar Quizz</h2>
</div>`;
}