/* All answer options */
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');


/* All our options */
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); //cаме питання

const numberOfQuestion = document.getElementById('number-of-question'), //номер питання
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); //кількість всіх питань

let indexOfQuestion, //індекс поточного питання
    indexOfPage = 0; //індекс сторінки

const answersTracker = document.getElementById('answers-tracker'); //обгортка для трекера
const btnNext = document.getElementById('btn-next'); //кнопка Дальше

let score = 0; //кінцевий результат вікторини

const correctAnswer = document.getElementById('correct-answer'), //кількість правильних відповідей
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), //кількість всіх питань (в модальному вікні)
      btnTryAgain = document.getElementById('btn-try-again'); //кнопка "почати вікторину заново"

const questions = [
    {
        question: 'Якщо ти тут, я зрозумів, ти хочеш дізнатись щось про мене?',  //індекс масива questions = 0
        options: [
            'Взагалі не цікаво',
            'Так, дуже цікаво дізнатись якусь інформацію про тебе!',
            'Не задумувався над цим питанням',
            'Я тут випадково)',
        ],
        rightAnswer: 1  //індекс масива options
    },
    {
        question: 'Яку мову програмування я вивчаю?',  //індекс масива = 1
        options: [
            'С++',
            'Python',
            'C#',
            'JavaScript',
        ],
        rightAnswer: 3
    },
    {
        question: 'Ким я хочу стати в скорому часі?',  //індекс масива = 2
        options: [
            'Бізнесменом',
            'Прибиральником',
            'Танцюристом',
            'Fullstack Front-End Developer',
        ],
        rightAnswer: 3
    },
    {
        question: 'Як довго я займаюсь самовивченням FrontEnd Development?',  //індекс масива = 3
        options: [
            '2 роки',
            'Ще не починав',
            'Більше року',
            'Дуже довго',
        ],
        rightAnswer: 2
    },
    {
        question: 'Чого я очікую в скорому часі?',  //індекс масива = 4
        options: [
            'Знайти свою першу роботу в даній сфері, та працювати в кайф!!!',
            'Фінансової підтримки))',
            'Не надіюсь ні на що(',
            'Мене тут нема',
        ],
        rightAnswer: 0
    },
];

//innerHTML - щоб передати в середину діва якесь значення
numberOfAllQuestions.innerHTML = questions.length; //виводимо кількість питань (об'єктів в масиві questions)

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question  //будемо мапити всі питання з масиву об'єктів на сторінку

    //мапимо відповіді
    option1.innerHTML = questions[indexOfQuestion].options[0];  //індексація масива відбувається з нуля
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; //встановлення номера поточної сторінки
    indexOfPage++; //збільшення індексу сторінки
};

let completedAnswers = []; //масив для вже заданих питань

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length); //в JS є об'єкт Math який має певні методи
    let hitDuplicate = false; //якір для перевірки одинакових питань

    if(indexOfPage == questions.length) {
        quizOver(); //функція на кінець вікторини
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
                load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {  //el(якийсь елемент)
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {  //el.target - визначає елемент на який ми клікнули ... dataset - звертаємось до дата-атрибута
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for (option of optionElements) {  //цикл - перебирає html-колекцію(optionElements) таким чином дізнаємось по якому option клікнув користувач
    option.addEventListener('click', e => checkAnswer(e)); //спеціальний об'єкт e(event) закидуєм в функцію щоб взнати де клікнули
}

const disabledOptions = () => {  //присвоює disabled неправильному варіанту і висвічує правильний або просто висвічує правильний
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

const enableOptions = () => {  //удаляє всі класи зі всіх відповідей
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {  //створюєм трекер відповідно до кількості питань в масиві questions
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {  //status - параметр заданої функції // функція буде додавати колір кружечкам
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Вам потрібно вибрати один з варіантів')
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload(); //у властивості location є метод reload що перезагружає сторінку
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {   //ця функція запуститься тоді, коли відбудеться повна загрузка нашої сторінки
    randomQuestion();
    answerTracker();
})