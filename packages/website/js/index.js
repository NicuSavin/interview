'use strict';
const $table = document.querySelector('table');

const renderTable = (grid) => {
  console.log(grid, $table);
};

fetch('http://localhost:3003/canvas')
  .then((res) => res.json())
  .then((res) => {
    let table = document.getElementById('gridTable');
    let palette = document.getElementById('palette');
    // each element in the res will be assigned a row
    let rowIndex = 0;
    res.forEach((row) => {
      let tr = document.createElement('tr');

      // iterate over the cells
      let colIndex = 0;
      row.forEach((cell) => {
        // creating the grid cell
        let td = document.createElement('td');
        td.style.backgroundColor = cell;
        td.id = rowIndex + ' ' + colIndex;
        td.tabIndex = 1;

        tr.appendChild(td);

        const [x, y] = td.id.split(' ').map(Number);

        td.addEventListener('click', function () {
          // selecting the grid to be colored
          let newColor = palette.value;
          updateColor(x, y, newColor, this);
        });
        // update column index
        colIndex += 1;
      });

      table.appendChild(tr);
      // update row index
      rowIndex += 1;
    });
  });

document.addEventListener('keydown', function (event) {
  const x = parseInt(event.target.id.split(' ')[0]);
  const y = parseInt(event.target.id.split(' ')[1]);
  switch (event.key) {
    case 'ArrowUp':
      if (x > 0) {
        document.getElementById(x - 1 + ' ' + y).focus();
      }
      break;
    case 'ArrowDown':
      if (x < 9) {
        // Assuming the grid size is 10x10
        document.getElementById(x + 1 + ' ' + y).focus();
      }
      break;
    case 'ArrowLeft':
      if (y > 0) {
        document.getElementById(x + ' ' + (y - 1)).focus();
      }
      break;
    case 'ArrowRight':
      if (y < 9) {
        // Assuming the grid size is 10x10
        document.getElementById(x + ' ' + (y + 1)).focus();
      }
      break;
    case 'Enter':
      updateColor(x, y, document.getElementById('palette').value, event.target);
      break;
  }
  // }
});

function updateColor(x, y, newColor, td) {
  if (td.style.backgroundColor !== newColor) {
    td.style.backgroundColor = newColor;
    // needed otherwise wont work
    newColor = newColor.replace('#', '');
    // i had an unknown bug not letting me put the color in the body so this is a small alternative
    fetch(`http://localhost:3003/update/${x}/${y}/${newColor}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
  }
}
