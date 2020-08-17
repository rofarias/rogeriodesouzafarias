
var resizableLeft, resizableRight;

$(document).ready(function () {

    resizableLeft = $(".resizableLeft");
    resizableRight = $(".resizableRight");

    resizableLeft.resizable({
        handles: 'e',
        minWidth: '50',
        maxWidth: '700',
        resize: function () {
            doResize(this, null);
        }
    });

    resizableLeft.css("min-height", resizableRight.css("height"));
    resizableRight.css("min-height", resizableLeft.css("height"));

    //var currentSplitPos = $.cookie("divTwoWidth");
    var currentSplitPos = $.cookie("detailsLeftWidth");
    if (currentSplitPos)
        doResize(resizableLeft, currentSplitPos);

});


/**
    This is where the magic happens!!!      
**/
function doResize(obj, width) {

    var marginSpace = 15;

    var divRight = $(obj).next();

    // For bootstrap rendering
    if ($(window).width() >= 768) {

        if (width) {

            if (width >= $(obj).parent().width() - 50)
                width = $(obj).parent().width() - 50;

            $(obj).width(width);
            divRight.width($(obj).parent().width() - width);
        }
        else {
            //var remainingSpace = $(obj).parent().width() - $(obj).outerWidth();
            var remainingSpace = $(window).width() - $(obj).outerWidth();
            var divRightWidth = remainingSpace - (divRight.outerWidth() - divRight.width());

            divRight.width(divRightWidth - marginSpace);
            $.cookie("divRightWidth", divRightWidth);
            $.cookie("detailsLeftWidth", $(obj).width());
        }

       // resizableLeft.css("min-height", resizableRight.css("height"));
       // resizableRight.css("min-height", resizableLeft.css("height"));

    }
    else {
        divRight.width($(window).width() - marginSpace)

        resizableLeft.css("min-height", "0");
        resizableRight.css("min-height", "0");

    }
}


$(window).bind('resize', function (event) {
    doResize(resizableLeft, null); 
});



/* Next functions are to wait for the resize end event, and force the window.resize */
var id;
$(window).resize(function () {
    clearTimeout(id);
    id = setTimeout(doneResizing, 500);
});

function doneResizing() {
    doResize(resizableLeft, null); 
}