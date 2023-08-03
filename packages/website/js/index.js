'use strict';

const $table = document.querySelector('table');

const renderTable = (grid) => {
  console.log(grid, $table);
};

fetch('http://localhost:3003/canvas')
  .then((res) => res.json())
  .then((res) => {
    let table = document.getElementById('gridTable');
    // each element in the res will be assigned a row
    res.forEach((row) => {
      let tr = document.createElement('tr');

      // iterate over the cells
      row.forEach((cell) => {
        let td = document.createElement('td');
        td.style.backgroundColor = cell;
        tr.appendChild(td);
      });

      table.appendChild(tr);
    });
  });
