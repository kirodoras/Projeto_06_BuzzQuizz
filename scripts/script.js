let arrayQuizzesServidor;


//Busca todos os quizzes no Servidor, e armazena o  array obtido na variável global "arrayQuizzesServidor"
function getQuizzes() {
    const quizzes = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    quizzes.then(function(resposta) {
        arrayQuizzesServidor = resposta.data;
        preencheContainerDeQuiz(".todos-quizzes",arrayQuizzesServidor)
        console.log("Sucesso")
    });
    quizzes.catch(window.location.reload);
}

//Recebe um array de objetos "quiz" e adiciona todos no container especificado via parâmetro
function preencheContainerDeQuiz(classeDoContainer, arrayDeQuizzes) {
    console.log("eita")
    for(let i=0;i<arrayDeQuizzes.length;i++) {
        let container = document.querySelector(".todos-quizzes");
        container.innerHTML += `<li class="quizz" id="${arrayDeQuizzes[i].id}" onclick="executaQuiz(${arrayDeQuizzes[i].id})">
                                    <img src="${arrayDeQuizzes[i].image}">
                                    <div class="gradient"></div>
                                    <h3>${arrayDeQuizzes[i].title}</h3>
                                </li>`
    }
}

getQuizzes();

