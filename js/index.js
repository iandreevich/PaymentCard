(function () {
  const wrapper = document.querySelector(".wrapper");
  const tabNav = document.querySelectorAll(".tabs-nav__item");
  const tabContent = document.querySelectorAll(".tab");
  const forms = document.querySelectorAll(".needs-validation");
  const confirmContent = document.querySelector(".confirm__data");
  const countrySelect = document.querySelector(".country-select");
  const citySelect = document.querySelector(".shipping__city-select");
  const city = document.querySelector("#city");
  const formItems = document.querySelector(".shipping__fields");

  countrySelect.addEventListener("change", isUkraine);

  wrapper.addEventListener("click", (e) => {
    e.stopPropagation();
    const { target } = e;
    switch (true) {
      case target.classList.contains("tabs-nav__item"):
        selectTabNav(target);
        break;
      case target.classList.contains("next"):
        selectNextTab(target);
        break;
      case target.classList.contains("prev"):
        selectPrevTab(target);
        break;
      case target.classList.contains("form-item"):
        target.addEventListener("change", inputHandler);
        target.addEventListener("focusout", focusOutValid);
        break;
    }
  });

  function selectTabNav(tabLink) {
    tabNav.forEach((item) => {
      item.classList.remove("is-active");
    });
    tabLink.classList.add("is-active");
    let tabName = tabLink.getAttribute("data-tab-name");
    selectTabContent(tabName);
  }

  function selectTabContent(tabName) {
    tabContent.forEach((item) =>
      item.classList.contains(tabName)
        ? item.classList.add("is-active")
        : item.classList.remove("is-active")
    );
  }

  function selectNextTab(btnElement) {
    const tabLink = findNavLink(btnElement);
    const nextTabLink = tabLink.nextElementSibling;
    nextTabLink.classList.remove("disabled");
    selectTabNav(nextTabLink);
  }

  function selectPrevTab(btnElement) {
    const tabLink = findNavLink(btnElement);
    const prevTabLink = tabLink.previousElementSibling;
    selectTabNav(prevTabLink);
  }
  function findNavLink(btn) {
    let tabNameBtn = btn.getAttribute("data-btn-name");
    return Array.from(tabNav).find((el) => el.dataset.tabName === tabNameBtn);
  }

  (function renderCountries() {
    countrySelect.innerHTML =
      "<option value='' disabled selected>Choose country</option>" +
      countryList
        .map(
          (el) =>
            `
          <option value="${el}">${el}</option> 
          `
        )
        .join("");
  })();

  function isUkraine() {
    if (countrySelect.value !== "Choose country") {
      formItems.style.display = "block";
    }
    if (country === "Ukraine") {
      citySelect.classList.add("autocomplete");
      autocomplete(city, cities);
    } else citySelect.classList.remove("autocomplete");
  }

  function inputHandler({ target }) {
    for (let key in data) {
      key === target.name ? (data[key] = target.value) : "";
    }
  }

  (function validation() {
    Array.from(forms).filter((form) => {
      form.addEventListener("submit", (event) => {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add("was-validated");
        } else {
          event.preventDefault();
          event.stopPropagation();
          if (event.target.classList.contains("payment__form")) {
            renderConfirmTab();
          }
          selectNextTab(event.submitter);
        }
      });
    });
  })();

  function focusOutValid() {
    const thisEl = this.parentElement;
    if (!thisEl.classList.contains("was-validated")) {
      thisEl.classList.add("was-validated");
    }
  }

  function renderConfirmTab() {
    confirmContent.innerHTML = `<ul class="list-group">
    <li class="list-group-item"><strong>Product</strong>: Apple MacBook Pro 13″ 16/512Gb Space Gray 2020 M1 (Z11B0004U)</li>

    <li class="list-group-item"><strong>Name</strong>: ${data.name}</li>
    <li class="list-group-item"><strong>Email</strong>: ${data.email}</li>
    <li class="list-group-item"><strong>Adress</strong>: ${
      !!data.flat ? data.flat + "," : ""
    } ${data.house} ${data.street} street, ${data.city}, ${data.country}</li>
    </ul>`;
  }
})();
