// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

async function fetchWeatherAlerts(state) {
    const errorDiv = document.getElementById("error-message");
    const input = document.getElementById("state-input");
    try {
        const code = state.trim().toUpperCase();
        if (code==="") {
            throw new Error("Please enter a state abbreviation.");
        }
        if (!/^[A-Z]{2}$/.test(code)) {
            throw new Error("State must be two letters, like MN.");
        }
        const response = await fetch(`https://api.weather.gov/alerts/active?area=${code}`);
        if (!response.ok) {
            throw new Error("Invalid state code or API error.Try something like MN, CA, or TX.");
        }
        const data = await response.json();
        displayWeatherAlerts(data);
        
        errorDiv.textContent = "";
        errorDiv.classList.add("hidden");
        input.value = "";

        return data;
    }
    catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.classList.remove("hidden");
        document.getElementById("alerts-display").innerHTML = "";
        console.log(error.message);
    }
}

fetchWeatherAlerts()

function displayWeatherAlerts(alerts) {
    const container = document.getElementById("alerts-display");
    container.innerHTML = "";

    const summary = document.createElement("p");
    summary.textContent = `${alerts.title}: ${alerts.features.length}`;
    container.appendChild(summary);

    const list = document.createElement("ul");
    alerts.features.forEach((alert) => {
        const listItem = document.createElement("li");
        listItem.textContent = alert.properties.headline;
        list.appendChild(listItem);
    });
    container.appendChild(list);

}

document.getElementById("fetch-alerts").addEventListener("click", async () => {
    const state = document.getElementById("state-input").value;
    fetchWeatherAlerts(state);
});