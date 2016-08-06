$(document).ready(function() { 
  let timeRunning = false;
  let timeLeft;
  let sessionTime = 1500;
  let breakTime = 300;
  let breakClock = false;
  let seconds = sessionTime;
  
  function play1(){
   let audio = document.getElementById("audio1");
   audio.play();
  }
  function play2(){
   let audio = document.getElementById("audio2");
   audio.play();
  }
  //Converts seconds to MM:SS
  function filterTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    if(sec < 10) {
      return min + ":0" + sec;
    } else {
      return min + ":" + sec;
    }
  }

  function timer() {
    if(seconds > 0) {
      seconds-- ;
      if(seconds === 0) {
        if($('.session').html() === "Break:"){
          play1();
        } else {
          play2();
        }
      }
    } else {
      if(!breakClock) {
        seconds = breakTime;
        $('.session').html("Break:");
        breakClock = true;
      } else {
        seconds = sessionTime;
        $('.session').html("Session:");
        breakClock = false;
      }
    }
    $('#time').html(filterTime(seconds));
  }
  //Initial page render
  $('#time').html(filterTime(seconds));
  $('#sessionLength').html(Math.floor(seconds / 60));
  $('#breakLength').html(Math.floor(breakTime / 60));


  //add play/pause functionality to the stopwatch button
  $('#start, #resume').click(function() {
    play1();
    $(".plus-minus").attr("disabled", true);
    $(this).hide();
    $("#stop").show();
    $("#stop").on("click", function(){
      $(".plus-minus").attr("disabled", false);
      $(this).hide();
      $("#resume").show();
      clearInterval(timeLeft);
      timeRunning = false;
    });
    
    if(!timeRunning) {
      timeLeft = setInterval(function() {timer()}, 1000);
      timeRunning = true;
    } else {
      clearInterval(timeLeft);
      timeRunning = false;
    }
  });

  //reset button brings app back to session mode at full time.
  $('#reset').click(function() {
    $(".plus-minus").attr("disabled", false);
    $("#stop").hide();
    $("#resume").hide();
    $("#start").show();
    seconds = sessionTime;
    $('.session').html("Session:");
    $('#time').html(filterTime(seconds));
    breakClock = false;
    clearInterval(timeLeft);
    timeRunning = false;
  });

  $(".plus-minus").click(function(e){
    let method = e.target.getAttribute("data-method");
    switch(method) {
      case "add-sess": sessionTime += 60; 
      break;
      case "sub-sess": sessionTime = sessionTime <= 60 ? 0 :sessionTime - 60;
      break;
      case "add-break": breakTime += 60; 
      break;
      case "sub-break": breakTime = breakTime <= 60 ? 0 : breakTime - 60; 
      break;
    }
    //sets seconds to the appropriate value
    seconds = breakClock ? breakTime : sessionTime;
    $('#time').html(filterTime(seconds));
    $('#sessionLength').html(Math.floor(sessionTime/60));
    $('#breakLength').html(Math.floor(breakTime/60));
  });
});