/*!
Hype DilateErode 1.0.0
copyright (c) 2021 Max Ziebell, (https://maxziebell.de). MIT-license
*/

/*
* Version-History
* 1.0.0	Initial release under MIT-license
*/
if("HypeDilateErode" in window === false) window['HypeDilateErode'] = (function () {
    
    var DOMContentLoaded = false;
    var cachedCalls = [];

    document.addEventListener('DOMContentLoaded', function(){
        DOMContentLoaded = true;
        cachedCalls.forEach(function(fnc){ fnc(); });
        cachedCalls = null;
    });

    function renderFilter(name, operator, radius){
        return '<svg class="dilate-erode-filters" xmlns="http://www.w3.org/2000/svg">'+
        '<filter id="'+name+'_dilate_erode">'+
        '<feMorphology operator="'+operator+'" in="SourceGraphic" radius="'+radius+'" />'+
        '</filter>'+
        '</svg>';
    }

    function renderDilateErodeClass(name, useId){
        return '<style>'+
        (useId? '#':'.')+name+'{'+
            '-webkit-filter: url(#'+name+'_dilate_erode) !important;'+
            '-moz-filter: url(#'+name+'_dilate_erode) !important;'+
            '-o-filter: url(#'+name+'_dilate_erode) !important;'+
            '-ms-filter: url(#'+name+'_dilate_erode) !important;'+
            'filter: url(#'+name+'_dilate_erode) !important;'+
        '}'+
        '</style>';
    }

    function registerDilateErode(name, operator, radius, useId){
        if (!DOMContentLoaded){
            cachedCalls.push(function(){
                HypeDilateErode.registerDilateErode(name, operator, radius, useId);
            })
            return;
        }
        
        var filterContainerId = 'hype_dilate_erode';
        var cElm = document.getElementById(filterContainerId);
        if (!cElm) { 
            cElm=document.createElement("div");
            cElm.id = filterContainerId;
            cElm.setAttribute('style', 'display:none;');
            document.querySelector('body').appendChild(cElm);
        }
        
        var filterId = name+'_svg_filter';
        var fElm = document.getElementById(filterId);
        if (!fElm) { 
            fElm=document.createElement("div");
            fElm.id = filterId;
        }
        fElm.innerHTML = renderFilter(name, operator, radius ) + renderDilateErodeClass(name, useId);
        cElm.appendChild(fElm);
    }

	/**
	 * @typedef {Object} HypeDilateErode
	 * @property {String} version Version of the extension
	 */
	 var HypeDilateErode = {
		version: '1.0.0',
		registerDilateErode: registerDilateErode,
	};

	/** 
	 * Reveal Public interface to window['HypeDilateErode']
	 * return {HypeDilateErode}
	 */
	return HypeDilateErode;
	
})();
