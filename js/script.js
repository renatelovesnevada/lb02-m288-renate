const dropDown = document.querySelectorAll(".dropdown select");
fromCurrency = document.querySelector(".from select");
toCurrency = document.querySelector(".to select");
getButton = document.querySelectorAll("form button");

//creating option tags
for (let i = 0; i < dropDown.length; i++) {
    for(currency_code in country_code){
        let selected;
        // Default
        if(i == 0){
            selected = currency_code == "CHF" ? "selected" : "";
        } else if (i == 1) {
            selected = currency_code == "GBP" ? "selected" : "";
        }


        let optionTag = '<option value="';
            optionTag += currency_code;
            optionTag += selected;
            optionTag += '">';
            optionTag += currency_code;
            optionTag += '</option>';

            // <option value="GBP">GBP</option>
        //


        //alert(optionTag);

        dropDown[i].insertAdjacentHTML("beforeend", optionTag);
    }
}
getButton[0].addEventListener("click", e => {
    e.preventDefault(); //STop fr
    getExchangeRate();
});

function getExchangeRate(){
    const amount = document.querySelector(".amount input"); //gets the exchange rate
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0" ){
        amount.value = "1";
        amount.value = 1;
        //Default is 1, if under 1 it will change to 1 automatically
    }
    let url = 'https://v6.exchangerate-api.com/v6/3aa0b0ecf93cec23872e6d52/latest/';
        url += fromCurrency.value;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]; //conversionrates doesnt want to work?
       let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
       console.log(totalExchangeRate)
        //console.log(result)
    })
}

