/*jshint esversion: 8 */

var matrix_data;
var write_col;
var write_row;
var write_value;

function createMatrix(x, y) {
  matrix_data = new Matrix(x, y);
  loadMatrix();
  return matrix_data;
}

function loadMatrix() {
  let child = document.getElementById("mtrx");
  child.parentNode.removeChild(child);
  let parent = document.createElement('table');
  parent.id = 'mtrx';
  for (let i in matrix_data.arr) {
    let columns = matrix_data.arr.length;
    let tr = document.createElement('tr');
    tr.id = `tr${i}`;
    for (let j in matrix_data.arr[i]) {
      let rows = matrix_data.arr[i].length;
      let td = document.createElement('td');
      td.id = `td${j}`;
      td.className = 'cell';
      let inp = document.createElement('input');
      inp.className = 'cell_inp';
      let current = matrix_data.arr[i][j][0];
      inp.value = current;
      td.appendChild(inp);
      tr.appendChild(td);
    }
    parent.appendChild(tr);
  }
  parent.id = 'mtrx';
  document.getElementById('matrix').appendChild(parent);
}

function clickedNewMatrix() {
  let cols = prompt("Columns", "10");
  cols = parseInt(cols, 10);
  let rows = prompt("Rows", "10");
  rows = parseInt(rows, 10);
  createMatrix(cols, rows);
}

function writeData() {
  write_col = this.parentElement.id.replace('td', '');
  write_row = this.parentElement.parentElement.id.replace('tr', '');
  write_value = this.value;
  matrix_data.setValue(write_col, write_row, write_value);
}

function transpose() {
  matrix_data.transpose();
  loadMatrix();
}



// EVENTS
window.addEventListener("load", function() {
  document.querySelectorAll('.cell_inp').forEach(cell => {
    cell.addEventListener('type', writeData);
  });
});

window.addEventListener("load", function() {
  document.getElementById('transpose').addEventListener('click', transpose);
});

window.addEventListener("load", function() {
  document.getElementById('new').addEventListener('click', clickedNewMatrix);
});

window.addEventListener("load", function() {
  document.getElementById('new').addEventListener('click', function() {
    document.querySelectorAll('.cell_inp').forEach(inp => {
      inp.addEventListener('input', writeData);
    });
  });
});

window.addEventListener("load", function() {
  document.getElementById('transpose').addEventListener('click', function() {
    document.querySelectorAll('.cell_inp').forEach(inp => {
      inp.addEventListener('input', writeData);
    });
  });
});


// CLASSES
class Matrix {
  constructor(x, y, arr = []) {
    this.arr = arr;
    for (let i = 0; i < y; i++) {
      arr.push([]);
      for (let j = 0; j < x; j++) {
        let byteArr = new ArrayBuffer(2);
        let typedArr = new Int16Array(byteArr);
        typedArr[0] = 0;
        this.arr[i].push(typedArr);
      }
    }
  }
  getValue(x, y) {
    return this.arr[y][x][0];
  }
  setValue(x, y, value) {
    let byteArr = new ArrayBuffer(2);
    let typedArr = new Int16Array(byteArr);
    typedArr[0] = value;
    this.arr[y][x] = typedArr;
  }

  transpose() {
    let new_arr = [];
    for (let i = 0; i < this.arr[0].length; i++) {
      new_arr.push([]);
      for (let j = 0; j < this.arr.length; j++) {
        let current = this.arr[j][i];
        new_arr[i].push(current);
      }
    }
    this.arr = new_arr;
  }
}
