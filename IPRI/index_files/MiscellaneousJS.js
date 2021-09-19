

function depositYesButtonClicked(reportURL, windowTitle, windowParams) {

    var continueProcessingEvent = false;

    var bt = document.getElementById('DepositControl_ImageButtonYes_ButtonImage');

    if (bt) {
        bt.click();
        continueProcessingEvent = true;
    } else {
        continueProcessingEvent = false;
    }

    if (continueProcessingEvent == true) {
        window.open(reportURL, windowTitle, windowParams);
    }

    return false;

}


function openControlledVocabularyTermsSelectionPopUpWindow(control, title, width, height, controlledVocabularyIdentifiers, selectTermsControlToUpdateGUID, selectTermsGUID, singleValue) {

    var form = 'SelectControlledVocabularyTermsForm.aspx?controlledVocabularies=' + controlledVocabularyIdentifiers
        + '&selectTermsControlToUpdateGUID=' + selectTermsControlToUpdateGUID
        + '&selectTermsGUID=' + selectTermsGUID
        + '&singleValue=' + singleValue;
    
    retVal = popupwindow(form, title, width, height);
    return false;

}

function updateSelectedTerms(selectedTerms, controlToUpdate) {
    //window.opener.document.getElementById(controlToUpdate).innerHTML = selectedTerms;
    window.opener.document.getElementById(controlToUpdate).value = selectedTerms;
    window.close();
    return false;
}


function openFondsSelectionPopUpWindow(control, title, width, height, selectFondsControlToUpdateGUID, selectFondsGUID) {

    var form = 'SelectFondsForm.aspx?selectFondsControlToUpdateGUID=' + selectFondsControlToUpdateGUID
        + '&selectFondsGUID=' + selectFondsGUID;

    retVal = popupwindow(form, title, width, height);
    return false;
}

function openAssociationWindow(control, title, type, objectID, width, height) {
    var form = 'AbstractAssociationForm.aspx?objectID=' + objectID + "&type=" + type;

    retVal = popupwindow(form, title, width, height);

    return false;
}

function updateSelectedFonds(selectedFonds, controlToUpdate) {

    //window.opener.document.getElementById(controlToUpdate).innerHTML = selectedFonds;
    window.opener.document.getElementById(controlToUpdate).value = selectedFonds;
    window.close();
    return false;
}


function popupwindow(url, title, w, h) {
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
} 
