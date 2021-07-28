function autocomplete(inp, arr) {
  let currentFocus;

  inp.addEventListener("input", autoInput);

  function autoInput(e) {
    let list,
      el,
      val = this.value;

    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;

    list = document.createElement("div");
    list.setAttribute("id", this.id + "autocomplete-list");
    list.setAttribute("class", "autocomplete-items");

    this.parentNode.appendChild(list);

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        el = document.createElement("DIV");
        el.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        el.innerHTML += arr[i].substr(val.length);
        el.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        el.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;

          closeAllLists();
        });
        list.appendChild(el);
      }
    }
  }

  inp.addEventListener("keydown", function (e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;

      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;

    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;

    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
