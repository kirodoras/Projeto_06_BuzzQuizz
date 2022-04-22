let arrayQuizzesServidor;

//Busca todos os quizzes no Servidor, e armazena o  array obtido na variável global "arrayQuizzesServidor"
function getQuizzes() {
    const quizzes = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    quizzes.then(function(resposta) {
        arrayQuizzesServidor = resposta.data
        preencheContainerDeQuiz(".todos-quizzes", arrayQuizzesServidor)
    });
    quizzes.catch(window.location.reload);
}

//É uma função que será utilizada por outras funções. Recebe um objeto "quiz" e o insere no container desejado (especificado via parâmetro)
function insereQuiz(quiz, classeContainer) {
    const container = document.querySelector(classeContainer);
    container.innerHTML += `<li class="quizz" id="${quiz.id}">
                                                    <img src="${quiz.image}">
                                                    <div class="gradient"></div>
                                                    <h3>${quiz.title}</h3>
                                                </li>`
}

//Recebe um array de objetos "quiz" e adiciona todos no container especificado via parâmetro
function preencheContainerDeQuiz(classeDoContainer, arrayDeQuizzes) {
    arrayDeQuizzes.forEach(function(quiz) {
        insereQuiz(quiz, `${classeDoContainer}`)
    });
}

getQuizzes();

