let title  = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

// get Total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else {
        total.innerHTML = '';
        total.style.background = 'rgb(114, 26, 19)';
    }
}
// create product
let proData = [];
if (localStorage.proData != null) {
    proData = JSON.parse(localStorage.proData);
}


submit.onclick = function() {
    let product = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }
    // save the data to local storage
    proData.push(product);
    localStorage.setItem('proData', JSON.stringify(proData));
    clearData();
    showData();
}


// clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
// read
function showData() {
    let table = '';
    for (let i = 0 ; i < proData.length ; i++) {
        let product = proData[i];
        let row = `
        <tr>
            <td>${i}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.taxes}</td>
            <td>${product.ads}</td>
            <td>${product.discount}</td>
            <td>${product.total}</td>
            <td>${product.category}</td>
            <td><button id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
        table += row;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDeleteAll = document.getElementById('deleteAll');
    if (proData.length > 0) {
        btnDeleteAll.innerHTML = `
        <button onclick='deleteAll()'>delete All</button>
        `
    }
    else {
        btnDeleteAll.innerHTML = '';
    }
}

showData();


// delete
function deleteData(i) {
    console.log(i);
    localStorage.proData = JSON.stringify(proData);
    proData.splice(i, 1);
    showData();
}

function deleteAll() {
    localStorage.clearData = {};
    proData.splice(0);
    showData();
}

// count
// update
// search
// clean data