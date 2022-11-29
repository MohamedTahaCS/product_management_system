let title  = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

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
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    
    if (title.value != '' && price.value != '' && category.value != '' && count.value <= 100) {
        if (mood === 'create') {
            if (product.count > 1) {
                for (let i = 0 ; i < product.count ; i++) {
                    proData.push(product);
                }
            }
            else proData.push(product);
        }
        else if (mood === 'update') {
            proData[tmp] = product;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        clearData();
    }
    
    // save the data to local storage
    localStorage.setItem('proData', JSON.stringify(proData));
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
            <td>${i + 1}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.taxes}</td>
            <td>${product.ads}</td>
            <td>${product.discount}</td>
            <td>${product.total}</td>
            <td>${product.category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
        table += row;
    }
    document.getElementById('tbody').innerHTML = table;
    getTotal();
    let btnDeleteAll = document.getElementById('deleteAll');
    if (proData.length > 0) {
        btnDeleteAll.innerHTML = `
        <button onclick='deleteAll()'>delete All(${proData.length})</button>
        `
    }
    else {
        btnDeleteAll.innerHTML = '';
    }
}

showData();

// delete
function deleteData(i) {
    proData.splice(i, 1);
    localStorage.proData = JSON.stringify(proData);
    showData();
}

function deleteAll() {
    localStorage.proData = '';
    proData.splice(0);
    showData();
}

// update
function updateData(i) {
    let product = proData[i];
    title.value = product.title;
    price.value = product.price;
    taxes.value = product.taxes;
    ads.value = product.ads;
    discount.value = product.discount;
    getTotal();
    category.value = product.category;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

// search

let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') searchMood = 'title';
    else  searchMood = 'category';
    
    search.placeholder = `Search By ${searchMood}`
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    value = value.toLowerCase();
    let table = '';
    
    for (let i = 0 ; i < proData.length ; i++) {
        let product = proData[i];
        if (product[searchMood].includes(value)) {
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
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `
            table += row;
        }
    }

    document.getElementById('tbody').innerHTML = table; 
}

// clean data