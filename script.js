// attach click event to submit button
document.getElementById('coinSubmit').addEventListener('click', function(event) {
    event.preventDefault(); // no reload
    
    const coinList = document.getElementById('coinList');
    coinList.innerHTML = '';
    let checkBoxes = document.getElementsByClassName('check');
    
    // iterate through each checkbox
    for (let i = 0; i < checkBoxes.length; i++) {
        const coinInput = checkBoxes[i];
        
        if (coinInput.checked) {
            const coin = coinInput.id;
            console.log(coin);
            const url = 'https://api.coincap.io/v2/assets/' + coin;
            
            // get api information for selected coin
            fetch(url)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    let htmlStr = '';
                    
                    // create strings with various info
                    const priceStr = `The cost of ${json.data.name} is $${Number(json.data.priceUsd).toFixed(2)} USD.`;
                    const changeStr = Number(json.data.changePercent24Hr).toFixed(2);
                    const infoStr = `${json.data.name}, (${json.data.symbol}), has a supply of ${Number(json.data.supply).toFixed(2)} and a market cap of $${Number(json.data.marketCapUsd).toFixed(2)} USD `;
                    
                    // build up HTML string with info formatted accordingly & add to coinList
                    htmlStr += `<div id="coinInfo"><div id="price">${priceStr}</div>`
                    
                    if (changeStr < 0) {
                        htmlStr += `<div id="change" class="red">${changeStr}</div>`
                    }
                    else {
                        htmlStr += `<div id="change" class="green">+${changeStr}</div>`
                    }
                    
                    htmlStr += `<div id="info">${infoStr}</div></div>`;
                    coinList.innerHTML += htmlStr;
                });
        }
    }
});