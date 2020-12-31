// Delete me and write some code!
//https://www.abeautifulsite.net/adding-and-removing-elements-on-the-fly-using-javascript
//https://code-maven.com/prevent-leaving-the-page-using-plain-javascript //fixa stoppa lämning back uppdatering
console.log("Started...");
//fixa slut skärm nöär ord tar slut lr när X+Y knapp tryck
let teamPoint = [0,0]; //teamPoints index 0 har noll p, teamindex 1 har noll p
let teamWordsWon=[[],[]];
let teamWordsLost=[[],[]];
let activePlayer = 0; // 0 är lag 1, 1 är lag 2
let gissar= 0;
let randomOrd;
let correct_point_val = 2;
let pass_point_val = 1;
//let wonWordsFromRound = ['1','55','69'],lostWordsFromRound = ['L2','LX','LL'];
let wonWordsFromRound = [],lostWordsFromRound = [];

//let ord = ['bord', 'stol', 'kalas','maxhamburger'];
// let ord = ['bord', 'stol', 'kalas', 'baltikum', 'europa', 'tandvård', 'viadukt','serpentin','parasit','terrordåd','DNA','Tegnell','Jimmy Åkesson','statskupp','Mars','spårvagn', 'hybris','demokrati','komunism','somelier','brexit','torped','svimfärdig','finlandsfärja','legosoldat','granatäpple','häxjakt'];
let ord =['The Weeknd - Blinding Lights','Disney+','Mulan','Bränder i Australien','Cardi B - WAP','Börsen krashar', 'Tiger King','Parasite vann Oscar (för bäst film)','Prince Harry lämnar kungafamiljen (Megxit)', ' Guldbron anländer till Stockholm', 'Eurovision 2020 blir inställt.', 'Mordutredningen på Olof Palme lades ner.', 'Zlatans staty revs ner.', 'Brexit', 'Covid sprids i Europa.','Basketspelaren Kobe Bryant </b> dör i en helkopterolycka.', 'Max von Sydow avlider.', 'USA valår.','Donald Trump avgår' 'Sean Connery avlider.','Playstation 5 lanseras.', 'Stormkök är årets julklapp.', 'SF(biografer) stänger ner.']
let game_end = false;
let firstRound = true;
//fixa kanske sätt 2 sec timer på dessa
let prepQuotes = ['Får du heat? Skyll på din lagkamrat.','Fråga inte vad laget gör för dig, </br> fråga vad du gör för laget.', "Kom igen nu, kör fö' fan!", 'Kavla upp ärmarna!','Är du redo?', 'Jalla samla poäng!!', 'Om du håller på förlorar, </b> försök vinna istället!', 'Din tid att skina börjar inom...', 'Går det dåligt? </br> Skyll på alkoholen! 🥂😉', 'Ingen minns en förlorare 👀', 'Go go go!', 'Detta handlar om mer än bara ära!', 'Sätt igång och vinn!', 'Du kanske ska dricka lite vatten?', 'Taktisk förlust är en typ av strategi...', 'Thrash talk kan få </br> motståndarna ur balans', 'Förlorande laget </br> kommer att ta disken!'];

console.log(`Ord length: ${ord.length} \n Quotes length: ${prepQuotes.length}`);

let numWordsLeft=3;
let the_word_paragrph;

shuffle(prepQuotes);
shuffle(ord); //OK //för att aktivera full shuffle så måste 2st shuffles aktiveras ctrl+f dem. Denna rad är endast så att restart inte visar samma spel.
console.log(activePlayer == 0 ? 'TEAM ETT:s tur!' : 'TEAM TVÅ:s tur!'); //console.log(gissar == 1 ? 'Nu gissar någon.' : 'Ingen gissar just nu.');
let headline;




document.addEventListener('keypress', logKey);
  function logKey(e) { console.log(e);
    if (e['code']=='Digit1') {
        console.log('Key1 pressed!')
        sound_ok.play();
  }  else if (e['code']=='Digit2') {
        console.log('Key2 pressed!'); sound_pass.play();

      }  else if (e['code']=='Digit3') {
        console.log('Key3 pressed!'); sound_game.play();

      } else if (e['code']=='Digit4') {
        console.log('Key4 pressed!'); sound_game.stop();

      } else if (e['code']=='Digit5') {
          console.log('Key5 pressed!'); sound_endRound.play();
      } else if (e['code']=='Space' && e.target == document.body) {
          console.log('SPACE pressed!');
            e.preventDefault();
            ordKorrekt();
      }

      else {console.log('--');
    }
}


function bodyColor(color){

  console.log('\n\nRunning body color');
  document.body.style.backgroundColor = color;
}


//Runner
renderAreYouReady();



//SOUND
let sound_ok, sound_game, sound_pass, sound_endRound;
sound_ok = new sound("sound/sound-ok.wav", 'ok-sound'); sound_ok.volume = 0.9;
sound_pass = new sound("sound/sound-pass.wav", 'sound-pass'); sound_pass.volume = 0.9;
sound_game = new sound("sound/sound-game.wav", 'sound-game');  sound_game.volume = 0.8;

sound_endRound = new sound("sound/sound-end-of-round.wav"); sound_endRound.volume = 0.9;



function sound(src,idName) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
          this.sound.setAttribute("id", idName); ////////

  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}





//STEG1
function renderAreYouReady(){
  //EXECUTE if this is NOT the first round
  //if(!firstRound){removeElement('headline'); removeElement('won-words'); removeElement('lost-words'); removeElement('next');}//error pga först rundn finns dessa ej

  addElement('main-container','h1','headline','',`LAG ${activePlayer == 0 ? 'ETT' : 'TVÅ'} REDO?`);
  addElement('main-container','BUTTON','ready','in-game-button','KLICKA FÖR ATT STARTA!');
  let ready_button = document.getElementById('ready');

//STEG2 via-click triggar STEG3
  ready_button.onclick = function() { console.log('STEG2 ready_button clicked.;')
    removeElement('ready'); // remove ready-button
    removeElement('headline'); //remove countdown
    sound_ok.play();
  renderPepScreen();
  };

}

//STEG3
function renderPepScreen(){ console.log('STEG3 renderPepScreen();')
    shuffle(prepQuotes);
    addElement('main-container','h1','pep-quote','',`${prepQuotes[0]}`);// denna tas vort udner start time
    addElement('main-container','h1','pep-countdown','3',`</br>`);// denna tas vort udner start time

  //STEG3-B
  startTimer(3,'pep-countdown','renderGuessing'); //PEP-COUNTDOWN / PRE-COUNTODWN
}


//STEG4
function startTimer(count, elementId, contin){
      var count;
      var interval = setInterval(function(){
        document.getElementById(elementId).innerHTML=count;
        count--;

        if (count === -1){ clearInterval(interval); // När klockan slår "-1" visuellet "3-2-1-ACTION"

          if (contin=='renderGuessing'){    console.log('STEG4 going to renderGuessing!'); renderGuessing();
        } else if (contin=='renderSummary'){ renderSummary(); }

        }
      }, 1000);
  }



function genOrd(){
    //shuffle(ord);
   //randomOrd = ord[Math.floor(Math.random() * ord.length)];
   //removeElement('pep-countdown'); //om du tar bort denna försvinner inte pep countern

   //removeElement('pep-quote'); // om den här är borta så läggs pep-quot den till the word

   console.log('---Started genOrd();')
   randomOrd = ord[0];
   //console.log('\n\nRANDOM ORD: '+randomOrd+'\n\n');
   randomOrd = randomOrd.toUpperCase();

   console.log('\n\nRANDOM ORD: '+randomOrd+'\n\n');
  // gissar = 1; // just nu gissar nån

   the_word_paragrph = document.getElementById('the-word');
   the_word_paragrph.innerHTML = randomOrd;
   //om gissar är nåt annat
  }

                            //Hela funktionen Körs en gång, drf OK med remove pep-q och pep-c
function renderGuessing() {
  removeElement('pep-quote'); removeElement('pep-countdown');
  sound_game.play();
  let main_container = document.getElementById('main-container');

    addElement('main-container','H1','countdown','tid', '60</br>');//ingame countdown / Game countodwn
    addElement('main-container','H1','the-word','', 'ORD HÄR!');//thword
                addElement('main-container','DIV','spacing-div','', '</br></br></br></br>');  addElement('main-container','BUTTON','success','in-game-button','OK');addElement('main-container','BUTTON','pass','in-game-button','PASS');

      //Assignar HTML-knappar till JS-func
       let ordKorrekt_button = document.getElementById('success');
       ordKorrekt_button.onclick = function() {ordKorrekt();};
         let ordPass_button = document.getElementById('pass');
         ordPass_button.onclick = function() {ordPass();};

       the_word_paragrph = document.getElementById('the-word'); //XXXXXX
       // let countdown= document.getElementById('countdown');

// ingame countdown / Game countdown
startTimer(59,'countdown', 'renderSummary'); genOrd();
}


function ordKorrekt(){
  if(0==ord.length){ // less than ord-array-längd
    console.log('REACHED ZERO - CANCEL GAME -> GOING TO SUMMARY');
    renderSummary();
  } else {  console.log('\nOrd kvar (length): '+ord.length);
            let score = teamPoint[activePlayer];
            console.log(`KORREKT: "${randomOrd}" +${correct_point_val}p`)
            console.log(`Team ${activePlayer} had score ${score}`);
            let newScore = teamPoint[activePlayer] = score+correct_point_val; //Lägger till 1 poäng i teamActive

            console.log('New score: '+newScore);
            teamWordsWon[activePlayer].push(randomOrd);
              wonWordsFromRound.push(randomOrd);
            ord.shift(0);
            console.log('Team '+activePlayer+ ' words: ' +teamWordsWon[activePlayer]);
      sound_ok.play();
      genOrd();
    }

  }


function ordPass(){
  if(0==ord.length){ // less than ord-array-längd
    console.log('REACHED ZERO - CANCEL GAME -> GOING TO SUMMARY');
    renderSummary();


  } else {  let score = teamPoint[activePlayer];
            console.log(`PASS: "${randomOrd}" -${pass_point_val}p`);
            console.log(`Team ${activePlayer} had score ${score}`);
            let newScore = teamPoint[activePlayer] = score-pass_point_val; //Lägger till 1 poäng i teamActive

            console.log('New score: '+newScore);
            teamWordsLost[activePlayer].push(randomOrd);
              lostWordsFromRound.push(randomOrd);
            ord.shift(0);
            //bodyColor('#fc660f'); // time wait for color
      sound_pass.play();
      genOrd();
    }
  }

function renderScoreboard(){
  removeElement('headline'); removeElement('won-words'); removeElement('lost-words');removeElement('next');


    for (i=0; i<(wonWordsFromRound.length +lostWordsFromRound.length);i++){ //Radera "fösta" words den ser, så många ggr som length är.
      console.log(wonWordsFromRound[i]);
      removeElement('words');
      }
    wonWordsFromRound = []; lostWordsFromRound = []; //Reset värdet av round-arraysen

    addElement('first-column','P','team-one-headline','scoreboard-headline', `<b>TEAM ETT</b>`);
    addElement('first-column','P','team-one-score','scoreboard-score', `${teamPoint[0]}`);
    addElement('second-column','P','team-two-headline','scoreboard-headline', `<b>TEAM TVÅ</b>`);
    addElement('second-column','P','team-two-score','scoreboard-score', `${teamPoint[1]}`);

    addElement('sub-container','BUTTON','next','in-game-button','AVSLUTA DIN TUR');
    //addElement('sub-container','DIV','spacing','','</br></br>'); //orsakar width

  //Assignar HTML-knappar till JS-func
   let next_button = document.getElementById('next');
   lessThan(numWordsLeft); // ALERT index-0 spelar ej roll eftersom Less than eller Equal


   next_button.onclick = function() {
     if (!game_end){
       nextRound();
     } else if (game_end){
       renderGameEndScreen();
     }
   };
}

function renderGameEndScreen(){
  removeElement('next');removeElement('team-one-headline');removeElement('team-one-score');removeElement('team-two-headline');removeElement('team-two-score');
  teamPoint[0] >teamPoint[1] ? activePlayer=0 : activePlayer=1;

  let winner = (activePlayer == 0 ? 'ETT' : 'TVÅ');

  addElement('main-container','H1','end-game-headline','', `VINNAREN AV 2020 CHARADER`);
  addElement('main-container','H1','winner-headline','', `💥 <b>LAG ${winner} 💥</b>`);
    console.log(`VINNAREN ÄR LAG ${winner}!`);

  addElement('first-column','P','team-one-headline','scoreboard-headline', `<b>VUNNA</b>`);
  for (i=0; i<teamWordsWon[activePlayer].length;i++){ //Printar till HTML alla vunna
    addElement('first-column','P','words','', teamWordsWon[activePlayer][i]);
    }

  addElement('second-column','P','team-one-headline','scoreboard-headline', `<b>FÖRLORADE</b>`);
  confetti.start();
  confetti.maxCount =110;
}

function nextRound(){
  removeElement('next');//knappen
  removeElement('team-one-headline'); removeElement('team-two-headline');
  removeElement('team-one-score'); removeElement('team-two-score');


  console.log('Active player WAS: '+activePlayer); activePlayer ? activePlayer=0 : activePlayer=1;console.log('Active player IS: '+activePlayer);
  firstRound=false; //det är ej längre first round, därmed kommer först raderingen av element fungera i renderAreYouReady

  for (i=0; i<(wonWordsFromRound.length+lostWordsFromRound.length); i++){
    removeElement('words');
  }
  renderAreYouReady();
}

function renderSummary(){
  console.log('went to summary');
  sound_game.stop();sound_endRound.play();

  console.log('stopped sound_game');
  removeElement('the-word');removeElement('countdown');removeElement('success');removeElement('pass');removeElement('spacing-div');
  addElement('main-container','H1','headline','', 'TIDEN ÄR SLUT</br>');

    console.log('WON: '+wonWordsFromRound);console.log('LOST: '+lostWordsFromRound);

  addElement('first-column','P','won-words','summary-headline', `</br>VUNNA +${wonWordsFromRound.length*correct_point_val}p`); //fixa -- om inga ord vunna
    for (i=0; i<wonWordsFromRound.length;i++){ //Printar till HTML alla vunna
      console.log(wonWordsFromRound[i]); addElement('first-column','P','words','', wonWordsFromRound[i]);
      }

  addElement('second-column','P','lost-words','summary-headline', `</br>FÖRLORADE -${lostWordsFromRound.length*pass_point_val}p`);
    for (i=0; i<lostWordsFromRound.length;i++){ //Printar till HTML alla förloraste //fixa -- om inga ord förlorade
      console.log(lostWordsFromRound[i]); addElement('second-column','P','words','', lostWordsFromRound[i]);
      }

      addElement('sub-container','BUTTON','next','in-game-button','FORTSÄTT');
      //addElement('sub-container','DIV','spacing','','</br></br>'); //orsakar width

        //Assignar HTML-knappar till JS-func
         let next_button = document.getElementById('next');
         next_button.onclick = function() {renderScoreboard();};

}

function lessThan(x){
  console.log('Will react if less than '+x);
  console.log('Words left: '+ord.length);

  if (x>=ord.length && ord.length==0){
      console.log('WORD HAS NO LENGTH?'+ ord.length);
      renderGameEndScreen();
  } else {
      alert(`Det är ${ord.length} händels(er) kvar, sen tar spelet slut!`);

  }
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
  //ord = array; /// fixa, den här raden ska var synlig!
  //console.log(ord);
  console.log(array);
  return array;

}
