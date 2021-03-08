/* eslint-disable prettier/prettier */
$(() => {
  // Adds country list from json file to dropdown menu in sign-up
  let countryOptions;
  $.getJSON("/public/js/countries.json", result => {
    $.each(result, (i, country) => {
      //<option value="countrycode">contryname</option>
      countryOptions += "<option value='" + country.code + "'>" + country.name + "</option>";
    });
    $("#country").html(countryOptions);
  });

  // Submit login
  $("#log-out-btn").click(() => {
    location.href = "/";
  });
  // Go to sign-up
  $("#sign-up").click(() => {
    location.href = "/sign-up";
  });
  // Submit sign-up (requires validation)
  $("#sign-up-submit").click(() => {
    location.href = "/dashboard";
  });
  // Return to login page
  $("#login").click(() => {
    location.href = "/";
  });

  // Hide/Show navigation tab on user click in dashboard
  $("#open-nav").click(() => {
    $("#mySidenav").css("width", "250px");
  });
  $(".close-btn").click(() => {
    $("#mySidenav").css("width", "0px");
  });

  // Hide/Show sections based on user nav selection in dashboard
  // Hide all and only show dashboard upon page load
  $(".side-navs").hide();
  $("#dashboard").show();
  // Hide all and only show user selection
  // 500 timer for smooth animation
  $("#home-btn").click(() => {
    $(".side-navs").hide(500);
    $("#dashboard").show(500);
  });
  $("#explore-btn").click(() => {
    $(".side-navs").hide(500);
    $("#explore").show(500);
  });
  $("#messages-btn").click(() => {
    $(".side-navs").hide(500);
    $("#messages").show(500);
  });
  $("#post-btn").click(() => {
    $(".side-navs").hide(500);
    $("#post").show(500);
  });
  $("#profile-btn").click(() => {
    $(".side-navs").hide(500);
    $("#profile").show(500);
  });
  $("#settings-btn").click(() => {
    $(".side-navs").hide(500);
    $("#settings").show(500);
  });
  // Bold, Italic, Underline text
  $(".boldText").click(() => {
    $("#textarea").toggleClass("bold");
  });
  $(".italicText").click(() => {
    $("#textarea").toggleClass("italic");
  });
  $(".underlineText").click(() => {
    $("#textarea").toggleClass("underline");
  });
});
