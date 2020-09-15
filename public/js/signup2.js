
// ======== for sign up form ========


$(document).ready(() => {

  // Getting references to our form and input
  const signUpForm = $("#signup-button");
  const emailInputSignup = $("#email-input-signup");
  const passwordInputSignup = $("#password-input-signup");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("click", event => {

    event.preventDefault();
    console.log('does this work');
    const userData = {
      email: emailInputSignup.val().trim(),
      password: passwordInputSignup.val().trim()
    };

    console.log("userData", userData)

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInputSignup.val("");
    passwordInputSignup.val("");
  })
  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/mainblog");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});



// ---- LOGIN HANDLER -------->>//
$("#login-button").on("click", event => {

  event.preventDefault();
  console.log('does this login work');
  const userData = {
    email: $("#email-input-login").val().trim(),
    password: $("#password-input-login").val().trim()
  };

  console.log("userData", userData)

  if (!userData.email || !userData.password) {
    return;
  }
  // If we have an email and password, run the signUpUser function
  $.post("/api/login", userData)
    .then(() => {
      window.location.replace("/mainblog");
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(()=>
    console.log("Login failed")
    ); 
  $("#email-input-login").val("");
  $("#password-input-login").val("");
})




// =========== for sign up form button styling ==============
//loader
function MBC(element, heightIndentation, widthIndentation) {
  var ele = element;
  console.log(ele);
  var IW = widthIndentation;
  var IH = heightIndentation;
  if (IH === undefined || IH === null) { IH = 0 };
  if (IW === undefined || IW === null) { IW = 0 };
  var EW = $(ele).width() / 2;
  var EH = $(ele).height() / 2;
  if (IW == 0 && IH == 0) {
    document.querySelector(ele).style.top = Math.round((screen.height / 2) - EH) + 'px';
    document.querySelector(ele).style.left = Math.round((screen.width / 2) - EW) + 'px';
  } else {
    var queryS = document.querySelector(ele);
    queryS.style.position = "absolute";
    queryS.style.left = IW - EW + 'px';
    queryS.style.top = IH - EH + 'px';
    //http://stackoverflow.com/questions/6802956/how-to-position-a-div-in-a-specific-coordinates
  }
}
var HI = 49
var WI = 90
MBC('#loadLineleft', HI, WI);
MBC('#line', HI, WI);
for (i = 0; i < 7; i++) {
  MBC("#a" + i, HI - 4, WI + 100)
}

$(window).resize(function () {
  MBC('#loadLineleft', HI, WI);
  MBC('#line', HI, WI);
  for (i = 0; i < 7; i++) {
    MBC("#a" + i, HI - 4, WI + 100)
  }
});

//setup black 'fake' background
document.querySelector('#back').style.marginTop = Math.round((-screen.height) / 2) + 'px';
document.querySelector('#back').style.marginLeft = Math.round((-screen.width) / 2) + 'px';
document.querySelector('#back').style.width = Math.round(screen.width + 1000) + 'px';
document.querySelector('#back').style.height = Math.round(screen.height + 1000) + 'px';

//***************************************

//timer fade out animation caller, delayed for 2 seconds
window.setTimeout("fadeLoader()", 2000)

//loader fader
function fadeLoader() {
  //fader for text
  $(".button").fadeOut();
  //fader for bars
  $(".bar").fadeOut();
  //500ms(0.5s) delayed fader for fake background
  $("#back").delay(500).fadeOut();
}

//---------------------------------------------------------

//set all variables up respectively
var button = $('.run button');
var L = 0;
var R = 0;
var B = 0;
msieversion = 'error';
tridentVersion = 'error'; //there's a more efficent way of doing this, but I forgot the method.
edgeversion = 'error';
var version = detectIE();

//detects if on IE or not, has been edited. Originally from: https://codepen.io/gapcode/pen/vEJNZN?editors=0010#0, slightly edited
function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    msieversion = "true"
  } else {
    // other browser
    msieversion = 'false'
    //return 'false';
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    tridentVersion = 'true'
    // IE 11 => return version number
  } else {
    if (msie < 0) {
      //if (edge < 0) {
      tridentVersion = 'false'
      //return 'false';
      //}
    }
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    edgeversion = 'true'
  } else {
    // other browser
    if (trident < 0) {
      if (msie < 0) {
        edgeversion = 'false'
        //return 'false';
      }
    }
  }
  console.log('IE check:', msieversion);
  console.log('Trident check:', tridentVersion);
  console.log('edge check:', edgeversion);
  if (msieversion === 'false') {
    check = 0
  } else {
    check = 1
  }
  if (tridentVersion === 'false') {
    check = 0
  } else {
    check = 1
  }
  if (edgeversion === 'false') {
    check = 0
  } else {
    check = 1
  }
  //false is = to 0, true is = to 1. Checks if; not using IE (0) e.g. firefox or GC is 1.
}

//fade everything out that isn't needed at startup, load page.
$("#SignUpA").fadeOut();
if (check == 1) {
  $('.table').toggleClass('IE');
  $(".table.IE").fadeOut();
}

//IE LOGIN animation
if (check == 1) {
  $(function () {
    $("#interact").on('click', function () {
      $('.sign_up').prop('disabled', true);
      $('.login').prop('disabled', true);
      $('.TableBack').prop('disabled', false);
      B = 0
      L++
      if (L == 2 || L > 2) {
        $('.run').toggleClass('active');
      }
      $(".run").toggleClass('back', false);
      //console.log(L);
      $("#fadeout").delay(0).fadeOut();
      $('.run').toggleClass('active');
      setTimeout('$("table").fadeIn();', 1600);
      //IE doesn't support toggleClass on tables, also use setTimeout and not .delay when working with IE. .delay carries its delay time over even when the reffered variable is reset or toggled
      //console.log('running !=')
      setTimeout('$(".TableBack").fadeIn();', 1600);
    });
  });
}

if (check == 0) {
  //LOGIN animation
  $(function () {
    $("#interact").on('click', function () {
      $('.sign_up').prop('disabled', true);
      $('.login').prop('disabled', true);
      $('.TableBack').prop('disabled', false);
      B = 0
      //on click (of button with id'interact') run;
      L++
      if (L == 2 || L > 2) {
        $("#fadeout").fadeOut.stop(true, false); //wrong syntax, but works better with wrong syntax
        $('.run').toggleClass('active');
      }
      //fixing a bug with a bug like a boss, stops the fade out animation and forces the .run animation to continue
      $(".run").toggleClass('back', false);
      //REMOVES .back from .run so it is no longer .run.back and is now only .run that is toggled
      $("#fadeout").fadeOut();
      //fades everything (except top text) out
      $('.run').toggleClass('active');
      //play animation to move title to top from middle
      $('.table').toggleClass('active');
      //fade table in
      $(".TableBack").delay(1400).fadeIn();
      //fade tables' BACK button in
      /*thanks to Srikar G. for their pen over at "https://codepen.io/srikarg/pen/KeswC"*/
    });
  });
}


//sign up animation
function SignUp() {
  //console.log('running animation S');
  $("#fadeout").fadeOut();
  $(".welcome").fadeOut();
  $("#SignUpA").delay(500).fadeIn();
}

//sign up button disable self and enable backsignup button on click before animations starts
$(function () {
  $(".sign_up").on('click', function () {
    $('.sign_up').prop('disabled', true);
    $('.Back').prop('disabled', false);
  });
});
//http://stackoverflow.com/questions/13831601/disabling-and-enabling-a-html-input-button

//back button for sign up page animation
function Back() {
  //console.log("backing up")
  $("#SignUpA").fadeOut();
  $(".run").delay(500).fadeIn();
  $(".welcome").delay(500).fadeIn();
  $("#fadeout").delay(500).fadeIn();
}

//back button disable self and enable signup button on click before animation starts
$(function () {
  $(".Back").on('click', function () {
    $('.sign_up').prop('disabled', false);
    $('.Back').prop('disabled', true);
  });
});

$(".TableBack").fadeOut();
//setup back buton to start faded out

//back button for the table
function TableBack() {
  $('.sign_up').prop('disabled', false);
  $('.login').prop('disabled', false);
  $('.TableBack').prop('disabled', true);
  B++
  //checks if not running on IE/Edge
  if (check == 0) {
    if (B == 2 || B > 2) {
      //half works
      console.log(B);
      $(".run").stop(true, false).toggleClass('back');
    }
    //this fades the login page back in
    setTimeout('$("#fadeout").fadeIn();', 1400)
    //prepares run
    $('.run').toggleClass('active', false);
    //fades the table out BACK TO DEFAULT, partially from W3schools example
    $('.table').toggleClass('active', false);
    //fades the back button back out, sets back to default .table
    $(".TableBack").fadeOut();
  }
  //moves the login screen back down
  $(".run").toggleClass('back');
  //if on IE dont use toggle class method for table animation
  if (check == 1) {
    if (B == 2 || B > 2) {
      console.log(B);
      $(".run").stop(true, false).toggleClass('back');
    } //deprecated, use disable button
    $("#fadeout").delay(300).fadeIn();
    //fades everything back in (except top text)
    $('.run').delay(300).toggleClass('active', false);
    //fades the table out BACK TO DEFAULT, partially from W3schools example
    $("table").fadeOut();
    //fades out table
    $(".TableBack").fadeOut();
    //console.log('running !=')
  }
  //resets the amount of times the login button was pressed
  L = 0
}
