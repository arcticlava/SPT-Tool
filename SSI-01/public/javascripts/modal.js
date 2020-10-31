var modal = document.getElementById("myModal");
var btn = document.getElementById("dr1");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
  window.open("/sendspt");
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    window.open("/sendspt");
  }
}

//module.exports.btn = btn;

/* document.getElementById('hosp').innerHTML = "Tucson Medical Center";
var y = document.getElementById('dr');
y.type = 'text';
document.getElementById("btnid").addEventListener("click", function() {
  document.getElementById("btnid").innerHTML = "Hello World";
}); */