let foodList = [
  { name: "Pizza", kCal: 260 },
  { name: "Burger", kCal: 295 },
  { name: "Hranolky", kCal: 312 },
  { name: "Donut", kCal: 452 },
  { name: "Smažený sýr", kCal: 380 },
  { name: "Klobása", kCal: 330 },
  { name: "KFC kuře (smažené)", kCal: 290 },
  { name: "Čokoládová tyčinka", kCal: 520 },
  { name: "Limonáda (slazená)", kCal: 42 },
  { name: "Zmrzlina", kCal: 210 },
  { name: "Avokádo", kCal: 160 },
  { name: "Kuřecí prsa (vařená)", kCal: 165 },
  { name: "Losos", kCal: 200 },
  { name: "Brokolice (vařená)", kCal: 35 },
  { name: "Vejce (vařené)", kCal: 130 },
  { name: "Mrkev", kCal: 41 },
  { name: "Jablko", kCal: 52 },
  { name: "Cizrna (vařená)", kCal: 164 },
  { name: "Ovesné vločky", kCal: 370 },
  { name: "Mandle", kCal: 575 }
];

// Seřazení seznamu podle názvu
foodList.sort((a, b) => a.name.localeCompare(b.name));

// Zobrazení referenčního seznamu potravin
window.onload = function () {
  const referenceList = document.getElementById("foodReferenceList");
  foodList.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (${item.kCal} kCal / 100g)`;
    referenceList.appendChild(li);
  });
};

// Přidání potraviny do seznamu
function addFoodToList() {
  const foodInput = document.getElementById("food").value.trim();
  const gramsInput = parseFloat(document.getElementById("grams").value);

  if (!foodInput || isNaN(gramsInput) || gramsInput <= 0) {
    alert("Zadejte platné jméno potraviny a množství v gramech.");
    return;
  }

  const foodItem = foodList.find(item => item.name.toLowerCase() === foodInput.toLowerCase());

  if (!foodItem) {
    alert("Zadaná potravina nebyla nalezena v referenčním seznamu.");
    return;
  }

  const calories = (foodItem.kCal * gramsInput) / 100;
  const li = document.createElement("li");
  li.textContent = `${foodItem.name} (${calories.toFixed(1)} kCal / ${gramsInput}g)`;

  document.getElementById("foodList").appendChild(li);
  document.getElementById("food").value = "";
  document.getElementById("grams").value = "";

  total();
}

// Přepočet celkových kalorií
function total() {
  const listItems = document.querySelectorAll("#foodList li");
  let totalCalories = 0;

  listItems.forEach(item => {
    const match = item.textContent.match(/\(([\d.]+) kCal/);
    if (match) {
      totalCalories += parseFloat(match[1]);
    }
  });

  document.getElementById("totalCalories").textContent = "Celkem: " + totalCalories.toFixed(1) + " kCal";
}

// Reset seznamu jídel a celkových kalorií
function resetList() {
  document.getElementById("foodList").innerHTML = "";
  document.getElementById("totalCalories").textContent = "0 kCal";
}