console.log('scriptzmi.js loaded!')
  let startButtonShowing;


function showPressedStartButton(){
  console.log('Clicked, startButton');
  let newStartButton = document.getElementById('newStartButton');
  let popUpMenu = document.getElementById('winxp_menu_popup');


  function hidePopUpMenu(){
    popUpMenu.style.visibility ='hidden';
    newStartButton.src = 'assets/img/start_bar/winxp_startazmi_button_neutral_97x30.png';
    startButtonShowing = false;
  }
  function showPopUpMenu(){
    startButtonShowing= true;
    newStartButton.src = 'assets/img/start_bar/winxp_startazmi_button_pressed_97x30.png';
    popUpMenu.style.visibility ='';
  }





  if (startButtonShowing != true) { // Now button is pressed
    showPopUpMenu(); console.log('SHOWING POP-UP MENU');

  } else  if (startButtonShowing){
    hidePopUpMenu(); console.log('HIDE POP-UP MENU');
  }
  //console.log(newStartButton.src);
}
