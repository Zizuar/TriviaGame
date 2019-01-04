$(document).ready(function(){

    
$("#remaining-time").hide();
$("#start").on('click', trivia.startGame);
$(document).on('click' , '.option', trivia.guessChecker); 
  })
// * You'll create a trivia form with multiple choice or true/false options (your choice).  
  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    time: 20,
    timerOn: false,
    timerId : '',
    questions: {
      q1: 'What Year Was FSO Founded?',
      q2: 'What Medium Did FSO Originally Exist On?',
      q3: 'What Was The Screen Name Of FSOs Last President?',
      q4: 'How Many Sims Did FSO Start With?',
      q5: "Is FSO Currently In Operation?",
    },
    options: {
      q1: ['2019', '1997', '1981', '1999'],
      q2: ['IRC', 'AIM', 'E-Mail', 'PPB'],
      q3: ['Zerb', 'Webb', 'Felton', 'Pike'],
      q4: ['2', '7', '4', '10'],
      q5: ['Yes','No'],
    },
    answers: {
      q1: '1997',
      q2: 'IRC',
      q3: 'Felton',
      q4: '4',
      q5: 'Yes',
    },
// Star Game and Trigger options. Value reset for multiple attempts. Trigger on button via HTML.
    startGame: function(){
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      $('#game').show();
      $('#results').html('');
      $('#timer').text(trivia.timer);
      $('#start').hide();
      $('#remaining-time').show();      
      trivia.nextQuestion();      
    },
// As you iterate through the quiz.. timer isn't functioning? Why?   Now Start Button Stopped Working...
    nextQuestion : function(){    
      trivia.timer = 10;
      $('#time').removeClass('last-seconds');
      $('#time').text(trivia.timer);       
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }    
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
    },
    timerRunning : function(){
       if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#time').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#time').addClass('last-seconds');
          }
      }
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }   
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
// The page will reveal the number of questions that players answer correctly and incorrectly. Check correct answers vs incorrect.       
   
        $('#results')
          .html('<h3>FSO Thanks You For Your Interest</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');   
        $('#game').hide();        
        $('#start').show();
      }      
    }, 
    guessChecker : function() {
         var resultId;
         var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');     
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      else{
        $(this).addClass('btn-danger').removeClass('btn-info');        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }      
    },
    guessResult : function(){      
      trivia.currentSet++;      
      $('.option').remove();
      $('#results h3').remove();
      trivia.nextQuestion();       
    }  
  }



// * The player will have a limited amount of time to finish the quiz. 

//   * The game ends when the time runs out. The page will reveal the number of questions that players answer correctly and incorrectly.

// * Don't let the player pick more than one answer per question.

// * Don't forget to include a countdown timer.

// ### Reminder: Submission on BCS

// * Please submit both the deployed Github.io link to your homework AND the link to the Github Repository!
