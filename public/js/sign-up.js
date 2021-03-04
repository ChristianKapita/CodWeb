$(function () {
    var countryOptions;
    $.getJSON("/public/js/countries.json", function (result) {
        $.each(result, function (i, country) {
            //<option value='countrycode'>contryname</option>
            countryOptions += "<option value='" + country.code + "'>" + country.name + "</option>";
        });
        $("#country").html(countryOptions);
    });
});