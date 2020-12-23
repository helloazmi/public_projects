console.log('script.js loaded!');

// SL Plattsuppslag - Hjälper att hitta SITE-ID på tågen
// https://www.trafiklab.se/api/sl-platsuppslag/dokumentation
// API: 669ff8be5c704ffeaf1b0361259dd5c2

// SL Realtidsinformation 4 - Tabellet för plats A till plats B
// API: ec95886bb5ed469d90f9ac4cad56766d

let search = 'Skanstull';
let num_results = '5';
const apiKey_plattsuppslag = '669ff8be5c704ffeaf1b0361259dd5c2';
let url = `https://api.sl.se/api2/typeahead.json?key=${apiKey_plattsuppslag}&searchstring=${search}=s&maxresults=${num_results}`;
console.log(url);
//const json_object = async() => await Promise.resolve(url); //vet exakt om den här behövs?


const getAPI = async() => { //detta är en asynchronous-arrow-function. väntar på att ladda data innan den fortsätter
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; //proxy, undviker CORS error, låtsas som att du callar från ett legit ställe.
    let targetUrl = url; //lägger bara in global url till target

    fetch(proxyUrl + targetUrl)
      .then(response => response.json())
                          .then(data => {
                            console.log(data);
                              document.getElementById("den").innerHTML = JSON.stringify(data, null, "\t"); //printar till Paragraf
                            return data;
                          }).catch(e => { // error handling
                            console.log(e);
                            return e;
                          });
  };

const json_object = getAPI();
