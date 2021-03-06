$(function () {
    // Adds country list from json file to dropdown menu in sign-up
    var countryOptions;
    $.getJSON("/public/js/countries.json", function (result) {
        $.each(result, function (i, country) {
            //<option value="countrycode">contryname</option>
            countryOptions += "<option value='" + country.code + "'>" + country.name + "</option>";
        });
        $("#country").html(countryOptions);
    });

    // Submit login
    // $("#login").click(function (e) {
    //     e.preventDefault();
    //     location.href = "/public/dashboard.html";
    // });
    // // Submit sign-up
    // $("#sign-up").click(function (e) {
    //     e.preventDefault();
    //     location.href = "/public/dashboard.html";
    // });
    
    // Hide/Show navigation tab on user click in dashboard
    $("#open-nav").click(function () {
        $("#mySidenav").css("width", "250px");
    })
    $(".close-btn").click(function () {
        $("#mySidenav").css("width", "0px");
    })

    // Hide/Show sections based on user nav selection in dashboard
    // Hide all and only show dashboard upon page load
    $(".side-navs").hide();
    $("#dashboard").show();
    // Hide all and only show user selection
    // 1000 timer for smooth animation
    $("#home-btn").click(function () {
        $(".side-navs").hide(1000);
        $("#dashboard").show(1000);
    });
    $("#explore-btn").click(function () {
        $(".side-navs").hide(1000);
        $("#explore").show(1000);
    });
    $("#messages-btn").click(function () {
        $(".side-navs").hide(1000);
        $("#messages").show(1000);
    });
    $("#post-btn").click(function () {
        $(".side-navs").hide(1000);
        $("#post").show(1000);
    });
    $("#profile-btn").click(function () {
        $(".side-navs").hide(1000);
        $("#profile").show(1000);
    });
    $("#settings-btn").click(function () {
        $(".side-navs").hide(1000);
        $("#settings").show(1000);
    });





});


