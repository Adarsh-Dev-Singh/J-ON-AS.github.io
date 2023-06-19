const button1 = document.querySelector("#button1");
button1.onclick = TheGoat;
function TheGoat(){
    document.getElementById("G.O.A.T").innerHTML= "           THE G.O.A.T 🐐";
    button1.onclick = Cristiano;
}
function Cristiano(){
    document.getElementById("G.O.A.T").innerHTML= "         Cristiano Ronaldo";
    button1.onclick = TheGoat;
}