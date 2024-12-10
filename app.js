const BASE_URL = "https://api.exchangerate-api.com/v4/latest"; // Base URL of the API
const API_KEY = "93365c34b7460c32c1be4379a33ea09b"; // Your API key
const option = document.querySelectorAll(".option select");
const btn = document.querySelector(".btn");
let result = document.querySelector(".result");
const fromCurr = document.querySelector(".formselect");
const toCurr = document.querySelector(".toselect");

for (let select of option) {
  for (currcode in countryList) { 
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      newoption.selected = 'selected';
    } else if (select.name === "to" && currcode === "INR") {
      newoption.selected = 'selected';
    }
    select.append(newoption);
  }
  
  select.addEventListener("change", (env) => {
    updateFlag(env.target);
  });
}

const updateFlag = (element) => {
  let currcode = element.value; 
  let countrycode = countryList[currcode]; 
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`; 
  let img = element.previousElementSibling;
  img.src = newSrc;
};

btn.addEventListener("click", async (envt) => {
  const amount = document.querySelector(".amount");
  const amt = amount.value;

  if (amt < 0 || isNaN(amt)) {
    result.innerText = 'Please enter a valid amount';
    result.style.color = "red";
    amount.value = "";
  } else if (amt === "") {
    amount.placeholder = "Please enter amount";
  } else {
    const URL = `${BASE_URL}/${fromCurr.value}?apiKey=${API_KEY}`;

    try {
      let response = await fetch(URL);
      let data = await response.json();
      let rate = data.rates[toCurr.value]; // Getting the rate for the selected currency

      let finalAmount = amt * rate;
      result.innerText = `${amt} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch (error) {
      result.innerText = "Error fetching data.";
      result.style.color = "red";
    }
  }
});
