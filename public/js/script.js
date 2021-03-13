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
  $(".boldText").click(() => {
    document.execCommand("bold");
    $("<b>").append("#textarea");
  });
  $(".italicText").click(() => {
    document.execCommand("italic");
  });
  $(".underlineText").click(() => {
    document.execCommand("underline");
  });
  $("#cleartext").click(() => {
    $("#textarea").html("");
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
  // Post maxcontent properties
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

  $("#submit-post").click((event) => {
    event.preventDefault();
    const test1 = $("#textarea").text();
    const test2 = $("#userid").text();
    const newPost = {
      UserId: test2,
      content: test1
    };
    $.post("/api/posts", newPost, () => {
      location.href = "/dashboard";
    });
  });
  function displayAllPosts() {
    // Get all posts from json
    $.ajax({
      url: "/api/displayPosts",
      method: "GET"
    }).then((data) => {
      // For Loop to display posts data
      $.each(data, (i) => {
        const postfirstname = data[i].User.firstName;
        const postlastname = data[i].User.lastName;
        const postusername = data[i].User.username;
        const postcontent = data[i].content;
        const postprofilepicture = data[i].User.defaultImage;
        const postcreatedat = data[i].createdAt;
        // Create HTML blocks for the posts and append to home posts
        const postblock =
          `<div class="block" id="#post-block">
        <img src="${postprofilepicture}" alt="profile-picture" class="mr-3 mt-3 rounded-circle">
        <h2>${postfirstname} ${postlastname} 
        <a href="#" class="username">@${postusername}</a>
        </h2>
        <p id="overflow">${postcontent}</p>
        <small><i><i class="far fa-clock"></i> Created: ${postcreatedat.split("T").join(" || ")}</i></small>
        </div>`;
        $("#all-posts").prepend(postblock);
      });
    }).catch((error) => {
      // Show error message if anything else goes wrong
      if (error) {
        const posterror = $("<h5>");
        posterror.addClass("alert");
        posterror.addClass("alert-danger");
        posterror.html("Error! No posts found! ");
        $("#all-posts").append(posterror);
      }
    });
  }
  // Invoke function to display all posts on home page upon page load
  displayAllPosts();

  function profilePosts() {
    // Get all posts from json
    const id = $("#userid").text();
    $.ajax({
      url: "/api/profilePosts/" + id,
      method: "GET"
    }).then((data) => {
      console.log(data);
      console.log("Hello from inside");
      // For Loop to display posts data
      $.each(data, (i) => {
        const userpostfirstname = data[i].User.firstName;
        const userpostlastname = data[i].User.lastName;
        const userpostusername = data[i].User.username;
        const userpostcontent = data[i].content;
        const userpostprofilepicture = data[i].User.defaultImage;
        const userpostcreatedat = data[i].createdAt;
        // Create HTML blocks for the posts and append to home posts
        const userpostblock =
        `<div class="block" id="#post-block">
        <img src="${userpostprofilepicture}" alt="profile-picture" class="mr-3 mt-3 rounded-circle">
        <h2>${userpostfirstname} ${userpostlastname} 
        <a href="#" class="username">@${userpostusername}</a>
        </h2>
        <p id="overflow">${userpostcontent}</p>
        <small><i><i class="far fa-clock"></i> Created: ${userpostcreatedat.split("T").join(" || ")}</i></small>
        </div>`;
        $("#profile-posts").prepend(userpostblock);
      });
    }).catch((error) => {
      // Show error message if anything else goes wrong
      if (error) {
        const posterror = $("<h5>");
        posterror.addClass("alert");
        posterror.addClass("alert-danger");
        posterror.html("Error! No posts found! ");
        $("#profile-posts").append(posterror);
      }
    });
  }
  profilePosts();
  // End jQuery
});

// $("#change-password-submit").click((event)=>{
//   event.preventDefault();
//   const oldPWD = $("#old-password").val().trim();
//   alert(oldPWD);
// });
