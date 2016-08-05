
  $(document).ready(function() { 
    let clockRunning = false;
    let timeLeft;
    let sessionTime = 1500;
    let breakTime = 300;
    let breakClock = false;
    let seconds = sessionTime;
  })


  let minutes = 25;
  
  let breakMin = 5;
  let isPaused = false;
  let timerId = 0;

  $("#time").text(minutes + ":00");
  
  function startTimer(duration, display) {
      //let session = true;
      let timer = duration, minutes, seconds;
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
              $(".session").text("Break:");
              startPomodoro(breakMin);
              //$("#stop").hide();
              //$("#resume").hide();
              //clearInterval(timerId);
          }

        }

      }, 1000);
  }


  function startPomodoro(min){

    let minute = 60 * min,
    display = $('#time');
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
    if( minutes < 60){
      minutes += 1;
      $("#length").text(minutes);
      $("#time").text(minutes + ":00");
    }

  });

  
  $("#minus1").on("click", function(){
    if(breakMin > 1){
      breakMin -= 1;
      $("#length1").text(breakMin);
      $("#time1").text(breakMin + ":00");
    }

  });


  $("#plus1").on("click", function(){
    if(breakMin < 60){
      breakMin += 1;
      $("#length1").text(breakMin);
      $("#time1").text(breakMin + ":00");
    }

  });

  // Start button
  $("#start").on("click", function(){
    $("#minus, #plus, #minus1, #plus1").attr("disabled", true);

    $(this).hide();
    isPaused = false;
    startPomodoro(minutes);
    $("#stop").show();
    //startBreak(breakMin);
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
    $("#minus, #plus, #minus1, #plus1").attr("disabled", false);


    $("#stop").hide();
    $("#resume").hide();
    $("#start").show();
    clearInterval(timerId);
    $(".session").text("Session:");
    $("#time").text(minutes + ":00");


  });

