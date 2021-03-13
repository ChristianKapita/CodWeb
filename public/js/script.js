/* eslint-disable prettier/prettier */
// Document ready function jQuery
$(() => {
  // Adds country list from json file to dropdown menu
  let countryOptions;
  $.getJSON("/public/js/countries.json", result => {
    $.each(result, (i, country) => {
      //HTML syntax: <option value="countryname">contryname</option>
      countryOptions += "<option value='" + country.name + "'>" + country.name + "</option>";
    });
    $("#country").html(countryOptions);
  });

  // Submit login to dashboard
  $("#log-out-btn").click(() => {
    location.href = "/";
  });
  // Go to sign-up page
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
  $("#change-password-form").hide();
  $("#delete-account-form").hide();
  $("#edit-profile-form").hide();
  $("#profile-picture-url").hide();
  $("#change-picture-button").hide();
  $("#change-picture").hide();
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
  // Bold, Italic, Underline , Clear
  $("#cleartext").click(() => {
    $("#textarea").html("");
  });
  $(".boldText").click(() => {
    document.execCommand("bold");
  });
  $(".italicText").click(() => {
    document.execCommand("italic");
  });
  $(".underlineText").click(() => {
    document.execCommand("underline");
  });
  // Spell Check button
  $("#eye").hide();
  $("#spell-check").click(() => {
    switch ($("#textarea").attr("spellcheck")) {
    case "true":
      $("#textarea").removeAttr("spellcheck", "true");
      $("#eye").hide();
      $("#eye-slash").show();
      console.log("hey");
      $("#textarea").attr("spellcheck", "false");
      break;
    case "false":
      $("#textarea").removeAttr("spellcheck", "false");
      $("#eye").show();
      $("#eye-slash").hide();
      console.log("oh hey");
      $("#textarea").attr("spellcheck", "true");
      break;
    }
  });
  $("div[contenteditable='true'][maxlength]").on("keyup paste", function (event) {
    const cntMaxLength = parseInt($(this).attr("maxlength"));

    if ($(this).text().length >= cntMaxLength && event.keyCode !== 8 &&
      event.keyCode !== 37 && event.keyCode !== 38 && event.keyCode !== 39 &&
      event.keyCode !== 40) {

      event.preventDefault();

      $(this).html((i, currentHtml) => {
        return currentHtml.substring(0, cntMaxLength - 1);
      });
    }
  });
  // Input field no spaces
  $(".nospace").keydown((e) => {
    if (e.keyCode === 32) {
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
  // Change Password
  $("#change-password").click(() => {
    $("#change-password-form").show(250);
    $("#delete-account-form").hide(250);
  });
  $("#close-password-btn").click(() => {
    $("#change-password-form").hide(250);
  });
  // Delete Account
  $("#delete-account").click(() => {
    $("#delete-account-form").show(250);
    $("#change-password-form").hide(250);
  });
  $("#close-delete-btn").click(() => {
    $("#delete-account-form").hide(250);
  });
  // Edit Profile
  $("#edit-profile").click(() => {
    $("#user-data").hide(250);
    $("#edit-profile-form").show(250);
    $("#change-picture").show(250);
    $("#edit-profile").hide(250);
  });
  $("#close-edit-profile").click(() => {
    $("#user-data").show(250);
    $("#edit-profile-form").hide(250);
    $("#change-picture").hide(250);
    $("#profile-picture-url").hide(250);
    $("#change-picture-button").hide(250);
    $("#edit-profile").show(250);
  });
  // Change Profile Picture
  $("#change-picture").click(() => {
    $("#profile-picture-url").show(250);
    $("#change-picture-button").show(250);
  });
  // Random quotes API
  $.getJSON("https://api.quotable.io/random", (data) => {
    $("#apiquotes").html(
      `"${data.content}" <br />
      — ${data.author} `);
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
      // For Loop to display repositories data
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
      // Show error message if anything else goes wrong
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

$("#submit-post").click((event) => {
  event.preventDefault();
  const test1=$("#textarea").text();
  const test2=$("#userid").text();
  // alert(test2 + " " + test1);
  const newPost={
    UserId: test2,
    content: test1
  };

  $.post("/api/posts",newPost, () => {
    location.href="/dashboard";
    
    console.log("testing");
  });
});

$("#change-password-submit").click((event)=>{
  event.preventDefault();
  const oldPassword = $("#old-password").val().trim();
  const newPassword=$("#password").val().trim();
  const confirmPassword=$("#confirm-password").val().trim();
  if(!oldPassword || !newPassword || !confirmPassword){
    const msg ="Please fill all the fields";
    $("#msg").text(msg);
  }
  else if (newPassword!== confirmPassword)
  {
    const msg ="New password and confirm password are not macthing";
    $("#msg").text(msg);
  }
});
