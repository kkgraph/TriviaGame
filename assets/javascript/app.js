$(document).ready(function(){
//SETS UP TRIVIA
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    //FOR RESET TRIVIA
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 30,
    timerOn: false,
    timerId : '',
    // QUESTIONS
    questions: {
      q1: 'Which of these is likely to be lacking in a vegan diet?',
      q2: 'A vegan or vegetarian diet is bound to be healthy.',
      q3: 'Beans and legumes are plant-based sources of iron. Which of these contains the most iron?',
      q4: 'Which of these ‘junk food’ items happens to be accidentally vegan?',

    },
    //CREATE ANSWER ARRAY
    options: {
      q1: ['Viatmin E', 'Vitamin C', 'Vitamin B12', 'Fiber'],
      q2: ['True', 'False', 'Idk', 'Omivore FTW'],
      q3: ['kidney beans', 'lentins', 'lima beans', 'chickpeas'],
      q4: ['Hersheys Chocolate Syrup', 'Puff Cheeots', 'Cherry Poptarts', 'Greek Yogurt'],
    },
    //ESTABLISHES ANSWERS
    answers: {
      q1: 'Vitamin B12',
      q2: 'False',
      q3: 'lentils',
      q4: 'Hersheys Chocolate Syrup',
    },
  
    }