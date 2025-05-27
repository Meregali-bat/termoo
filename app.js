const palavrasCincoLetras = [
  "AUREO", "LIVRO", "PEDRA", "CARTA", "NORTE",
  "FELIZ", "RAPAZ", "VIDRO", "FORTE", "CASAL",
  "PESAR", "TEMPO", "VIRAR", "FUGIR", "MELAO",
  "DENTE", "CANTO", "NINJA", "JOGAR", "PLANO",
  "GRITO", "FALAR", "ROLAR", "BRISA", "LENTO",
  "SABER", "RISCO", "NACAO", "LAGOA", "FREIO",
  "SAUDA", "MUNDO", "BEIJO", "CARRO", "TURMA",
  "VISTA", "SONHO", "FORCA", "VIDAL", "TREVO",
  "BOMBA", "MEIOA", "CAIXA", "FOLHA", "RUAIS",
  "CINZA", "FAZER", "LEITE", "MORTE", "NOITE",
  "SORTE", "PRAIA", "TERRA", "VIVER", "BRANCO",
  "CHAVE", "DESTA", "PODER", "FIMOS", "NUVEM",
  "UNICO", "VERAO", "XIQUE", "ZEBRA", "YACHT"
];


let wordOfTheDay = palavrasCincoLetras[Math.floor(Math.random() * palavrasCincoLetras.length)];
// let wordOfTheDay = 'aureo'
let wordOfTheDayArr = breakWord(wordOfTheDay);
let win = false ;
let message = '';
let tentativa = 0;

function nextLetter(letter, index){
    letter.value = letter.value.toUpperCase();

    let wordDiv = document.querySelector(".word:not(.wordTried)");
    let letters = wordDiv.querySelectorAll(".letter");
   
    if(letter.value.length === 1){
        for(let i = index + 1; i < letters.length; i++){
            if(letters[i].value === ""){
                letters[i].focus();
                break;
            }
        }
    }
}

function previousLetter(event, index){
    let wordDiv = document.querySelector(".word:not(.wordTried)");
    let letters = wordDiv.querySelectorAll(".letter");
    if(event.key === "Backspace" && letters[index].value === "" && index > 0){
        letters[index - 1].focus();
    }
}

function breakWord(word){
    return word.toUpperCase().split('');
}

function disableInputLetters(){
    let wordDiv = document.querySelector(".word:not(.wordTried)");
    wordDiv.classList.add("wordTried");
    let letters = wordDiv.querySelectorAll(".letter");
    letters.forEach(letter => {
        letter.setAttribute("disabled", "true");
    });
}

function enableInputLetters(){
    let wordDiv = document.querySelector(".word:not(.wordTried)");
    if (!wordDiv) return;
    let letters = wordDiv.querySelectorAll(".letter");
    letters.forEach(letter => {
        letter.removeAttribute("disabled");
    });
    letters[0].focus(); 
}

document.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        guessWord();
    }
})

function switchElement(message, elementSelector, messageSelector) {
  const element = document.querySelector(elementSelector);
  const messageElement = document.querySelector(messageSelector);

  if (element.style.display === 'none' || element.style.display === '') {
    element.style.display = 'block';
    messageElement.textContent = message;
  } else {
    element.style.display = 'none';
  }
}


function guessWord(){
    
    if(win === true){
        return
    }
    
    
    
    let wordDiv = document.querySelector(".word:not(.wordTried)");
    if (!wordDiv) return;
    
    let letters = wordDiv.querySelectorAll(".letter");
    let guess = '';
    let indexesRight = [];
    let indexesAlmost = [];
    let indexesWrong = [];
    let usedSecret = Array(5).fill(false);
    

    letters.forEach(letter => {
        guess += letter.value.toUpperCase();
    });
    
    const guessArr = breakWord(guess);
    
    if (guessArr.length != 5) {
        message = 'A mensagem deve ter 5 letras';
        switchElement(message, '.alert', '.alertMessage');
        
        setTimeout(() => {
            switchElement(null, '.alert', '.alertMessage');
        }, 1000);
        
        return;
    }
    tentativa++
    
    if(tentativa == 5 && win == false){
        message = `You lost! You're out of guesses! The secret word was ${wordOfTheDay}`
        switchElement(message, '.modal', '.message');
    }
                    for (let i = 0; i < 5; i++) {
                        if (wordOfTheDayArr[i] === guessArr[i]) {
                            indexesRight.push(i);
                            usedSecret[i] = true; 
                        }
                    }
                    
                    for (let i = 0; i < 5; i++) {
                        if (indexesRight.includes(i)) continue;
                        
                        let found = false;
                        for (let j = 0; j < 5; j++) {
                            if (!usedSecret[j] && guessArr[i] === wordOfTheDayArr[j]) {
                                indexesAlmost.push(i);
                                usedSecret[j] = true;
                                found = true;
                                break;
                            }
                        }
                        
                        if (!found) {
                            indexesWrong.push(i);
                        }
                    }
                    
                    
                    letters.forEach((letter, i) => {
                        if (indexesRight.includes(i)) {
                            letter.classList.add("right");
                        } else if (indexesAlmost.includes(i)) {
                            letter.classList.add("almost");
                        } else {
                            letter.classList.add("wrong");
                        }
                        letter.setAttribute("disabled", "true");
                    });
                    
                    
    disableInputLetters();
    enableInputLetters();
        
    if(indexesRight.length == 5){
       let letters = document.querySelectorAll(".letter") 
        letters.forEach(letter => {
            letter.setAttribute("disabled", "true");
            message = 'Congratulations! You won the game!'    
       });
       switchElement(message, '.modal', '.message');;
       win = true;
       return
    }
}
