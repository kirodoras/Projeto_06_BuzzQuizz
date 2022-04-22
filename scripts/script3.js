let quizz =
{
	title: "Título do quizz",
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

    if((infoTitulo.value.length < 20 || infoTitulo.value.length > 65) 
        || (infoAskQtd.value < 3 || infoLvlQtd.value < 2)){
        alert('O Título do quizz deve ter no mínimo 20 e no máximo 65 caracteres \n');
        /*infoTitulo.value = '';
        infoAskQtd.value = '';
        infoLvlQtd.value = '';*/
        return;
    }

    quizz.title = infoTitulo.value;
    quizz.image = infoUrlImg.value;

    telaAtual = trocarDeTela(4);
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

}

trocarDeTela(0);