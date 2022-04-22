
function executaQuiz(quizId) {
    const quizClicado = arrayQuizzesServidor.find(quiz => quiz.id === quizId);
    preencherTelaJogo(quizClicado);
    trocarDeTela(1);
}

function preencherTelaJogo(quiz) {
    insereBannerQuiz(quiz);
    quiz.questions.forEach(insereUmaPergunta);
}

function insereBannerQuiz(quiz) {
    const containerTela2 = document.querySelector(".tela-2");
    containerTela2.innerHTML = `<div class="bannerQuiz">
                                    <img src="${quiz.image}">
                                    <div>
                                        ${quiz.title}
                                    </div>
                                </div>`
}

function insereQuiz(quiz) {

}



function insereUmaPergunta(pergunta) {
    const respostas = retornaHtmlComRespostas(pergunta);
    const containerTela2 = document.querySelector(".tela-2");
    containerTela2.innerHTML += `<div class="perguntaQuiz">
                                    <div class="enunciado">
                                        ${pergunta.title}
                                    </div>
                                    ${respostas}
                                </div>`
}

function retornaHtmlComRespostas(pergunta) {
    let respostasConcatenadas = "";
    const arrayRespostasServidor = pergunta.answers.sort(shuffleFunction);
    arrayRespostasServidor.forEach(resposta => {
        respostasConcatenadas += `<div class="alternativa">
                                    <img src="${resposta.image}">
                                    <div>${resposta.text}</div>
                                </div>`
    });
    return respostasConcatenadas;
}

function shuffleFunction() { 
	return Math.random() - 0.5; 
}