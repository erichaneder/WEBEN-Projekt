
var cart = [];

function loadContent(page) {
    console.log("Loading Content...");
    $('#content').fadeOut('slow', function() {
      $('#content').load(page, function() {
        $('#content').fadeIn('slow');
        console.log("Loading Content2...");
        if (page === 'users.html') {
          handleActiveTab('users');
          loadCustomers();
        } else if (page === 'landingpage.html') {
          handleActiveTab('home');
          loadProducts();
        } else if(page === 'basket.html') {
          handleActiveTab('basket');
          loadBasket();
        } else if(page === 'orders.html') {
          handleActiveTab('orders');
          loadOrders();
        } else if(page === 'contact.html') {
          handleActiveTab('contact');
        } else if(page === 'about.html') {
          handleActiveTab('about');
        } else if(page === 'produktbearbeitung.html') {
          handleActiveTab('addProducts');
        } else if(page === 'login.html') {
          handleActiveTab('login');
        } else if(page === 'register.html') {
          handleActiveTab('register');
        } 
      });
    });
    console.log("Finished Loading Content...");
  }

  function handleActiveTab(tab) {
    console.log("Handling active tab for: "+tab);
    console.log("1: " + $('.active').attr("class"));
    $('.active').removeClass("active");
    $('.'+tab).addClass("active");
    console.log("2: " + $('.active').attr("class"));
    console.log("Finished Handling active tab for: "+tab);
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
            var productDIV = '<div class="col-md-3 hover m-auto"' + 
                              'onclick="loadProduct(\''+productDetails.article_picturepath+'\', \''+productDetails.name+'\', \''+productDetails.description+'\', '+productDetails.article_price+')">' +
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

  function loadProduct(path, name, description, price) {
    $('#content').fadeOut('slow', function() {
      $('#content').load('product.html', function() {
        $('#content').fadeIn('slow');
        
        //((do loading logic here))
        $('#name').text(name);
        $('#description').text(description);
        $('#price').text('€' + price.toFixed(2));
        $('#picturepath').prop('src', path);
        
        

      });
    });
  }


function handleSearch(event) {
  console.log("Starting to load products with dynamic search...");
  var searchTerm = event.target.value;
  console.log("Searchterm: "+ searchTerm);

  // Sende AJAX-Anfrage an den Server
  $.ajax({
    url: '../../backend/logic/search.php', // Passe den Pfad zur Serverdatei an
    type: 'POST',
    dataType: 'json',
    data: { searchTerm: searchTerm }, // Übergib den Suchbegriff an den Server
    success: function(response) {
      var productsDIV = $('.products');
      // Leere den Inhalt der .products-DIV
      productsDIV.empty();

      if(response.length < 1) {
        productsDIV.html('<p>Keine Produkte gefunden.</p>');
      } else {
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
      }
    },
    error: function(xhr, status, error) {
      console.log(error);
      console.log(status);
      //var jsonResponse = JSON.parse(xhr);
      //console.log("ErrorResponse: "+ jsonResponse);
    }
  });
}

function loadBasket() {
  //Get things we need in a variable
  var cartDiv = $('.cart');
  var cartSummary = $('.cart-summary');
  var totalPriceSpan = $('#totalPrice');

  cartDiv.empty(); // Clear the cart div before populating it with new content
  totalPriceSpan.text('€0.00'); // Reset the total price

  // Check if the cart is empty
  if (cart.length === 0) {
    cartDiv.append('<p>Der Warenkorb ist leer.</p>');
    return; // Exit the function if the cart is empty
  }

  var totalPrice = 0; // Variable to store the total price

  // Loop through each product in the cart
  for (var i = 0; i < cart.length; i++) {
    var product = cart[i];

    // Create the HTML for the product display
    var productHTML = `
      <div class="cart-item">
        <h4>${product.name}</h4>
        <p>Preis: €${product.price.toFixed(2)}</p>
        <p>Größe: ${product.size}</p>
        <p>Menge: ${product.quantity}</p>
        <button class="btn btn-danger btnRemoveProduct" data-index="${i}">Entfernen</button>
        <button class="btn btn-primary btnDecreaseQuantity" data-index="${i}">-</button>
        <button class="btn btn-primary btnIncreaseQuantity" data-index="${i}">+</button>
      </div>
      <hr>`;
    cartDiv.append(productHTML);

    // Add the product price to the total price
    totalPrice += product.price * product.quantity;
  }

  // Update the total price display
  totalPriceSpan.text('€' + totalPrice.toFixed(2));

  // Add click event listeners for removing a product and increasing quantity
  $('.btnRemoveProduct').click(function() {
    var index = $(this).data('index');
    removeProductFromCart(index);
    loadBasket(); // Reload the cart to update the display
  });

  $('.btnIncreaseQuantity').click(function() {
    var index = $(this).data('index');
    increaseProductQuantity(index);
    loadBasket(); // Reload the cart to update the display
  });

  $('.btnDecreaseQuantity').click(function() {
    var index = $(this).data('index');
    decreaseProductQuantity(index);
    loadBasket(); // Reload the cart to update the display
  });

  // Add click event listener for clearing the entire cart
  $('#btnClearCart').click(function() {
    cart = []; //clears cart
    loadBasket(); // Reload the cart to update the display
  });

  // Add click event listener for the checkout button
  $('#btnCheckout').click(function() {
    // Perform the checkout process
    // You can redirect the user to the checkout page or handle the process as per your requirements
    orderBasket();
    loadContent('orders.html');
  });
}

function orderBasket() {
  
    // Create an array to hold the product details
    var products = [];

    // Loop through each product in the cart and populate the array
    for (var i = 0; i < cart.length; i++) {
      var product = cart[i];
      products.push({
        name: product.name,
        price: product.price,
        size: product.size,
        quantity: product.quantity
      });
    }
  
    // Create the data object to be sent in the AJAX request
    var data = {
      products: products
    };
  
    // Make the AJAX request
    $.ajax({
      url: '../../backend/logic/postOrder.php', // Replace with the actual URL of your PHP script
      method: 'POST',
      data: data,
      success: function(response) {
        // Handle the success response
        console.log(response);
        // You can perform any additional actions here, such as displaying a success message
      },
      error: function(xhr, status, error) {
        // Handle the error response
        console.error(error);
        // You can display an error message or take other actions here
      }
    });  

  cart = [];
}

function removeProductFromCart(index) {
  // Check if the index is within the valid range of the cart array
  if (index >= 0 && index < cart.length) {
    // Remove the product at the specified index from the cart array
    cart.splice(index, 1);
  }
  // update cart count
  $('#cartCount').text("" + cart.length);
}

function increaseProductQuantity(index) {
  // Check if the index is valid
  if (index >= 0 && index < cart.length) {
    // Get the product at the specified index
    var product = cart[index];
    
    // Increase the quantity by 1
    product.quantity += 1;
  }
}

function decreaseProductQuantity(index) {
  // Check if the index is valid
  if (index >= 0 && index < cart.length) {
    // Get the product at the specified index
    var product = cart[index];
    
    // Increase the quantity by 1
    product.quantity -= 1;

    //if quantity is now 0 -> remove from cart
    if(product.quantity === 0) {
      removeProductFromCart(index);
    }
  }
}

function addToCart() {
  console.log("Adding to cart...");
  // Get the selected product details
  var productName = $('.col-md-6 h2').text();
  var productPrice = parseFloat($('.col-md-6 .text-primary').text().replace('€', ''));
  var productSize = $('#sizeSelect').val();
  var productQuantity = parseInt($('#quantityInput').val());

  // Create the product object
  var product = {
    name: productName,
    price: productPrice,
    size: productSize,
    quantity: productQuantity
  };

  // Add the product to the cart array
  cart.push(product);

  // update cart count
  $('#cartCount').text("" + cart.length);

  console.log("CartLength:" + cart.length);
}

function loadOrders() {

  $.ajax({
    url: '../../backend/logic/getOrders.php',
    method: 'GET',
    dataType: 'json',
    success: function(response) {
      // Handle the response and populate the order list
      if (response.length > 0) {
        var orderList = $('#orderList');
        $.each(response, function(index, order) {
          var row = $('<tr>');
          row.append($('<td>').text(order.id));
          row.append($('<td>').text(order.user_name));
          row.append($('<td>').text(order.user_mail));
          row.append($('<td>').text(order.order_date));
          row.append($('<td>').text(order.total_cost+" €"));
          
          orderList.append(row);
        });
      } else {
        // Display a message if no orders found
        $('#orderList').html('<tr><td colspan="3">No orders found</td></tr>');
      }
    },
    error: function(xhr, status, error) {
      // Handle error case
      $('#orderList').html('<tr><td colspan="3">Error occurred while fetching orders</td></tr>');
      console.log(error);
      console.log(status);
      var jsonResponse = JSON.parse(xhr);
      console.log("ErrorResponse: "+ jsonResponse);
    }
  });
}





  