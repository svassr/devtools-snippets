/**
 * @name display-mq.js
 * @author Stephane Vasseur
 * @email mr.vasseur@gmail.com
 * @description
 * Display applied mediaqueries in the bottom right corner of the screen while resizing the window
 * You can add your own media queries to mqList
 */

(function(){
    'use strict';

    // You can add your own media queries to mqList
    var mqList = {
            'portrait':         '(orientation: portrait)',
            'landscape':        '(orientation: landscape)',

            'phone-portrait':   'only screen and (max-width: 400px) and (orientation: portrait)', //GalaxyNoteII=720
            'phone-landscape':  'only screen and (max-height: 400px) and (max-width: 400px) and (orientation: landscape)', //GalaxyNoteII=720

            'tablet-portrait':  'only screen and (min-width: 401px) and (orientation: portrait)',
            'tablet-landscape': 'only screen and (min-height: 401px) and (orientation: landscape)', //S.G.Note7=960, S.G.Note8=962 !! LANDSCAPE IS SPECIFIQUE TO TABLETS DEVICES !!

            'desktop':          'only screen and (min-width: 1280px)',

            'smallTablet':      'only screen and (min-width: 401px) and (max-height: 601px) ', // nexus7, galaxyNote8,
            'tinyTabletHeight': 'only screen and (min-width: 401px) and (max-height: 500px) ',
            'smallPhone':       'only screen and (min-width: 320px) and (max-height: 510px) ', //Samsung Galaxy Ace
            'keyboardOpened':   'only screen and (min-width: 320px) and (max-height: 270px) ',
        },
        styleId='style-display-mq',
        divId='display-media-query';

    var css = document.createTextNode(''+
        '#display-media-query {'+
        ' z-index:999; position:absolute; display:block;'+
        ' bottom:0px; right:0px;'+
        ' width:auto; height:auto;'+
        '}'+
        '#display-media-query::after{'+
        ' position:relative; display:block; top:0px; left:0px;'+
        ' padding: 0.4em 0.8em;'+
        ' box-shadow: 0px -1px 8px #444;'+
        ' color: white; font: 1.4rem arial;'+
        '}');

    function size(obj) {
        var s = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) s++;
        }
        return s;
    }
    function removeIfExist(elId){
        var el=document.getElementById(elId);
        if(el){
            el.remove();
        }
    }
    
    var style = document.createElement("style");
    removeIfExist(styleId);
    style.setAttribute("id", styleId);
    style.appendChild(css);

    // Get the size of an object
    var c=size(mqList),
        i=c,
        h;
    for (var mq in mqList){
        h=Math.round((c-i)/c*360);
        css = document.createTextNode('@media '+mqList[mq]+' { #'+divId+'::after{ content: "@'+mq+'"; background: hsla('+h+',70%,58%, 0.8); }}');
        style.appendChild(css);
        i-=1;
    }
    document.body.appendChild(style);

    // write dmq pane <div>
    removeIfExist(divId);
    var dmqDiv = document.createElement("div");
    dmqDiv.innerHTML = "&nbsp;";
    dmqDiv.setAttribute("id", divId);
    document.body.appendChild(dmqDiv);

    // optionnal if you don't need to display height and width of the actual screen
    window.onresize = function(){
        // could check here all available media queries with window.matchMedia();
        var w=(document.documentElement.clientWidth||window.innerWidth),
            h=(document.documentElement.clientHeight||window.innerHeight);
        document.getElementById(divId).setAttribute('data-height',h);
        document.getElementById(divId).setAttribute('data-width',w);
    };
})();
