// Used for VSCODE Debug
// const fetch = require("node-fetch");

const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")

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
  function showNewQuote(){
    // let randomNumber = generateRandomIndex(apiQuotes.length);
    let randomNumber = generateRandomIndex(localQuotes.length);
    // let quote = apiQuotes[randomNumber];
    let quote = localQuotes[randomNumber];
    quote.text.length > 50 ? quoteText.classList.add("long-quote") : quoteText.classList.remove("long-quote");
    quoteText.textContent = quote.text;

    // Check quote author is null
    quote.author === null ? authorText.textContent = "Unknown" : authorText.textContent = quote.author;

    return quote;
  }

  function generateRandomIndex (length) {
    return Math.floor(Math.random() * length);
  }
 
// On Load
//getQuoteAlt();
showNewQuote();
