let score = JSON.parse(localStorage.getItem('score')) || { // Default operator used
  tie : 0,
  loss : 0,
  win : 0
};//JSON AND localStorage used

// if(!score){ // score === null  = !score
//   score ={
//     tie : 0,
//     loss : 0,
//     win : 0
//   }
// }

// document.querySelector('js-result').innerHTML = `${result} `;
updateScore();

function comChoice(){
  let choice = '';
  let Random = Math.random(); //random method from Math built-in object is used
if(Random >= 0 && Random < 1/3 ){
 choice  = 'Rock';
}else if(Random >= 1/3 && Random < 2/3 ){
 choice  = 'Paper';
}else if(Random >= 2/3 && Random < 1 ){
 choice  = 'Scissor';
}
return choice ;  
} 
comChoice();
function playGame(playerMove){
      if(playerMove == 'Rock'){
    if(choice === 'Rock'){
      result = 'Tie' ;
    }else if(choice === 'Paper' ){
      result = 'You Lose!' ;
    }else if(choice === 'Scissor' ){
      result = 'You Win!'  ;
    }
    
  }else if(playerMove == 'Paper'){
    if(choice === 'Paper'){
      result = 'Tie' ;
    }else if(choice === 'Rock' ){
      result = 'You Win!' ;
    }else if(choice === 'Scissor' ){
      result = 'You Lose!'  ;      
    }

  }else if(playerMove == 'Scissor'){
      if(choice === 'Scissor'){
      result = 'Tie' ;
    }else if(choice === 'Rock' ){
      result = 'You Lose!' ;
  
    }else if(choice === 'Paper' ){
      result = 'You Win!'  ;
    }
}
if(result === 'Tie'){
  score.tie ++;
}else if(result === 'You Lose!'){
  score.loss++;
}else if(result === 'You Win!'){
  score.win ++;
}

localStorage.setItem('score',JSON.stringify(score));//JSON AND localStorage used

updateScore();
document.querySelector('.js-moves').innerHTML = `You <img src='${playerMove}-emoji.png' class='move-icon'> <img src='${choice}-emoji.png' class='move-icon'> Computer`;
updateResult();
// alert(`You Picked ${playerMove} and Computer Picked ${choice} . ${result}
// Win : ${score.win} Loss : ${score.loss} Tie : ${score.tie}` );//Template String used
}

function updateScore(){
  document.querySelector('.js-score')
  .innerHTML = `Win : ${score.win} Loss : ${score.loss} Tie : ${score.tie}`;
}
function updateResult(){
  document.querySelector('.js-result').innerHTML = result;
}

// location.reload();

// console.log(choice);