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
    let localTodos = document.querySelector(".todos-quizzes");
    let localSeus = document.querySelector(".seus-quizzes");
    let meusQuizzesId = [];
    localSeus.innerHTML = "";
    localTodos.innerHTML = "";
    if(localStorage.getItem("idsLocal") !== null) {
        meusQuizzesId = JSON.parse(localStorage.getItem("idsLocal"));
    }

    for(let i=0;i<arrayDeQuizzes.length;i++) {
        if(meusQuizzesId.includes(arrayDeQuizzes[i].id)){
            localSeus.innerHTML += `<div class="card">
                                    <li class="quizz" id="${arrayDeQuizzes[i].id}" onclick="executaQuiz(${arrayDeQuizzes[i].id})">
                                        <img src="${arrayDeQuizzes[i].image}">
                                        <div class="gradient"></div>
                                        <h3>${arrayDeQuizzes[i].title}</h3>
                                    </li>
                                    <div class="delete" onclick="remove(${arrayDeQuizzes[i].id})"><ion-icon name="trash-outline"></ion-icon></div>
                                    </div>`;
        }else {
        localTodos.innerHTML += `<li class="quizz" id="${arrayDeQuizzes[i].id}" onclick="executaQuiz(${arrayDeQuizzes[i].id})">
                                    <img src="${arrayDeQuizzes[i].image}">
                                    <div class="gradient"></div>
                                    <h3>${arrayDeQuizzes[i].title}</h3>
                                </li>`;
        }
    }
    trocaDeSection();
}

function trocaDeSection (){
    let localSeus = document.querySelector(".seus-quizzes");
    let localCriar = document.querySelector(".local-criar-quizz");

    if(localSeus.innerHTML === ""){
        localStorage.clear();
        localCriar.classList.remove('hidden');
        localSeus.parentNode.classList.add('hidden');
    }else {
        localCriar.classList.add('hidden');
        localSeus.parentNode.classList.remove('hidden');
    }
}

let telas = '';
function trocarDeTela(screen){
    telas = document.querySelectorAll('main');
    
    for(let i = 0; i < telas.length; i++){
        telas[i].classList.add('hidden');
    }

    telas[screen].classList.remove('hidden');

    return screen;
}

function remove(id){
    let meusQuizzesId = [];
    let minhasKeys = [];
    let key;
    if(localStorage.getItem("idsLocal") !== null) {
        meusQuizzesId = JSON.parse(localStorage.getItem("idsLocal"));
    }
    if(localStorage.getItem("keysLocal") !== null) {
        minhasKeys = JSON.parse(localStorage.getItem("keysLocal"));
    }
    key = minhasKeys[meusQuizzesId.indexOf(id)];
    console.log(key);
    console.log(id);
    if (key !== -1) {
        axios.delete(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`, { headers: { "Secret-Key": key } });
    }else {
        alert("Erro em excluir Quizz");
    }
    setTimeout(() => {
        meusQuizzesId.splice(meusQuizzesId.indexOf(id), 1);
        minhasKeys.splice(meusQuizzesId.indexOf(id), 1);

        localStorage.setItem("idsLocal" , JSON.stringify(meusQuizzesId));
        localStorage.setItem("keysLocal" , JSON.stringify(minhasKeys));
        getQuizzes();
    },250);
}
//localStorage.clear()
getQuizzes();

