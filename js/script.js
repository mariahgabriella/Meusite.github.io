let randomNumber = Math.floor(Math.random() * 100) + 1;

function checkGuess() {
    let guess = document.getElementById("guess").value;
    let message = document.getElementById("message");

    if (guess == randomNumber) {
        message.textContent = "Parabéns! Você acertou!";
        message.style.color = "green";
    } else if (guess < randomNumber) {
        message.textContent = "Tente um número maior!";
        message.style.color = "red";
    } else {
        message.textContent = "Tente um número menor!";
        message.style.color = "red";
    }
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    document.getElementById("message").textContent = "";
    document.getElementById("guess").value = "";
}
// Função de cálculo
function calculate() {
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);
    let operation = document.getElementById("operation").value;
    
    let result;
    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            result = num2 !== 0 ? num1 / num2 : "Erro: Divisão por zero";
            break;
        default:
            result = "Operação inválida";
    }
    document.getElementById("result").innerText = "Resultado: " + result;
}
// formulário
document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário

        // Captura os dados do formulário
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const message = document.getElementById('message').value;

        // Validação do formato do email
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(emailPattern)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        // Redireciona para a página de confirmação
        window.location.href = 'confirmacao.html';
    });
});
// Função para calcular IMC
function calcularIMC() {
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);
    let imc = peso / (altura * altura);
    document.getElementById("resultadoIMC").innerText = "Seu IMC é: " + imc.toFixed(2);
}

// Função de conversão
function convert() {
    let conversionType = document.getElementById("conversionType").value;
    let inputValue = parseFloat(document.getElementById("inputValue").value);
    let result;

    switch (conversionType) {
        case 'cToF':
            result = (inputValue * 9/5) + 32;
            document.getElementById("result").innerText = inputValue + "°C equivalem a " + result.toFixed(2) + "°F";
            break;
        case 'mToCm':
            result = inputValue * 100;
            document.getElementById("result").innerText = inputValue + " metros equivalem a " + result + " centímetros";
            break;
        case 'kgToLb':
            result = inputValue * 2.20462;
            document.getElementById("result").innerText = inputValue + " kg equivalem a " + result.toFixed(2) + " libras";
            break;
        default:
            document.getElementById("result").innerText = "Opção inválida";
    }
}

// Funções do Quiz
// Lista de perguntas
const questions = [
    {
        question: "Qual é o maior planeta do sistema solar?",
        options: ["Terra", "Júpiter", "Marte", "Saturno"],
        answer: "Júpiter"
    },
    {
        question: "Quem pintou a Mona Lisa?",
        options: ["Michelangelo", "Leonardo da Vinci", "Van Gogh", "Pablo Picasso"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "Qual é o elemento químico mais abundante na Terra?",
        options: ["Hidrogênio", "Oxigênio", "Ferro", "Carbono"],
        answer: "Oxigênio"
    },
    {
        question: "Quantos ossos tem o corpo humano adulto?",
        options: ["206", "150", "300", "180"],
        answer: "206"
    },
    {
        question: "Em que ano o Brasil foi invadido?",
        options: ["1500", "1600", "1400", "1700"],
        answer: "1500"
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Função para carregar a próxima pergunta
function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    const feedback = document.getElementById("feedback");
    feedback.innerHTML = ""; // Limpar feedback anterior

    questionContainer.innerHTML = "";  // Limpar o conteúdo anterior

    let questionObj = questions[currentQuestionIndex];
    let questionText = `<h2>${questionObj.question}</h2>`;
    questionContainer.innerHTML += questionText;

    // Criar os botões para as opções de resposta
    questionObj.options.forEach(option => {
        let button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(option);
        questionContainer.appendChild(button);
    });

    // Mostrar o botão de próxima pergunta
    document.getElementById("next-button").style.display = "none";
}

// Função para verificar a resposta selecionada
function checkAnswer(selected) {
    const feedback = document.getElementById("feedback");

    if (selected === questions[currentQuestionIndex].answer) {
        score++;
        feedback.innerHTML = `<p style="color: green;">Resposta Correta!</p>`;
    } else {
        feedback.innerHTML = `<p style="color: red;">Resposta Errada! A resposta correta é: ${questions[currentQuestionIndex].answer}</p>`;
    }

    // Mostrar o botão para ir à próxima pergunta
    document.getElementById("next-button").style.display = "block";
}

// Função para avançar para a próxima pergunta
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        // Exibir a pontuação final ao terminar todas as perguntas
        const quizDiv = document.getElementById("quiz");
        quizDiv.innerHTML = "<h2>Quiz Finalizado!</h2>";

        // Exibir pontuação
        const scoreDiv = document.createElement('div');
        scoreDiv.innerHTML = `Sua pontuação: ${score} de ${questions.length}`;
        quizDiv.appendChild(scoreDiv);

        // Remover botão "Próxima Pergunta"
        document.getElementById("next-button").style.display = "none";
    }
}

// Carregar a primeira questão ao iniciar
loadQuestion();
