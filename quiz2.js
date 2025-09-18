const quizData = [
    {
        question: "Quelle est la capitale du Togo ?",
        choices: ["Accra", "Lomé", "Cotonou", "Abuja"],
        answer: "Lomé"
    },
    {
        question: "Combien font 7 x 8 ?",
        choices: ["54", "56", "64", "72"],
        answer: "56"
    },
    {
        question: "Qui a inventé l'ampoule électrique ?",
        choices: ["Thomas Edison", "Albert Einstein", "Nikola Tesla", "Manase Attoessi"],
        answer: "Thomas Edison"
    },
    {
        question: "Quelle planète est la plus proche du Soleil ?",
        choices: ["Vénus", "Mercure", "Mars", "Terre"],
        answer: "Mercure"
    },
    {
        question: "En quelle année le Togo a eu son indépendance ?",
        choices: ["27 Avril 1960", "13 Janvier 1963", "30 Août 1956", "05 Février 2005"],
        answer: "27 Avril 1960"
    },
];

const totalQuestions = quizData.length;
let score = 0;
let timeLeft = 10; //15 sec/question
let timer = null;
let answerered = false;

const questionE1 = document.getElementById("question");
const choicesE1 = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const resultE1 = document.getElementById("result");
const timeE1 = document.getElementById("time");
const progressText = document.getElementById("progress-text")
const progressFill = document.getElementById("progress-fill")

function loadQuestion(){
    if(quizData.length === 0){
        showResult();
        return;
    }

    const done = totalQuestions - quizData.length;
    const currentIndex = done ;
    const currentQuiz = quizData[0];

    questionE1.textContent = currentQuiz.question;
    choicesE1.innerHTML = "";
    answerered = false;

    //Mise à jour bar de progression //
    progressText.textContent = `Question ${currentIndex + 1} sur ${totalQuestions}`;
    const progressPercent = (done / totalQuestions) * 100;
    progressFill.style.width = `${progressPercent}%`;

    currentQuiz.choices.forEach(choice => {
        const boutton = document.createElement("button");
        boutton.textContent = choice;
        boutton.addEventListener("click", () => selectAnswer(choice));
        choicesE1.appendChild(boutton);
    });

    //Reset timer
    resetTimer();
}

function selectAnswer(choice) {
    if(answerered) return; //Empêche le double clic
    answerered = true;
    clearInterval(timer);

    const correctAnswer = quizData[0].answer;
    if (choice !== null && choice === correctAnswer){
        score++;
    }

    Array.from(choicesE1.children).forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer){
            btn.style.background = "#28a745"; //vert si correct
        }else{
            btn.style.background = "#dc3545"; //rouge sinon
        }
    });
    clearInterval(timer); //stop le chrono après réponse
}

nextBtn.addEventListener("click", () => {
    clearInterval(timer);
    if(!answerered){
        selectAnswer(null);
    }
    setTimeout(() => {
        quizData.shift();
        loadQuestion();
    },300)
});
/*function nextQuestion(){
    currentQuestion++;
    if (currentQuestion < quizData.length){
        loadQuestion();
    }else{
        showResult();
    }
}*/

function showResult() {
    questionE1.textContent = "Quiz terminé !";
    choicesE1.innerHTML = "";
    nextBtn.style.display = "none";
    resultE1.textContent = `Votre score : ${score} / ${totalQuestions}`;
    progressFill.style.width = "100%";
    timeE1.textContent = "0";
    clearInterval(timer);
}

function resetTimer(){
    clearInterval(timer);
    timeLeft = 10;
    timeE1.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeE1.textContent = timeLeft;
        if(timeLeft <= 0){
            clearInterval(timer);
            if(!answerered){
                selectAnswer(null); //compter comme faux s'il n'y a pas de réponse choisie
            }
            setTimeout(() => {
                quizData.shift();
                loadQuestion();
            },1000); //passe à la suivante après 3s
        }
    },1000);
}

loadQuestion();