

function selectProduct() {
    window.location.href = "../sites/product.html";
}

/*function loadContent(page) {
    $('#content').load(page);
}*/

function loadContent(page) {
    $('#content').fadeOut('fast', function() {
      $('#content').load(page, function() {
        $('#content').fadeIn('fast');
      });
    });
  }

  