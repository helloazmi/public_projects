console.log('script.js loaded!');

let targetName;
let targetSiteId;

let targetX;
let targetY;



let ResponseData_object;
let json_object;
let search_input = 'Skanstull';
let num_results = '2';
const apiKey_plattsuppslag = '669ff8be5c704ffeaf1b0361259dd5c2';
let url = `https://api.sl.se/api2/typeahead.json?key=${apiKey_plattsuppslag}&searchstring=${search_input}=s&maxresults=${num_results}`;
console.log(url);






const getAPI = async() => { //detta är en asynchronous-arrow-function. väntar på att ladda data innan den fortsätter
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; //proxy, undviker CORS error, låtsas som att du callar från ett legit ställe.
    let targetUrl = url; //lägger bara in global url till target

    console.log('STARTED FETCHING!')
    fetch(proxyUrl + targetUrl)
      .then(response => response.json())
      .then(data => { console.log('RECEIVED DATA!!') //if receiving wait
        //console.log('\nHere comes the json_object!');
        json_object = data;
        ResponseData_object = json_object['ResponseData'];
        console.log('');

        targetName = ResponseData_object[0]["Name"];
        targetSiteId = ResponseData_object[0]["SiteId"];
        targetX = ResponseData_object[0]["X"];
        targetY = ResponseData_object[0]["Y"];
            // console.log(JSON.stringify(targetName));
            // console.log(JSON.stringify(ResponseData_object[0]["SiteId"]))
            // console.log(JSON.stringify(ResponseData_object[0]["X"]))
            // console.log(JSON.stringify(ResponseData_object[0]["Y"]))

        //console.log(data);
          //document.getElementById("paragraph").innerHTML = JSON.stringify(data, null, "\t"); //printar till Paragraf


              let search_query_response_data =json_object["ResponseData"];
                let nameToHTML = document.getElementById('api_output_name');
                let siteIdToHTML = document.getElementById('api_output_site_id')
                let xToHTML = document.getElementById('api_output_x')
                let yToHTML = document.getElementById('api_output_y')

               // HÄR BEÖVER ÄNDRAS FÖR ATT UPPDATETA HTML:en
              //console.log('\n\nResponseData Object:');
              //console.log(ResponseData_object);

                    nameToHTML.innerHTML = `<b>Name:</b> ${targetName}`;
                    console.log(`targetName: ${(JSON.stringify(targetName))}`);


                    siteIdToHTML.innerHTML = `<b>Site ID:</b> ${targetSiteId}`;
                    console.log(`targetSiteId: ${(JSON.stringify(targetSiteId))}`);


                    xToHTML.innerHTML = `<b>X-coordinate:</b> ${targetX}`;
                    console.log(`targetX: ${(JSON.stringify(targetX))}`);


                    yToHTML.innerHTML = `<b>Y-coordinate:</b> ${targetY}`;
                    console.log(`targetY: ${(JSON.stringify(targetY))}`);



        return data;
      }).catch(e => { // error handling
        console.log(e);
        return e;
      });
  };


getAPI(); //denna för auto första read

let inputBox = document.getElementById('search_input');
  inputBox.focus();
  inputBox.select();


let search_button = document.getElementById("search_button"); //identifying the HTML element
    search_button.onclick = function(){//this is an eventhandler. (doing anonymous func) LISTEN WHEN THE BUTTON IS CLICKED then.. RUN FOLLOWING FUNCTION
    writeInput();
  };


document.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    writeInput();
  }
});

// ANLEDNINGEN TILL ATT VI INTE KAN LÄGGA IN writeInput() i fetch är för att den körs utan att datan finns!!

function writeInput(){
  console.log('\nSearch clicked, input is: '+search_input);
    search_input = document.getElementById("search_input").value // get search query from input
    url = `https://api.sl.se/api2/typeahead.json?key=${apiKey_plattsuppslag}&searchstring=${search_input}=s&maxresults=${num_results}`;  //updating URL with new search query

    console.log('Updated URL to:'+ url);
    getAPI();


}
