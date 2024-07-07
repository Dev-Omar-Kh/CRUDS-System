//////////////////////////////// dark/light-mode ////////////////////////////////

const button = document.getElementById('dark_mode');
const inputs = document.querySelectorAll('input');
const container = document.body

button.addEventListener('click' , () => {

    container.classList.toggle('light_mode');

    var theme;

    if(container.classList.contains('light_mode')){

        theme = 'light';
        button.innerHTML = '<span class="material-icons-outlined">dark_mode</span>';

    }
    else{

        theme = 'dark';
        button.innerHTML = '<span class="material-icons-outlined">light_mode</span>';

    }

    // store-mode-type-in-localStorage

    localStorage.setItem('modeType' , JSON.stringify(theme));

});

// get-mode-type-from-localStorage

const typeMode = JSON.parse(localStorage.getItem('modeType'));

if(typeMode === 'light'){

    container.classList.toggle('light_mode');
    button.innerHTML = '<span class="material-icons-outlined">dark_mode</span>';

}
else{

    button.innerHTML = '<span class="material-icons-outlined">light_mode</span>';

}

//////////////////////////////// Product-management ////////////////////////////////

const allInputs = document.querySelectorAll('input')
const proName = document.getElementById('name');
const proCategory = document.getElementById('category');
const proPrice = document.getElementById('price');
const proDiscount = document.getElementById('discount');
const proQuantity = document.getElementById('quantity');
const proDescription = document.getElementById('description');
const showData = document.getElementById('show_data');
const searchPro = document.getElementById('search_pro');
const addPro = document.getElementById('add_pro');
const form = document.getElementById('add_form');
const errName = document.getElementById('err_name');
const errCate = document.getElementById('err_cate');
const errPrice = document.getElementById('err_price');
const errDisc = document.getElementById('err_disc');
const errQuant = document.getElementById('err_quant');
const errDesc = document.getElementById('err_desc');

//////////////// add-product ////////////////

let allData = [];

if (localStorage.getItem('Data')){

    allData = JSON.parse(localStorage.getItem('Data'));
    displayData();
}

form.addEventListener('submit' , (e) => {

    e.preventDefault();

    if(proName.value.length > 0 && 
        proCategory.value.length > 0 && 
        proPrice.value.length > 0 && 
        proDiscount.value.length > 0 && 
        proQuantity.value.length > 0 && 
        proDescription.value.length > 0){

        const data = {

            name : proName.value ,
            cate : proCategory.value ,
            price : proPrice.value ,
            discount : proDiscount.value ,
            quantity : proQuantity.value ,
            description : proDescription.value 

        }

        allData.push(data);
        localStorage.setItem('Data' , JSON.stringify(allData));

        displayData();

        clearInput();

    }
    else{

        // errMsg.forEach(span => {

        //     span.innerHTML = 'You should write something';

        // });

        if(proName.value.length == 0){

            errName.innerHTML = 'You should write something';

        }

        if(proCategory.value.length == 0){

            errCate.innerHTML = 'You should write something';

        }

        if(proPrice.value.length == 0){

            errPrice.innerHTML = 'You should write something';

        }

        if(proDiscount.value.length == 0){

            errDisc.innerHTML = 'You should write something';

        }

        if(proQuantity.value.length == 0){

            errQuant.innerHTML = 'You should write something';

        }

        if(proDescription.value.length == 0){

            errDesc.innerHTML = 'You should write something';

        }

    }

});

//////////////// show-products ////////////////

function displayData(){

    showData.innerHTML = ''; 

    for (let i = 0; i < allData.length; i++) {

        const tr = document.createElement('tr');

        let obj = allData[i];

        tr.innerHTML = `

            <td class="first_cell"><div> ${obj.name} </div></td>
            <td id='width' ><div> ${obj.cate} </div></td>
            <td><div> ${obj.price} </div></td>
            <td><div> ${obj.discount} </div></td>
            <td><div> ${obj.quantity} </div></td>
            <td><div> ${obj.description} </div></td>
            <td class="last_cell"><div><span onclick='deleteProduct(${i})' class="material-icons-outlined">delete</span> <span onclick='updateProduct(${i})' class="material-icons-outlined">edit</span></div></td>

        `;

        showData.append(tr);

    }

};

//////////////// clear-product ////////////////

function clearInput(){

    setTimeout(() => {

            for (let i = 0; i < allInputs.length; i++){

                const inputs = allInputs[i];
                inputs.value = '';

            }

    }, 100);

}

//////////////// delete-product ////////////////

function deleteProduct(idx){

    allData.splice(idx , 1);
    localStorage.setItem('Data' , JSON.stringify(allData));
    displayData();
}

//////////////// search-for-a-product/s ////////////////

function searchProduct(textSearched){

    showData.innerHTML = ''; 

    for (let i = 0; i < allData.length; i++) {
        
        let obj = allData[i];

        if(obj.name.toLowerCase().includes(textSearched.toLowerCase()) ||
            obj.cate.toLowerCase().includes(textSearched.toLowerCase()) ||
            obj.price.toLowerCase().includes(textSearched.toLowerCase()) ||
            obj.discount.toLowerCase().includes(textSearched.toLowerCase()) ||
            obj.quantity.toLowerCase().includes(textSearched.toLowerCase()) ||
            obj.description.toLowerCase().includes(textSearched.toLowerCase())){

            const tr = document.createElement('tr');

            tr.innerHTML = `

                <td class="first_cell"><div> ${obj.name} </div></td>
                <td id='width' ><div> ${obj.cate} </div></td>
                <td><div> ${obj.price} </div></td>
                <td><div> ${obj.discount} </div></td>
                <td><div> ${obj.quantity} </div></td>
                <td><div> ${obj.description} </div></td>
                <td class="last_cell"><div><span onclick='deleteProduct(${i})' class="material-icons-outlined">delete</span> <span class="material-icons-outlined">edit</span></div></td>

            `;

            showData.append(tr);

        }

    }

}

searchPro.addEventListener('input' , () => {

    searchProduct(searchPro.value);

});

//////////////// edit-product ////////////////

function updateProduct(idx){

    // change-button-from-add-to-update
    document.querySelector('#add_form button').remove();

    // create-update-button
    const updatePro = document.createElement('button');
    updatePro.setAttribute('id' , 'update_pro');
    updatePro.setAttribute('class' , 'add_pro');
    updatePro.setAttribute('type' , 'button');
    updatePro.innerHTML = 'Update';

    // get-product-value-to-form
    const setValue = allData[idx];

    proName.value = setValue.name;
    proCategory.value = setValue.cate;
    proPrice.value = setValue.price;
    proDiscount.value = setValue.discount;
    proQuantity.value = setValue.quantity;
    proDescription.value = setValue.description;

    form.append(updatePro);

    // update-product
    const updateBtn = document.getElementById('update_pro');

    updateBtn.addEventListener('click' , () => {

        setValue.name = proName.value
        setValue.cate = proCategory.value
        setValue.price = proPrice.value
        setValue.discount = proDiscount.value
        setValue.quantity = proQuantity.value
        setValue.description = proDescription.value

        localStorage.setItem('Data' , JSON.stringify(allData));

        displayData();

        clearInput();

        updatePro.remove();
        form.append(addPro)

    })

}