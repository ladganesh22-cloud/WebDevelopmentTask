$(document).ready(function () {

  const fullNameService = $('#bookFullName');
  fullNameService.on('click', function () {
    const bookNowBtnStatus = $('.book-submit-btn .btn');
    if (bookNowBtnStatus.length == 1 && bookNowBtnStatus.hasClass('diabledbookbtn')) {
      const bookServiceError = $('.addCartError');
      bookServiceError.css('display', 'inline-block');
    }
  });

  let srNo = 1;

  $('.add-to-cart-btn').on('click', function () {
    console.log(srNo);
    const $addedBtn = $(this);
    console.log($addedBtn);
    const $row = $addedBtn.closest('tr');
    console.log($row);
    const serviceName = $row.find('.service-name').text().trim();
    console.log(serviceName);
    const price = $row.find('.service-price').text().trim();
    console.log(price);
    const removebtn = $row.find('.remove-to-cart-btn');
    console.log(removebtn);
    const removebtnicon = $row.find('.remove-btn-icon');
    console.log(removebtn);
    removebtn.css('display', 'inline-block');
    removebtnicon.css('display', 'inline-block');
    $addedBtn.css('display', 'none');
    const noRowitemsTr = $('#addCartItemsTable tbody tr.noitemsrow');
    console.log(noRowitemsTr);
    if (noRowitemsTr.length == 1) {
      noRowitemsTr.css('display', 'none');
    }
    const bookNowBtn = $('.book-submit-btn .btn');
    if (bookNowBtn.length == 1) {
      bookNowBtn.removeClass("diabledbookbtn");
      bookNowBtn.addClass("enabledbookbtn");
      const bookServiceError = $('.addCartError');
      bookServiceError.css('display', 'none');
    }

    $('#addCartItemsTable tbody').append(`<tr><td>${srNo}</td><td>${serviceName}</td><td>${price}</td></tr>`);

    srNo++;

    let total = 0;

    $("#addCartItemsTable tbody tr").each(function () {
      console.log('hi tr');
      if ($(this).hasClass("noitemsrow")) {
        return;
      }
      let price = parseFloat($(this).find("td").eq(2).text().replace("$", ""));
      total += price;
    });

    $("#addItemTotalAmount").text("$" + total.toFixed(2));

    let newIndex = 1;
    $("#addCartItemsTable tbody tr").each(function () {
      if ($(this).hasClass("noitemsrow")) {
        return;
      }
      $(this).find("td").eq(0).text(newIndex);
      newIndex++;
    });
  });


  let removesrNo = 1;

  $('.remove-to-cart-btn').on('click', function () {
    srNo = srNo - 1;
    const $removeBtn = $(this);
    console.log($removeBtn);
    const $row = $removeBtn.closest('tr');
    console.log($row);
    const serviceName = $row.find('.service-name').text().trim();
    console.log(serviceName);
    const price = $row.find('.service-price').text().trim();
    console.log(price);
    const addcartbtn = $row.find('.add-to-cart-btn');
    console.log(addcartbtn);
    const addbtnicon = $row.find('.add-btn-icon');
    console.log(addbtnicon);

    addcartbtn.css('display', 'inline-block');
    addbtnicon.css('display', 'inline-block');
    $removeBtn.css('display', 'none');

    $("#addCartItemsTable tbody tr").filter(function () {
      return $(this).find("td").eq(1).text().trim() === serviceName &&
        $(this).find("td").eq(2).text().trim() === price;
    }).first().remove();

    const rows = $("#addCartItemsTable tbody tr");
    let total = 0;
    if (rows.length === 1 && rows.hasClass("noitemsrow")) {
      rows.css("display", "table-row");
      const bookNowBtn = $('.book-submit-btn .btn');
      if (bookNowBtn.length == 1) {
        bookNowBtn.removeClass("enabledbookbtn");
        bookNowBtn.addClass("diabledbookbtn");
      }
      $("#addItemTotalAmount").text("$" + total.toFixed(2));
      return;
    }

    const bookNowBtnStatus = $('.book-submit-btn .btn');
    if (bookNowBtnStatus.length == 1 && bookNowBtnStatus.hasClass('enabledbookbtn')) {
      const bookServiceError = $('.addCartSuccess');
      bookServiceError.css('display', 'none');
    }

    $("#addCartItemsTable tbody tr").each(function () {
      if ($(this).hasClass("noitemsrow")) {
        return;
      }
      let price = parseFloat($(this).find("td").eq(2).text().replace("$", ""));
      total += price;
    });

    $("#addItemTotalAmount").text("$" + total.toFixed(2));

    let newIndex = 1;
    $("#addCartItemsTable tbody tr").each(function () {
      if ($(this).hasClass("noitemsrow")) {
        return;
      }
      $(this).find("td").eq(0).text(newIndex);
      newIndex++;
    });
  });

  const bookCartFormBtn = $('.book-submit-btn #bookNowButton');
  console.log(bookCartFormBtn);
  bookCartFormBtn.on('click', function () {
    const fullName = $('.book-full-name .bookfullnameservice').val().trim();
    const email = $('.booknowemail .bookemailservice').val().trim();
    const phoneNumber = $('.bookphoneNumber .bookphonenumberservice').val().trim();
    console.log(fullName);
    console.log(email);
    console.log(phoneNumber);
    let addCarttable = $("#addCartItemsTable").clone();
    addCarttable.find(".noitemsrow").remove();
    console.log(addCarttable);
    let getCartTableMarkup = addCarttable.prop("outerHTML");
    console.log(getCartTableMarkup);
    var templateParams = {
      title: 'Your Book to Cart Summary',
      fullname: fullName,
      email: email,
      phone: phoneNumber,
      cartTable: getCartTableMarkup
    };

    emailjs.send('service_ozghcsk', 'template_khv7qu3', templateParams).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        const bookNowBtnStatus = $('.book-submit-btn .btn');
        if (bookNowBtnStatus.length == 1 && bookNowBtnStatus.hasClass('enabledbookbtn')) {
          const bookServiceError = $('.addCartSuccess');
          bookServiceError.css('display', 'inline-block');
        }
      },
      (error) => {
        console.log('FAILED...', error);
      },
    );

    // var templateParams = {
    //   name: 'James',
    //   notes: 'Check this out!',
    // };

    // emailjs.send('service_eqzrwnu', 'template_khv7qu3', templateParams).then(
    //   (response) => {
    //     console.log('SUCCESS!', response.status, response.text);
    //   },
    //   (error) => {
    //     console.log('FAILED...', error);
    //   },
    // );
  });

});
