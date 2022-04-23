const meuQuizz =
{
	title: "Título do quizz- Augusto sem net",
	image: "https://http.cat/411.jpg",
	questions: [
		{
			title: "Título da pergunta 1",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 2",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 3",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		}
	],
	levels: [
		{
			title: "Título do nível 1",
			image: "https://http.cat/411.jpg",
			text: "Descrição do nível 1",
			minValue: 0
		},
		{
			title: "Título do nível 2",
			image: "https://http.cat/412.jpg",
			text: "Descrição do nível 2",
			minValue: 50
		}
	]
};

/*
0: main.tela-1
1: main.tela-2
2: main.tela-2
3: main.tela-3
4: main.tela-3
5: main.tela-3
6: main.tela-3
*/
 /*infoTitulo.value = '';
    infoAskQtd.value = '';
    infoLvlQtd.value = '';*/
let telaAtual = 0;

let infoTitulo = '';
let infoUrlImg = '';
let infoAskQtd = '';
let infoLvlQtd = '';

//Pega as informacões básicas do quizz
function getInfosBasicas() {
    infoTitulo = document.querySelector('input.titulo');
    infoUrlImg = document.querySelector('input.url-img');
    infoAskQtd = document.querySelector('input.ask-qtd');
    infoLvlQtd = document.querySelector('input.lvl-qtd');

    /*if((infoTitulo.value.length < 20 || infoTitulo.value.length > 65) 
        || (infoAskQtd.value < 3 || infoLvlQtd.value < 2)){
        alert('O Título do quizz deve ter no mínimo 20 e no máximo 65 caracteres \n');
        return;
    }*/

    /*meuQuizz.title = infoTitulo.value;
    meuQuizz.image = infoUrlImg.value;*/

    telaAtual = trocarDeTela(4);
    renderizarPerguntas();
    renderizarNiveis();
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

function openForm(elemento){
    const parent = elemento.parentNode.parentNode;
    const form = parent.querySelector('.form-main');

    if(form.classList.contains('hidden')){
        form.classList.remove('hidden');
    }else {
        form.classList.add('hidden');
    }
}

trocarDeTela(0);
function renderizarPerguntas(){
    let localPerguntas = document.querySelector('.perguntas');
    for(let i = 2; i <= infoAskQtd.value; i++){
        localPerguntas.innerHTML += `
        <section class="form">
            <div class="form-header">
                <h3>Pergunta ${i}</h3>
                <ion-icon name="create-outline" onclick="openForm(this)"></ion-icon>
            </div>
            <div class="form-main hidden">
                <input type="text" placeholder="Texto da pergunta"></input>
                <input type="url" placeholder="Cor de fundo da pergunta"></input>
                <h4>Resposta correta</h4>
                <input type="text" placeholder="Resposta correta"></input>
                <input type="url" placeholder="URL da imagem"></input>
                <h4>Respostas incorretas</h4>
                <input type="text" placeholder="Resposta incorreta 1"></input>
                <input type="url" placeholder="URL da imagem 1"></input>
                <input type="text" placeholder="Resposta incorreta 2"></input>
                <input type="url" placeholder="URL da imagem 2"></input>
                <input type="text" placeholder="Resposta incorreta 3"></input>
                <input type="url" placeholder="URL da imagem 3"></input>
            </div>
        </section>
        `
    }
    localPerguntas.innerHTML += `
        <button type="button" class="main-button" onclick="getPerguntas()">
            Prosseguir pra criar níveis
        </button>
        `
}

function renderizarNiveis(){
    let localNiveis = document.querySelector('.niveis');
    for(let i = 2; i <= infoLvlQtd.value; i++){
        localNiveis.innerHTML += `
        <section class="form">
            <div class="form-header">
                <h3>Nível ${i}</h3>
                <ion-icon name="create-outline" onclick="openForm(this)"></ion-icon>
            </div>
            <div class="form-main hidden">
                <input placeholder="Título do nível"></input>
                <input placeholder="% de acerto mínima"></input>
                <input placeholder="URL da imagem do nível"></input>
                <input placeholder="Descrição do nível" class="level-description"></input>
            </div>
        </section>
        `
    }
    localNiveis.innerHTML += `
        <button type="button" class="main-button" onclick="getNiveis()">
            Finalizar Quizz
        </button>
        `
}

function getPerguntas(){
    const perguntas = document.querySelector('.perguntas').querySelectorAll('.form');
    console.log(perguntas);
    telaAtual = trocarDeTela(5);
}

function getNiveis(){
    const niveis = document.querySelector('.niveis').querySelectorAll('.form');
    console.log(niveis);
    /*telaAtual = trocarDeTela(6);*/
    enviarQuizz();
}

function voltarHome(){
    telaAtual = trocarDeTela(0);
}

function enviarQuizz(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes", meuQuizz);
    promise.then(tratarSucesso);
    promise.catch(tratarErro);
}

function tratarSucesso(resposta){
    console.log(resposta.data);
}

function tratarErro(resposta){
    console.log(resposta.data);
}

//trocarDeTela(3);
