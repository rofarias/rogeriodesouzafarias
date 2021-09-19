


/* Use this file to add customized JS for all pages */

$(document).ready(function () {
    removeAttributesFromTable();
    
    //Force to create cookie
    $(".HyperLinkFlag").click(function() {
       document.cookie="currentSelectedCulture=;path=/"; 
    });

    $(".show-more-less-trigger").click(function () {

        $(".show-more-less-target").slideDown("slow", function () {
            $(".show-more-less-target-display");
        });

        $(this).hide();
    });
});

// removes obsolete attributes from tables that fails accessibility
function removeAttributesFromTable() {

    var tables = document.getElementsByTagName("table");

    if (tables !== null) {
        for (i = 0; i < tables.length; i++) {
            tables[i].removeAttribute("cellpadding");
            tables[i].removeAttribute("cellspacing");
            tables[i].removeAttribute("summary");
        }
    }

}
