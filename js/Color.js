class Color {

    constructor(col){

        this.util = {

            hex2hsl: hex => { return this.util.rgb2hsl(this.util.hex2rgb(hex)) },

            hex2rgb: hex => {

                var r = hex >>> 0x10;
                var g = hex << 0x10 >>> 0x18;
                var b = hex << 0x18 >>> 0x18;
            
                r /= 0xff, g /= 0xff, b /= 0xff;

                return {
                    r: r,
                    g: g,
                    b: b
                }
            },

            rgb2hex: rgb => {
                return (
                    (rgb.r*0xff << 0x10) + 
                    (rgb.g*0xff << 0x08) +
                    (rgb.b*0xff)
                )
            },

            rgb2hsl: rgb => {

                var r = rgb.r
                var g = rgb.g
                var b = rgb.b
            
                var max = Math.max(r, g, b), min = Math.min(r, g, b);
                var h, s, l = (max + min) / 2;
            
                if(max == min){
                    h = s = 0; // achromatic
                } else {
                    var d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch(max) {
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                    }
                    h /= 6;
                }
            
                s = s*100;
                s = Math.round(s);
                l = l*100;
                l = Math.round(l);
                h = Math.round(360*h);
            
                return {
                    h: h,
                    s: s,
                    l: l
                }
            },

            hsl2rgb: hsl => {

                let { h, s, l } = hsl;
                let r, g, b;

                if(s == 0){
                    r = g = b = l; // achromatic
                }else{
                    function hue2rgb(p, q, t){
                        if(t < 0) t += 1;
                        if(t > 1) t -= 1;
                        if(t < 1/6) return p + (q - p) * 6 * t;
                        if(t < 1/2) return q;
                        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                        return p;
                    }
            
                    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                    var p = 2 * l - q;
                    r = hue2rgb(p, q, h + 1/3);
                    g = hue2rgb(p, q, h);
                    b = hue2rgb(p, q, h - 1/3);
                }
            
                return { r:r, g:g, b:b };
            },

            hsl2hex: hsl => { return this.util.rgb2hex(this.util.hsl2rgb(hsl)); }
        }
        this.init(col);
    }

    init(col){

        switch (typeof col){

            case typeof {}:{
                {
                    if(typeof col.r == typeof 0){
                        this.hex = this.util.rgb2hex(col)
                        this.rgb = col;
                        this.hsl = this.util.rgb2hsl(col)
                    }
                    else if(typeof col.h == typeof 0){
                        this.hex = this.util.hsl2hex(col)
                        this.rgb = this.util.hsl2rgb(col)
                        this.hsl = col;
                    }
                }
                break;
            }

            case typeof 0:{
                {
                    this.hex = col
                    this.rgb = this.util.hex2rgb(col)
                    this.hsl = this.util.hex2hsl(col)
                }
                break;
            }

            case typeof '':{
                {
                    this.hex = Number(`0x${col.substring(1)}`)
                    this.init(this.hex)
                    return;
                }
            }

            default:{
                {
                    throw `Unknown data type to construct Color: ${typeof col}`
                }
            }
        }

        this.r = this.rgb.r
        this.g = this.rgb.g
        this.b = this.rgb.b

        this.h = this.hsl.h
        this.s = this.hsl.s
        this.l = this.hsl.l
    }

    hue(h)        { this.init({ h:h,      s:this.s, l:this.l }); return this.hex }
    saturation(s) { this.init({ h:this.h, s:s,      l:this.l }); return this.hex }
    lightness(l)  { this.init({ h:this.h, s:this.s, l:l      }); return this.hex }

    h(h){ this.hue(h)       ; return this.hex }
    s(s){ this.saturation(s); return this.hex }
    l(l){ this.lightness(l) ; return this.hex }

    hex(hex){ this.init(hex); return this.hex }
}