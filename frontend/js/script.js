
var cart = [];

function showToast(message) {
  // Select the toast element
  var toastElement = document.getElementById('errorToast');

  // Set the message text
  var toastBody = toastElement.querySelector('.toast-body');
  toastBody.textContent = message;

  // Initialize the toast using Bootstrap's Toast API
  var toast = new bootstrap.Toast(toastElement);

  // Show the toast
  toast.show();
}

function logoutUser() {
  cart = [];

  fetch('../../backend/logic/logout.php')
    .then(response => {
      if (response.ok) {
        // Session destroyed successfully
        // Redirect to the homepage or any other desired page
        location.reload();
        loadContent('landingpage.html');
      } else {
        // Handle error
        console.log('Error: Session not destroyed');
      }
    })
    .catch(error => {
      // Handle error
      console.log('Error: ' + error);
    });
  }

function loadContent(page) {
    console.log("Loading Content...");
    $('#content').fadeOut('slow', function() {
      $('#content').load(page, function() {
        $('#content').fadeIn('slow');
        console.log("Loading NORMAL CONTENT...");
        if (page === 'users.html') {
          handleActiveTab('users');
          loadCustomers();
        } else if (page === 'landingpage.html') {
          handleActiveTab('home');
          loadProducts();
        } else if(page === 'basket.php') {
          console.log("Loading Basket Page..");
          handleActiveTab('basket');
          loadBasket();
        } else if(page === 'contact.html') {
          handleActiveTab('contact');
        } else if(page === 'about.html') {
          handleActiveTab('about');
        } else if(page === 'produktbearbeitung.html') {
          handleActiveTab('addProducts');
        } else if(page === 'login.php') {
          handleActiveTab('login');
        } else if(page === 'register.html') {
          handleActiveTab('register');
        } else if(page === 'profil.html') {
          handleActiveTab('profil');
          loadProfile(userid);
        }
      });
    });
    console.log("Finished Loading Content...");
  }

  function loadUserContent(page, userid) {
    console.log("Loading Content for user...");
    $('#content').fadeOut('slow', function() {
      $('#content').load(page, function() {
        $('#content').fadeIn('slow');
        console.log("Loading Content2...");
        
        if(page === 'profil.html') {
          handleActiveTab('profil');
          loadProfile(userid);
        } else if(page === 'orders.html') {
          handleActiveTab('orders');
          loadOrders(userid);
        }
      });
    });
    console.log("Finished Loading Content for user...");
  }

  function handleActiveTab(tab) {
    console.log("Handling active tab for: "+tab);
    $('.active').removeClass("active");
    $('.'+tab).addClass("active");
    console.log("Finished Handling active tab for: "+tab);
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

    // Check if there is a cart saved, if yes retrieve it here
    var storedCart = sessionStorage.getItem('cart');
    console.log("Checking cart..." + storedCart + "Old length: " + cart.length);
    if (storedCart != null && cart.length < 1) {
        cart = JSON.parse(storedCart);
        // Optional: Clear the stored cart data from session storage
        sessionStorage.removeItem('cart');
        // update cart count
        $('#cartCount').text("" + cart.length); 
    }

    // Get the selected category value
    var selectedCategory = $('#country').val();
    console.log("Selected Category: " +selectedCategory)
    if(selectedCategory !== "1" && selectedCategory !== "2" && selectedCategory !== "3") {
      selectedCategory = 0;
      console.log("Loading with category 0!");
    }

    // Make the AJAX GET request to retrieve products
    $.ajax({
      url: '../../backend/logic/getProducts.php?category='+ selectedCategory,
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
        $('#productpicture').prop('src', path);
        
      });
    });
  }


function handleSearch(event) {
  console.log("Starting to load products with dynamic search...");
  var searchTerm = event.target.value;
  console.log("Searchterm: "+ searchTerm);

  // Get the selected category value
  var selectedCategory = $('#country').val();
  console.log("Selected Category: " +selectedCategory)
  if(selectedCategory !== "1" && selectedCategory !== "2" && selectedCategory !== "3") {
    selectedCategory = 0;
    console.log("Loading with category 0!");
  }

  // Sende AJAX-Anfrage an den Server
  $.ajax({
    url: '../../backend/logic/search.php', 
    type: 'POST',
    dataType: 'json',
    data: { searchTerm: searchTerm, category: selectedCategory }, // Übergib den Suchbegriff an den Server
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
  console.log("Cart: " + cart);
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
    console.log("CartDiv appended.");
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
}

function orderBasket(userid) {
    console.log("Ordering basket...");
    // Create an array to hold the product details
    var products = [];

    // Loop through each product in the cart and populate the array
    for (var i = 0; i < cart.length; i++) {
      var product = cart[i];
      products.push({
        name: product.name,
        price: product.price,
        size: product.size,
        quantity: product.quantity,
        userid:  userid
      });
    }
  
    // Create the data object to be sent in the AJAX request
    var data = {
      products: products
    };
    console.log("posting Order... Data: " + data);
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
  loadUserContent('orders.html', userid);
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

function loadOrders(userid) {

  $.ajax({
    url: '../../backend/logic/getOrders.php?userid=' + userid,
    method: 'GET',
    dataType: 'json',
    success: function(response) {
      // Handle the response and populate the order list
      if (response.length > 0) {
        var orderList = $('#orderList');
        var totalCost = 0; // Variable to store the total cost

        $.each(response, function(index, order) {
          var row = $('<tr>');
          row.append($('<td>').text(order.id));
          row.append($('<td>').text(order.user_name));
          row.append($('<td>').text(order.user_mail));
          row.append($('<td>').text(order.order_date));
          row.append($('<td>').text(order.product_name));
          row.append($('<td>').text(order.quantity));
          row.append($('<td>').text(order.total_cost*order.quantity+" €"));
          
          orderList.append(row);
          totalCost += parseFloat(order.total_cost*order.quantity); //add to total cost
        });

        // Add the total cost row
        var totalRow = $('<tr>');
        totalRow.append($('<td colspan="6"><strong>Total Cost:</strong></td>'));
        totalRow.append($('<td><strong>' + totalCost.toFixed(2) + ' €</strong></td>'));
        orderList.append(totalRow);
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

function loadProfile(userid) {
  // Make an AJAX request to fetch the user's profile data
  $.ajax({
      url: '../../backend/logic/getProfile.php?userid=' + userid,
      method: 'GET',
      dataType: 'json',
      success: function (response) {
          // Handle the success response
          var profileData = $('#profileData');
          // Clear the profileData div to remove any existing data
          profileData.empty();

          // Generate the HTML code for the profile form
          var formHTML = '<p>Name: ' + response.user_name + '</p>';
          formHTML += '<p>Email: ' + response.user_mail + '</p>';
          formHTML += '<form id="editProfileForm" action="../../backend/logic/updateUser.php" method="POST">';
          formHTML += '<input type="hidden" name="userid" value="' + userid + '">';
          formHTML += '<label for="username">Name:</label><br>';
          formHTML += '<input type="text" id="username" name="username" value="' + response.user_name + '"><br>';
          formHTML += '<label for="phone">Phone:</label><br>';
          formHTML += '<input type="text" id="phone" name="phone" value="' + response.user_phone + '"><br>';
          formHTML += '<label for="address">Adress:</label><br>';
          formHTML += '<input type="text" id="adress" name="adress" value="' + response.user_adress + '"><br>';
          formHTML += '<label for="zip">Zip:</label><br>';
          formHTML += '<input type="text" id="zip" name="zip" value="' + response.user_zipcode + '"><br>';
          formHTML += '<label for="city">City:</label><br>';
          formHTML += '<input type="text" id="city" name="city" value="' + response.user_city + '"><br>';
          formHTML += '<label for="country">Country:</label><br>';
          formHTML += '<input type="text" id="country" name="country" value="' + response.user_country + '"><br>';
          formHTML += '<input type="submit" value="Update Profile"><br>';
          formHTML += '</form>';

          // Append the form HTML to the profileData div
          profileData.append(formHTML);
      },
      error: function (xhr, status, error) {
          // Handle the error response
          console.error(error);
          // Display an error message or take other actions as needed
      }
  });
}

function checkLogin() {
  console.log("Checking Login...");

  email = $("#exampleInputEmail1").val();
  password = $("#exampleInputPassword1").val();
  remember = $("#rememberCheckbox").prop("checked");

  console.log("Email: "+email);
  console.log("PW: "+password);
  console.log("Remember: "+remember);

  // Before the AJAX request in the checkLogin() function
  sessionStorage.setItem('cart', JSON.stringify(cart));

  // Make the AJAX POST request to check the login
  $.ajax({
      url: '../../backend/logic/checkLogin.php',
      method: 'POST',
      data: { email: email, password: password, remember: remember },
      success: function(response) {
          console.log(response);
      },
      error: function(xhr, status, error) {
          console.log(error);
          console.log(status);
      }
  });
  console.log("Finished Checking Login...");
}

function registerUser() {
  console.log("Registering...");
  
  var username = $('#username').val();
  var email = $('#email').val();
  var password = $('#password').val();
  var password2 = $('#password2').val();
  var address = $('#address').val();
  var city = $('#city').val();
  var zip = $('#zip').val();
  var country = $('#country').val();
  var phone = $('#phone').val();
  var billingName = $('#billingName').val();

  // Make the AJAX POST request to register the user
  $.ajax({
      url: '../../backend/logic/createUser.php',
      method: 'POST',
      data: { 
        username: username,
        email: email,
        password: password,
        password2: password2,
        address: address,
        city: city,
        zip: zip,
        country: country,
        phone: phone,
        billingName: billingName },
      success: function(response) {
          console.log(response);
      },
      error: function(xhr, status, error) {
          console.log(error);
          console.log(status);
      }
  });
  console.log("Finished Registering...");
}

// Function to handle sending a message
function sendMessage() {
  console.log("Sending message...");
  var messageInput = document.getElementById('messageInput');
  var message = messageInput.value.trim(); // Remove leading/trailing whitespace

  if (message === '') {
    return;
  }
  // Create a new message element
  var messageElement = $('<div>').addClass('message').text(message);

  // Prepend the new message to the chatMessages div
  $('#chatMessages').append(messageElement);

  // Scroll to the bottom of the chat messages container
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Clear the message input field
  messageInput.value = '';

  // Prepare the data to be sent in the AJAX request
  var data = {
    userid: 5,   //HARDCODED
    content: message,
    date: new Date().toISOString()
  };

  $.ajax({
    url: '../../backend/logic/saveMessage.php', 
    method: 'POST',
    data: data,
    success: function(response) {
      console.log(response);
    },
    error: function(xhr, status, error) {
      console.error(error);
    }
  });
}
  
function toggleChat() {
  var chatPopup = document.getElementById('chatPopup');
  var arrowIcon = document.getElementById('arrowIcon'); 
  chatPopup.classList.toggle('collapsed');
  if(chatPopup.classList.contains('collapsed')) {
    arrowIcon.innerHTML = '&#9650;';
  } else {
    arrowIcon.innerHTML = '&#9660;'
    $('#chatMessages').empty(); // Clear existing messages
    loadPreviousMessages();
  }
}

function loadPreviousMessages() {
  // Make an AJAX GET request to retrieve the previous messages
  $.ajax({
    url: '../../backend/logic/getMessages.php',
    method: 'GET',
    dataType: 'json',
    success: function(response) {
      // Handle the response data and populate the chat messages container
      var chatMessages = $('#chatMessages');
      chatMessages.empty(); // Clear existing messages

      // Loop through the messages and create message elements
      for (var i = 0; i < response.length; i++) {
        var message = response[i];
        var messageElement = $('<div>', {
          class: 'message' + (message.admin ? ' admin' : ''),
          text: message.content
        });
        chatMessages.append(messageElement); // Prepend new message to show it at the top
      }
    },
    error: function(xhr, status, error) {
      // Handle the error case
      console.log(error);
      console.log(status);
    }
  });
}



