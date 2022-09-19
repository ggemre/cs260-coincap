
document.getElementById('coinSubmit').addEventListener('click', function(event) {
    event.preventDefault();
    
    const coin = document.getElementById('coinInput').value;
    const url = "https://api.coincap.io/v2/assets/" + coin;
    
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            const priceStr = `The cost of one ${json.data.name} is $${Number(json.data.priceUsd).toFixed(2)} USD.`;
            const changeStr = Number(json.data.changePercent24Hr).toFixed(2);
            const infoStr = `${json.data.name}, (${json.data.symbol}), has a supply of ${Number(json.data.supply).toFixed(2)} and a market cap of $${Number(json.data.marketCapUsd).toFixed(2)} USD `;
            document.getElementById('price').textContent = priceStr;
            document.getElementById('change').textContent = changeStr;
            document.getElementById('info').textContent = infoStr;
        });
});