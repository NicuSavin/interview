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
        let td = document.createElement('td');
        td.style.backgroundColor = cell;
        tr.appendChild(td);
        td.id = rowIndex + ' ' + colIndex;

        const [x, y] = td.id.split(' ').map(Number);

        td.addEventListener('click', function () {
          // selecting the grid to be colored
          let newColor = palette.value;
          if (this.style.backgroundColor !== newColor) {
            this.style.backgroundColor = newColor;

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
        });
        // update column index
        colIndex += 1;
      });

      table.appendChild(tr);
      // update row index
      rowIndex += 1;
    });
  });
