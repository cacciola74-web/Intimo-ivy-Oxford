function addRow(data = {}) {
  const tbody = document.getElementById("tableBody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input type="text" class="art-input" value="${data.art || ''}" placeholder="Codice"></td>
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
