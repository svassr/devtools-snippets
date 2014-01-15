/**
 * @name display-mq.js
 * @author Stephane Vasseur
 * @email mr.vasseur@gmail.com
 * @description
 * Display applied mediaqueries in the bottom right corner of the screen while resizing the window
 * You can add your own media queries to mqList
 */
'use strict';

(function(){
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
        divId='display-media-query';

    var css = document.createTextNode(''+
        '#display-media-query {'+
        ' position: absolute;'+
        ' bottom: 0px;'+
        ' right:0px;'+
        ' z-index: 999;'+
        ' display: block;'+
        ' width: auto;'+
        ' height: auto;'+
        '}'+
        '#display-media-query::after{'+
        ' color: white; font: 15px arial;'+
        ' display: block;'+
        ' padding: 7px 10px;'+
        ' position: relative;'+
        ' top: 0px ;'+
        ' left: 0px;'+
        ' border-radius: 10px 0 0 0; border: #333 1px solid; border-width: 1px 0 0 1px;'+
        '}');

    var style = document.createElement("style");
    style.appendChild(css);

    function size(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

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
    var dmqDiv = document.createElement("div");
    dmqDiv.innerHTML = "&nbsp;";
    console.log(dmqDiv);
    dmqDiv.setAttribute("id", divId);
    dmqDiv.setAttribute("data-height", (document.documentElement.clientHeight||window.innerHeight));
    dmqDiv.setAttribute("data-width", (document.documentElement.clientWidth||window.innerWidth));

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