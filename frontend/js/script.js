
function loadContent(page) {
    console.log("Loading Content...");
    $('#content').fadeOut('slow', function() {
      $('#content').load(page, function() {
        $('#content').fadeIn('slow');
        console.log("Loading Content2...");
        if (page === 'users.html') {
          loadCustomers();
        } else if (page === 'landingpage.html') {
          loadProducts();
        }
      });
    });
    console.log("Finished Loading Content...");
  }

  function deactivateCustomer() {
    //send put request to set the status of a user to deactivated
    $.ajax({
      type: "PUT",
      dataType: "json",
      data: {
        email: "john.doe@gmail.com"
      },
      url: "../../backend/logic/deactivateCustomer.php",
      success: function(response) {
        // do something
        console.log(response);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        //handle error
        console.error(xhr);
      }
    });
  }

  function loadCustomers() {
    console.log("Loading Users...");
    // Make the AJAX GET request to retrieve customers
    $.ajax({
      url: '../../backend/logic/getCustomers.php',
      method: 'GET',
      dataType: 'json',
      success: function(response) {
        console.log("Response:" +response);

        // Handle the response data
        if (response.length > 0) {
          var tableBody = $('.table tbody');
          // Clear existing table rows
          tableBody.empty();

          // Loop through the customers and create table rows dynamically
          for (var i = 0; i < response.length; i++) {
            var customer = response[i];
            var row = $('<tr>');
            row.append($('<td>').text(customer.user_name));
            row.append($('<td>').text(customer.user_mail));
            row.append($('<td>').text("/orderNumber/"));
            row.append($('<td>').text("orderDate"));
            row.append($('<td>').html('<button class="btn btn-primary" onclick="checkOrder()">Bestellungen einsehen</button>'));
            row.append($('<td>').html('<button class="btn btn-danger" onclick="deactivateCustomer()">Kunden deaktivieren</button>'));
            tableBody.append(row);
          }

          // Show the customer table
          $('.container').show();
        } else {
          // Display a message if no customers found
          $('.container').hide();
          $('.table').after($('<p>').text('No customers found'));
        }
      },
      error: function(xhr, status, error) {
        // Handle the error
        console.log(error);
        console.log(status);
        var jsonResponse = JSON.parse(xhr);
        console.log("ErrorResponse: "+ jsonResponse);
      }
    });
    console.log("Finished Loading Users...");
  }

  function loadProducts() {
    console.log("Loading Products...");
    // Make the AJAX GET request to retrieve products
    $.ajax({
      url: '../../backend/logic/getProducts.php',
      method: 'GET',
      dataType: 'json',
      success: function(response) {
        console.log("Response:" +response);

        // Handle the response data
          var productsDIV = $('.products');
          // Clear existing data
          productsDIV.empty();

          // Loop through the products and create divs dynamically, group them by 3
          var row;
          for (var i = 0; i < response.length; i++) {
            if(i === 0 || i%3 === 0) {
              //Create new row
              row = $('<div>', {
                class: 'row justify-content-center'
              });
            }
            var productDetails = response[i];
            console.log("Produktdetails: " + productDetails);
            //var row = $('<tr>');
            var productDIV = '<div class="col-md-3 hover m-auto" onclick="loadContent(\'product.html\')">' +
                              '<img src="'+ productDetails.article_picturepath +'" style="max-height: 100px;">' +
                              '<h4>'+productDetails.name+'</h4>' +
                              '<p>'+productDetails.description+'</p>' +
                              '</div>';
            row.append(productDIV);
            if(i === 0 || i%3 === 0) {
              //Add new row to div
              productsDIV.append(row);
            }
          }
          // Show the customer table
          $('.container').show();
      },
      error: function(xhr, status, error) {
        // Handle the error
        console.log(error);
        console.log(status);
        var jsonResponse = JSON.parse(xhr);
        console.log("ErrorResponse: "+ jsonResponse);
      }
    });
    console.log("Finished Loading Products...");
  }

  