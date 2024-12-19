document.addEventListener('DOMContentLoaded', function() {
    const yearSlider = document.getElementById('yearSlider');
    const monthSlider = document.getElementById('monthSlider');
    const daySlider = document.getElementById('daySlider');
    const selectedYearDisplay = document.getElementById('selectedYear');
    const selectedMonthDisplay = document.getElementById('selectedMonth');
    const selectedDayDisplay = document.getElementById('selectedDay');
    const fromDateInput = document.getElementById('from_date');

    function updateDateDisplay() {
        const selectedYear = yearSlider.value;
        const selectedMonth = monthSlider.value;
        const selectedDay = daySlider.value;
        selectedYearDisplay.textContent = selectedYear;
        selectedMonthDisplay.textContent = new Date(0, selectedMonth - 1).toLocaleString('en-us', { month: 'long' });
        selectedDayDisplay.textContent = selectedDay;

        // Adjust max values for month and day based on year and month
        adjustSliderMaxValues(selectedYear, selectedMonth);

        // Update the hidden input for date in MM/DD/YY format
        updateFromDateInput(selectedYear, selectedMonth, selectedDay);
    }

    function adjustSliderMaxValues(year, month) {
        if (year === "2024") {
            monthSlider.max = 4; // Only up to April in 2024
            if (month === "4") {
                daySlider.max = 22; // Only up to 22nd in April 2024
            } else {
                daySlider.max = new Date(year, month, 0).getDate();
            }
        } else {
            monthSlider.max = 12;
            daySlider.max = new Date(year, month, 0).getDate();
        }
    }

    function updateFromDateInput(year, month, day) {
        const formattedYear = year.substring(2); // Get last two digits of the year
        const paddedMonth = month.padStart(2, '0'); // Ensure month is two digits
        const paddedDay = day.padStart(2, '0'); // Ensure day is two digits
        fromDateInput.value = `${paddedMonth}/${paddedDay}/${formattedYear}`;
    }

    yearSlider.addEventListener('input', updateDateDisplay);
    monthSlider.addEventListener('input', updateDateDisplay);
    daySlider.addEventListener('input', updateDateDisplay);

    updateDateDisplay(); // Initialize the date display on load
});