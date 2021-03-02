// Used for VSCODE Debug
// const fetch = require("node-fetch");

const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader");
const useApi = true;

let apiQuotes = []

// Get Quote from API (https://forismatic.com/en/api/)
async function getQuoteProxy() {
  // Proxy the calls due to cors issues (https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9)
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    console.log(data);

  } catch (error) {
    //getQuote()
    console.log('Oops something went wrong: ' + error);
  }
}

async function getQuoteAlt() {
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    showNewQuote();

  } catch (error) {
    //getQuote()
    console.log('Oops something went wrong: ' + error);
  }
}

// Show new quote
function showNewQuote() {
  showLoadingSpinner();
  let quote = null;

  if(useApi){
    let randomNumber = generateRandomIndex(apiQuotes.length);
    quote = apiQuotes[randomNumber];
  }

  if(!useApi){
    let randomNumber = generateRandomIndex(localQuotes.length);
    quote = localQuotes[randomNumber];
  }
  
  quote.text.length > 120 ? quoteText.classList.add("long-quote") : quoteText.classList.remove("long-quote");
  
  quoteText.textContent = quote.text;
  // Check quote author is null
  quote.author === null ? authorText.textContent = "Unknown" : authorText.textContent = quote.author;
  removeLoadingSpinner();
  
  return quote;
}

// Tweet Quote
function tweetQuote(){
  // Template string
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank'); // open twitter in new tab
}

function generateRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

function showLoadingSpinner(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Event listeners
newQuoteBtn.addEventListener('click', showNewQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
useApi ? getQuoteAlt() : showNewQuote();
// loading();
// complete();
