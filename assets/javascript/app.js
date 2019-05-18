
$(document).ready(function(){
//SETS UP EVENT LISTEN
    $("#remaining-time").hide();
    $("#start").on("click", trivia.startGame);
    $(document).on("click" , ".option", trivia.guessChecker);
    
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
      q3: ['Kidney Beans', 'Lentils', 'Lima Beans', 'Chickpeas'],
      q4: ['Hersheys Chocolate Syrup', 'Puff Cheeots', 'Cherry Poptarts', 'Greek Yogurt'],
    },
    //ESTABLISHES ANSWERS
    answers: {
      q1: 'Vitamin B12',
      q2: 'False',
      q3: 'Lentils',
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
    $("#timer").removeClass("last-chance");
    $("#timer").text(trivia.timer);

    //INTERVAL
    if(!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    //GETS QUESTIONS 
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $("#question").text(questionContent);

    //AN ARRAY OF OPTIONS FOR ANSWERS CREATED
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];

    //CREATES ALL THE TRIVIA QUESTIONS 
    $.each(questionOptions, function(index, key) {
      $("#options").append($('<button class="option">' + key + '</button>'));
    })

  },
  //DECREMENT TIMER 
  timerRunning: function() {
    //function for what happens if time is left and question unanswered
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
      $("#timer").text(trivia.timer);
      trivia.timer--;
      //If less than 5 seconds add last-second class to turn text red 
      //not working yet 
        if(trivia.timer === 5) {
          $("#timer").addClass("last-chance");
        }
    }

    //if function for if question left unanswered, run result 
    else if(trivia.timer === -1) {
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultID = setTimeout(trivia.guessResult, 1000);
      $("#results").html("<h3>Out of time! The answer was " + Object.values(trivia.answers)[trivia.currentSet] + "</h3>");
    }

    //IF ALL QUESTIONS HAVE BEEN SHOWED THEN END GAME
    else if(trivia.currentSet === Object.keys(trivia.questions).length) {
      //add the results of the game to the page 
      $("#results").html("<h3>Thanks for playing!</h3>" + 
      "<p>You got " + trivia.correct + " correct!</p>" +
      "<p>You got " + trivia.incorrect + " wrong :( </p>" +
      "<p>You didn't answer " + trivia.unanswered + " .</p>" );

      //hide the game
      $("#game").hide();

      //show the start button for a new game
      $("#start").show();
    }

  },

  //guess check 

  guessChecker: function() {
    var resultID;
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    if($(this).text() === currentAnswer){
      $(this).addClass("btn-yes");
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultID = setTimeout(trivia.guessResult, 1000);
      $("#results").html("<h3>Correct!!</h3>");
    }
    //if the answer is wrong
    else {
      $(this).addClass("btn-no");
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $("#results").html("<h3>Sorry, friend! Better luck next time." + currentAnswer + "</h3>");
    }

  },

  //remove previous q AND options
  guessResult: function() {
    trivia.currentSet++;
    $(".option").remove();
    $("#results h3").remove();
    trivia.nextQuestion();
    }

  }