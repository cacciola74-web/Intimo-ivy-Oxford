const initialItems = [
  { art: "11-26-S001-16", desc: "SLIP COTONE", comp: "COTONE", ass: "S-M-L-XL-XXL", conf: 16, colli: "", prezzo: 9.90 },
  { art: "11-26-S002-16", desc: "SLIP COTONE", comp: "COTONE", ass: "S-M-L-XL-XXL", conf: 16, colli: "", prezzo: 9.90 },
  { art: "II-26-S003-16", desc: "SLIP COTONE", comp: "COTONE", ass: "S-M-L-XL-XXL", conf: 16, colli: "", prezzo: 9.90 },
  { art: "II-26-S004-16", desc: "SLIP COTONE", comp: "COTONE", ass: "S-M-L-XL-XXL", conf: 16, colli: "", prezzo: 9.90 },
  { art: "II-26-B001-16", desc: "BOXER COTONE", comp: "COTONE", ass: "S-M-L-XL-XXL", conf: 16, colli: "", prezzo: 9.90 },
  { art: "II-26-B002-16", desc: "BOXER COTONE", comp: "COTONE", ass: "S-M-L-XL-XXL", conf: 16, colli: "", prezzo: 9.90 },
  { art: "II-26-B003-16", desc: "BOXER COTONE", comp: "COTONE", ass: "S-M-L-XL-XXL", conf: 16, colli: "", prezzo: 9.90 },
  { art: "II-26-B004-16", desc: "BOXER COTONE", comp: "COTONE", ass: "S-M-L-XL-XXL", conf: 16, colli: "", prezzo: 9.90 }
];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("data").valueAsDate = new Date();
  initialItems.forEach(item => addRow(item));
  calculateTotals();
});

function addRow(data = {}) {
  const tbody = document.getElementById("tableBody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input type="text" value="${data.art || ''}" placeholder="Codice"></td>
    <td><input type="text" value="${data.desc || ''}" placeholder="Descrizione"></td>
    <td><input type="text" value="${data.comp || 'COTONE'}" placeholder="Composizione"></td>
    <td><input type="text" value="${data.ass || 'S-M-L-XL-XXL'}" placeholder="Assortimento"></td>
    <td><input type="number" class="conf" value="${data.conf || 16}" oninput="calculateTotals()"></td>
    <td><input type="number" class="colli" value="${data.colli !== undefined ? data.colli : ''}" placeholder="0" min="0" oninput="calculateTotals()"></td>
    <td><input type="number" step="0.01" class="prezzo" value="${data.prezzo !== undefined ? data.prezzo : 9.90}" oninput="calculateTotals()"></td>
    <td class="row-total">€ 0,00</td>
    <td class="no-print"><button class="btn-delete" onclick="removeRow(this)">X</button></td>
  `;

  tbody.appendChild(row);
  calculateTotals();
}

function removeRow(btn) {
  btn.closest("tr").remove();
  calculateTotals();
}

function calculateTotals() {
  const rows = document.querySelectorAll("#tableBody tr");
  let totalColli = 0;
  let totalCapi = 0;
  let totalPrice = 0;

  rows.forEach(row => {
    const conf = parseFloat(row.querySelector(".conf").value) || 0;
    const colliInput = row.querySelector(".colli").value;
    const colli = parseFloat(colliInput) || 0;
    const prezzo = parseFloat(row.querySelector(".prezzo").value) || 0;

    // Se i colli sono <= 0 o vuoti, aggiunge classe per nasconderla in stampa
    if (colli <= 0) {
      row.classList.add("hide-on-print");
    } else {
      row.classList.remove("hide-on-print");
    }

    const capiRiga = conf * colli;
    const totaleRiga = capiRiga * prezzo;

    row.querySelector(".row-total").innerText = `€ ${totaleRiga.toFixed(2).replace('.', ',')}`;

    totalColli += colli;
    totalCapi += capiRiga;
    totalPrice += totaleRiga;
  });

  document.getElementById("totalColli").innerText = totalColli;
  document.getElementById("totalCapi").innerText = totalCapi;
  document.getElementById("totalPrice").innerText = `€ ${totalPrice.toFixed(2).replace('.', ',')}`;
}

function printPDF() {
  calculateTotals();
  window.print();
}
  
