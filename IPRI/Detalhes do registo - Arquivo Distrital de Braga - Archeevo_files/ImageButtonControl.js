lang = {
    pt: {
        buttonShowMore: 'Mostrar mais',
        buttonShowLess: 'Mostrar menos'
    },
    en: {
        buttonShowMore: 'Show more',
        buttonShowLess: 'Show less'
    }
}

var MAX_HEIGHT_FACETS = 220
var DIFF_MIN = 1;

$(document).ready(function () {
    init_buttonMoreAndLess();
});

function init_buttonMoreAndLess() {
    var lessMore = $(".facetControl-main");

    $.each(lessMore, function (index, val) {
        //if ($(val).find(".facetControl-options").height() < MAX_HEIGHT_FACETS) {
        if ($(val).height() < MAX_HEIGHT_FACETS || Math.abs($(val).height() - MAX_HEIGHT_FACETS) < DIFF_MIN) {
            $(val).find(".facetControl-btn").hide();
        }
    });
}

function myAlert(message) {
    alert(message);
    return true;
}

function confirm_click(message) {
    //alert('confirm_click(' + message + ')');
    if (message != null && message != '') {
        return confirm(message);
    } 
    else {
        return true;
    }
}

function provokeClickButton(buttonid) {

    //alert('provokeClickButton(' + buttonid + ')');

    var continueProcessingEvent = false;
    
    var bt = document.getElementById(buttonid);
    
    if (bt) {
        bt.click();
        continueProcessingEvent = false;
    } else {
        continueProcessingEvent = true;
    }
    
    return continueProcessingEvent;
}

/*
* Clicks the specified button.
*/
function clickButton(e, buttonid) {

    var evt = e ? e : window.event;

    var bt = document.getElementById(buttonid);

    var continueProcessingEvent = false;

    if (bt) {
        if (evt.keyCode == 13) {
            bt.click();
            continueProcessingEvent = false;
        } else {
            continueProcessingEvent = true;
        }
    } else {
        continueProcessingEvent = true;
    }

    return continueProcessingEvent;
}

/*
*

 show more or less
*/
function ShowMoreLess(divID,buttonID) {
    /// do some AJAX with JQuery or any other library
    //alert("Teste" + divID);
    var languageCode = $('html').attr('lang');

    var maxHeight = MAX_HEIGHT_FACETS;
    var totalHeight = 0;

    $(divID).children().each(function () {
        totalHeight += $(this).outerHeight(true);
    });

    var timeToAnimate = ((totalHeight / MAX_HEIGHT_FACETS) - 1) * 1000;
    timeToAnimate = Math.min(timeToAnimate, 1000)

    if (totalHeight > MAX_HEIGHT_FACETS) {

        if ($(divID).hasClass('FacetControl')) {
            $(divID).height(MAX_HEIGHT_FACETS);
            $(divID).removeClass('FacetControl');
            $(divID).animate({
                height: totalHeight + "px",
            }, timeToAnimate, function () {
                $(buttonID).val(lang[languageCode].buttonShowLess);
            });
        } else {
            var height_str = MAX_HEIGHT_FACETS + "px";
            $(divID).animate({
                height: height_str,
            }, timeToAnimate, function () {
                $(divID).addClass('FacetControl');
                $(buttonID).val(lang[languageCode].buttonShowMore);
            });
        }
    }

    //$(divID).toggleClass("FacetControl", 5000, "easeOutSine");

    // you can add some processing to the AJAX call
    return false;
}

function Load_FacetControl(buttonID) {
    var languageCode = $('html').attr('lang');

    $(buttonID).val(lang[languageCode].buttonShowMore)
}

