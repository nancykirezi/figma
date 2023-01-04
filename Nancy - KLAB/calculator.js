let input_btn = document.querySelectorAll(".input-btn");
let equals = document.querySelector("#equals");
let clear = document.querySelector("#clear");
let sqroot = document.querySelector("#square-root");
let calc_screen = document.querySelector('input[type="text"]');
let calc_value = "";
let historylist = document.querySelector(".history-list");
let clear_history = document.querySelector("#clear-history");
let clear_btn = document.querySelector("#backspace");

let calc_history = JSON.parse(localStorage.getItem("calc_history")) || [];

clear_history.addEventListener("click", () => {
  localStorage.clear();
  calc_history = [];
  historylist.innerHTML = "";
});

clear_btn.addEventListener("click", () => {
  calc_value = calc_value.slice(0, -1);
  calc_screen.value = calc_value;
});

input_btn.forEach((element) => {
  element.addEventListener("click", () => {
    calc_value += element.value;
    calc_screen.value = calc_value;
  });
});

equals.addEventListener("click", () => {
  let result = eval(calc_value);
  calc_screen.value = result;
  calc_history.push(calc_value + " = " + result);
  calc_value = "";
  localStorage.setItem("calc_history", JSON.stringify(calc_history));
  getHistory();
});

clear.addEventListener("click", () => {
  calc_value = "";
  calc_screen.value = calc_value;
});

sqroot.addEventListener("click", () => {
  let result = Math.sqrt(calc_screen.value);
  calc_screen.value = result;
  calc_history.push(calc_value + " = " + result);
  calc_value = "";
  localStorage.setItem("calc_history", JSON.stringify(calc_history));
  getHistory();
});

let uniqueValues = [];
let listValues = [];

// LOAD HISTORY FROM LOCAL STORAGE ON BUTTON CLICK

function getHistory() {

  let delete_btn = document.createElement("button");
  delete_btn.innerText = "x";
  delete_btn.className = "secondary history-delete";
  delete_btn.addEventListener("click", deleteHistory);

  calc_history.forEach((element) => {
    if (!uniqueValues.includes(element)) {
      uniqueValues.push(element);
    }
  });

  listValues.push(uniqueValues.slice(-1));

    listValues.forEach((element) => {
      let history = document.createElement("li");
      history.innerHTML = element;
      history.appendChild(delete_btn);
      historylist.append(history);
    });
  listValues = [];

}

// LOAD HISTORY FROM LOCAL STORAGE ON PAGE LOAD

function loadHistory() {

  let delete_btn = document.createElement("button");
  delete_btn.innerText = "x";
  delete_btn.className = "secondary history-delete";
  delete_btn.addEventListener("click", deleteHistory);

    calc_history.forEach((element) => {
      let history = document.createElement("li");
      history.innerHTML = element;
      history.appendChild(delete_btn);
      historylist.append(history);
    });
}

function deleteHistory() {
  let li = event.target.parentElement;
  historylist.removeChild(li);
  let index = calc_history.indexOf(li.innerText);
  calc_history.splice(index, 1);
  localStorage.setItem("calc_history", JSON.stringify(calc_history));
  console.log(calc_history);
}