// Dati iniziali presi dalla commissione standard
const initialItems = [
  { art: "11-26-S001-16", desc: "SLIP COTONE", comp: "COTONE", ass: "S-M-L-XL-XXL", conf: 16, colli: 1, prezzo: 9.90 },
  { art: "11-26-S002-16", desc: "SLIP COTONE", comp: "COTONE", ass: "S-M-L-XL-XXL", conf: 16, colli: 1, prezzo: 9.90 },
  { art: "II-26-B001-16", desc: "BOXER COTONE", comp: "COTONE", ass: "S-M-L-XL-XXL", conf: 16, colli: 1, prezzo: 9.90 }
];

document.addEventListener("DOMContentLoaded", () => {
  // Imposta data corrente
  document.getElementById("data").valueAsDate = new Date();
  
  // Carica voci iniziali
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
    <td><input type="number" class="colli" value="${data.colli || 1}" oninput="calculateTotals()"></td>
    <td><input type="number" step="0.01" class="prezzo" value="${data.prezzo || 9.90}" oninput="calculateTotals()"></td>
    <td class="row-total">€ 0,00</td>
    <td><button class="btn-delete" onclick="removeRow(this)">X</button></td>
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
    const colli = parseFloat(row.querySelector(".colli").value) || 0;
    const prezzo = parseFloat(row.querySelector(".prezzo").value) || 0;

    const capiRiga = conf * colli;
    const totaleRiga = capiRiga * prezzo;

    row.querySelector(".row-total").innerText = `€ ${totaleRiga.toFixed(2)}`;

    totalColli += colli;
    totalCapi += capiRiga;
    totalPrice += totaleRiga;
  });

  document.getElementById("totalColli").innerText = totalColli;
  document.getElementById("totalCapi").innerText = totalCapi;
  document.getElementById("totalPrice").innerText = `€ ${totalPrice.toFixed(2)}`;
}

function saveOrder() {
  const orderData = {
    cliente: document.getElementById("cliente").value,
    citta: document.getElementById("citta").value,
    piva: document.getElementById("piva").value,
    sdi: document.getElementById("sdi").value,
    data: document.getElementById("data").value,
    totaleCapi: document.getElementById("totalCapi").innerText,
    totaleImporto: document.getElementById("totalPrice").innerText
  };

  alert(`Ordine per ${orderData.cliente || 'Cliente generico'} salvato con successo!\nTotale: ${orderData.totaleImporto}`);
}
