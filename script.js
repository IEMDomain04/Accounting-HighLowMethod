import {computeButton, addRowButton} from "./data.js";
addRowButton.addEventListener("click", addRow);
computeButton.addEventListener("click", computeTotalCost);
   
let weekCounter = 1;

function addRow() {
    const rowsContainer = document.getElementById("rows");
    const row = document.createElement("div");

    row.classList.add("row");
    row.innerHTML = `
        <input type="number" class="week" value="${weekCounter}" readonly>
        <input type="number" class="machine-hours" placeholder="Machine Hours">
        <input type="number" class="maintenance-cost" placeholder="Maintenance Cost">
        <button class="remove-row">X</button>
    `;
    rowsContainer.appendChild(row);

    row.querySelector(".remove-row").addEventListener("click", function () {
        row.remove();
    });

    weekCounter++; // Increment week counter
}

function computeTotalCost() {
    const machineHoursInputs = document.querySelectorAll(".machine-hours");
    const maintenanceCostInputs = document.querySelectorAll(".maintenance-cost");

    if (machineHoursInputs.length < 2) {
        alert("Please enter at least two data points.");
        return;
    }

    let minHours = Infinity, maxHours = -Infinity;
    let minCost = 0, maxCost = 0;

    machineHoursInputs.forEach((input, index) => {
        const hours = parseFloat(input.value);
        const cost = parseFloat(maintenanceCostInputs[index].value);
        //Step 1
        if (!isNaN(hours) && !isNaN(cost)) {
            if (hours < minHours) {
                minHours = hours;
                minCost = cost;
            }

            if (hours > maxHours) {
                maxHours = hours;
                maxCost = cost;
            }
        }
    });

    if (maxHours === minHours) {
        alert("Invalid input: machine hours must have different values.");
        return;
    }

    const variableCostPerHour = (maxCost - minCost) / (maxHours - minHours);
    const fixedCost = maxCost - (variableCostPerHour * maxHours);

    const targetHours = parseFloat(prompt("Enter machine hours to estimate cost:"));

    if (isNaN(targetHours)) {
        alert("Invalid input. Please enter a number.");
        return;
    }

    const estimatedCost = fixedCost + (variableCostPerHour * targetHours);
    alert(`Estimated Maintenance Cost at ${targetHours} hours: $${estimatedCost.toFixed(2)}`);
}