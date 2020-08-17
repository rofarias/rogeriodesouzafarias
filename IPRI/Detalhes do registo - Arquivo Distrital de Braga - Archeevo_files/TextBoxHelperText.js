
/**
 * Update the text and class of a text input depending on the presence of text.
 */
function OnBlur(elem, blurValue, blurCssClass, normalCssClass) {

    if (elem != null) {
        if (elem.value.length == 0) {
            elem.value = blurValue;
            elem.className = normalCssClass + " " + blurCssClass;
        } else {
            elem.className = normalCssClass;
        }
    } else { 
        // element not found
    }
    
}

function OnFocus(elem, blurValue, normalCssClass) {

    if (elem != null) {
        if (elem.value == blurValue) {
            elem.value = '';
            elem.className = normalCssClass;
        } else {
            elem.className = normalCssClass;
        }
    } else {
        // element not found
    }

}

/*
function OnSubmit(inputElemIDs, emptyValues, blurCssClass, normalCssClasses) {

    var i=0;
    for (i = 0; i < inputElemIDs.length; i++) {
        
        var elem = document.getElementById(inputElemIDs[i]);

        if (elem != null && elem.value == emptyValues[i]) {
            elem.value = '';
        }
    }
    
}

function OnLoad(inputElemIDs, emptyValues, blurCssClass, normalCssClasses) {

    var i = 0;
    for (i = 0; i < inputElemIDs.length; i++) {

        var elem = document.getElementById(inputElemIDs[i]);

        if (elem != null) {
            if (elem.value == '') {
                //elem.value = emptyValues[i];
                //elem.className = normalCssClasses[i] + " " + blurCssClass;
            } else {
                elem.className = normalCssClasses[i];
            }
        }
    }

}
*/

