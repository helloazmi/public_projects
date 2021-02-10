/*

Consumer Key	            ACNgbPIjtGTbjlCdqkNA
Consumer Secret	LxzhrutsgTfIVgqwmkzohRSSVktzTITb

Request Token URL	https://api.discogs.com/oauth/request_token
Authorize URL	https://www.discogs.com/oauth/authorize
Access Token URL	https://api.discogs.com/oauth/access_token

// EXMEPEL MED MIN KOD OCH REQUEST
https://api.discogs.com/database/search?q=Nirvana&key=ACNgbPIjtGTbjlCdqkNA&secret=LxzhrutsgTfIVgqwmkzohRSSVktzTITb

*/
// https://www.youtube.com/watch?v=4cYiC3EW4Rw


let ignore = ['(official video)',]

console.log('script.js loaded!');
apiKey = 'ACNgbPIjtGTbjlCdqkNA&secret=LxzhrutsgTfIVgqwmkzohRSSVktzTITb';

let titleClass = document.getElementsByClassName('title style-scope ytd-video-primary-info-renderer');
let h1Title = titleClass[0];
let title = titleClass[0].innerText;

let url = `https://api.discogs.com/database/search?q=${title}&key=${apiKey}`;


const getFirstResult = (data) => {
    console.log('--------------------------\n\n\n\n');
    console.log(data);
    let fr_title = data['results'][0]['title'];
    let fr_uri = data['results'][0]['resource_url'];
    console.log(`TITLE: ${fr_title} \n URI: ${fr_uri}` ); // https://www.discogs.com//Bellaire-Framework/release/12872283
    return [fr_title, fr_uri]; //returnar array  som vi kan läsa vidare i fetchen
}

const getPriceFromFirstResult = (fetchPriceUrl) => {
   let itemUrl = `${fetchPriceUrl}` //https://api.discogs.com/releases/12872283&key=ACNgbPIjtGTbjlCdqkNA&secret=LxzhrutsgTfIVgqwmkzohRSSVktzTITb
   fetch(itemUrl)
       .then(  (response) => { response.json()
       .then(   (data) => {   let price = data['lowest_price']; console.log(`Lowest price: ${price} USD // ` +price*8.34 +' SEK');


         let org = titleClass[0].innerText;
         h1Title = titleClass[0].innerText = `($${price}) ${org}`;



       })});
    }






fetch(url)
    .then(  (response) => { response.json()
    .then(   (data) => {
      let fr_results = getFirstResult(data);
      console.log(fr_results);
      getPriceFromFirstResult(fr_results[1]);

                        }
          )
                          }
); //OUTPUT: // https://www.discogs.com/search/?q=Bellaire+-+%22Ah%22&type=all
