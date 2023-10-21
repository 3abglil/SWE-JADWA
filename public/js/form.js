const closeform=document.getElementById("CLOSE");
const openform=document.getElementById("OPEN");
const form = document.getElementById("fillform")
const page = document.getElementById("pbody")

closeform.addEventListener("click", function() {
  form.style.display = "none";
  pbody.style.filter="blur(0px)";
});

openform.addEventListener("click", function() {
  form.style.display = "block";
  pbody.style.filter="blur(20px)";
});

// fields animation
const inputs = document.querySelectorAll('.form-control input');
const labels = document.querySelectorAll('.form-control label');

labels.forEach(label => {
  label.innerHTML = label.innerText
    .split('')
    .map((letter, idx) => `<span style="
        transition-delay: ${idx * 50}ms
      ">${letter}</span>`)
    .join('');
});


// submit button
const btn = document.querySelector("#btn");
const btnText = document.querySelector("#btnText");

btn.onclick = () => {
    btnText.innerHTML = "Thanks";
    btn.classList.add("active");
    
    setTimeout(()=>{
      form
      form.style.display = "none";
      pbody.style.filter="blur(0px)";
      
  },3000);

};