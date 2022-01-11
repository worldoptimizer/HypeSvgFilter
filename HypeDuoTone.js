/*!
Hype DuoTone 1.0.2
copyright (c) 2021 Max Ziebell, (https://maxziebell.de). MIT-license
*/

/*
* Version-History
* 1.0.0	Initial release under MIT-license
* 1.0.1	Added ID mode and delay if registerDuoTone is called before DOM is ready
* 1.0.2 Removed console.log statements that I left behind
*/
if("HypeDuoTone" in window === false) window['HypeDuoTone'] = (function () {
    
    var DOMContentLoaded = false;
    var cachedCalls = [];

    document.addEventListener('DOMContentLoaded', function(){
        DOMContentLoaded = true;
        cachedCalls.forEach(function(fnc){ fnc(); });
        cachedCalls = null;
    });

    
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
         ] : null;
    }

    function renderFilter(name, col1, col2){
        if(typeof col1 === 'string') col1 = hexToRgb(col1);
        if(typeof col2 === 'string') col2 = hexToRgb(col2);
        return '<svg class="duotone-filters" xmlns="http://www.w3.org/2000/svg">'+
        '<filter id="'+name+'_duotone">'+
        '<feColorMatrix type="matrix" result="gray" values="1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 1 0"></feColorMatrix>'+
            '<feComponentTransfer color-interpolation-filters="sRGB" result="duotone">'+
                '<feFuncR type="table" tableValues="'+(col1[0]/255)+' '+(col2[0]/255)+'"></feFuncR>'+
                '<feFuncG type="table" tableValues="'+(col1[1]/255)+' '+(col2[1]/255)+'"></feFuncG>'+
                '<feFuncB type="table" tableValues="'+(col1[2]/255)+' '+(col2[2]/255)+'"></feFuncB>'+
                '<feFuncA type="table" tableValues="0 1"></feFuncA>'+
            '</feComponentTransfer>'+
        '</filter>'+
        '</svg>';
    }

    function renderDuotonClass(name, useId){
        return '<style>'+
        (useId? '#':'.')+name+'{'+
            '-webkit-filter: url(#'+name+'_duotone) !important;'+
            '-moz-filter: url(#'+name+'_duotone) !important;'+
            '-o-filter: url(#'+name+'_duotone) !important;'+
            '-ms-filter: url(#'+name+'_duotone) !important;'+
            'filter: url(#'+name+'_duotone) !important;'+
        '}'+
        '</style>';
    }

    function registerDuoTone(name, col1, col2, useId){
        if (!DOMContentLoaded){
            cachedCalls.push(function(){
                HypeDuoTone.registerDuoTone(name, col1, col2, useId);
            })
            return;
        }
        
        var filterContainerId = 'hype_duo_tone';
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
        fElm.innerHTML = renderFilter(name, col1, col2 ) + renderDuotonClass(name, useId);
        cElm.appendChild(fElm);
    }

	/**
	 * @typedef {Object} HypeDuoTone
	 * @property {String} version Version of the extension
	 */
	 var HypeDuoTone = {
		version: '1.0.2',
		registerDuoTone: registerDuoTone,
	};

	/** 
	 * Reveal Public interface to window['HypeDuoTone']
	 * return {HypeDuoTone}
	 */
	return HypeDuoTone;
	
})();
