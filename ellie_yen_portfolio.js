function switch_show(obj){
    var ct = document.getElementById(obj + "content");
    var btn = document.getElementById(obj + "btn");
    if (ct.style.display === "none") {
      ct.style.display = "block";
      btn.innerHTML = "-";
    } else {
      ct.style.display = "none";
      btn.innerHTML = "+";
    }
  }

function Darkmode(){
    
}
