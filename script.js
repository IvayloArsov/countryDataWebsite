const baseURL = "https://restcountries.com/v2/name";

const formElement = document.querySelector(".country-form");
const containerElement = document.querySelector(".content");

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const country = formData.get("country");

  try {
    const response = await fetch(`${baseURL}/${country}`);
    const data = await response.json();

    if (data.length > 0) {
      const countryData = data[0];
      containerElement.innerHTML = createTreeHTML(countryData);
    } else {
      containerElement.textContent = "Country not found.";
    }
  } catch (error) {
    console.error(error);
  }
});

function createTreeHTML(data) {
  let html = "<ul>";
  for (const key in data) {
    if (typeof data[key] === "object") {
      html += `<li>${key}: ${createTreeHTML(data[key])}</li>`;
    } else {
      html += `<li>${key}: ${data[key]}</li>`;
    }
  }
  html += "</ul>";
  return html;
}
