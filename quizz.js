const questions = [
    {
        question: "Quelle est la capitale du Togo ?",
        options: ["Accra", "Lomé", "Cotonou", "Abuja"],
        answer: "Lomé"
    },
    {
        question: "Combien font 7 x 8 ?",
        options: ["54", "56", "64", "72"],
        answer: "56"
    },
    {
        question: "Qui a inventé l'ampoule électrique ?",
        options: ["Thomas Edison", "Albert Einstein", "Nikola Tesla", "Manase Attoessi"],
        answer: "Thomas Edison"
    },
    {
        question: "Quelle planète est la plus proche du Soleil ?",
        options: ["Vénus", "Mercure", "Mars", "Terre"],
        answer: "Mercure"
    },
    {
        question: "En quelle année le Togo a eu son indépendance ?",
        options: ["27 Avril 1960", "13 Janvier 1963", "30 Août 1956", "05 Février 2005"],
        answer: "27 Avril 1960"
    },
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15; //15 sec/question

function startQuiz(){
    document.getElementById("accueil").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    clearInterval(timer);
    timeLeft = 15;

    const q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;

    let optionsHtml = "";
    q.options.forEach(opt => {
        optionsHtml += `<div class="option" onclick="checkAnswer(this)">${opt}</div>`;
    });

    document.getElementById("options").innerHTML = optionsHtml;
    document.getElementById("progression").innerText = `Question ${currentQuestion + 1} sur ${questions.length}`;

    document.getElementById("timer").innerText = `${timeLeft}s restantes`;
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    document.getElementById("timer").innerText = `${timeLeft}s restantes`;
    if (timeLeft <= 0){
        clearInterval(timer);
        nextQuestion();
    }
}

function checkAnswer(element) {
    clearInterval(timer);
    const selected = element.innerText;
    const correct = questions[currentQuestion].answer;

    if (selected === correct) {
        element.classList.add("correct");
        score++;
    }else{
        element.classList.add("incorrect");
        Array.from(document.getElementsByClassName("option")).forEach(opt => {
            if (opt.innerText === correct) {
                opt.classList.add("correct");
            }
        });
    }

    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    }else{
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("resultat").style.display = "block";

    document.getElementById("score").innerText = `Ton score est ${score} sur ${questions.length}`;

    let best = localStorage.getItem("bestScore") || 0;
    if (score > best) {
        best = score;
        localStorage.setItem("bestScore", best);
    }

    document.getElementById("bestScore").innerText = `Meilleur score : ${best} / ${questions.length}`;
}

function restartQuiz() {
    document.getElementById("resultat").style.display = "none";
    document.getElementById("accueil").style.display = "block";
}