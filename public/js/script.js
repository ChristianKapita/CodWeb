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
  // 250 timer for smooth animation
  $("#home-btn").click(() => {
    $(".side-navs").hide(250);
    $("#dashboard").show(250);
    $("#mySidenav").css("width", "0px");
  });
  $("#explore-btn").click(() => {
    $(".side-navs").hide(250);
    $("#explore").show(250);
    $("#mySidenav").css("width", "0px");
    // $("#results").hide();
  });
  $("#messages-btn").click(() => {
    $(".side-navs").hide(250);
    $("#messages").show(250);
    $("#mySidenav").css("width", "0px");
  });
  $("#post-btn").click(() => {
    $(".side-navs").hide(250);
    $("#post").show(250);
    $("#mySidenav").css("width", "0px");
  });
  $("#profile-btn").click(() => {
    $(".side-navs").hide(250);
    $("#profile").show(250);
    $("#mySidenav").css("width", "0px");
  });
  $("#settings-btn").click(() => {
    $(".side-navs").hide(250);
    $("#settings").show(250);
    $("#mySidenav").css("width", "0px");
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
  $("#textarea").on("keypress paste", function (e) {
    if (this.innerHTML.length >= this.getAttribute("max")) {
      e.preventDefault();
      return false;
    }
  });
  // Theme Switcher
  let mode = "light";
  // Set mode dark or light mode at the start
  let dlMode = localStorage.getItem("mode");
  if (dlMode === "dark") {
    $("#theme-switch").prop("checked", true);
    dark();
  } else if (dlMode === "light") {
    light();
  } else {
    light();
  }
  function dark() {
    mode = "dark";
    $("body").attr("class", "dark");
    // Save user selection to Local Storage
    localStorage.setItem("mode", "dark");
  }
  function light() {
    mode = "light";
    $("body").attr("class", "light");
    // Save user selection to Local Storage
    localStorage.setItem("mode", "light");
  }
  //Event Listener for theme switcher.
  $("#theme-switch").click(() => {
    dlMode = localStorage.getItem("mode");
    // Switch from light to dark
    if (mode === "light") {
      dark();
    }
    else {
      // Switch from dark to light
      light();
    }
  });
  // Change password
  // $("#change-password").click(() => {

  // });
  // Random quotes API
  $.getJSON("https://api.quotable.io/random", (data) => {
    $("#apiquotes").html(
      `"${data.content}" <br />
      —${data.author} `);
  });
  // Explore repositories API
  $("#explore-api-button").click((e) => {
    e.preventDefault();
    exploreAPI();
  });

  function exploreAPI() {
    // Set required API queries 
    $("#results").html("");
    const search = $("#search").val().trim();
    const queryURL = "https://api.github.com/search/repositories?q=" + search + "&sort=created&order=desc&per_page=25";

    // Creating AJAX call for when the explore button is clicked.
    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json"
    }).then((data) => {
      // If no results return, send error message
      // eslint-disable-next-line camelcase
      if (data.total_count < 1) {
        const apierror = $("<h5>");
        apierror.addClass("alert");
        apierror.addClass("alert-danger");
        apierror.html("Error! No repositories found! ");
        $("#results").append("<br />");
        $("#results").append(apierror);
      }
      $("#results").append("<br />");
      // For Loop to display data
      $.each(data.items, (i) => {
        const apiusername = data.items[i].owner.login;
        const apirepository = data.items[i].name;
        const apicreated = data.items[i].created_at;
        const apistargazers = data.items[i].stargazers_count;
        const apiforks = data.items[i].forks;
        const apilinkuser = data.items[i].owner.html_url;
        const apilinkrepo = data.items[i].html_url;
        const apilanguage = data.items[i].language;
        // Create HTML blocks for the API and append to results
        const apiblock =
          `<div class="block" id="#api-block">
        <h2>
            <i class="fas fa-book"></i>
            <img src="${data.items[i].owner.avatar_url}" alt="img" class="mr-3 mt-3 rounded-circle">
            <a target="_blank" href="${apilinkuser}" >${apiusername}</a> /
            <a target="_blank" href="${apilinkrepo}" >${apirepository}</a>
        </h2>
        <i class="far fa-star"></i> ${apistargazers} | 
        <i class="fas fa-code-branch"></i> ${apiforks} | 
        <i class="fas fa-code"></i> ${apilanguage} <br />
        <small><i><i class="far fa-clock"></i> Created: ${apicreated.split("T").join(" || ")}</i></small>
    </div>`;
        $("#results").append(apiblock);
      });
    }).catch((error) => {
      // Show error message if anything goes wrong
      if (error) {
        const apierror = $("<h5>");
        apierror.addClass("alert");
        apierror.addClass("alert-danger");
        apierror.html("Error! No repositories found! ");
        $("#results").append(apierror);
      }
    });
  }
});
