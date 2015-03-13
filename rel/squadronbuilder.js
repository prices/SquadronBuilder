/**
 * squadronbuilder.js
 *
 * <pre>
 * SquadronBuilder is a web interface to build squadrons in Robotech RPG Tactics
 * Copyright (C) 2015 Scott Price
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 * </pre>
 *
 * @category   html
 * @package    core
 * @subpackage javascript
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @version    GIT: $Id: $
 * @link       https://github.com/prices/SquadronBuilder
 */
var SquadronBuilder = {};
(function ()
{
    // svg.js breaks this
    //"use strict";
// This is our data

SquadronBuilder.data = {};
//
// This class is what everything else is based on.  It is mostly just constants
// and base functions for writing text and making boxes.
//
// Public Properties:
//      padding The amount of padding between things, in mm
//
// Public Methods:
//      boxes  Render ammo or damage boxes.
//      large  Renders large text
//      normal Renders normal sized text
//      small  Renders small text
//      bold   Renders normal sized, bold text
//      header Renders header text
//      
var BaseClass = function(){};
BaseClass.extend = function(properties)
{
    var ret = new BaseClass();
    for (var key in properties) {
        ret[key] = properties[key];
    }
    return ret;
};
BaseClass.prototype = {
    _color: '#000000',
    wwchars: 50,
    padding: 1,
    boxsize: 3,
    boxmult: 1.2,
    // This is the size of normal text in mm
    smallsize: 1.75,
    // This is the size of normal text in mm
    normalsize: 2.75,
    // This is the size of normal text in mm
    largesize: 4,
    // This is the size of normal text in mm
    headersize: 5,
    // This is our font family
    fontfamily: "'Bitstream Vera Sans', sans-serif",
    boxes: function (x, y, boxes, rows, color)
    {
        if ((boxes >= 10) && !rows) {
            rows = 2;
        } else {
            rows  = rows ? rows : 1;
        }
        color = color ? color : this._color;
        var dx = x;
        var dy = y;
        var cutoff = parseInt((boxes / rows), 10);
        var rect = [];
        for (var i = 0; i < boxes; i++) {
            if ((i > 0) && ((i % cutoff) == 0)) {
                dy += this.boxsize * this.boxmult;
                dx = x;
            }
            rect[i] = this.canvas.rect(
                this.boxsize+"mm", this.boxsize+"mm"
            ).x(dx+"mm").y(dy+"mm").stroke(color).fill("none");
            dx += this.boxsize * this.boxmult;
        }
        height = y - dy + (this.boxsize * this.boxmult);
        return height;
    },
    large: function(x, y, text)
    {
        return this._text(
            x, 
            y, 
            text, 
            this.largesize, 
            this.fontfamily,
            'normal',
            parseInt(this.wwchars * .8, 10)
        );
    },
    largebold: function(x, y, text)
    {
        return this._text(
            x, 
            y, 
            text, 
            this.largesize, 
            this.fontfamily,
            'bold',
            parseInt(this.wwchars * .7, 10)
        );
    },
    normal: function(x, y, text)
    {
        return this._text(
            x, 
            y, 
            text, 
            this.normalsize, 
            this.fontfamily,
            'normal',
            this.wwchars
        );
    },
    bold: function(x, y, text)
    {
        return this._text(
            x, 
            y, 
            text, 
            this.normalsize, 
            this.fontfamily,
            'bold',
            parseInt(this.wwchars * .95, 10)
        );
    },
    small: function(x, y, text)
    {
        return this._text(
            x, 
            y, 
            text, 
            this.smallsize, 
            this.fontfamily,
            'normal',
            parseInt(this.wwchars * 1.5, 10)
        );
    },
    header: function(x, y, text)
    {
        return this._text(
            x, 
            y, 
            text, 
            this.headersize, 
            this.fontfamily,
            'bold',
            1000
        );
    },
    _text: function(x, y, text, size, font, weight, chars)
    {
        y += size / 2;
        text = this._wordwrap(text, chars);
        var print = this.canvas.text(
            text
        ).x(
            x+'mm'
        ).y(
            y+'mm'
        ).font({
            family:   font,
            size:     size+'mm',
            anchor:   'start',
            leading:  this.padding+'mm',
            'font-weight': weight,
        });
        return print;
    },
    _wordwrap: function(text, chars)
    {
        var print = [];
        if (text.length < chars) {
            print[0] = text;
        } else {
            print[0] = text;
        }
        return function(add) {
            for (key in print) {
                add.tspan(print[key]);
            }
        };
    }
};

// This class deals with a weapon  It prints out everything to do with it.
//
// Class Parameters:
//      canvas The canvas to use
//      weapon This should be a class from SquadronBuilder.data.weapons
//      width  The width we are using for this class
//
// Public Properties:
//      width      The width of the rendered object.
//      height     The height of the rendered object.  Only valid after rendering.
//      ammoheight The height of the rendered ammo object.  Only valid after ammo rendering.
//
// Public Methods:
//      render  Render the object in SVG
//      ammo    Render the ammo object in SVG
//      hasAmmo Returns true if this weapon uses ammo
//      color   Set the color of the boxes
//      
var Weapon = function (canvas, weapon, width) {
    this.canvas = canvas;
    this.weapon = weapon;
    this.width  = width ? width : 70;
};
Weapon.prototype = BaseClass.extend({
    _color: "#000000",
    height: 0,
    ammoheight: 0,
    //
    // This function renders the main output for this object
    // 
    // Function Parameters:
    //      x The x coordinate of the top left corner of this object
    //      y The y coordintate of the top left corner of this object
    //
    // Return:
    //      This object
    //
    render: function (x, y)
    {
        var dy = y;
        var dx = x;
        var abilities = 'RG: '+this.weapon.range+', MD: '+this.weapon.damage;
        for (name in this.weapon.abilities) {
            value = this.weapon.abilities[name];
            if (value === true) {
                abilities += ', '+name;
            } else if (value !== false) {
                abilities += ', '+name+' '+value;
            }
        }
        x += this.padding;
        y += this.padding * 2;
        var name = this.normal(x, y, this.weapon.name);
        y += this.normalsize;
        var attrib = this.small(x, y, abilities);
        y += this.smallsize;
        y += this.padding;
        this.height = y - dy;

        var rect = this.canvas.rect(
            this.width+"mm", this.height+"mm"
        ).x(dx+"mm").y(dy+"mm").stroke(this._color).fill("none");
        return this;
    },
    //
    // This sets the color of the boxes around ammo using weapons
    // 
    // Function Parameters:
    //      color Can be any valid SVG color.
    //
    color: function (color)
    {
        if (this.hasAmmo()) {
            this._color = color;
        }
    },
    //
    // This function is used to check if this weapon uses ammo
    // 
    // Return:
    //      true if this weapon uses ammo
    hasAmmo: function ()
    {
        return (this.weapon.abilities.Ammo !== false);
    },
    //
    // This function renders the ammo boxes for this weapon
    // 
    // Function Parameters:
    //      x The x coordinate of the top left corner of this object
    //      y The y coordintate of the top left corner of this object
    //
    // Return:
    //      This object
    //
    ammo: function(x, y)
    {
        if (!this.hasAmmo()) {
            return;
        }
        var ammo = this.weapon.abilities.Ammo;
        var dx   = x;
        var dy   = y;
        var name = this.small(dx, dy, this.weapon.name);

        var bx = dx + this.width - (this.boxsize * ammo * this.boxmult) - (this.padding * 1.5);
        var by = dy + (this.smallsize / 2) - (this.boxsize / 2);
        this.ammoheight = this.boxes(bx, by, ammo, false);
        return this.ammoheight;
    }
});


//
// This class deals with a mecha.  It prints out everything to do with it.
//
// Class Parameters:
//      canvas The canvas to use
//      mecha  This should be a class from SquadronBuilder.data.mecha
//      width  The width we are using for this class
//
// Public Properties:
//      width      The width of the rendered object.
//      height     The height of the rendered object.  Only valid after rendering.
//
// Public Methods:
//      render  Render the object in SVG
//      
SquadronBuilder.mecha = function (canvas, mecha, width) {
    this.canvas = canvas;
    this.mecha  = mecha;
    this.width  = width ? width : 70;
    if (this.hasJettison()) {
        var jettison = SquadronBuilder.data.mecha[this.mecha.abilities.Jettison];
        this._jettisonto = new SquadronBuilder.mecha(
            this.canvas, jettison, this.width
        );
    }
};
SquadronBuilder.mecha.prototype = BaseClass.extend({
    height: 0,
    _jettisonto: {},
    _colors: ['#CF0000', '#CFCF00', '#00CF00'],
    _jcolor: '#0000CF',
    _weapon: [],
    //
    // This function renders the main output for this object
    // 
    // Function Parameters:
    //      x The x coordinate of the top left corner of this object
    //      y The y coordintate of the top left corner of this object
    //
    // Return:
    //      This object
    //
    render: function (x, y, count)
    {
        // Set up our weapons
        var color = 0;
        var weapon = [];
        var width = this.width - (this.padding * 2);
        for (key in this.mecha.ranged) {
            var wpn = this.mecha.ranged[key];
            weapon[key] = new Weapon(
                this.canvas, 
                SquadronBuilder.data.weapons[wpn], 
                width
            );
            if (weapon[key].hasAmmo()) {
                weapon[key].color(this._colors[color++]);
            }
        }

        // Set up the x and y
        var dy = y;
        var dx = x;
        dx += this.padding;
        dy += this.padding;
        
        
        // This does the names and damage boxes
        var nx = dx + this.padding;
        var ny = dy;
        for (var i = 0; i < count; i++) {
            
            // Put in the mecha name
            sy = ny;
            ny += this.padding * 2;
            this.large(nx, ny, this.mecha.name);
            
            // Put in the damage boxes
            var bx = nx + ((this.largesize * this.mecha.name.length / 1.75) + 2);
            var by = ny + (this.largesize / 2) - (this.boxsize / 2) - this.padding;
            var h = this.boxes(bx, by, this.mecha.damage);

            if (this.mecha.extradamage) {
                // Put in the extradamage boxes
                by += this.boxsize * this.boxmult;
                h += this.boxes(bx, by, this.mecha.extradamage, 1, this._jcolor);
            }

            ny  = (h > this.largesize) ? ny + h : ny + this.largesize;
            ny += this.padding;

            // Add any ammo boxes we need for this mecha
            var hasammo = false;
            for (key in weapon) {
                if (weapon[key].hasAmmo()) {
                    ny += weapon[key].ammo(nx, ny);
                    hasammo = true;
                }
            }
            ny += this._jettison(nx, ny);
            // Add a box around it if it had ammo and we have more than 1
            if (hasammo && (count > 1)) {
                var height = ny - sy;
                var width  = this.width - (this.padding * 2);
                var rect = this.canvas.rect(
                    width+"mm", height+"mm"
                ).x(dx+"mm").y(sy+"mm").stroke("#000000").fill("none");
            }
        }
        dy  = ny + (this.padding * 2);
        dy += this._ranged(dx, dy, this.mecha);
        dy += this.padding * 2;
        dy += this._handtohand(dx, dy, this.mecha);
        dy += this.padding;
        dy += this._stats(dx, dy, this.mecha);
        dy += this.padding * 2;
        dy += this._abilities(dx, dy, this.mecha);
        dy += this.padding;
        
        if (this.hasJettison()) {
            this._jettisonto.jettisonTo(dx, dy);
            dy += this._jettisonto.height;
        }
        
        
        // Put a rectangle around it all
        this.height = dy - y;
        var rect = this.canvas.rect(
            this.width+"mm", this.height+"mm"
        ).x(x+"mm").y(y+"mm").stroke("#000000").fill("none");
        
        // This is the end
        return this;
    },
    //
    // This function renders the main output for this object
    // 
    // Function Parameters:
    //      x The x coordinate of the top left corner of this object
    //      y The y coordintate of the top left corner of this object
    //
    // Return:
    //      This object
    //
    jettisonTo: function (x, y)
    {

        // Set up the x and y
        var dy = y;
        var dx = x;
        dy += this.padding;
        
        this.largebold(dx, dy, 'Jettison to '+this.mecha.name);

        dy += this.largesize + this.padding;
        dy += this._ranged(dx, dy, this.mecha);
        dy += this.padding * 2;
        dy += this._handtohand(dx, dy, this.mecha);
        dy += this.padding;
        dy += this._stats(dx, dy, this.mecha);
        dy += this.padding * 2;
        dy += this._abilities(dx, dy, this.mecha);
        dy += this.padding;
        
        // Put a rectangle around it all
        this.height = dy - y;        
        
        // This is the end
        return this;
    },
    _ranged: function(x, y, mecha)
    {
        var color = 0;
        var dx    = x;
        var dy    = y;
        // Add in the ranged weapons
        this.bold(dx, dy, "Ranged:");
        dy += this.normalsize;
        for (key in mecha.ranged) {
            var wpn = mecha.ranged[key];
            var weapon = new Weapon(
                this.canvas, 
                SquadronBuilder.data.weapons[wpn], 
                (this.width - (this.padding * 2))
            );
            if (weapon.hasAmmo()) {
                weapon.color(this._colors[color++]);
            }
            weapon.render(dx, dy);
            dy += weapon.height;
        }
        return dy - y;
    },
    _handtohand: function(x, y, mecha)
    {
        var dx = x;
        var dy = y;
        // Add in the hand to hand combat
        this.bold(dx, dy, "Hand to Hand:");
        dy += this.normalsize;
        var sep = "";
        var hth = "";
        for (key in mecha.handtohand) {
            hth += sep+mecha.handtohand[key];
            sep = ", ";
        }
        this.normal(dx, dy, hth);
        dy += this.normalsize;
        return dy - y;
    },
    _stats: function(x, y, mecha)
    {
        var width = this.width - (2 * this.padding);
        dx = x + this.padding;
        dy = y + this.padding;
        this.normal(dx, dy, "Speed: "+mecha.speed);
        dx += (width / 4);
        this.normal(dx, dy, "Pilot: "+mecha.piloting);
        dx += (width / 5.5);
        this.normal(dx, dy, "Gunnery: "+mecha.gunnery);
        dx += (width / 3.5);
        this.normal(dx, dy, "Defense: "+mecha.defense);
        dy += this.normalsize;
        dy += this.padding;
        height = dy - y;
        var rect = this.canvas.rect(
            width+"mm", height+"mm"
        ).x(x+"mm").y(y+"mm").stroke("#000000").fill("none");
        return height;
    },
    _abilities: function(x, y, mecha)
    {
        var dx = x;
        var dy = y;
        // Add in the hand to hand combat
        this.bold(dx, dy, "Abilities:");
        dy += this.normalsize;
        var sep = "";
        var abl = "";
        for (key in mecha.abilities) {
            var abil = mecha.abilities[key];
            if (abil === true) {
                abl += sep+key;
                sep = ', ';
            } else if (abil !== false) {
                if (key == 'Jettison') {
                    abl += sep+key+' to '+this._jettisonto.mecha.name;
                } else {
                    abl += sep+key+' '+abil;
                }
                sep = ', ';
            }
        }
        this.normal(dx, dy, abl);
        dy += this.normalsize;
        return dy - y;
    },
    //
    // This function is used to check if this weapon uses ammo
    // 
    // Return:
    //      true if this weapon uses ammo
    hasJettison: function ()
    {
        return (this.mecha.abilities.Jettison !== false);
    },
    _jettison: function (x, y)
    {
        if (!this.hasJettison()) {
            return 0;
        }

        dx = x;
        dy = y
        by = y - (this.boxsize / 2);
        
        this.boxes(dx, by, 1, null, this._jcolor);
        
        name = "Jettison to "+this._jettisonto.mecha.name;
        dx   += (this.boxsize * 1.4);
        this.bold(dx, dy, name);
        diff  = this.normalsize + this.padding;

        if (diff < (this.boxsize + this.padding)) {
            diff = this.boxsize + this.padding;
        }
        return diff;
    }
});
/**
* This is where weapons are specified
*
* @category   JavaScript
* @package    Weapons
* @subpackage JavaScript
* @author     Scott Price <prices@dflytech.com>
* @copyright  2015 Scott Price
* @link       http://github.com/prices/SquadronBuilder
*/
SquadronBuilder.data.weapons = {
    Glaug103mmMiniMissiles: {
        name: '103mm Mini-Missile Launchers',
        range: 12,
        damage: '2/missile',
        abilities: {
            'Accurate': false,
            'Ammo': 4,
            'Anti-Missile' : true,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : true,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : 6,
            'Volley X'     : false,
        },
    },
    Glaug150mmSRM: {
        name: '150mm Short Range Missile Tubes',
        range: 18,
        damage: '6/missile',
        abilities: {
            'Accurate'     : false,
            'Ammo'         : 6,
            'Anti-Missile' : true,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : true,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : true,
        }
    },
    Glaug178mmSRM: {
        name: '178mm Short Range Missile Launchers',
        range: 16,
        damage: '6/missile',
        abilities: {
            'Accurate'     : false,
            'Ammo'         : 8,
            'Anti-Missile' : true,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : true,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : true,
        }
    },
    GlaugChargedParticleCannon: {
        name: 'Charged Particle Cannon',
        range: 24,
        damage: 6,
        abilities: {
            'Accurate'     : true,
            'Ammo'         : false,
            'Anti-Missile' : false,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : true,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : true,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    GlaugHeavyParticleCannons: {
        name: 'Dual Forearm Heavy Particle Cannons',
        range: 18,
        damage: 4,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : false,
            'Anti-Missile' : false,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : true,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    GlaugRailCannons: {
        name: 'Dual Forearm 44mm Rail Cannons',
        range: 18,
        damage: 8,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : false,
            'Anti-Missile' : true,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : true,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    GU11Battloid: {
        name: 'GU-11 Gun Pod',
        range: 24,
        damage: 6,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : false,
            'Anti-Missile' : false,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : true,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    GU11Fighter: {
        name: 'GU-11 Gun Pod',
        range: 12,
        damage: 6,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : false,
            'Anti-Missile' : false,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    GU11: {
        name: 'GU-11 Gun Pod',
        range: 12,
        damage: 6,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : false,
            'Anti-Missile' : false,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : true,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    NousjadeulGer32mmPlasmaMachinePistol: {
        name: '32mm Plamsa Machine Pistol',
        range: 9,
        damage: 8,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : false,
            'Anti-Missile' : false,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : true,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    NousjadeulGer64mmGrenadeLauncher: {
        name: '64mm Grenade Launcher',
        range: 12,
        damage: 6,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : 10,
            'Anti-Missile' : false,
            'Blast'        : true,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    NousjadeulGerChargedParticleCannon: {
        name: 'Shoulder Mounted Charged Particle Cannon',
        range: 18,
        damage: 4,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : false,
            'Anti-Missile' : false,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    QueadluunRau103mmMiniMissiles: {
        name: 'Quad 103mm Mini-Missile Launchers',
        range: 12,
        damage: '2/missile',
        abilities: {
            'Accurate'     : false,
            'Ammo'         : 16,
            'Anti-Missile' : true,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : true,
            'Overwhelming' : false,
            'Rapid Fire'   : true,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : 8,
            'Volley X'     : false,
        }
    },
    QueadluunRau64mmGrenadeLauncher: {
        name: 'Dual 64mm Grenade Launchers',
        range: 12,
        damage: 12,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : 10,
            'Anti-Missile' : false,
            'Blast'        : true,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    QueadluunRauMedParticleCannons: {
        name: 'Medium Charged Particle Cannons',
        range: 9,
        damage: 4,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : false,
            'Anti-Missile' : false,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : true,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : true,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    Regult313mmMRM: {
        name: 'Dual 313mm Medium Range Missle Launchers',
        range: 24,
        damage: '9/missile',
        abilities: {
            'Accurate'     : false,
            'Ammo'         : 4,
            'Anti-Missile' : false,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : true,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : 6,
            'Volley X'     : false,
        }
    },
    Regult791mmBallisticMissile: {
        name: 'Dual 791mm Ballistic Missle Launchers',
        range: 48,
        damage: '9/missile',
        abilities: {
            'Accurate'     : false,
            'Ammo'         : 4,
            'Anti-Missile' : false,
            'Blast'        : true,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : true,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : true,
        }
    },
    RegultAirDefenseLasers: {
        name: 'Dual Light Air Defense Lasers',
        range: 9,
        damage: 2,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : false,
            'Anti-Missile' : true,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : true,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    RegultAutoCannons: {
        name: 'Dual 22.3mm Auto-Cannons',
        range: 12,
        damage: 2,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : false,
            'Anti-Missile' : false,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    RegultHeavyParticleCannons: {
        name: 'Dual Heavy Particle Cannons',
        range: 18,
        damage: 4,
        abilities: {
            'Accurate'     : true,
            'Ammo'         : false,
            'Anti-Missile' : false,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    SDF1AirWingNoseLasers: {
        name: 'SDF-1 Air Wing Nose Lasers',
        range: 18,
        damage: 2,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : false,
            'Anti-Missile' : true,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    ValkyrieDualHeadLasers: {
        name: 'Dual LLW-20 CIWS Valkyrie Head Laser',
        range: 9,
        damage: 2,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : false,
            'Anti-Missile' : true,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    ValkyrieGravityBombs: {
        name: 'Valkyrie Gravity Bombs',
        range: '-',
        damage: 12,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : 4,
            'Anti-Missile' : false,
            'Blast'        : true,
            'Fly Over'     : true,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : true,
            'Overwhelming' : true,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    ValkyrieHeadLaser: {
        name: 'LLW-20 CIWS Valkyrie Head Laser',
        range: 9,
        damage: 1,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : false,
            'Anti-Missile' : true,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    ValkyrieLRM: {
        name: 'Valkyrie Long-Range Missiles',
        range: 48,
        damage: '9/missile',
        abilities: {
            'Accurate'     : false,
            'Ammo'         : 8,
            'Anti-Missile' : false,
            'Blast'        : true,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : true,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : true,
        }
    },
    ValkyrieMLOPs: {
        name: 'Valkyrie MLOPs',
        range: 12,
        damage: '2/missile',
        abilities: {
            'Accurate'     : false,
            'Ammo'         : 8,
            'Anti-Missile' : true,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : true,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : 8,
            'Volley X'     : false,
        }
    },
    ValkyrieQuadHeadLasers: {
        name: 'Quad LLW-20 CIWS Valkyrie Head Laser',
        range: 9,
        damage: 4,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : false,
            'Anti-Missile' : true,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    ValkyrieWingHardPoints: {
        name: 'Wing Mounted Missile Hard Points',
        range: 24,
        damage: '9/missile',
        abilities: {
            'Accurate'     : false,
            'Ammo'         : 3,
            'Anti-Missile' : false,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : true,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : 4,
            'Volley X'     : false,
        }
    },
}
/**
* This is where weapons are specified
*
* @category   JavaScript
* @package    Weapons
* @subpackage JavaScript
* @author     Scott Price <prices@dflytech.com>
* @copyright  2015 Scott Price
* @link       http://github.com/prices/SquadronBuilder
*/
SquadronBuilder.data.mecha = {
    GlaugEldare: {
        name: 'Glaug-Eldare',
        speed: 12,
        piloting: 2,
        gunnery: 3,
        defense: 7,
        damage: 9,
        extradamage: 10,
        abilities: {
            'Afterburner'         : true,
            'Aircraft'            : true,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : 'Glaug',
            'Leadership'          : 4,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'GlaugChargedParticleCannon', 'GlaugHeavyParticleCannons', 
            'GlaugRailCannons', 'RegultAutoCannons', 'Glaug150mmSRM',
            'Glaug103mmMiniMissiles', 'Glaug178mmSRM'
        ],
        handtohand: [
            'Body Block', 'Punch', 'Power Punch'
        ]
    },
    Glaug: {
        name: 'Glaug',
        speed: 7,
        piloting: 3,
        gunnery: 3,
        defense: 7,
        damage: 9,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : false,
            'Focus Fire'          : true,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : 4,
            'Leap'                : true,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'GlaugChargedParticleCannon', 'GlaugHeavyParticleCannons', 
            'GlaugRailCannons', 'RegultAutoCannons', 'Glaug150mmSRM'
        ],
        handtohand: [
            'Body Block', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    GluuhaugRegult: {
        name: 'Gluuhaug Regult',
        speed: 4,
        piloting: 2,
        gunnery: 2,
        defense: 5,
        damage: 5,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : false,
            'Focus Fire'          : true,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : true,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'RegultHeavyParticleCannons', 'RegultAutoCannons', 'Regult313mmMRM'
        ],
        handtohand: [
            'Body Block', 'Kick', 'Jump Kick', 'Stomp'
        ]
    },
    NousjadeulGer: {
        name: 'Nousjadeul-Ger',
        speed: 5,
        piloting: 3,
        gunnery: 2,
        defense: 6,
        damage: 10,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : true,
            'Hands'               : true,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'NousjadeulGerChargedParticleCannon', 'NousjadeulGer64mmGrenadeLauncher',
            'NousjadeulGer32mmPlasmaMachinePistol'
        ],
        handtohand: [
            'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    QueadluunRau: {
        name: 'Queadluun-Rau',
        speed: 12,
        piloting: 3,
        gunnery: 3,
        defense: 6,
        damage: 12,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : true,
            'Hands'               : true,
            'Hover'               : true,
            'Jettison'            : false,
            'Leadership'          : 2,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'NousjadeulGerChargedParticleCannon', 'NousjadeulGer64mmGrenadeLauncher',
            'NousjadeulGer32mmPlasmaMachinePistol'
        ],
        handtohand: [
            'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    QuelRegult: {
        name: 'Quel-Regult',
        speed: 6,
        piloting: 3,
        gunnery: '-',
        defense: 6,
        damage: 5,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : false,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : 2,
            'Leap'                : true,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        ],
        handtohand: [
            'Body Block', 'Kick', 'Jump Kick', 'Stomp'
        ],
        extraabilities: {
            'Advanced Reconnaissance Suite': 'Spend 2 command points to give +1 to strike to mecha within 12\'',
            'Electronic Attack Suite': 'Spend 1 command point to give -1 to strike to enemy mecha within 24\'',
        }
    },
    Regult: {
        name: 'Regult',
        speed: 5,
        piloting: 2,
        gunnery: 1,
        defense: 6,
        damage: 5,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : false,
            'Focus Fire'          : true,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : true,
            'Life is Cheap'       : true,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'RegultHeavyParticleCannons', 'RegultAutoCannons', 'RegultAirDefenseLasers'
        ],
        handtohand: [
            'Body Block', 'Kick', 'Jump Kick', 'Stomp'
        ]
    },
    SerauhaugRegult: {
        name: 'Serauhaug-Regult',
        speed: 4,
        piloting: 2,
        gunnery: 2,
        defense: 5,
        damage: 5,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : false,
            'Focus Fire'          : true,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : true,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'RegultHeavyParticleCannons', 'RegultAutoCannons', 
            'Regult791mmBallisticMissile'
        ],
        handtohand: [
            'Body Block', 'Kick', 'Jump Kick', 'Stomp'
        ],
    },
    VF1AValkyrie: {
        name: 'VF-1A Valkyrie',
        damage: 14,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': true,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'ValkyrieWingHardPoints', 'ValkyrieHeadLaser',
            'GU11Battloid', 'GU11', 'GU11Fighter'
        ],
        modes: {
            Battloid: {
                speed: 5,
                piloting: 2,
                gunnery: 3,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                    'GU11Battloid', 'ValkyrieHeadLaser'
                ],
                handtohand: [
                    'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                    'Power Punch', 'Stomp'
                ],
            },
            Guardian: {
                speed: 10,
                piloting: 3,
                gunnery: 2,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : true,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                    'GU11', 'ValkyrieWingHardPoints', 'ValkyrieHeadLaser'
                ],
                handtohand: [
                    'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 12,
                piloting: 2,
                gunnery: 2,
                defense: 6,
                abilities: {
                    'Afterburner'         : true,
                    'Aircraft'            : true,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : true,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : false,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                    'GU11Fighter', 'ValkyrieWingHardPoints', 'ValkyrieHeadLaser'
                ],
                handtohand: [
                    'None'
                ],
            }
        }
    },
    VF1JValkyrie: {
        name: 'VF-1J Valkyrie',
        damage: 14,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': true,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers',
            'GU11Battloid', 'GU11', 'GU11Fighter'
        ],
        modes: {
            Battloid: {
                speed: 5,
                piloting: 3,
                gunnery: 4,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                    'GU11Battloid', 'ValkyrieDualHeadLasers'
                ],
                handtohand: [
                    'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                    'Power Punch', 'Stomp'
                ]
            },
            Guardian: {
                speed: 10,
                piloting: 4,
                gunnery: 3,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : true,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                    'GU11', 'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers'
                ],
                handtohand: [
                    'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 12,
                piloting: 3,
                gunnery: 3,
                defense: 6,
                abilities: {
                    'Afterburner'         : true,
                    'Aircraft'            : true,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : true,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : false,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                    'GU11Fighter', 'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers'
                ],
                handtohand: [
                    'None'
                ]
            }
        },
    },
    VF1SValkyrie: {
        name: 'VF-1S Valkyrie',
        damage: 14,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': true,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers',
            'GU11Battloid', 'GU11', 'GU11Fighter'
        ],
        modes: {
            Battloid: {
                speed: 5,
                piloting: 4,
                gunnery: 4,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                    'GU11Battloid', 'ValkyrieQuadHeadLasers'
                ],
                handtohand: [
                    'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                    'Power Punch', 'Stomp'
                ]
            },
            Guardian: {
                speed: 10,
                piloting: 5,
                gunnery: 4,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : true,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                    'GU11', 'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers'
                ],
                handtohand: [
                    'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 12,
                piloting: 4,
                gunnery: 3,
                defense: 6,
                abilities: {
                    'Afterburner'         : true,
                    'Aircraft'            : true,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : true,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : false,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                    'GU11Fighter', 'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers'
                ],
                handtohand: [
                    'None'
                ]
            }
        },
    },
}
})();