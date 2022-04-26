let quizClicado;
let contadorDeRespostasUsuario;

function executaQuiz(quizId) {
    contadorDeRespostasUsuario = 0;
    quizClicado = arrayQuizzesServidor.find(quiz => quiz.id === quizId);
    insereBannerQuiz(quizClicado);
    embaralhaQuiz();
    quizClicado.questions.forEach(inserePerguntaNaTela);
    trocarDeTela(1);
    scrollAutomatico();
}

function embaralhaQuiz() {
    quizClicado.questions.forEach(pergunta => pergunta.answers.sort(shuffleFunction));
}

function insereBannerQuiz(quiz) {
    const containerTela2 = document.querySelector(".tela-2");
    containerTela2.innerHTML = `<div class="bannerQuiz">
                                    <img src="${quiz.image}">
                                    <div class="mascaraBanner"></div>
                                    <div class="tituloBanner">
                                        ${quiz.title}
                                    </div>
                                </div>`
}

function inserePerguntaNaTela(pergunta) {
    const alternativas = concatenaAlternativas(pergunta);
    const containerTela2 = document.querySelector(".tela-2");
    containerTela2.innerHTML += `<div class="perguntaQuiz">
                                    <div class="containerGrid">
                                        <p class="enunciado" style="background-color:${pergunta.color}">
                                            ${pergunta.title}
                                        </p>
                                        ${alternativas}
                                    </div>
                                </div>`
}

function concatenaAlternativas(pergunta) {
    let alternativasConcatenadas = "";
    const arrayAlternativas = pergunta.answers;
    arrayAlternativas.forEach(resposta => {
        alternativasConcatenadas += `<div class="alternativa" onclick="trataRespostaClicada(this)">
                                    <img src="${resposta.image}">
                                    <div>${resposta.text}</div>
                                </div>`
    }); 
    return alternativasConcatenadas;
}

function trataRespostaClicada(alternativaClicada) {
    const divPergunta = alternativaClicada.parentNode;
    if(!divPergunta.classList.contains("respondida")) {
        highlightAlternativaSelecionada(alternativaClicada);
        const objetoPergunta = retornaObjetoPergunta(alternativaClicada);
        revelaAlternativaCorreta(objetoPergunta,alternativaClicada);
        divPergunta.classList.add("respondida");
        checarSeJogoAcabou();
        setTimeout(scrollAutomatico, 1000);
    }
    else {
        console.log("Você já respondeu essa questão!")
    }
}

function highlightAlternativaSelecionada(alternativaClicada) {
    alternativaClicada.classList.add("selected");
    const divPergunta = alternativaClicada.parentNode;
    const alternativas = divPergunta.querySelectorAll(".alternativa");
    for(let i=0;i<alternativas.length;i++) {
        if(!alternativas[i].classList.contains("selected")) {
            alternativas[i].classList.add("unselected");
        }
    }
}

function retornaObjetoPergunta(alternativaClicada) {
    const divPergunta = alternativaClicada.parentNode;
    const numDeAlternativas = divPergunta.querySelectorAll(".alternativa").length;
    const enunciado = divPergunta.querySelector(".enunciado").innerText;
    const objetoPergunta = quizClicado.questions.find(elemento => elemento.title === enunciado && elemento.answers.length === numDeAlternativas);
    return objetoPergunta;
}

function revelaAlternativaCorreta(objetoPergunta,alternativaClicada) {
    const divPergunta = alternativaClicada.parentNode;
    const alternativas = divPergunta.querySelectorAll(".alternativa");
    for(let i=0;i<alternativas.length;i++) {
        if(objetoPergunta.answers[i].isCorrectAnswer) {
            alternativas[i].classList.add("correct");
        }
        else {
            alternativas[i].classList.add("incorrect");
        }
    }
}

function checarSeJogoAcabou () {
    const numeroDePerguntasRespondidas = document.querySelectorAll(".respondida").length;
    const numeroTotalDePerguntas = quizClicado.questions.length;
    if(numeroDePerguntasRespondidas === numeroTotalDePerguntas) {
        imprimeResultadoQuiz();
        return true;
    }
    else {
        return false;
    }
}

function calculaPontuacao() {
    const numeroAcertos = document.querySelectorAll(".selected.correct").length;
    const numeroQuestoes =  quizClicado.questions.length;
    const porcentagemAcertos = Math.ceil((numeroAcertos/numeroQuestoes)*100);
    return porcentagemAcertos;
}

function calculaNivel() {
    const pontuacao = calculaPontuacao();
    const niveisConquistados = quizClicado.levels.filter(nivel => nivel.minValue <= pontuacao);
    const ordemDescrescente = niveisConquistados.sort((a,b) => b.minValue - a.minValue);
    const nivelMaximoAlcancado = ordemDescrescente[0];
    return nivelMaximoAlcancado;
}

function imprimeResultadoQuiz() {
    const nivel = calculaNivel();
    const containerResultado = document.querySelector(".tela-2");
    containerResultado.innerHTML += `<div class="resultado">
                                        <div class="containerGridResultado">
                                            <div class="enunciado">
                                                ${nivel.title}
                                            </div>
                                            <img src=${nivel.image}>
                                            <h2>${nivel.text}</h2>
                                        </div>
                                    </div>
                                    <button type="button" class="main-button" onclick="executaQuiz(quizClicado.id)">Reiniciar Quizz</button>
                                    <button type="button" class="go-home" onclick="voltarHome()">Voltar pra home</button>`
}

function scrollAutomatico() {
    const enunciados = document.querySelectorAll(".perguntaQuiz");
    const numeroQuestoes = enunciados.length;
    if(contadorDeRespostasUsuario < numeroQuestoes) {
        enunciados[contadorDeRespostasUsuario].scrollIntoView({block: "center", behavior: "smooth"});
        contadorDeRespostasUsuario++;
    }
    else if(contadorDeRespostasUsuario === enunciados.length) {
        const resultado = document.querySelector(".resultado");
        resultado.scrollIntoView({block: "center", behavior: "smooth"});
    }
}

function shuffleFunction() { 
	return Math.random() - 0.5; 
}