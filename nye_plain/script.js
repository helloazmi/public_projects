// Delete me and write some code!
//https://www.abeautifulsite.net/adding-and-removing-elements-on-the-fly-using-javascript
console.log("Started...");
let teamPoint = [5,2]; //teamPoints index 0 har noll p, teamindex 1 har noll p
let teamWords=[[],[]];
let activePlayer = 1; // 0 är lag 1, 1 är lag 2
let gissar= 0;
let randomOrd;
let ord = ['Anka','Bapelsin','Circus', 'Drake', 'Enhörning', 'Fallos'];
//['bord', 'stol', 'kalas', 'baltikum', 'europa', 'tandvård', 'viadukt','serpentin','parasit','terrordåd','DNA','Tegnell','Jimmy Åkesson','statskupp','Mars','spårvagn', 'hybris','demokrati','komunism','somelier','brexit','torped','svimfärdig','finlandsfärja','legosoldat','granatäpple','häxjakt'];
shuffle(ord);
console.log(activePlayer == 0 ? 'Lag ett:s tur!' : 'Lag två:s tur!');
 console.log(gissar == 1 ? 'Nu gissar någon.' : 'Ingen gissar just nu.');






renderGuessing();




function renderGuessing() {
  let main_container = document.getElementById('main-container'); //T EJ BORT
    addElement('main-container','H1','headline','-', '');
    //addElement('main-container','H1','countdown','', 'TID HÄR');
    addElement('main-container','DIV','','', '</br></br></br>');
    addElement('main-container','BUTTON','success','in-game-button','<b>OK</b>');
  //  addElement('main-container','BUTTON','pass','in-game-button','PASS');

      //Assignar HTML-knappar till JS-func
       let ordKorrekt_button = document.getElementById('success');
       ordKorrekt_button.onclick = function() {ordKorrekt();};
         //let ordPass_button = document.getElementById('pass');
        // ordPass_button.onclick = function() {ordPass();};

       let headline = document.getElementById('headline');
    // let countdown= document.getElementById('countdown');
      headline.innerHTML = '-';

  //startTimer(6,'countdown');

}


function renderAreYouReady(){
  addElement('main-container','h1','headline','',`LAG ${activePlayer == 0 ? 'ETT' : 'TVÅ'} REDO?`);
  addElement('main-container','BUTTON','ready','in-game-button','KLICKA FÖR ATT STARTA!');
  let ready_button = document.getElementById('ready');
  ready_button.onclick = function() {
    removeElement('ready');
    removeElement('headline');
  addElement('main-container','h1','headline','',`COUNTER`);// denna tas vort udner start time
  startTimer(3,'headline',1); //if 1 goes to guessing, or else ___ se timer på 3 för mains

  };
}



function ordKorrekt(){
  if(1==ord.length){ // less than ord-array-längd
    console.log('REACHED ZERO');

    let headline = document.getElementById('headline');
    let countdown= document.getElementById('countdown');

   headline.innerHTML = 'SLUT PÅ HÄNDELSER!';

  } else {  console.log('\nOrd kvar (length): '+ord.length);
            let score = teamPoint[activePlayer];
            console.log('KORREKT: "'+randomOrd+'" +1 poäng')
            console.log('Team '+activePlayer+' had score '+score);
            let newScore = teamPoint[activePlayer] = score+1; //Lägger till 1 poäng i teamActive
            console.log('New score: '+newScore);
            teamWords[activePlayer].push(randomOrd);
            ord.shift(0);
            console.log('Team '+activePlayer+ ' words: ' +teamWords[activePlayer]);
      genOrd();
    }

  }

function ordPass(){
    let score = teamPoint[activePlayer];
    console.log('\nPASS: "'+randomOrd+'" -1 poäng')
    console.log('Team '+activePlayer+' had score '+score);
    let newScore = teamPoint[activePlayer] = score-1; //Lägger till 1 poäng i teamActive
    console.log('New score: '+newScore);
  }

function genOrd(){
   //randomOrd = ord[Math.floor(Math.random() * ord.length)];
   randomOrd = ord[0];
   console.log('Din glosa är: ' +randomOrd);
   gissar = 1; // just nu gissar nån
   console.log('applying "'+randomOrd+ '" to headline');
   headline.innerHTML = randomOrd;
   //om gissar är nåt annat

  }


function startTimer(count, elementId, goToGuessing){
      var count;
      var interval = setInterval(function(){
        document.getElementById(elementId).innerHTML=count;
        count--;

        if (count === -1){ // När klockan slår "-1" visuellet "3-2-1-ACTION"
          clearInterval(interval);
          if (goToGuessing==true){

            removeElement('headline');
            renderGuessing();
          }
        }
      }, 1000);
  }


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  ord = array;
  //console.log(ord);
  return array;
}

function addElement(parentId, elementTag, elementId, elementClass, html) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.setAttribute('class', elementClass);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}



function timeOver(){
  document.getElementById('headline').innerHTML='TIDEN ÄR SLUT';
  document.getElementById('countdown').innerHTML='–';
}

function clear(){

}
