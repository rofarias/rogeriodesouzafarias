///**
//* Search Engine Keyword Highlight (http://fucoder.com/code/se-hilite/)
//*
//* This module can be imported by any HTML page, and it would analyse the
//* referrer for search engine keywords, and then highlight those keywords on
//* the page, by wrapping them around <span class="hilite">...</span> tags.
//* Document can then define styles else where to provide visual feedbacks.
//*
//* Usage:
//*
//*   In HTML. Add the following line towards the end of the document.
//*
//*     <script type="text/javascript" src="se_hilite.js"></script>
//*
//*   In CSS, define the following style:
//*
//*     .hilite { background-color: #ff0; }
//*
//*   If Hilite.style_name_suffix is true, then define the follow styles:
//*
//*     .hilite1 { background-color: #ff0; }
//*     .hilite2 { background-color: #f0f; }
//*     .hilite3 { background-color: #0ff; }
//*     .hilite4 ...
//*
//* @author Scott Yang <http://scott.yang.id.au/>
//* @version 1.5
//*/

//// Configuration:
//Hilite = {
//    /**
//    * Element ID to be highlighted. If set, then only content inside this DOM
//    * element will be highlighted, otherwise everything inside document.body
//    * will be searched.
//    */
//    elementid: 'content',

//    /**
//    * Whether we are matching an exact word. For example, searching for
//    * "highlight" will only match "highlight" but not "highlighting" if exact
//    * is set to true.
//    */
//    exact: true,

//    /**
//    * Maximum number of DOM nodes to test, before handing the control back to
//    * the GUI thread. This prevents locking up the UI when parsing and
//    * replacing inside a large document.
//    */
//    max_nodes: 1000,

//    /**
//    * Whether to automatically hilite a section of the HTML document, by
//    * binding the "Hilite.hilite()" to window.onload() event. If this
//    * attribute is set to false, you can still manually trigger the hilite by
//    * calling Hilite.hilite() in Javascript after document has been fully
//    * loaded.
//    */
//    onload: true,

//    /**
//    * Name of the style to be used. Default to 'hilite'.
//    */
//    style_name: 'hilite',

//    /**
//    * Whether to use different style names for different search keywords by
//    * appending a number starting from 1, i.e. hilite1, hilite2, etc.
//    */
//    style_name_suffix: true,

//    /**
//    * Set it to override the document.referrer string. Used for debugging
//    * only.
//    */
//    debug_referrer: ''
//};

//Hilite.search_engines = [


//    ['.*results\?', 'v0']                             // Custom
//    , ['.*results\?', 'v[\\d+]']                             // Custom
//    , ['.*details\?', 'ht']                             // Custom
////    
////    ,

////    ['google\\.', 'q'],                             // Google
////    ['search\\.yahoo\\.', 'p'],                     // Yahoo
////    ['search\\.msn\\.', 'q'],                       // MSN
////    ['search\\.live\\.', 'query'],                  // MSN Live
////    ['search\\.aol\\.', 'userQuery'],               // AOL
////    ['ask\\.com', 'q'],                             // Ask.com
////    ['altavista\\.', 'q'],                          // AltaVista
////    ['feedster\\.', 'q'],                           // Feedster
////    ['search\\.lycos\\.', 'q'],                     // Lycos
////    ['alltheweb\\.', 'q'],                          // AllTheWeb
////    ['technorati\\.com/search/([^\\?/]+)', 1],      // Technorati
////    ['dogpile\\.com/info\\.dogpl/search/web/([^\\?/]+)', 1, true] // DogPile

//];

///**
//* Decode the referrer string and return a list of search keywords.
//*/
//Hilite.decodeReferrer = function (referrer) {
//    var query = null;
//    var regex = new RegExp('');

//    for (var i = 0; i < Hilite.search_engines.length; i++) {
//        var se = Hilite.search_engines[i];
//        //regex.compile('^http://(www\\.)?' + se[0], 'i');
//        regex.compile(se[0], 'i');
//        var match = referrer.match(regex);
//        if (match) {
//            var result;
//            if (isNaN(se[1])) {
//                result = Hilite.decodeReferrerQS(referrer, se[1]);
//            } else {
//                result = match[se[1] + 1];
//            }
//            if (result) {
//                result = decodeURIComponent(result);
//                // XXX: DogPile's URI requires decoding twice.
//                if (se.length > 2 && se[2])
//                    result = decodeURIComponent(result);
//                result = result.replace(/\'|"/g, '');
//                result = result.split(/[\s,\+\.]+/);
//                return result;
//            }
//            break;
//        }
//    }
//    return null;
//};

//Hilite.decodeReferrerQS = function (referrer, match) {
//    var idx = referrer.indexOf('?');
//    var idx2;
//    if (idx >= 0) {
//        var qs = new String(referrer.substring(idx + 1));
//        idx = 0;
//        idx2 = 0;
//        while ((idx >= 0) && ((idx2 = qs.indexOf('=', idx)) >= 0)) {
//            var key, val;
//            key = qs.substring(idx, idx2);
//            idx = qs.indexOf('&', idx2) + 1;
//            if (key == match) {
//                if (idx <= 0) {
//                    return qs.substring(idx2 + 1);
//                } else {
//                    return qs.substring(idx2 + 1, idx - 1);
//                }
//            }
//        }
//    }
//    return null;
//};

///**
//* Highlight a DOM element with a list of keywords.
//*/
//Hilite.hiliteElement = function (elm, query) {
//    if (!query || elm.childNodes.length == 0)
//        return;

//    var qre = new Array();
//    for (var i = 0; i < query.length; i++) {
//        query[i] = query[i].toLowerCase();
//        if (Hilite.exact)
//            qre.push('\\b' + query[i] + '\\b');
//        else
//            qre.push(query[i]);
//    }

//    qre = new RegExp(qre.join("|"), "i");

//    var stylemapper = {};
//    for (var i = 0; i < query.length; i++) {
//        if (Hilite.style_name_suffix)
//            stylemapper[query[i]] = Hilite.style_name + (i + 1);
//        else
//            stylemapper[query[i]] = Hilite.style_name;
//    }

//    var textproc = function (node) {
//        var match = qre.exec(node.data);
//        if (match) {
//            var val = match[0];
//            var k = '';
//            var node2 = node.splitText(match.index);
//            var node3 = node2.splitText(val.length);
//            var span = node.ownerDocument.createElement('SPAN');
//            node.parentNode.replaceChild(span, node2);
//            span.className = stylemapper[val.toLowerCase()];
//            span.appendChild(node2);
//            return span;
//        } else {
//            return node;
//        }
//    };
//    Hilite.walkElements(elm.childNodes[0], 1, textproc);
//};

///**
//* Highlight a HTML document using keywords extracted from document.referrer.
//* This is the main function to be called to perform search engine highlight
//* on a document.
//*
//* Currently it would check for DOM element 'content', element 'container' and
//* then document.body in that order, so it only highlights appropriate section
//* on WordPress and Movable Type pages.
//*/
//Hilite.hilite = function () {
//    // If 'debug_referrer' then we will use that as our referrer string
//    // instead.
//    var q = Hilite.debug_referrer ? Hilite.debug_referrer : document.referrer;
//    var e = null;
//    q = Hilite.decodeReferrer(q);
//    if (q && ((Hilite.elementid &&
//               (e = document.getElementById(Hilite.elementid))) ||
//              (e = document.body))) {
//        Hilite.hiliteElement(e, q);
//    }
//};

//Hilite.walkElements = function (node, depth, textproc) {
//    var skipre = /^(script|style|textarea)/i;
//    var count = 0;
//    while (node && depth > 0) {
//        count++;
//        if (count >= Hilite.max_nodes) {
//            var handler = function () {
//                Hilite.walkElements(node, depth, textproc);
//            };
//            setTimeout(handler, 50);
//            return;
//        }

//        if (node.nodeType == 1) { // ELEMENT_NODE
//            if (!skipre.test(node.tagName) && node.childNodes.length > 0) {
//                node = node.childNodes[0];
//                depth++;
//                continue;
//            }
//        } else if (node.nodeType == 3) { // TEXT_NODE
//            node = textproc(node);
//        }

//        if (node.nextSibling) {
//            node = node.nextSibling;
//        } else {
//            while (depth > 0) {
//                node = node.parentNode;
//                depth--;
//                if (node.nextSibling) {
//                    node = node.nextSibling;
//                    break;
//                }
//            }
//        }
//    }
//};

//// Trigger the highlight using the onload handler.
//if (Hilite.onload) {
//    if (window.attachEvent) {
//        window.attachEvent('onload', Hilite.hilite);
//    } else if (window.addEventListener) {
//        window.addEventListener('load', Hilite.hilite, false);
//    } else {
//        var __onload = window.onload;
//        window.onload = function () {
//            Hilite.hilite();
//            __onload();
//        };
//    }
//}







/**
 * SearchHighlight plugin for jQuery
 * 
 * Thanks to Scott Yang <http://scott.yang.id.au/>
 * for the original idea and some code
 *    
 * @author Renato Formato <renatoformato@virgilio.it> 
 *  
 * @version 0.33
 *
 *  Options
 *  - exact (string, default:"exact") 
 *    "exact" : find and highlight the exact words.
 *    "whole" : find partial matches but highlight whole words
 *    "partial": find and highlight partial matches
 *     
 *  - style_name (string, default:'hilite')
 *    The class given to the span wrapping the matched words.
 *     
 *  - style_name_suffix (boolean, default:true)
 *    If true a different number is added to style_name for every different matched word.
 *     
 *  - debug_referrer (string, default:null)
 *    Set a referrer for debugging purpose.
 *     
 *  - engines (array of regex, default:null)
 *    Add a new search engine regex to highlight searches coming from new search engines.
 *    The first element is the regex to match the domain.
 *    The second element is the regex to match the query string. 
 *    Ex: [/^http:\/\/my\.site\.net/i,/search=([^&]+)/i]        
 *            
 *  - highlight (string, default:null)
 *    A jQuery selector or object to set the elements enabled for highlight.
 *    If null or no elements are found, all the document is enabled for highlight.
 *        
 *  - nohighlight (string, default:null)  
 *    A jQuery selector or object to set the elements not enabled for highlight.
 *    This option has priority on highlight. 
 *    
 *  - keys (string, default:null)
 *    Disable the analisys of the referrer and search for the words given as argument    
 *    
 */

(function($){
  jQuery.fn.SearchHighlight = function(options) {
    var ref = options.debug_referrer || document.referrer;
    if(!ref && options.keys==undefined) return this;
    
    SearchHighlight.options = $.extend({exact:"exact",style_name:'hilite',style_name_suffix:true},options);

    if (options.engines) SearchHighlight.engines.unshift(options.engines);
    //split option changed in order to suport phrases in highlight. Split char is now '|'
    //var q = options.keys != undefined ? options.keys.toLowerCase().split(/[\s,\+\.]+/) : SearchHighlight.decodeURL(ref, SearchHighlight.engines);
    var q = options.keys != undefined ? options.keys.toLowerCase().split(/[|]+/) : SearchHighlight.decodeURL(ref, SearchHighlight.engines);
    if(q && q.join("")) {
      SearchHighlight.buildReplaceTools(q);
      return this.each(function(){
        var el = this;
        if(el==document) el = $("body")[0];
        SearchHighlight.hiliteElement(el, q); 
      })
    } else return this;
  }    

  var SearchHighlight = {
    options: {},
    regex: [],
    engines: [
    [/^http:\/\/(www\.)?google\./i, /q=([^&]+)/i],                            // Google
    [/^http:\/\/(www\.)?search\.yahoo\./i, /p=([^&]+)/i],                     // Yahoo
    [/^http:\/\/(www\.)?search\.msn\./i, /q=([^&]+)/i],                       // MSN
    [/^http:\/\/(www\.)?search\.live\./i, /query=([^&]+)/i],                  // MSN Live
    [/^http:\/\/(www\.)?search\.aol\./i, /userQuery=([^&]+)/i],               // AOL
    [/^http:\/\/(www\.)?ask\.com/i, /q=([^&]+)/i],                            // Ask.com
    [/^http:\/\/(www\.)?altavista\./i, /q=([^&]+)/i],                         // AltaVista
    [/^http:\/\/(www\.)?feedster\./i, /q=([^&]+)/i],                          // Feedster
    [/^http:\/\/(www\.)?search\.lycos\./i, /q=([^&]+)/i],                     // Lycos
    [/^http:\/\/(www\.)?alltheweb\./i, /q=([^&]+)/i],                         // AllTheWeb
    [/^http:\/\/(www\.)?technorati\.com/i, /([^\?\/]+)(?:\?.*)$/i],           // Technorati
    ],
    subs: {},
    decodeURL: function(URL,reg) {
      URL = decodeURIComponent(URL);
      var query = null;
      $.each(reg,function(i,n){
        if(n[0].test(URL)) {
          var match = URL.match(n[1]);
          if(match) {
            query = match[1].toLowerCase();
            return false;
          }
        }
      })
      
      if (query) {
      query = query.replace(/(\'|")/, '\$1');
      query = query.split(/[\s,\+\.]+/);
      }
      
      return query;
    },
		regexAccent : [
      [/[\xC0-\xC5\u0100-\u0105]/ig,'a'],
      [/[\xC7\u0106-\u010D]/ig,'c'],
      [/[\xC8-\xCB]/ig,'e'],
      [/[\xCC-\xCF]/ig,'i'],
      [/\xD1/ig,'n'],
      [/[\xD2-\xD6\xD8]/ig,'o'],
      [/[\u015A-\u0161]/ig,'s'],
      [/[\u0162-\u0167]/ig,'t'],
      [/[\xD9-\xDC]/ig,'u'],
      [/\xFF/ig,'y'],
      [/[\x91\x92\u2018\u2019]/ig,'\'']
    ],
    matchAccent : /[\x91\x92\xC0-\xC5\xC7-\xCF\xD1-\xD6\xD8-\xDC\xFF\u0100-\u010D\u015A-\u0167\u2018\u2019]/ig,  
		replaceAccent: function(q) {
		  SearchHighlight.matchAccent.lastIndex = 0;
      if(SearchHighlight.matchAccent.test(q)) {
        for(var i=0,l=SearchHighlight.regexAccent.length;i<l;i++)
          q = q.replace(SearchHighlight.regexAccent[i][0],SearchHighlight.regexAccent[i][1]);
      }
      return q;
    },
    escapeRegEx : /((?:\\{2})*)([[\]{}*?|])/g, //the special chars . and + are already gone at this point because they are considered split chars
    buildReplaceTools : function(query) {
        var re = [], regex;
        $.each(query,function(i,n){
            if(n = SearchHighlight.replaceAccent(n).replace(SearchHighlight.escapeRegEx,"$1\\$2"))
              re.push(n);        
        });
        
        regex = re.join("|");
        switch(SearchHighlight.options.exact) {
          case "exact":
            regex = '\\b(?:'+regex+')\\b';
            break;
          case "whole":
            regex = '\\b\\w*('+regex+')\\w*\\b';
            break;
        }    
        SearchHighlight.regex = new RegExp(regex, "gi");
        
        $.each(re,function(i,n){
            SearchHighlight.subs[n] = SearchHighlight.options.style_name+
              (SearchHighlight.options.style_name_suffix?i+1:''); 
        });       
    },
    nosearch: /s(?:cript|tyle)|textarea/i,
    hiliteElement: function(el, query) {
        var opt = SearchHighlight.options, elHighlight, noHighlight;
        elHighlight = opt.highlight?$(opt.highlight):$("body"); 
        if(!elHighlight.length) elHighlight = $("body"); 
        noHighlight = opt.nohighlight?$(opt.nohighlight):$([]);
                
        elHighlight.each(function(){
          SearchHighlight.hiliteTree(this,query,noHighlight);
        });
    },
    hiliteTree : function(el,query,noHighlight) {
        if(noHighlight.index(el)!=-1) return;
        var matchIndex = SearchHighlight.options.exact=="whole"?1:0;
        for(var startIndex=0,endIndex=el.childNodes.length;startIndex<endIndex;startIndex++) {
          var item = el.childNodes[startIndex];
          if ( item.nodeType != 8 ) {//comment node
  				  //text node
            if(item.nodeType==3) {
              var text = item.data, textNoAcc = SearchHighlight.replaceAccent(text);
              var newtext="",match,index=0;
              SearchHighlight.regex.lastIndex = 0;
              while(match = SearchHighlight.regex.exec(textNoAcc)) {
                newtext += text.substr(index,match.index-index)+'<span class="'+
                SearchHighlight.subs[match[matchIndex].toLowerCase()]+'">'+text.substr(match.index,match[0].length)+"</span>";
                index = match.index+match[0].length;
              }
              if(newtext) {
                //add the last part of the text
                newtext += text.substring(index);
                var repl = $.merge([],$("<span>"+newtext+"</span>")[0].childNodes);
                endIndex += repl.length-1;
                startIndex += repl.length-1;
                $(item).before(repl).remove();
              }                
            } else {
              if(item.nodeType==1 && item.nodeName.search(SearchHighlight.nosearch)==-1)
                  SearchHighlight.hiliteTree(item,query,noHighlight);
            }	
          }
        }    
    }
  };
})(jQuery)
