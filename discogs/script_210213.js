
//This is the one 2021-02-13 MAIN
console.log('Loaded discogzmi script.js!');
const apiKey = 'ACNgbPIjtGTbjlCdqkNA&secret=LxzhrutsgTfIVgqwmkzohRSSVktzTITb';
let buy_url;







  // Gets titel from video and ads as searchquery to request URL
  let titleClass = document.getElementsByClassName('title style-scope ytd-video-primary-info-renderer');
  let h1Title = titleClass[0]; let title = titleClass[0].innerText;
  let url = `https://api.discogs.com/database/search?q=${title}&key=${apiKey}`;
  //console.log(url);

  // STEG 2 - tar datan från Fetch 1 och spottar ut värden för Fetch 2
  const getFirstResult = (data) => {


      let results_object = data['results'][0];

      return results_object
  }




 // STEG 3 - GETTING AND PRINTING PRICE
  const getPriceFromFirstResultAndWrite = (data) => {
     let itemUrl = `${data}`;   // det blir en dubbellänk av någon anledning https://api.discogs.com/releases/11454190/Bellaire-Paris-City-Jazz/release/11454190https://discogs.com/Bellaire-Paris-City-Jazz/release/11454190
     console.log('----------------');
     console.log(itemUrl);
     console.log('----------------');
     fetch(itemUrl).then(  (response) => { response.json().then(   (data) => {
           let price = data['lowest_price'];  //console.log(`Lowest price: ${price} USD // ` +price*8.34 +' SEK');

        //Prints extra element into div
          let newPara = document.createElement('a');                  // <p><p/>
          let newText = document.createTextNode(`$${price} at Discogs`); // "just the string"
          newPara.appendChild(newText);                               // <p>"just the string"<p/> also needs to be attached somehwere
          newPara.setAttribute('style', 'font-size:22px;text-align:center;background-color:#909090; font-weight:bold; color:#181818;padding:3px;margin-top:5px; text-decoration:none');
          newPara.setAttribute('href', `${buy_url}`);
          newPara.setAttribute('target', "_blank");

           let div_titleContainer = document.querySelector("#info-contents");
           console.log(div_titleContainer);
           div_titleContainer.appendChild(newPara); // FUNKAR!

         })});
      }


 // STEG 1
  fetch(url).then(  (response) => { response.json().then(   (data) => { console.log('FETCH-1, the results');

        let results = getFirstResult(data);

        console.log('\n\n\n\n');

        const {title, resource_url, uri} = results;
        buy_url = `https://discogs.com${uri}`;


        getPriceFromFirstResultAndWrite(`${resource_url}`); //***********


      })}
   ); //OUTPUT:
