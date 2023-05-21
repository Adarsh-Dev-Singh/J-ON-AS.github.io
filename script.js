const button1 = document.querySelector("#button1");
button1.onclick = careerGoals;
function careerGoals(){
    button1.innerText = "Just Vote for Ronaldo "
    button1.onclick = goBack;
}
function goBack(){
    button1.innerText = "Now Vote For Your Favourite player(Click to see special advice again)"
    button1.onclick = careerGoals;
}