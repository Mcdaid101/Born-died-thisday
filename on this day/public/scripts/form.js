const monthSelect = document.getElementById("month");
const daySelect = document.getElementById("day");

const daysInMonth = {
    1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30,
    7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
};

monthSelect.addEventListener("change", function() {
    const selectedMonth = parseInt(this.value);
    daySelect.innerHTML = "<option value=''>--Select a Day--</option>";

    if (selectedMonth) {
        // Calculate number of days, considering leap year for February
        let numberOfDays = daysInMonth[selectedMonth];
        if (selectedMonth === 2) { 
            const year = new Date().getFullYear();
            if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                numberOfDays = 29;
            }
        }

    // Populate the days dropdown
    for (let i = 1; i <= numberOfDays; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }
}
});