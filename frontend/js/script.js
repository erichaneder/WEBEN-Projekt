
function loadContent(page) {
    console.log("Loading Content...");
    $('#content').fadeOut('slow', function() {
      $('#content').load(page, function() {
        $('#content').fadeIn('slow');
        console.log("Loading Content2...");
      });
    });
    console.log("Finished Loeding Content...");
    if (page === 'users.html') {
      console.log("Loading Users...");
      // Make the AJAX GET request to retrieve customers
      $.ajax({
        url: '../../backend/logic/getCustomers.php',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
          var jsonData = JSON.parse(response);
          console.log("Response:" +jsonData);

          // Handle the response data
          if (jsonData.length > 0) {
            var tableBody = $('.table tbody');
            // Clear existing table rows
            tableBody.empty();

            // Loop through the customers and create table rows dynamically
            for (var i = 0; i < jsonData.length; i++) {
              var customer = jsonData[i];
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
          console.log(xhr);
        }
      });
      console.log("Finished Loading Users...");
    }
  }

  function deactivateCustomer() {
    //send put request to set the status of a user to deactivated
    $.ajax({
      type: "put",
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

  