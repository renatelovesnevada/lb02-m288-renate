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

        //wrong option tg below

       // let optionTag = '<option value="';
           // optionTag += currency_code;
           // optionTag += selected;
           // optionTag += '">';
          //  optionTag += currency_code;
           // optionTag += '</option>';

            // <option value="GBP">GBP</option>
        //
            // new

        let optionTag = '<option value="';
        optionTag += currency_code;
        optionTag += '"'
        optionTag += selected;
        optionTag += '">';
        optionTag += currency_code;
        optionTag += '</option>';



        dropDown[i].insertAdjacentHTML("beforeend", optionTag);
    }
    //changing flags
        dropDown[i].addEventListener("change", e =>{
        loadFlag(e.target); //calling the loadflag
});

    function loadFlag(element){
        for(code in country_code){
            if(code == element.value){ //if currency of counry is equal to the option
                let imgTag = element.parentElement.querySelector("img"); //selecting image
                //matching the right image
                //doesnt work because its referencing chf instead of ch... will have to work on that
                imgTag.src = `https://flagcdn.com/16x12/${country_code[code]}.png`;
            }
        }
    }

}
// only shows "getting exchange rate" while waiting for solution
window.getButton[0].addEventListener("load", () => {
    getExchangeRate();
});

getButton[0].addEventListener("click", e => {
    e.preventDefault(); //STop fr
    getExchangeRate();
});

function getExchangeRate(){
    const amount = document.querySelector(".amount input"), //gets the exchange rate
    exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0" ){
        amount.value = "1";
        amount.value = 1;
        //Default is 1, if under 1 it will change to 1 automatically
    }
    exchangeRateTxt.innerText = "Getting echange rate..."
    let url = 'https://v6.exchangerate-api.com/v6/3aa0b0ecf93cec23872e6d52/latest/';
        url += fromCurrency.value;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]; //conversionrates to log out in console depending on input
       let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
       const exchangeRateTxt = document.querySelector(".exchange-rate");
       // output onto screen as txt
       exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;

    })
}

