import {computeButton, addRowButton, resetButton} from "./buttons.js";

// All Button Clicks
addRowButton.addEventListener("click", addRow);
computeButton.addEventListener("click", computeTotalCost);
resetButton.addEventListener("click", resetFunction);

// Variable
let weekCounter = 1;

// Function - Adding Row
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

// Function - Compute Total Cost
function computeTotalCost() {
    const machineHoursInputs = document.querySelectorAll(".machine-hours");
    const maintenanceCostInputs = document.querySelectorAll(".maintenance-cost");

    if (machineHoursInputs.length < 2) 
    {
        alert("Please enter at least two data points.");
        return;
    }

    let minHours = Infinity, maxHours = -Infinity;
    let minCost = 0, maxCost = 0;

    machineHoursInputs.forEach((input, index) => {
        const hours = parseFloat(input.value);
        const cost = parseFloat(maintenanceCostInputs[index].value);

        // Step 1 - Getting the min and max of machine hours and maintenance cost
            if (hours < minHours) 
            {
                minHours = hours;
                minCost = cost;
            }

            if (hours > maxHours) 
            {
                maxHours = hours;
                maxCost = cost;
            }
    });

    // Validation - If have the same values.
    if (maxHours === minHours) 
    {
        alert("Invalid input: machine hours must have different values.");
        return;
    }

    // Validation - If there are no values. All should cells should have values.
    if (minHours == 0 || minCost == 0)
        {
            alert("Can't Compute Total Cost. Please enter values.");
            return;
        }

    // Step 2 - Getting the Variable Cost per hour
    const variableCostPerHour = (maxCost - minCost) / (maxHours - minHours);

    // Step 3 - Computing fixed cost
    const fixedCost = maxCost - (variableCostPerHour * maxHours);

    // Prompt - Enter machine hours
    const targetHours = parseFloat(prompt("Enter machine hours to estimate cost:"));

    if (isNaN(targetHours)) 
    {
        alert("Invalid input. Please enter a number.");
        return;
    }

    // Step 4 - Computing the cost
    const estimatedCost = fixedCost + (variableCostPerHour * targetHours);

    // Result 
    alert(`Estimated Maintenance Cost at ${targetHours} hours: $${estimatedCost.toFixed(2)}`);
}

// Function - Reset Function of list
function resetFunction() {
    // Resets the list
    document.getElementById("rows").innerHTML = "";
    // Resets the week
    weekCounter = 1;
}