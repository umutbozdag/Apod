const result = document.querySelector('.result');
const loader = document.querySelector('.loader');
const imgCount = document.getElementById('count');
const resultsBtn = document.querySelector('.results-btn');

let datas = [];

resultsBtn.addEventListener("click", () => {

    const api = `https://api.nasa.gov/planetary/apod?api_key=jBxCpJWfOf4ekDMyvsuj3t4SoNracWSET9oRrUvb&count=${parseInt(imgCount.value)}`;

    loader.style.display = "block";

    imgCount.value = "";

    fetch(api).then(function (response) {
        // The API call was successful!
        return response.json();
    }).then(function (data) {

        // Push data to array
        datas.push(...data);

        console.log(datas);

        displayData();

        // Make the array empty
        datas = [];

    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
})


function displayData() {

    loader.style.display = "block";

    const html = datas.reduce((acc, {
            title,
            url,
            date,
            copyright,
            explanation,
            hdurl
        }) =>
        acc += `
    <div class="row">
    <div class="column left">
    <h2 class="title">${title}</h2>
    <a href="${hdurl}" target="_blank"><img src="${url ? url : "no-img.png"} "class="picture" alt="Picture"></a>
    
    <div class="img-infos">
      <p class="date">Date: ${date}</p>
      <p class="copyright">Copyright: ${copyright ? copyright : 'No info'}</p>
    </div>
    
    </div>
    
    <div class="column right">
    <div class="infos">
      <p class="explanation">${explanation}</p>
    
    </div>
    </div>
    </div>
    `

        , ``);

    result.innerHTML = html;

    loader.style.display = "none";

}