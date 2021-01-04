console.log('script.js loaded!'); //https://www.youtube.com/watch?v=cuEtnrL9-H0

let url = 'https://sheet.best/api/sheets/65a11748-3b33-4550-a354-4e929e17cb01'
let json_data;
let full_pickuplines ={};
let confirmed_openings = [];
let confirmed_punchlines = [];


fetch(url)
  .then(response => response.json())
  .then(data => {
 
    json_object = data;

    for (let i=0; i<json_object.length; i++){
      let opening = json_object[i]['Opening/oneLiner']
      let punchline = json_object[i]['Punchline']
      let confirmedPickup = json_object[i]['confirmed']
      if(confirmedPickup == 'TRUE'){ //Den uppfattar checkbox i GSheets som string
        confirmed_openings.push(opening);
        confirmed_punchlines.push(punchline);
      }
      //console.log(json_object[i]);
    }

    console.log('\n\nConfirmed openings: ', confirmed_openings);
    console.log('\nConfirmed punchlinelines: ', confirmed_punchlines);
  })
