let addButton = document.querySelector('#add-button')
addButton.addEventListener('click', addItem);
// storage
const inventory = [];

let itemName = document.querySelector('#item-name'),
  itemQuantity = document.querySelector('#item-quantity'),
  itemPrice = document.querySelector('#item-price'),
  table = document.querySelector('table');


// randomId

let randomId = function() {
  let randNum;
  let randNumberGenerator = '';
  let numbersLetters = '0123456789abcdefghijklmnopqrstvw'.split('');
  for (let i = 0; i < 6; i++) {
    randNum = Math.floor(Math.random() * numbersLetters.length);
    randNumberGenerator += numbersLetters[randNum];
  }
  return "#" + randNumberGenerator;
}

// time
const displayTimeDate = () => {


  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let date = now.getDate();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    "0" + minutes;
  }
  return date + '.' + month + '.' + year + " " + hour + ":" + minutes;

}





// adding rows


function addItem(e) {
  e.preventDefault();


  if (!itemName.value || !itemQuantity.value || !itemPrice.value) {
    alert('please, fill the boxes ')
    return false;
  }



  let newRows = table.insertRow(1);

  let idCell = newRows.insertCell(0);
  let itemCell = newRows.insertCell(1);
  let quantityCell = newRows.insertCell(2);
  let priceCell = newRows.insertCell(3);
  let timeCell = newRows.insertCell(4);
  let actionCell = newRows.insertCell(5);

  inventory.push({
    id: randomId(),
    itemname: itemName.value,
    quantity: itemQuantity.value,
    price: itemPrice.value,
    time: displayTimeDate(),

  });


  inventory.forEach((item, i) => {
    idCell.textContent = item.id;
    itemCell.textContent = item.itemname;
    quantityCell.textContent = item.quantity;
    priceCell.textContent = item.price;
    timeCell.textContent = item.time;
    actionCell.innerHTML = '<span  class="ion-edit" onclick="editeRow11(this)"></span><span class = "ion-trash-a"id="delete" onclick="deleteRow11(this)" ></span></br>';
  })




  itemName.value = '';
  itemQuantity.value = '';
  itemPrice.value = '';

  // myFunction();

  console.log('this is before deleting', inventory);

};

const editInventory = (position, name, quantity, price) => {
  inventory[position].itemname = name;
  inventory[position].quantity = quantity;
  inventory[position].price = price;

}



// delete row
function deleteRow11(r) {
  var i = r.parentNode.parentNode.rowIndex;
  inventory.splice(i - 1, 1);
  console.log('this is after deleting', inventory);
  table.deleteRow(i);
}
// edit row

function editeRow11(e) {
  let editables = e.parentElement.parentNode.childNodes;
  console.log(editables)
  let name, quantity, price;
  let position = e.parentElement.parentNode.rowIndex - 1;

  console.log(position);

  if (!editables[1].isContentEditable) {
    for (let i = 0; i < 3; i++) {
      let el = editables[i + 1]
      el.contentEditable = 'true';
      e.style.color = '#f20e0e';
      el.style.backgroundColor = 'rgb(122, 231, 228)';
    }


  } else {
    name = editables[1].textContent;
    quantity = editables[2].textContent;
    price = editables[3].textContent;
    console.log(name, quantity, price);

    editInventory(position, name, quantity, price);

    for (let i = 0; i < 3; i++) {
      let el = editables[i + 1]
      el.contentEditable = 'false';
      e.style.color = '#f20e0e';
      el.style.backgroundColor = '#F3F3F3';

    }
    // here you will update the array

    // document.getElementById('edite').innerHTML = 'Edit';
    //e.innerHTML = 'Edite';
    e.style.color = '#07ed13';

  }
}

console.log(inventory);
