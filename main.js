let elForm = document.querySelector("form");
let elInput = document.querySelector("input");
let elUl = document.querySelector("ul");
let elbtn = document.querySelector(".btn");

let arr = [];

let webkit = new webkitSpeechRecognition();

elbtn.addEventListener("click", function () {
  webkit.start();
});
elUl.innerHTML = "";

webkit.onresult = function (evt) {
  arr.push({
    id: arr.length + 1,
    text: evt.results[0][0].transcript,
    iscompleted: false,
  });
  func();
};

elForm.addEventListener("submit", function (er) {
  er.preventDefault();

  if (elInput.value.trim() != "") {
    arr.push({
      id: arr.length + 1,
      text: elInput.value,
      iscompleted: false,
    });
    func();
  }

  elInput.value = "";
});
function func() {
  elUl.innerHTML = "";
  for (const item of arr) {
    let elLi = document.createElement("li");
    elLi.classList = "list-item";
    let elStrong = document.createElement("strong");
    let elSpan = document.createElement("span");
    let elinpcheked = document.createElement("input");
    elinpcheked.setAttribute("type", "checkbox");
    elinpcheked.name = "you";
    // TEXT KONTENLARI
    elinpcheked.textContent = item.iscompleted;
    elStrong.textContent = `ID: ${item.id} `;
    elSpan.textContent = item.text;

    elinpcheked.addEventListener("change", function () {
      if (elinpcheked.checked) {
        elinpcheked.closest("li").remove();
      }
    });

    elLi.appendChild(elinpcheked);
    elLi.appendChild(elStrong);
    elLi.appendChild(elSpan);
    elUl.appendChild(elLi);
  }
}
