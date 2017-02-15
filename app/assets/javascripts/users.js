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
        submitBtn.val('Processing').prop('disabled', true);

    //Collect credit card information
      var ccNum = $('#card_number').val(),
          cvcNum = $('#card_code').val(),
          expMonth = $('#card_month').val(),
          expYear = $('#card_year').val();

    // Use stripe library to validate fields
      var error = false;
      
      //Validate card number
      if(!Stripe.card.validateCardNumber(ccNum)){
        error = true;
        alert('The credit card numbers appear to be invalid');
      }
      
      //Validate cvc
      if(!Stripe.card.validateCVC(cvcNum)){
        error = true;
        alert('The cvc numbers appear to be invalid');
      }
      
      //Validate expiration date
      if(!Stripe.card.validateExpiry(expMonth, expYear)){
        error = true;
        alert('The expiration date appears to be invalid');
      }
        
      if(error){
        
      //if there awre card errors dont send
      submitBtn.prop('disabled', false).val("Sign up");
  
      } else {
      //Send card info to Stripe
        Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      
      }, stripeResponseHandler);
    }

  });

  //Stripe will return a card token
    function stripeResponseHandler(status, response){
      //Get the token from the response
      var token = response.id;
    //Inject card token in a hidden field
      theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
      
    //Submit form to rails app  
      theForm.get(0).submit();
      
    }
  
  return false;
  
  
});