DESCRIPTIONDETAILSCONTROL = {
    LeftColumnDivClassHide: "divLeftHidden"

    , LeftColumnRelationsTitleID: "DescriptionDetailsControl_LabelAllRelationsSummary"
    , LeftColumnRelationsTitleDivID: "DescriptionDetailsControl_TreeViewRelations"
    , LeftColumnRelationsCookieName: "showRelationsCookieName"

    , LeftColumnHierarchyTitleID: "DescriptionDetailsControl_LabelTreeTitleDescriptionInfo"
    , LeftColumnHierarchyTitleDivID: "DescriptionDetailsControl_TreeViewDescriptionInfo"
    , LeftColumnHierarchyCookieName: "showHierarchyCookieName"
    
}

//document initialization
$(document).ready(function () {

    doResize(resizableLeft, null);
    

    $("#" + DESCRIPTIONDETAILSCONTROL.LeftColumnRelationsTitleID).click(function () { showLeftPanelDiv(DESCRIPTIONDETAILSCONTROL.LeftColumnRelationsTitleDivID, DESCRIPTIONDETAILSCONTROL.LeftColumnRelationsTitleID, DESCRIPTIONDETAILSCONTROL.LeftColumnRelationsCookieName); });

    if ($.cookie(DESCRIPTIONDETAILSCONTROL.LeftColumnRelationsCookieName) && $.cookie(DESCRIPTIONDETAILSCONTROL.LeftColumnRelationsCookieName) == "false")
        showLeftPanelDiv(DESCRIPTIONDETAILSCONTROL.LeftColumnRelationsTitleDivID, DESCRIPTIONDETAILSCONTROL.LeftColumnRelationsTitleID, DESCRIPTIONDETAILSCONTROL.LeftColumnRelationsCookieName);


    $("#" + DESCRIPTIONDETAILSCONTROL.LeftColumnHierarchyTitleID).click(function () { showLeftPanelDiv(DESCRIPTIONDETAILSCONTROL.LeftColumnHierarchyTitleDivID, DESCRIPTIONDETAILSCONTROL.LeftColumnHierarchyTitleID, DESCRIPTIONDETAILSCONTROL.LeftColumnHierarchyCookieName); });

    if ($.cookie(DESCRIPTIONDETAILSCONTROL.LeftColumnHierarchyCookieName) && $.cookie(DESCRIPTIONDETAILSCONTROL.LeftColumnHierarchyCookieName) == "false")
        showLeftPanelDiv(DESCRIPTIONDETAILSCONTROL.LeftColumnHierarchyTitleDivID, DESCRIPTIONDETAILSCONTROL.LeftColumnHierarchyTitleID, DESCRIPTIONDETAILSCONTROL.LeftColumnHierarchyCookieName);

    /**findCustomContent(YOUTUBE_TYPE,"AccessRestrict");**/

});


//shows or hides the provided div
function showLeftPanelDiv(divID, buttonID, cookieName) {

    var divCtrl = $("#" + divID);

    if (divCtrl.hasClass(DESCRIPTIONDETAILSCONTROL.LeftColumnDivClassHide)) {
        //Is collapsed
        divCtrl.removeClass(DESCRIPTIONDETAILSCONTROL.LeftColumnDivClassHide);
        divCtrl.slideDown();
        $.cookie(cookieName, true);
    }
    else {
        //Is expanded
        divCtrl.addClass(DESCRIPTIONDETAILSCONTROL.LeftColumnDivClassHide);
        divCtrl.slideUp();
        $.cookie(cookieName, false);
    }

}

/*CM_GUIMARÃES CUSTOM*/

var YOUTUBE_TYPE = 1;
var YOUTUBE_EXPRESSION = "";
var YOUTUBE_TRANSFORMATION = "<iframe width=\"560\" height=\"315\" src=\"%VALUE%\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";

function findCustomContent(contentType,field) {
    switch(contentType) {
        case YOUTUBE_TYPE:
            findYoutubeContent(field,YOUTUBE_EXPRESSION,YOUTUBE_TRANSFORMATION);
            break;
    }
}

function findYoutubeContent(field,expression,value) {
    var fieldSelector = ".DescriptionDetailsControl ." + field + " p";
    var field = $(fieldSelector);
    if(field.length > 0) {
        var url = field[0].innerText;
        IsValidURL(url,function(isValid) {
            if(isValid) {
                var valueHTML = value.replace("%VALUE%",url).replace("watch?v=","embed/");
                field.html(valueHTML);
            }
        });
    }
}

function IsValidURL(url,callback) {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    var result = 0;
    if (url.match(regex)) {
      result = 1;
    } else {
      result = 0;
    }
    callback(result);
}
