
const dailyBtn = document.querySelector("#dailyBtn");
const weeklyBtn = document.querySelector("#weeklyBtn");
const monthlyBtn = document.querySelector("#monthlyBtn");



//Loading Live Data

async function fetchLiveData() {
    try {
        const response = await fetch('./data.json');
        const body = await response.json();
        console.log("fetching Live Data", body);
        return body;
    } catch (error) {
        console.error("Error fetching data:", error);
    }

}



// A function that will handle the button click
const updateText = async (buttonId) => {
    const data = await fetchLiveData();
    //console.log("This is updatetext function fetching data:", data);

    const labels = ["work", "play", "study", "exercise", "social", "selfcare"];

    // Loop through each label and update the DOM dynamically
    labels.forEach((label, index) => {
        let currentText = "";
        let previousText = "";

        if (buttonId === 'dailyBtn') {
            currentText = `${data[index].timeframes.daily.current}hrs`;
            previousText = `Yesterday - ${data[index].timeframes.daily.previous}hrs`;
        }

        if (buttonId === 'weeklyBtn') {
            currentText = `${data[index].timeframes.weekly.current}hrs`;
            previousText = `Last Week - ${data[index].timeframes.weekly.previous}hrs`;
        }

        if (buttonId === 'monthlyBtn') {
            currentText = `${data[index].timeframes.monthly.current}hrs`;
            previousText = `Last Month - ${data[index].timeframes.monthly.previous}hrs`;
        }

        // Update the DOM elements dynamically for each label
        document.querySelector(`.${label}-number-daily`).innerText = currentText;
        document.querySelector(`.${label}-number-daily-previous`).innerText = previousText;
    });
}




dailyBtn.addEventListener("click", async () => {
    await updateText("dailyBtn");
    //console.log("Daily data updated", data);
    dailyBtn.classList.toggle("active");
    weeklyBtn.classList.remove("active");
    monthlyBtn.classList.remove("active");

});

weeklyBtn.addEventListener("click", async () => {
    await updateText("weeklyBtn");
    weeklyBtn.classList.toggle("active");
    dailyBtn.classList.remove("active");
    monthlyBtn.classList.remove("active");
});


monthlyBtn.addEventListener("click", async () => {
    await updateText("monthlyBtn");
    monthlyBtn.classList.toggle("active");
    dailyBtn.classList.remove("active");
    weeklyBtn.classList.remove("active");
});









