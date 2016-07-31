//var Promise = require("bluebird");

//$(document).ready(function(){
  
  $("#circle1").hide();
  var minutes = 25;
  //var breakMin = 5;
  var isPaused = false;
  var timerId = 0;

  $("#length").text(minutes);
  function startTimer(duration, display) {
      var timer = duration, minutes, seconds;
      console.log("timer", timer);
      timerId = setInterval(function () {

        if(!isPaused){
          minutes = parseInt(timer / 60);
          seconds = parseInt(timer % 60);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          display.text(minutes + ":" + seconds);
          timer--;
          console.log(timer);
          if (timer < 0) {
              timer = duration;
              //$("#stop").hide();
              //$("#resume").hide();
              clearInterval(timerId);
              $("#circle").hide();
              $("#circle1").show();
              startBreak(5);
              
              
            
          }

        }

      }, 1000);
    console.log("id", timerId);

  }


  function startPomodoro(min){

    var minute = 60 * min,
    display = $('#time');
    startTimer(minute, display);
  }
  
   function startBreak(min){

    var minute = 60 * min,
    display = $('#time1');
    startTimer(minute, display);
  }

  // Event listeners

  // Session length actions

  $("#minus").on("click", function(){
    if(minutes > 1){
      minutes -= 1;
      $("#length").text(minutes);
      $("#time").text(minutes + ":00");
    }

  });

  $("#plus").on("click", function(){
    if( minutes < 45){
      minutes += 1;
      $("#length").text(minutes);
      $("#time").text(minutes + ":00");
    }

  });

  // Start button
  $("#start").on("click", function(){
    $("#minus, #plus").attr("disabled", true);

    $(this).hide();
    isPaused = false;
    startPomodoro(minutes);
    $("#stop").show();
    startBreak(breakMin);
  });

  //Stop button
  $("#stop").on("click", function(){
    $(this).hide();
    $("#resume").show();
    isPaused = !isPaused;
  });

  //Resume button
  $("#resume").on("click", function(){
    $(this).hide();
    $("#stop").show();
    isPaused = !isPaused;

  });

  //Reset button
  $("#reset").on("click", function(){
    $("#minus, #plus").attr("disabled", false);


    $("#stop").hide();
    $("#resume").hide();
    $("#start").show();
    clearInterval(timerId);
    $("#time").text(minutes + ":00");


  });
//})

