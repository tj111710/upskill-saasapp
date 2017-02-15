/* global $ */
/* global Stripe */

/*document ready function*/
$(document).on('turbolinks:load', function() {

  var theForm = $('pro_form');
  var submitBtn = $('form-signup-btn');
  //   set stripe public key
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  // When user clicks form submit button
    submitBtn.click(function(event) {
  //prevent default submission behaviro
    event.preventDefault();  

  //Collect credit card information
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
  
  //Send card info to Stripe
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
      
    }, stripeResponseHandler);

  });
  //Stripe will return a card token
    
  
  //inject response as hidden field
  
  //Submit form to rails app

});