$(document).ready(function(){
//SETS UP EVENT LISTEN
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
    timer: 20,
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
  // START FUNCTION FOR TRIVIA GAME 
  startGame: function(){
    //DEFAULT RESTART VARS
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    
    //SHOW GAME QS AND AS
    $('#game').show();
    
    //DELETE LAST RESULT ((maybe empty?))
    $('#results').html('');
    
    //SHOW TIMER
    $('#timer').text(trivia.timer);
    
    //HIDE START BUTTON
    $('#start').hide();

    $('#remaining-time').show();
    
    //FIRST QUESTION
    trivia.nextQuestion();
    
  },

  nextQuestion: function() {
    //20 SECONDS PER QUESTIONS
    trivia.timer = 10;
    $("#timer").removeClass("last-second");
    $("#timer").text(trivia.timer);

    //INTERVAL
    if(!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    //GETS QUESTIONS 
    var questionCotent = Object.values(trivia.questions)[trivia.currentSet];
    $("#question").text(questionContent);

    //AN ARRAY OF OPTIONS FOR ANSWERS CREATED
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];

    //CREATES ALL THE TRIVIA QUESTIONS 
    $.each(questionOptions, function(index, key) {
      $("#options").append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
    })

  },
  //

}