$(document).ready(function () {

    let productList = [];
    let isUpdateStatus = false;
    let productSaveModalContent = $('#content');
    let loadingContent = $('#loading');

    productSaveModalContent.hide();

    const productSaveModal = new bootstrap.Modal('#productSaveModal');

    $('#btnProductSaveModalShow').click(() => {
        productSaveModal.show();
        loadDropDownMenuFromUserList()
    });

    $('#btnSaveOrUpdate').click(function () {
        const id = $("#id").val();
        const name = $("#name").val();
        const price = $("#price").val();
        const color = $("#color").val();
        const isPublish = $("#isPublish").is(":checked");

        if (!isUpdateStatus) {
            // save
            let productCount = productList.length;

            const newProduct = { id: ++productCount, name: name, price: price, color: color, isPublish: isPublish };

            productList.push(newProduct);
            insertRow(newProduct);
            productSaveModal.hide();
        } else {
            // update

        }
    })

    function insertRow(product) {
        $("#productListTable").append(`
        <tr>
        <td>${product.id}</td>        
        <td>${product.name}</td>        
        <td>${product.price}</td>        
        <td>${product.color}</td>        
        <td><input type='checkbox' class='form-check-input' disabled ${product.isPublish ? 'checked' : ''}></td>
        <td>
            <button class='btn btn-success btnUpdate' data-id="${product.id}">Update</button>
            <button class='btn btn-danger btnRemove' data-id="${product.id}">Remove</button>
        </td>        
        </tr>`);
    }

    function loadDropDownMenuFromUserList() {
        const url = `https://jsonplaceholder.typicode.com/users`;
        $.ajax({
            url: url,
            method: "GET",
            success: function (userList) {

                $('#dropDownMenuWithUserList').empty();

                userList.forEach(item => {
                    $('#dropDownMenuWithUserList').append(`<option value="${item.id}">${item.username}</option>`)
                })
                loadingContent.hide();
                productSaveModalContent.show();
            },
            error: function (e) {

            },
            complete: function () {

            }
        })


    }
})