console.log('script.js loaded!'); //https://www.youtube.com/watch?v=cuEtnrL9-H0

let url = 'https://sheet.best/api/sheets/65a11748-3b33-4550-a354-4e929e17cb01';
let json_data;
let full_pickuplines ={};
let confirmed_openings = [];
let confirmed_punchlines = [];

let opening, punchline;

fetch(url)
  .then(response => response.json())
  .then(data => {

    json_object = data;

    for (let i=0; i<json_object.length; i++){
      opening = json_object[i]['Opening/oneLiner']
      punchline = json_object[i]['Punchline']
      let confirmedPickup = json_object[i]['confirmed']
      if(confirmedPickup == 'TRUE'){ //Den uppfattar checkbox i GSheets som string

      if(punchline==false){ punchline ==' '} // om punchline är fasle, alltså tom då lägg till </br>. detta gör att knappen inte ersätter tomma utrymmet utan sitter kvar.

        confirmed_openings.push(opening);
        confirmed_punchlines.push(punchline);
      }
      //console.log(json_object[i]);
    }

    console.log('\n\nConfirmed openings: ', confirmed_openings);
    console.log('\nConfirmed punchlinelines: ', confirmed_punchlines);
    console.log(confirmed_openings[3]);
    console.log(confirmed_punchlines[3]);
    console.log(typeof confirmed_punchlines[3]);

    if(confirmed_punchlines[3]== false){console.log('ITS FALSE')}

    shuffle(confirmed_openings, confirmed_punchlines);
    pickup_function(); //First run
  })





function pickup_function() {
  console.log('clixxx');
  let pickup_button = document.getElementById('pickup_button');
    let opening_h1 = document.getElementById('opening');
    let punchline_h1 = document.getElementById('punchline');

    let opening_new = opening
    let punchline_new


    //Clearing opening and punchline
    opening_h1.innerHTML = ' '; punchline_h1.innerHTML = '</br>';

    //Deleting from opening and punchline arrays.
    confirmed_openings.splice(0,1)
    confirmed_punchlines.splice(0,1)

    opening_h1.innerHTML = confirmed_openings[0];
    //Sleep before giving punchline
    sleep(1000).then(()=>{ console.log("Done"); punchline_h1.innerHTML = `$(confirmed_punchlines[0])`;})
}

function sleep(ms){ return new Promise( resolver => setTimeout(resolver, ms));};


function shuffle(obj1, obj2) {
  var index = obj1.length;
  var rnd, tmp1, tmp2;

  while (index) {
    rnd = Math.floor(Math.random() * index);
    index -= 1;
    tmp1 = obj1[index];
    tmp2 = obj2[index];
    obj1[index] = obj1[rnd];
    obj2[index] = obj2[rnd];
    obj1[rnd] = tmp1;
    obj2[rnd] = tmp2;
  }
}

shuffle(mp3, ogg);
