 const componentesQuiz=[];
 
 const componentesQuiz1=[];

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
        document.querySelector(".todos-os-quizes .quizes").innerHTML += ` <div class="imagens" style="background-image: url('${todosQuizes.data[i].image}')" onclick="selecionaQuiz(${i})" ><img src="${todosQuizes.data[i].image}"><h2 class="legenda">${todosQuizes.data[i].title}</h2></div>`;
    }
}

function pegaQuizesDoServidor() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes");
    promessa.then(quizesDoServidorNaTela);
}

function topoPaginaInicial() {
    document.querySelector(".conteudo").innerHTML += ` <div class="todos-os-quizes"> <h1 class="titulo">Todos os quizes</h1> <div class="quizes"> </div> </div>`;
}

function baixoPaginainicial(retorno) {
    if (retorno === false) {
        document.querySelector(".conteudo").innerHTML = `<h1 class="titulo primeiro">Seus quizes</h1> <div class="quizes-usuario"></div>`;
        return;
    }
    document.querySelector(".conteudo").innerHTML = ` <div class="seus-quizes"> <div class="sem-nehum-quiz"> <p>Você não criou nenhum <br> quiz ainda ;(</p> <button onclick="paginaDoQuestionario()" >Criar quizz</button></div></div>`;
}

function verificaSeTemQuiz() {
    //aqui tera a condição que verifica se a mais quizes desse usuario como ainda não a sempre ira mostrrar atela inicial//
    baixoPaginainicial();
}
function paginaDoQuestionario() {
    document.querySelector(".conteudo").innerHTML = `<div class="titulo criacao">Comece pelo começo</div><div class="caixa-inputs"> <input type="text" placeholder="Titulo do seu quiz"> <input type="url" placeholder="URL da imagem do seu quiz"><input type="number" placeholder="Quantidade de perguntas do quizz"><input type="number" placeholder="Quantidade de níveis do quizz"> </div> <button class="botao-criar" onclick="confereInformacaoBasica()">Prosseguir para criar perguntas</button>`;
}
function confereInformacaoBasica(){
    let lista= [];
    lista.splice(0,lista.length )
    const elementosDoQuiz = document.querySelector(".caixa-inputs").children;
   elementosDoQuiz[0].value;
   if (elementosDoQuiz[0].value.length<20 || elementosDoQuiz[0].value.length>65) {
    lista.push("O nome do quiz deve ter mais que 20 e menos de 65 caracters");
   }
   if (Number(elementosDoQuiz[2].value) <=2 || Number.isInteger(Number(elementosDoQuiz[2].value) !== true) ) {
    lista.push("Deve possuir 3 ou mais perguntas");
   }
   if (Number(elementosDoQuiz[3].value) <= 1 || Number.isInteger(Number(elementosDoQuiz[2].value) !== true)) {
    lista.push("Deve possuir no minimo 2 niveis");
   }
   
    try {
        new URL(elementosDoQuiz[1].value)
        }
     catch (err) {
        lista.push("Imagem deve possuir formato url");
           }
        
   if (lista.length !==0) {
    alert(lista);
    return;   
    }
    console.log(lista);
    componentesQuiz.push(elementosDoQuiz[0],elementosDoQuiz[1],elementosDoQuiz[2],elementosDoQuiz[3]);    
    document.querySelector(".conteudo").innerHTML = ``;
    perguntasDoQuiz();

}


function perguntasDoQuiz(){
    document.querySelector(".conteudo").innerHTML =`<div class="titulo criacao">Crie suas perguntas</div>`;
    for (let index = 0; index < componentesQuiz[2].value; index++) {
        document.querySelector(".conteudo").innerHTML += ` <div class="cada-input${index+1} cada-inputs"><div class="caixa-inputs recolhida" onclick="colocaAsPerguntasQuiz(${index+1})"><div class="titulo">Pergunta ${index+1}</div> <ion-icon name="create-outline"></ion-icon></div></div>`;
    }
    document.querySelector(".conteudo").innerHTML +=`<button class="botao-criar" onclick="pegaInformacao1Quiz()">Prosseguir para criar niveis</button>`;
} 

function colocaAsPerguntasQuiz(numeroClicado){
    document.querySelector(`.cada-input${numeroClicado}`).innerHTML = `
    <div class="caixa-inputs" >
        <div class="titulo" >Pergunta ${numeroClicado}  </div>
        <input type="text" placeholder="Texto da pergunta">
        <input type="text" placeholder="Cor de fundo da pergunta">
        <div class="titulo">Resposta correta</div>
        <input type="text" placeholder="Resposta correta">
        <input type="url" placeholder="URL da imagem">
        <div class="titulo">Respostas incorretas</div>
        <input type="text" placeholder="Resposta incorreta 1">
        <input type="url" placeholder="URL da imagem 1">
        <input type="text" placeholder="Resposta incorreta 2">
        <input type="url" placeholder="URL da imagem 2">
        <input type="text" placeholder="Resposta incorreta 3">
        <input type="url" placeholder="URL da imagem 3">
        </div>`;
         
}           
//https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.freepik.com%2Ffotos-gratis%2Ffoto-de-grande-angular-de-uma-unica-arvore-crescendo-sob-um-ceu-nublado-durante-um-por-do-sol-cercado-por-grama_181624-22807.jpg%3Fw%3D2000&imgrefurl=https%3A%2F%2Fbr.freepik.com%2Ffotos%2Farvore&tbnid=1d0KYXzR2E96IM&vet=12ahUKEwjGhorRkdj4AhX0BbkGHW4DCq8QMygBegUIARCgAQ..i&docid=IIdBpbgBOVfhdM&w=2000&h=1334&q=fotos&client=ubuntu&ved=2ahUKEwjGhorRkdj4AhX0BbkGHW4DCq8QMygBegUIARCgAQ

function pegaInformacao1Quiz(){
    const lista=[];
    let cadaInput = document.querySelector(`.conteudo`).children;
    objetoQuiz= {
        title: componentesQuiz[0].value,
        image: componentesQuiz[1].value,
        levels: [],
        questions: [],
    };

try{
    console.log(objetoQuiz);
    for (let i = 0; i < componentesQuiz[2].value; i++) {
        let entradas = cadaInput[i+1].children[0].children;
        objetoQuiz.questions.push({
        title: entradas[1].value,
        color: entradas[2].value,
        answers: []
        });
        objetoQuiz.questions[i].answers.push({
        text: entradas[4].value,
        image: entradas[5].value,
        isCorrectAnswer: true
    },
    {
        text: entradas[7].value,
        image: entradas[8].value,
        isCorrectAnswer: false
    });
    if (entradas[9].value !=="" && entradas[10].value !== "") {
        objetoQuiz.questions[i].answers.push(
        {
            text: entradas[9].value,
            image: entradas[10].value,
            isCorrectAnswer: false
        })
    };
    if (entradas[11].value !=="" && entradas[12].value !== "") {
        objetoQuiz.questions[i].answers.push(
        {
            text: entradas[11].value,
            image: entradas[12].value,
            isCorrectAnswer: false
        })
    };
        if ((entradas[9].value ==="" && entradas[10].value !== "")  || (entradas[9].value !=="" && entradas[10].value === "")) {
            lista.push(`Complete as respostas incorretas da pergunta ${i} ou deixe apenas a primeira`);

        }
        if ((entradas[11].value ==="" && entradas[12].value !== "")  || (entradas[11].value !=="" && entradas[12].value === "")) {
            lista.push(`Complete as respostas incorretas da pergunta ${i} ou deixe apenas a primeira`);

        }
    }
}
    catch(err){
        alert("Preencha os campos necessários")
        lista.splice(0,lista.length );
        return;
    }
    if (lista.length !== 0) {
        alert(lista);
        lista.splice(0,lista.length );
        return;
    }
    componentesQuiz1.push(objetoQuiz);
    
    telaDeNiveis();
}
  
function telaDeNiveis(){
    document.querySelector(".conteudo").innerHTML=`<div class="titulo criacao">Agora, decida os níveis</div>`; 
   for (let index = 0; index < componentesQuiz[3].value; index++) {
    document.querySelector(".conteudo").innerHTML+=`<div class="total${index} total-mente"><div class="caixa-inputs recolhida" onclick="completaNiveis(${index})"><div class="titulo">Nível ${index+1}</div> <ion-icon name="create-outline"></ion-icon></div></div>`;
    }
    document.querySelector(".conteudo").innerHTML+=`<button class="botao-criar" onclick="pegaInformacao2Quiz()">Finalizar Quiz</button>`;
}

function pegaInformacao2Quiz(){
    let cadaInput = document.querySelector(`.conteudo`).children;
    
    for (let index = 0; index < componentesQuiz[3].value; index++) {
        let entradas = cadaInput[index+1].children[0].children;
        componentesQuiz1[0].levels.push({
            title: entradas[1].value,
            image: entradas[3].value,
            text: entradas[4].value,
            minValue: Number(entradas[2].value)
    });
    }
    console.log(componentesQuiz1[0]);
    const promessa = axios.post(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes`,componentesQuiz1[0]);
    promessa.catch(tratarError);
    promessa.then(telaFinalizaQuiz);
    
}

function tratarError(){
    alert("Algo deu errado");
}

function telaFinalizaQuiz(){
    document.querySelector(".conteudo").innerHTML = `<div class="titulo criacao">Seu Quiz está pronto!</div><div class="imagem-com-titulo"><img src="${componentesQuiz1[0].image}"><div class="texto-da-imagem">${componentesQuiz1[0].title}</div><button class="botao-criar" onclick="">Acessar Quiz</button><br> <button class="voltar" onclick="voltaHome()">Voltar para home</button>`;
    
}
function completaNiveis(local){
    let i = document.querySelector(`.total${local}`);
    i.innerHTML = ` <div class="caixa-inputs">
    <div class="titulo">Nível ${local+1}</div>
    <input type="text" placeholder="Titulo do nível">
    <input type="number" placeholder="% de acerto mínima">
    <input type="url" placeholder="URL da imagem do nível">
    <input type="text" placeholder="Descrição do nível">
</div>`;

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
            document.querySelector(".conteudo").innerHTML += `<div class="caixa-perguntas"> <div class="titulo-pergunta" >${porcentagem.toFixed(0)}% de acerto: ${objeto[0].levels[i].title} </div><div class="respostas"><div class="resposta-imagem"><img src="${objeto[0].levels[i].image}"></div><div class="resposta-legenda"> ${objeto[0].levels[i].text}</div></div></div> <button class="botao-criar" onclick="reiniciarQuiz()">Reiniciar Quizz</button><button class="voltar" onclick="voltaHome()" >Voltar pra home</button>`;
            let ultimaDiv = document.querySelector(".conteudo").lastChild;
             setTimeout(ultimaDiv.scrollIntoView, 2000);
            return;
        }
    }
    for (let i = 0; i < objeto[0].levels.length; i++) {
        if (porcentagem <= objeto[0].levels[i].minValue) {
            document.querySelector(".conteudo").innerHTML += `<div class="caixa-perguntas"> <div class="titulo-pergunta" >${porcentagem.toFixed(0)}% de acerto: ${objeto[0].levels[i].title} </div><div class="respostas"><div class="resposta-imagem"><img src="${objeto[0].levels[i].image}"></div><div class="resposta-legenda">${objeto[0].levels[i].text} </div></div></div> `;
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


// let cadaInput = document.querySelector(`.cada-input${1} >.caixa-inputs`).children;
//     let conta=0;
//     let lista=[];
//     lista.splice(0,lista.length )
//     const listaDecimal= ["A","B","C","D","E","F","0","1","2","3","4","5","6","7","8","9"];
//     if (cadaInput[1].value.length < 20 || cadaInput[4].value === "") {
//         lista.push("Texto da pergunta menor que 20");
//     }
    
//     for (let index = 1; index < cadaInput[2].value.length; index++) {
//         for (let i = 0; i < listaDecimal.length; i++) {
//             if (cadaInput[2].value.charAt(index) === listaDecimal[i]) {
//                 conta++;
//             }
//         }
//     }

//     if (cadaInput[4].value === "" || cadaInput[2].value.charAt(0) !== "#" || cadaInput[2].value.length !== conta+1 || cadaInput[2].value.length>7) {
//         lista.push("Não é uma cor valida");

//     }
//     if(cadaInput[4].value === "" ){
//         lista.push("Você precisa colocar a resposta correta");
//     } 
//     if(cadaInput[4].value === "" ){
//         lista.push("Você precisa colocar a resposta correta");
//     }
    
//     try {
//         new URL(cadaInput[4].value);
//         }
//      catch (err) {
//         lista.push("Imagem deve possuir formato url");
//            }

           
//     console.log();
//     console.log(conta+1);
//     console.log(lista);
//     console.log(cadaInput[4]);
