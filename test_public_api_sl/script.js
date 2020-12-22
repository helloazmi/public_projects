console.log('script.jsss loaded!');

/*
SL Plattsuppslag - Hjälper att hitta SITE-ID på tågen
https://www.trafiklab.se/api/sl-platsuppslag/dokumentation
API: 669ff8be5c704ffeaf1b0361259dd5c2

SL Realtidsinformation 4 - Tabellet för plats A till plats B
API: ec95886bb5ed469d90f9ac4cad56766d
*/
let search = 'Skanstull';
let num_results = '5';
const apiKey_plattsuppslag = '669ff8be5c704ffeaf1b0361259dd5c2';
let url = `https://api.sl.se/api2/typeahead.json?key=${apiKey_plattsuppslag}&searchstring=${search}=s&maxresults=${num_results}`


const apiKey_realtidsinformation4 = 'ec95886bb5ed469d90f9ac4cad56766d'




fetch(url).then(response => {
  console.log(response); //result promise (status code etc)
  return response.json();
}).then(response => {
  console.log(response); // jsonify the response
}).then(error => console.log('ERROR'));
