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
let url = `https://api.sl.se/api2/typeahead.json?key=${apiKey_plattsuppslag}&searchstring=${search}=s&maxresults=${num_results}`;

const json_object = async() => await Promise.resolve(url);


const getAPI = async() => { //detta är en asynchronous-arrow-function. väntar på att ladda data innan den fortsätter
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    let targetUrl = url;
    let json_object = fetch(proxyUrl + targetUrl)

      .then(response => response.json())
                          .then(data => {

                            console.table(data);
                            console.log(data);
                            document.getElementById("den").innerHTML = JSON.stringify(data, null, "\t");
                            return data;
                          })
                          .catch(e => { // error handling
                            console.log(e);
                            return e;
                          });
    };

getAPI();
