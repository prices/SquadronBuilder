//
// SquadronBuilder is an inteface to build forces for Robotech RPG Tactics.
// Copyright (c) 2015 Scott Price <prices@dflytech.com>
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 3
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
//
var SquadronBuilder = {};
(function ()
{
    // svg.js breaks this
    //"use strict";
//
// This is our data
//
SquadronBuilder.data = {
    //
    // This returns a copy of a mecha object.
    //
    // Function Parameters:
    //      mecha The name of the mecha to retrieve
    //
    // Return:
    //      Mecha object or empty object
    //
    getMecha: function (mecha)
    {
        if (this.mecha[mecha]) {
            return JSON.parse(JSON.stringify(this.mecha[mecha]));
        }
        return {};
    },
    //
    // This returns a copy of a mecha object.
    //
    // Function Parameters:
    //      mecha The name of the mecha to retrieve
    //
    // Return:
    //      Mecha object or empty object
    //
    getWeapon: function (weapon)
    {
        if (this.weapons[weapon]) {
            return JSON.parse(JSON.stringify(this.weapons[weapon]));
        }
        return {};
    }
};
//
// This is our force cards
//
SquadronBuilder.force = {
    //
    // This returns a copy of a core force object.
    //
    // Function Parameters:
    //      card The name of card to retrieve
    //
    // Return:
    //      Card object or empty object
    //
    getCore: function (card)
    {
        if (this.core[card]) {
            var cd = JSON.parse(JSON.stringify(this.core[card]));
            cd.card = this.core[card];
            return cd;
        }
        return {};
    },
    //
    // This returns a copy of a core force object.
    //
    // Function Parameters:
    //      card The name of card to retrieve
    //
    // Return:
    //      Card object or empty object
    //
    getSupport: function (card)
    {
        if (this.support[card]) {
            var cd = JSON.parse(JSON.stringify(this.support[card]));
            cd.card = this.support[card];
            return cd;
        }
        return false;
    },
    //
    // This returns a copy of a core force object.
    //
    // Function Parameters:
    //      card The name of card to retrieve
    //
    // Return:
    //      Card object or empty object
    //
    getSpecial: function (card)
    {
        if (this.special[card]) {
            var cd = JSON.parse(JSON.stringify(this.special[card]));
            cd.card = this.special[card];
            return cd;
        }
        return false;
    },
    //
    // This returns a copy of a core force object.
    //
    // Function Parameters:
    //      card The name of card to retrieve
    //
    // Return:
    //      Card object or empty object
    //
    getCharacter: function (card)
    {
        if (this.characters[card]) {
            var cd = JSON.parse(JSON.stringify(this.characters[card]));
            cd.card = this.characters[card];
            return cd;
        }
        return false;
    },
    //
    // This returns all of the cards for a faction.
    //
    // Function Parameters:
    //      faction The faction to retrieve
    //
    // Return:
    //      object containing cards
    //
    getFaction: function (faction)
    {
        var cards = {
            core: {},
            support: {},
            special: {},
            characters: {},
        };
        for (var card in this.core) {
            if (this.core[card].factions.indexOf(faction) != -1) {
                cards.core[card] = this.getCore(card);
            }
        }
        for (var card in this.support) {
            if (this.support[card].factions.indexOf(faction) != -1) {
                cards.support[card] = this.getSupport(card);
            }
        }
        for (var card in this.special) {
            if (this.special[card].factions.indexOf(faction) != -1) {
                cards.special[card] = this.getSpecial(card);
            }
        }
        for (var card in this.characters) {
            if (this.characters[card].factions.indexOf(faction) != -1) {
                cards.characters[card] = this.getCharacter(card);
            }
        }
        return cards;
    },
};
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
    // The default color if no other is specified
    _color: '#000000',
    // The padding between things, in mm
    padding: 1,
    // The size of our boxes, in mm
    boxsize: 3,
    // Box spacing multiplier
    boxmult: 1.2,
    // This is the size of normal text in mm
    smallsize: 1.75,
    // This is the size of normal text in mm
    normalsize: 2.75,
    // This is the size of normal text in mm
    largesize: 4,
    // This is the size of normal text in mm
    headersize: 5,
    // This is the default maximum number of boxes in a row
    boxesperrow: 9,
    // This is our font family
    fontfamily: "sans-serif",
    // This is our groups from all of this.
    _elements: [],
    // This is statistics from our last text written
    _textstats: {
        size: 0,
        weight: 'normal',
        length: 0,
        lines: 0
    },
    //
    // Returns the canvas
    //
    // Function Parameters:
    //      canvas If set, the canvas is set to this
    //
    // Return:
    //      The group
    //
    canvas: function (canvas)
    {
        if (canvas) {
            this._canvas = canvas;
        }
        return this._canvas;
    },
    //
    // Creates a group with all of the items
    //
    // Function Parameters:
    //      x     The x coordinate of the top left of the first box
    //      y     The y coordinate of the top left of the first box
    //      stuff The stuff to group.  This should be an array.
    //
    // Return:
    //      The group
    //
    _group: function (x, y, stuff)
    {
        var group = this._canvas.group();
        for (var k in stuff) {
            group.add(stuff[k]);
        }
        return group;
    },
    //
    // This function is used to check if this weapon uses ammo
    //
    // Return:
    //      true if this weapon uses ammo
    group: function ()
    {
        return this._group(this._elements);
    },
    //
    // Creates a box on the screen
    //
    // Function Parameters:
    //      x      The x coordinate of the top left of the first box
    //      y      The y coordinate of the top left of the first box
    //      width  The width of the box
    //      height The height of the box
    //      color  The color the boxes
    //
    // Return:
    //      The height of the box
    //
    box: function (x, y, width, height, color)
    {
        var rect = this._canvas.rect(
            width+"mm", height+"mm"
        ).x(x+"mm").y(y+"mm").stroke({ color: color, opacity: 1, width: '0.3mm' }).fill("none");

        this._elements.shift(rect);

        return rect;
    },
    //
    // Calculates the width of a set of boxes
    //
    // Function Parameters:
    //      x     The x coordinate of the top left of the first box
    //      y     The y coordinate of the top left of the first box
    //      boxes The number of boxes to print out
    //      rows  The number of rows to print
    //      color The color the boxes
    //
    // Return:
    //      The height of the boxes
    //
    boxeswidth: function (boxes, rows)
    {
        if ((boxes > this.boxesperrow) && !rows) {
            rows = 2;
        } else {
            rows  = rows ? rows : 1;
        }
        if (rows > 1) {
            boxes = parseInt((boxes / rows) + 1, 10);
        }
        return this.boxsize * boxes * this.boxmult;
    },
    //
    // Creates a row or more of boxes for damage, ammo, or other.
    //
    // Function Parameters:
    //      x     The x coordinate of the top left of the first box
    //      y     The y coordinate of the top left of the first box
    //      boxes The number of boxes to print out
    //      rows  The number of rows to print
    //      color The color the boxes
    //
    // Return:
    //      The height of the boxes
    //
    boxes: function (x, y, boxes, rows, color)
    {
        if ((boxes > this.boxesperrow) && !rows) {
            rows = 2;
        } else {
            rows  = rows ? rows : 1;
        }
        color = color ? color : this._color;
        var dx = x;
        var dy = y;
        var cutoff = parseInt((boxes / rows) + 1, 10);
        var rect = [];
        for (var  i = 0; i < boxes; i++) {
            if ((i > 0) && ((i % cutoff) == 0)) {
                dy += this.boxsize * this.boxmult;
                dx = x;
            }
            rect[i] = this._canvas.rect(
                this.boxsize+"mm", this.boxsize+"mm"
            ).x(dx+"mm").y(dy+"mm").stroke({ color: color, opacity: 1, width: '0.3mm' }).fill("none");
            dx += this.boxsize * this.boxmult;
        }
        this._elements.push(this._group(x, y, rect));

        height = dy - y + (this.boxsize * this.boxmult);
        return height;
    },
    //
    // Creates large text
    //
    // Function Parameters:
    //      x    The x coordinate of the top left of the first box
    //      y    The y coordinate of the top left of the first box
    //      text The text to print out
    //
    // Return:
    //      The height of the text
    //
    large: function(x, y, text)
    {
        return this._text(
            x, 
            y, 
            text, 
            this.largesize, 
            this.fontfamily,
            'normal'
        );
    },
    //
    // Creates large bold text
    //
    // Function Parameters:
    //      x    The x coordinate of the top left of the first box
    //      y    The y coordinate of the top left of the first box
    //      text The text to print out
    //
    // Return:
    //      The height of the text
    //
    largebold: function(x, y, text)
    {
        return this._text(
            x, 
            y, 
            text, 
            this.largesize, 
            this.fontfamily,
            'bold'
        );
    },
    //
    // Creates normal text
    //
    // Function Parameters:
    //      x    The x coordinate of the top left of the first box
    //      y    The y coordinate of the top left of the first box
    //      text The text to print out
    //
    // Return:
    //      The height of the text
    //
    normal: function(x, y, text)
    {
        return this._text(
            x, 
            y, 
            text, 
            this.normalsize, 
            this.fontfamily,
            'normal'
        );
    },
    //
    // Creates normal bold text
    //
    // Function Parameters:
    //      x    The x coordinate of the top left of the first box
    //      y    The y coordinate of the top left of the first box
    //      text The text to print out
    //
    // Return:
    //      The height of the text
    //
    bold: function(x, y, text)
    {
        return this._text(
            x, 
            y, 
            text, 
            this.normalsize, 
            this.fontfamily,
            'bold'
        );
    },
    //
    // Creates small text
    //
    // Function Parameters:
    //      x    The x coordinate of the top left of the first box
    //      y    The y coordinate of the top left of the first box
    //      text The text to print out
    //
    // Return:
    //      The height of the text
    //
    small: function(x, y, text)
    {
        return this._text(
            x, 
            y, 
            text, 
            this.smallsize, 
            this.fontfamily,
            'normal'
        );
    },
    //
    // Creates header text
    //
    // Function Parameters:
    //      x    The x coordinate of the top left of the first box
    //      y    The y coordinate of the top left of the first box
    //      text The text to print out
    //
    // Return:
    //      The height of the text
    //
    header: function(x, y, text)
    {
        return this._text(
            x, 
            y, 
            text, 
            this.headersize, 
            this.fontfamily,
            'bold'
        );
    },
    //
    // Creates large text
    //
    // Function Parameters:
    //      x      The x coordinate of the top left of the first box
    //      y      The y coordinate of the top left of the first box
    //      text   The text to print out
    //      font   The font to use to print out the text
    //      weight Either 'normal' or 'bold'
    //
    // Return:
    //      The height of the text
    //
    _text: function(x, y, text, size, font, weight)
    {
        var height = 0;
        // This moves us to the middle of the text, where the coordinates for text are
        y += size / 2;
        var self = this;
        var print = text.split("\n");
        var len = 0;
        var lines = 0;
        var text = this._canvas.text(function(add) {
            // This accomodates multiple lines
            for (var key in print) {
                var span = add.tspan(print[key]);
                if (height > 0) {
                    span.x(x+'mm').dy(size+'mm');
                }
                height += size;
                if (print[key].length > len) {
                    len = print[key].length;
                }
                lines++;
            }
        }).x(
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
        this._elements.shift(text);
        this._textstats = {
            size: size,
            weight: weight,
            len: len,
            lines: lines
        };
        return height;
    },
    //
    // Changes the X-coordinate of this canvas
    //
    // Function Parameters:
    //      x The x coordinate of the top left of the first box
    //
    // Return:
    //      This object
    //
    x: function(x)
    {
        if (this._canvas) {
            this._canvas.x(x+"mm")
        }
        return this;
    },
    //
    // Changes the Y-coordinate of this canvas
    //
    // Function Parameters:
    //      y The y coordinate of the top left of the first box
    //
    // Return:
    //      This object
    //
    y: function(y)
    {
        if (this._canvas) {
            this._canvas.y(y+"mm")
        }
        return this;
    },
    //
    // This guesses the width of text
    //
    textwidth: function()
    {
        var width = ((this._textstats.size * this._textstats.len / 1.70) + 3);
        return width;
    },
};

// This class deals with a weapon  It prints out everything to do with it.
//
// Class Parameters:
//      canvas The canvas to use
//      weapon The name of a weapon
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
    this._canvas = canvas;
    this.class   = weapon;
    this.weapon  = SquadronBuilder.data.getWeapon(weapon);
    this.width   = width ? width : 70;
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
        for (var name in this.weapon.abilities) {
            value = this.weapon.abilities[name];
            if (value === true) {
                abilities += ', '+name;
            } else if (value !== false) {
                abilities += ', '+name+' '+value;
            }
        }
        x += this.padding;
        y += this.padding * 2;
        y += this.normal(x, y, this.weapon.name);
        y += this.small(x, y, abilities);
        y += this.padding;
        this.height = y - dy;

        this.box(dx, dy, this.width, this.height, this._color);

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
        this.small(dx, dy, this.weapon.name.substring(0, 35));

        var bx = dx + this.width - this.boxeswidth(this.boxesperrow, false) - (this.padding * 1.5);
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
SquadronBuilder.mecha = function (canvas, mecha, width, count) {
    this._canvas     = canvas;
    this.class       = mecha;
    this.count       = count;
    this.mecha       = SquadronBuilder.data.getMecha(mecha);
    this.width       = width ? width : 95;
    this.columnwidth = this.width;
    if (this.hasJettison()) {
        this._jettisonto = new SquadronBuilder.mecha(
            this._canvas, this.mecha.abilities.Jettison, this.width
        );
        this.width = this.width * 2;
    }
};
SquadronBuilder.mecha.prototype = BaseClass.extend({
    height: 0,
    _jettisonto: null,
    _colors: ['#CF0000', '#CFCF00', '#00CF00', '#31DFF9', '#D131F9', '#F99431'],
    _wpncolors: {},
    _jcolor: '#0000CF',
    _weapon: [],
    _character: false,
    rendered: false,
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
        this.move(x, y);
        // Set up our weapons
        var color = 0;
        this.count = count ? count : this.count;
        if (this.count == 0) {
            return;
        }
        var weapon = [];
        var width = this.columnwidth - (this.padding * 2);
        var hasammo = false;
        var wps = this.mecha.ranged;
        if (this.hasJettison()) {
            wps = this._jettisonto.mecha.ranged.slice();
            for (var key in this.mecha.ranged) {
                if (wps.indexOf(this.mecha.ranged[key]) == -1) {
                    wps.push(this.mecha.ranged[key]);
                }
            }
        }
        for (var key in wps) {
            var wpn = wps[key];
            weapon[key] = new Weapon(
                this._canvas,
                wpn,
                width
            );
            if (weapon[key].hasAmmo()) {
                this._wpncolors[wpn] = this._colors[color++];
                weapon[key].color(this._wpncolors[wpn]);
                hasammo = true;
            }
        }

        // Set up the x and y
        var dy = y = 0;
        var dx = x = 0;
        dx += this.padding;
        dy += this.padding;
        
        if (this._character) {
            dy += this.padding * 2;
            dy += this.header(dx, dy, this._character);
            this.count = 1;
        } else {
            dy += this.padding;
        }
        
        // This does the names and damage boxes
        var nx = dx + this.padding;
        var ny = dy;
        for (var  i = 0; i < this.count; i++) {
            
            // Put in the mecha name
            sy = ny;
            if (hasammo) {
                ny += this.padding * 2;
            }
            this.large(nx, ny, this.mecha.name);
            
            // Put in the damage boxes
            var bx = nx + this.textwidth();
            var by = ny + (this.largesize / 2) - (this.boxsize / 2) - this.padding;
            var h = this.boxes(bx, by, this.mecha.damage);

            if (this.mecha.extradamage) {
                // Put in the extradamage boxes
                by += h;
                h += this.boxes(bx, by, this.mecha.extradamage, 1, this._jcolor);
            }

            ny  = (h > this.largesize) ? ny + h + this.padding: ny + this.largesize;
            if (hasammo) {
                ny += this.padding;
            }
            // Add any ammo boxes we need for this mecha
            for (var key in weapon) {
                if (weapon[key].hasAmmo()) {
                    ny += weapon[key].ammo(nx, ny);
                }
            }
            ny += this._jettison(nx, ny);
            // Add a box around it if it had ammo and we have more than 1
            if (hasammo && (this.count > 1)) {
                var height = ny - sy;
                var width  = this.columnwidth - (this.padding * 2);
                this.box(dx, sy, width, height, "#000000");
            }
        }
        dy  = ny + (this.padding * 2);
        dy += this._mechaRender(dx, dy, this.mecha);
        
        var jheight = 0;
        if (this.hasJettison()) {
            this._jettisonto.jettisonTo(dx + this.columnwidth, y + this.padding);
            jheight = this._jettisonto.height;
        }
        
        
        // Put a rectangle around it all
        this.height = (jheight < dy - y) ? dy - y : jheight;

        this.box(x, y, this.width, this.height, "#000000");
        
        this._canvas.width(this.width+'mm').height(this.height+'mm');

        this.rendered = true;
        // This is the end
        return this;
    },
    //
    // This function moves the canvas
    //
    // Function Parameters:
    //      x The x coordinate of the top left corner of this object
    //      y The y coordintate of the top left corner of this object
    //
    // Return:
    //      This object
    //
    move: function (x, y)
    {
        this._canvas.x(x+'mm').y(y+'mm');
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
    remove: function ()
    {
        this._canvas.clear();
        this.rendered = false;
    },
    //
    // Returns the canvas
    //
    // Function Parameters:
    //      canvas If set, the canvas is set to this
    //
    // Return:
    //      The group
    //
    canvas: function (canvas)
    {
        if (canvas) {
            this._canvas = canvas;
            if (this.hasJettison()) {
                this._jettisonto.canvas(canvas);
            }
        }
        return this._canvas;
    },
    //
    // This function renders the jettison to output for this object
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
        
//        this.box(dx, dy - (this.largesize / 4), this.largesize, this.largesize, this._jcolor);

//        var bx = dx + (this.boxsize * 2);

        dy += this.largebold(dx, dy, 'Jettison to '+this.mecha.name);
        dy += this.padding;
        dy += this._mechaRender(dx, dy, this.mecha);

        this.height = dy - y;        
        
        // This is the end
        return this;
    },
    //
    // This function renders the main part of a mecha
    //
    // Function Parameters:
    //      x     The x coordinate of the top left corner of this object
    //      y     The y coordintate of the top left corner of this object
    //      mecha The mecha object to render
    //
    // Return:
    //      The height of this render
    //
    _mechaRender: function (x, y, mecha)
    {

        // Set up the x and y
        var dy = y;
        var dx = x;

        if (mecha.modes) {
            dy += this._abilities(dx, dy, mecha);
            dy += this.padding;
            for (var mode in mecha.modes) {
                dy += this.padding;
                dy += this.largebold(dx, dy, mode);
                dy += this._baseRender(dx, dy, mecha.modes[mode]);
            }
        } else {
            dy += this._baseRender(dx, dy, mecha);
        }
        dy += this._extraabilities(dx, dy, mecha);
        // This is the end
        return dy - y;
    },
    //
    // This function renders the base part of a mecha, without the name or damage
    //
    // Function Parameters:
    //      x     The x coordinate of the top left corner of this object
    //      y     The y coordintate of the top left corner of this object
    //      mecha The mecha object to render
    //
    // Return:
    //      The height of this render
    //
    _baseRender: function (x, y, mecha)
    {

        // Set up the x and y
        var dy = y;
        var dx = x;

        dy += this._ranged(dx, dy, mecha);
        dy += this.padding * 2;
        dy += this._handtohand(dx, dy, mecha);
        dy += this.padding;
        dy += this._stats(dx, dy, mecha);
        dy += this.padding * 2;
        dy += this._abilities(dx, dy, mecha);
        dy += this.padding;

        // This is the end
        return dy - y;
    },
    //
    // This function renders the ranged weapons for a mecha
    //
    // Function Parameters:
    //      x     The x coordinate of the top left corner of this object
    //      y     The y coordintate of the top left corner of this object
    //      mecha The mecha object to render
    //
    // Return:
    //      The height of this render
    //
    _ranged: function(x, y, mecha)
    {
        var dx    = x;
        var dy    = y;
        // Add in the ranged weapons
        dy += this.bold(dx, dy, "Ranged:");
        for (var key in mecha.ranged) {
            var wpn = mecha.ranged[key];
            var weapon = new Weapon(
                this._canvas,
                wpn,
                (this.columnwidth - (this.padding * 2))
            );
            if (weapon.hasAmmo()) {
                weapon.color(this._wpncolors[wpn]);
            }
            weapon.render(dx, dy);
            dy += weapon.height;
            this._elements.push(weapon.group());
        }
        return dy - y;
    },
    //
    // This function renders the hand to hand combat for a mecha
    //
    // Function Parameters:
    //      x     The x coordinate of the top left corner of this object
    //      y     The y coordintate of the top left corner of this object
    //      mecha The mecha object to render
    //
    // Return:
    //      The height of this render
    //
    _handtohand: function(x, y, mecha)
    {
        var dx = x;
        var dy = y;
        // Add in the hand to hand combat
        this.bold(dx, dy, "Hand to Hand:");
        dy += this.normalsize;
        var sep = "";
        var hth = "";
        var len = 0;
        for (var key in mecha.handtohand) {
            text = sep + mecha.handtohand[key];
            if ((hth.length + text.length - len) > 80) {
                len = hth.length;
                hth += text.replace(', ', ", \n");
            } else {
                hth += text;
            }

            sep = ", ";
        }
        dy += this.normal(dx, dy, hth);
        return dy - y;
    },
    //
    // This function renders the hand to hand combat for a mecha
    //
    // Function Parameters:
    //      x     The x coordinate of the top left corner of this object
    //      y     The y coordintate of the top left corner of this object
    //      mecha The mecha object to render
    //
    // Return:
    //      The height of this render
    //
    _extraabilities: function(x, y, mecha)
    {
        var dx = x;
        var dy = y;
        if (mecha.extraabilities) {
            // Add in the hand to hand combat
            dy += this.bold(dx, dy, "Extra Abilities:");
            var len = 0;
            for (var key in mecha.extraabilities) {
                dy += this.normal(dx, dy, key);
                dy += this.small(dx, dy, mecha.extraabilities[key]);
                dy += this.padding;
            }
        }
        return dy - y;

    },
    //
    // This function renders the stats of a mecha
    //
    // Function Parameters:
    //      x     The x coordinate of the top left corner of this object
    //      y     The y coordintate of the top left corner of this object
    //      mecha The mecha object to render
    //
    // Return:
    //      The height of this render
    //
    _stats: function(x, y, mecha)
    {
        var width = this.columnwidth - (2 * this.padding);
        dx = x + this.padding;
        dy = y + (this.padding * 2);
        this.normal(dx, dy, "Speed: "+mecha.speed);
        dx += (width / 4);
        this.normal(dx, dy, "Pilot: "+mecha.piloting);
        dx += (width / 5.5);
        this.normal(dx, dy, "Gunnery: "+mecha.gunnery);
        dx += (width / 3.5);
        dy += this.normal(dx, dy, "Defense: "+mecha.defense);
        height = dy - y;
        this.box(x, y, width, height, '#000000');
        return height;
    },
    //
    // This function renders the special abilities of a mecha
    //
    // Function Parameters:
    //      x     The x coordinate of the top left corner of this object
    //      y     The y coordintate of the top left corner of this object
    //      mecha The mecha object to render
    //
    // Return:
    //      The height of this render
    //
    _abilities: function(x, y, mecha)
    {
        var dx = x;
        var dy = y;
        // Add in the hand to hand combat
        this.bold(dx, dy, "Special Abilities:");
        dy += this.normalsize;
        var sep = "";
        var abl = "";
        var len = 0;
        for (var key in mecha.abilities) {
            var abil = mecha.abilities[key];
            var text = '';
            if (abil === true) {
                text = sep+key;
                sep = ', ';
            } else if (abil !== false) {
                if (key == 'Jettison') {
                    text = sep+key+' to '+this._jettisonto.mecha.name;
                } else {
                    text = sep+key+' '+abil;
                }
                sep = ', ';
            }
            if ((abl.length + text.length - len) > 80) {
                len = abl.length;
                abl += text.replace(', ', ", \n");
            } else {
                abl += text;
            }
        }
        dy += this.normal(dx, dy, abl);
        return dy - y;
    },
    //
    // This function replaces a weapon in one or more modes
    //
    // Function Parameters:
    //      oldwpn The weapon to replace
    //      newwpn The weapon to replace it with
    //      modes  The modes to replace the weapon in
    //
    replaceWeapon: function(oldwpn, newwpn, modes)
    {
        var index = this.mecha.ranged.indexOf(oldwpn);
        if (index >= 0) {
            this.mecha.ranged[index] = newwpn;
        }
        if (this.mecha.modes) {
            modes = modes ? modes : Object.keys(this.mecha.modes);
            for (var key in modes) {
                var index = this.mecha.modes[modes[key]].ranged.indexOf(oldwpn);
                if (index >= 0) {
                    this.mecha.modes[modes[key]].ranged[index] = newwpn;
                }
            }
        }
        if (this._jettisonto) {
            // Fix up the jettison mecha also
            this._jettisonto.replaceWeapon(oldwpn, newwpn, modes);
        }
    },
    //
    // This function adds a weapon in one or more modes
    //
    // Function Parameters:
    //      wpn   The weapon to add
    //      modes The modes to add it to
    //
    addWeapon: function(wpn, modes)
    {
        this.mecha.ranged.push(wpn);
        if (this.mecha.modes) {
            modes = modes ? modes : Object.keys(this.mecha.modes);
            for (var key in modes) {
                this.mecha.modes[modes[key]].ranged.push(wpn);
            }
        }
        if (this._jettisonto) {
            // Fix up the jettison mecha also
            this._jettisonto.addWeapon(wpn, modes);
        }
    },
    //
    // This function adds to or subtracts from a stat
    //
    // Function Parameters:
    //      stat  The stat to change
    //      vaue  The value to change it to
    //      modes The modes to change the values in
    //
    changeStat: function(stat, value, modes)
    {
        value = parseInt(value, 10) || 0;

        if (typeof this.mecha[stat] === 'number') {
            this.mecha[stat] += value;
        }
        if (this.mecha.modes) {
            modes = modes ? modes : Object.keys(this.mecha.modes);
            for (var key in this.mecha.modes) {
                if (typeof this.mecha.modes[key][stat] === 'number') {
                    this.mecha.modes[key][stat] += value;
                }
            }
        }
        if (this._jettisonto) {
            // Fix up the jettison mecha also
            this._jettisonto.changeStat(stat, value);
        }
    },
    //
    // This function adds to or subtracts from a stat
    //
    // Function Parameters:
    //      stat  The stat to change
    //      vaue  The value to change it to
    //      modes The modes to change the values in
    //
    setStat: function(stat, value, modes)
    {
        value = parseInt(value, 10) || 0;

        this.mecha[stat] = value;
        if (this.mecha.modes) {
            modes = modes ? modes : Object.keys(this.mecha.modes);
            for (var key in modes) {
                this.mecha.modes[modes[key]][stat] = value;
            }
        }
        if (this._jettisonto) {
            // Fix up the jettison mecha also
            this._jettisonto.setStat(stat, value, modes);
        }
    },
    //
    // This function returns a stat
    //
    // Function Parameters:
    //      stat  The stat to get
    //      modes The modes to get
    //
    getStat: function(stat, modes)
    {
        if (this.mecha.modes) {
            var ret = {};
            modes = modes ? modes : Object.keys(this.mecha.modes);
            for (var key in modes) {
                if (typeof this.mecha.modes[modes[key]][stat] != 'undefined') {
                    ret[modes[key]] = this.mecha.modes[modes[key]][stat];
                }
            }
        } else {
            var ret = this.mecha[stat];
        }
        return ret;
    },
    //
    // This function adds a weapon in one or more modes
    //
    // Function Parameters:
    //      stat  The stat to change
    //      vaue  The value to change it to
    //
    changeAbility: function(stat, value)
    {
        value = parseInt(value, 10) || 0;

        if (typeof this.mecha.abilities[stat] === 'number') {
            this.mecha.abilities[stat] += value;
        }
        if (this._jettisonto) {
            // Fix up the jettison mecha also
            this._jettisonto.changeAbility(stat, value);
        }
    },
    //
    // Attaches a character to this mecha
    //
    // Function Parameters:
    //      name The name of the character
    //
    // Return:
    //      true if successful, false otherwise
    character: function(name)
    {
        if (name) {
            if (this.count == 1) {
                this._character = name;
            }
        }
        return this._character;
    },
    //
    // This function adds a weapon in one or more modes
    //
    // Function Parameters:
    //      stat  The stat to change
    //      vaue  The value to change it to
    //
    setAbility: function(stat, value)
    {
        if (typeof this.mecha.abilities[stat] !== 'undefined') {
            this.mecha.abilities[stat] = value;
        }
        if (this._jettisonto) {
            // Fix up the jettison mecha also
            this._jettisonto.setAbility(stat, value);
        }
    },
    //
    // This function get the value of an ability
    //
    // Function Parameters:
    //      stat  The stat to get
    //
    getAbility: function(stat)
    {
        return this.mecha.abilities[stat];
    },
    //
    // This function adds an extra ability to the mecha
    //
    // Function Parameters:
    //      name The name of the ability
    //      desc The description of the ability
    //
    addExtraAbility: function(name, value)
    {
        if (!this.mecha.extraabilities) {
            this.mecha.extraabilities = {};
        }
        this.mecha.extraabilities[name] = value;
    },
    //
    // This function adds an extra hand to hand ability to the mecha
    //
    // Function Parameters:
    //      name The name of the ability
    //
    addHandToHand: function(name)
    {
        this.mecha.handtohand.push(name);
    },
    //
    // This function is used to check if this weapon uses ammo
    // 
    // Return:
    //      true if this weapon uses ammo
    //
    hasJettison: function ()
    {
        if (this.mecha.abilities) {
            return (this.mecha.abilities.Jettison !== false);
        }
        return false;
    },
    // This function renders the extra checkbox for a mecha with the Jettison
    // special ability.
    //
    // Function Parameters:
    //      x The x coordinate of the top left corner of this object
    //      y The y coordintate of the top left corner of this object
    //
    // Return:
    //      The height of this render
    //
    _jettison: function (x, y)
    {
        if (!this.hasJettison()) {
            return 0;
        }

        dx = x;
        dy = y
        by = y - (this.boxsize / 2);
        
        this.boxes(dx, by, 1, null, this._jcolor);
        
        name  = "Jettison to "+this._jettisonto.mecha.name;
        dx   += (this.boxsize * 1.4);
        diff  = this.bold(dx, dy, name);
        diff += this.padding;

        if (diff < (this.boxsize + this.padding)) {
            diff = this.boxsize + this.padding;
        }
        return diff;
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
SquadronBuilder.coreforce = function (canvas, card, width, height) {
    this._canvas = canvas;
    this.card  = SquadronBuilder.force.getCore(card);
    this.width  = width ? width : 95;
    this.height  = height ? height : 200;
    this.mecha = [];
    for (var mecha in this.card.mecha) {
        this.addMecha(mecha, this.card.mecha[mecha]);
    }
    this.upgrades = [];
};
SquadronBuilder.coreforce.prototype = BaseClass.extend({
    height: 0,
    columnwidth: 95,
    _weapon: [],
    _renderedMecha: [],
    _quads:[],
    _y: 0,
    _x: 0,
    //
    // This function renders the main output for this object
    //
    // Function Parameters:
    //      page   The page to render
    //
    // Return:
    //      This object
    //
    render: function (page)
    {
        this.width  = parseInt(this._canvas.width(), 10);
        this.height = parseInt(this._canvas.height(), 10);
        this.quads = [0, 0, 0, 0];
        this._y = 0;
        this._x = 0;
        this._y += this.padding * 3;
        this._y += this.header(0, this._y, this.card.name);
        this.largebold((this.width / 2), this._y, "Command Points: "+this.commandPoints());
        this._y += this.largebold(0, this._y, this.card.points+" Points");
        var done = 1;
        for (var key in this.mecha) {
            if (!this.mecha[key].rendered) {
                this.mecha[key].render(0, 0);
                var q = this.fitQuad(this.mecha[key].width, this.mecha[key].height);
                if (q) {
                    this.mecha[key].move(q.x, q.y);
                } else {
                    done = 0;
                    this.mecha[key].remove();
                }
            }
        }
        return done;
    },
    fitQuad: function (width, height)
    {

        // Quads:
        //  0 2
        //  1 3
        var quad = 0;
        var cwidth = (this.width/2) - (this.padding/2);
        var rheight = ((this.height - this._y)/2) - (this.padding/2);
        var c1x = this._x;
        var c2x = this._x + cwidth + this.padding;
        var r1y = this._y;
        var r2y = this._y + rheight + this.padding


        if ((width > cwidth) && (height > rheight)) {
            // All 4 quads
            if ((this.quads[0] == 0) && (this.quads[1] == 0) && (this.quads[2] == 0) && (this.quads[3] == 0)) {
                this.quads = [1, 1, 1, 1];
                return { 'x': c1x, 'y': r1y };
            }
        } else if ((width > cwidth) && (height <= rheight)) {
            // Two wide, one high
            if ((this.quads[0] == 0) && (this.quads[2] == 0)) {
                this.quads[0] = 1;
                this.quads[2] = 1;
                return { 'x': c1x, 'y': r1y };
            } else if((this.quads[1] == 0) && (this.quads[3] == 0)) {
                this.quads[1] = 1;
                this.quads[3] = 1;
                return { 'x': c1x, 'y': r2y };
            }
        } else if ((width <= cwidth) && (height > rheight)) {
            // one wide, two high
            if ((this.quads[0] == 0) && (this.quads[1] == 0)) {
                this.quads[0] = 1;
                this.quads[1] = 1;
                return { 'x': c1x, 'y': r1y };
            } else if((this.quads[2] == 0) && (this.quads[3] == 0)) {
                this.quads[2] = 1;
                this.quads[3] = 1;
                return { 'x': c2x, 'y': r1y };
            }
        } else {
            // one wide, one high
            if (this.quads[0] == 0) {
                this.quads[0] = 1;
                return { 'x': c1x, 'y': r1y };
            } else if (this.quads[1] == 0) {
                this.quads[1] = 1;
                return { 'x': c1x, 'y': r2y };
            } else if (this.quads[2] == 0) {
                this.quads[2] = 1;
                return { 'x': c2x, 'y': r1y };
            } else if (this.quads[3] == 0) {
                this.quads[3] = 1;
                return { 'x': c2x, 'y': r2y };
            }
        }

        return false;

    },
    commandPoints: function ()
    {
        var points = 0;
        for (var key in this.mecha) {
            var mpoints = 0;
            var abilities = this.mecha[key].mecha.abilities;
            if (!abilities['Life is Cheap']) {
                mpoints++;
            }
            if (abilities['Leadership']) {
                mpoints += abilities["Leadership"];
            }
            points += (mpoints * this.mecha[key].count);
        }
        return points;
    },
    //
    // This function returns the number of pages for this core force card.
    //
    // Function Parameters:
    //
    // Return:
    //      The number of pages
    //
    pages: function ()
    {
        var pages = 1;
        var pwidth = parseInt(this._canvas.width(), 10);
        var x = 0;
        for (var key in this.mecha) {
            if ((x + this.mecha[key].width) > pwidth) {
                x = 0;
                pages++;
            }
            x += this.mecha[key].width + this.padding;
        }
        return pages;
    },
        //
    // This function resets all of the render properties for this card.
    //
    // Return:
    //      This object
    //
    resetRender: function ()
    {
        for (var key in this.mecha) {
            this.mecha[key].rendered = false;
        }
        return this;
    },
    //
    // Returns the canvas
    //
    // Function Parameters:
    //      canvas If set, the canvas is set to this
    //
    // Return:
    //      The group
    //
    canvas: function (canvas)
    {
        if (canvas) {
            this._canvas = canvas;
            for (var key in this.mecha) {
                this.mecha[key].canvas(canvas.nested());
            }
        }
        return this._canvas;
    },
    //
    // This function adds an upgrade
    //
    // Function Parameters:
    //      name The name of the upgrade to run
    //
    // Return:
    //      This object
    //
    upgrade: function (name)
    {
        if (this.card.upgrades[name] && SquadronBuilder.force.upgrades[name]) {
            SquadronBuilder.force.upgrades[name].execute(this);
            this.card.points += this.card.upgrades[name];
            this.upgrades.push(name);
        }
        return this;
    },
    //
    // This function adds a support card
    //
    // Function Parameters:
    //      name The name of the support card to add
    //
    // Return:
    //      This object
    //
    support: function (name)
    {
        var card = SquadronBuilder.force.getSupport(name);
        return this._support(card);
    },
    //
    // This function adds a support card
    //
    // Function Parameters:
    //      name The name of the upgrade to run
    //
    // Return:
    //      This object
    //
    special: function (name)
    {
        var card = SquadronBuilder.force.getSpecial(name);
        return this._support(card);
    },
    //
    // This function adds a character card
    //
    // Function Parameters:
    //      name The name of the upgrade to run
    //
    // Return:
    //      This object
    //
    character: function (name)
    {
        var card = SquadronBuilder.force.getCharacter(name);
        if (card && this.checkCard("characters", name)) {
            for (var key in card.mecha) {
                var mecha = this.replaceMecha(
                    card.mecha[key],
                    card.mecha[key],
                    1,
                    function (mecha) { return !mecha.character(); }
                );
                if (mecha) {
                    mecha.character(card.name);
                    card.card.modifyMecha(mecha);
                    break;
                }
            }
            this.card.points += card.points;
        }
        return this;
    },
    //
    // This function adds a character card
    //
    // Function Parameters:
    //      name The name of the upgrade to run
    //
    // Return:
    //      This object
    //
    checkCard: function (type, name)
    {
        var card = null;
        var ret  = true;
        switch (type) {
            case 'characters':
                card = SquadronBuilder.force.getCharacter(name);
                mecha = this.getMecha();
                ret = false;
                for (key in card.mecha) {
                    var index = mecha.indexOf(card.mecha[key]);
                    if (index != -1) {
                        var char = this.mecha[index].character();
                        if (!char || (char == card.name)) {
                            ret = true;
                        }
                    }
                }
                break;
            case 'special':
                card = SquadronBuilder.force.getSpecial(name);
                break;
            case 'support':
                card = SquadronBuilder.force.getSupport(name);
                break;
            default:
                break;
        }
        if (card && card.card.check(this)) {
            return ret && true;
        }
        return false;
    },
    //
    // Sets the height of the page
    //
    // Function Parameters:
    //      height if set, then set the height to this.
    //
    // Return:
    //      The height
    //
    height: function (height)
    {
        if (height) {
            this.height = height;
        }
        return this.height;
    },
    //
    // This function adds an upgrade
    //
    // Function Parameters:
    //      name The name of the upgrade to run
    //
    // Return:
    //      This object
    //
    _support: function (card)
    {
        if (card && card.card.check(this)) {
            for (var key in card.upgrades) {
                if (this.card.upgrades[key]) {
                    this.card.upgrades[key] += card.upgrades[key];
                } else {
                    this.card.upgrades[key] = card.upgrades[key];
                }
            }
            for (var mecha in card.mecha) {
                this.addMecha(mecha, card.mecha[mecha]);
            }
            this.card.points += card.points;
            card.card.execute(this);
        }
        return this;
    },
    //
    // This function is to upgrade mecha.  It feeds them to the given function
    // one at a time.
    //
    // Function Parameters:
    //      funct   The function to call for each Mecha
    //      applyTo The mecha to apply this to
    //
    // Return:
    //      This object
    //
    upgradeMecha: function (funct, applyTo)
    {
        for (var key in this.mecha) {
            if (!applyTo || applyTo.indexOf(this.mecha[key].class) > -1) {
                funct(this.mecha[key]);
            }
        }
        return this;
    },
    //
    // This function replaces a mecha.
    //
    // Function Parameters:
    //      oldmecha The mecha to replace
    //      newmecha The mecha to replace it with
    //      count    The number of mecha
    //
    // Return:
    //      This object
    //
    replaceMecha: function (oldmecha, newmecha, count, checkFct)
    {
        for (var key in this.mecha) {
            if ((this.mecha[key].class == oldmecha) && ((typeof checkFct != "function") || checkFct(this.mecha[key]))) {
                if ((oldmecha == newmecha) && (this.mecha[key].count > count)) {
                    this.mecha[key].count -= count;
                    return this.addMecha(oldmecha, count, true);
                } else {
                    count = this.mecha[key].count;
                    this.mecha[key] = new SquadronBuilder.mecha(this._canvas, newmecha, this.width, count);
                    return this.mecha[key];
                }
            }
        }
        return false;
    },
    //
    // This function adds a mecha.
    //
    // Function Parameters:
    //      mecha The mecha to add
    //      count The number of mecha
    //      force This forces it to add the mecha as a new entry, rather than adding to the count
    //
    // Return:
    //      This object
    //
    addMecha: function (mecha, count, force)
    {
        force = force ? true : false;
        if (!force) {
            for (var key in this.mecha) {
                if (this.mecha[key].class == mecha) {
                    this.mecha[key].count += count;
                    return this;
                }
            }
        }
        this.mecha.push(
            new SquadronBuilder.mecha(this._canvas, mecha, this.width, count)
        );
        return this.mecha[this.mecha.length - 1];
    },
    //
    // This function returns the classes of all the mecha
    //
    // Return:
    //      The mecha classes in an array
    //
    getMecha: function ()
    {

        var mecha = [];
        for (var key in this.mecha) {
            mecha[key] = this.mecha[key].class;
        }
        return mecha;
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
SquadronBuilder.faction = function (container, updateFct) {
    this._container = document.getElementById(container);
    if (faction) {
        this.resetChoices(faction);
    }
    this._updateFct = updateFct ? updateFct : null;
};
SquadronBuilder.faction.prototype = BaseClass.extend({
    _canvas: null,
    index: 0,
    forces: [],
    cards: [],
    upgrades:[],
    _maxlines: 30,
    _factionid: '',
    //
    // This function creates an HTML id
    //
    // Function Parameters:
    //      id This is the stuff to work with.
    //
    // Return:
    //      The id
    //
    _id: function (id)
    {
        return this._factionid+'.'+id;
    },
    resetChoices: function(faction)
    {
        this._factionid = faction;
        this.faction = SquadronBuilder.force.getFaction(faction)
        this.index = 0;
        this._container.innerHTML = '';
        for (var i = 0; i < this._maxlines; i++) {
            this._container.innerHTML += '<div class="'+this._factionid+' row'+((i % 2 == 0)?1:0)+' grid choice" id="'+this._id('choice'+i)+'"></div>';
            document.getElementById(this._id('choice'+i)).style.display = 'none';
        }
        this.renderChoice();
    },
    getCoreForce: function ()
    {
        return this.forces;
    },
    getCount: function ()
    {
        return this.index;
    },
    getPointTotal: function ()
    {
        var total = 0;
        for (var i = 0; i < this.index; i++) {
            var d = document.getElementById(this._id('points'+i));
            if (d) {
                var p = parseInt(d.textContent, 10);
                if (!isNaN(p)) {
                    total += p;
                }
            }
        }
        return total;
    },
    _getCoreForce: function (index)
    {
        delete this.forces[index];
        this.forces[index] = {};
        delete this.cards[index];
        this.cards[index] = {};
        var c = document.getElementById(this._id('corechoice'+index));
        this.cards[index].core = c.options[c.selectedIndex].value;
        var s1 = document.getElementById(this._id('support1choice'+index));
        this.cards[index].support1 = s1.options[s1.selectedIndex].value;
        var s2 = document.getElementById(this._id('support2choice'+index));
        this.cards[index].support2 = s2.options[s2.selectedIndex].value;
        var sp = document.getElementById(this._id('specialchoice'+index));
        this.cards[index].special = sp.options[sp.selectedIndex].value;

        if (this.cards[index].core) {
            this.forces[index] = new SquadronBuilder.coreforce(null, this.cards[index].core, 95);
            if (this.cards[index].support1) {
                this.forces[index].support(this.cards[index].support1);
            }
            if (this.cards[index].support2) {
                this.forces[index].support(this.cards[index].support2);
            }
            if (this.cards[index].special) {
                this.forces[index].special(this.cards[index].special);
            }

            var ch = document.getElementById(this._id('characterchoice'+index));
            for (var key = 0; key < ch.length; key++) {
                if (ch[key].selected) {
                    this.forces[index].character(ch[key].value);
                }
            }

            for (var key in this.upgrades) {
                var up = document.getElementById(this._id('upgrade.'+this.upgrades[key]+index));
                if (up && up.checked) {
                    this.forces[index].upgrade(this.upgrades[key]);
                }
            }
        }
        return this.forces[index]
    },
    updateChoice: function(index)
    {
        var core = this._getCoreForce(index);
        var types = {
            'support1': { card: 'support', name: 'Support Force Card', type: 'select' },
            'support2': { card: 'support', name: 'Support Force Card', type: 'select' },
            'special': { card: 'special', name: 'Special Force Card', type: 'select' },
            'character': { card: 'characters', name: 'Character Card', type: 'multiselect' },
        };
        if (core.card) {
            for (var type in types) {
                document.getElementById(this._id(type+'choice'+index)).disabled = false;
                for (var k in this.faction[types[type].card]) {
                    var option = document.getElementById(this._id(type+'choice'+index+'.'+k));
                    var card = this.faction[types[type].card][k].card;
                    if (core.checkCard(types[type].card, k)) {
                        option.disabled = false;
                    } else {
                        var c = document.getElementById(this._id(type+'choice'+index));
                        if (types[type].type == "multiselect") {
                            option.selected = false;
                        } else {
                            var value = c.options[c.selectedIndex].value;
                            if (value == option.value) {
                                c.selectedIndex = 0;
                            }
                        }
                        option.disabled = true;
                    }
                }
            }
            var points = core.card.points ? core.card.points : 0;
            document.getElementById(this._id('points'+index)).innerHTML = points;

            var text = "";
            var upgrades = [];
            var blocked = [];
            for (var key in core.upgrades) {
                blocked = blocked.concat(SquadronBuilder.force.upgrades[core.upgrades[key]].blocks);
            }
            for (var key in core.card.upgrades) {
                if (SquadronBuilder.force.upgrades[key]) {
                    upgrades.push(key);
                    var block = (blocked.indexOf(key) != -1);
                    var points = core.card.upgrades[key];
                    var upgrade = SquadronBuilder.force.upgrades[key];
                    var name = this._id('upgrade.'+key+index);
                    text += '<div>';
                    text += '<input type="checkbox" name="'+name+'" id="'+name+'" onChange="faction.updateChoice('+index+')"';
                    text += ((core.upgrades.indexOf(key) != -1) ? 'checked="checked"' : '');
                    text += (block ? 'disabled="disabled"' : '');
                    text += ' />';
                    text += '<label for="'+name+'">';
                    text += '<span class="name"/>'
                    text += upgrade.exclusive ? "*" : "";
                    text += upgrade.name;
                    text += ' <span class="points">['+((points > 0) ? "+" : "-")+points + 'pts]</span>';
                    text += '</span>';
                    text += '<span class="description">'+upgrade.desc+'</span>';
                    text += '</label>';
                    text += '</div>';
                }
            }
            document.getElementById(this._id('upgrades'+index)).innerHTML = text;
            this.upgrades = upgrades;

            var text = '';
            for (var key in core.mecha) {
                text += '<div class="mecha">'+core.mecha[key].mecha.name+': '+core.mecha[key].count;
                var char = core.mecha[key].character();
                if (char) {
                    text += ' ('+char+')';
                }
                text += '</div>';
            }
            document.getElementById(this._id('info'+index)).innerHTML = text;

        } else {
            document.getElementById(this._id('info'+index)).innerHTML = "<div>No Mecha</div>";
            for (var type in types) {
                document.getElementById(this._id(type+'choice'+index)).disabled = true;
            }
        }
        if (this._updateFct) {
            this._updateFct(index);
        }

    },

    renderChoice: function()
    {
        document.getElementById(this._id('choice'+this.index)).style.display = 'block';
        this._renderChoice(this.index);


        this.updateChoice(this.index);

        this.index++;
    },
    _renderChoice: function(index)
    {
        var text = '<div id="'+this._id('info'+index)+'" class="grid mecha info"></div>';
        var types = {
            'core': { card: 'core', name: 'Core Force Card', type: 'select' },
            'support1': { card: 'support', name: 'Support Force Card', type: 'select' },
            'support2': { card: 'support', name: 'Support Force Card', type: 'select' },
            'special': { card: 'special', name: 'Special Force Card', type: 'select' },
            'character': { card: 'characters', type: 'multiselect' },
        };
        for (var type in types) {
            text += '<select id="'+this._id(type+'choice'+index)+'" onChange="faction.updateChoice('+index+')" class="'+type+' '+types[type].card+' col-2-12"';
            if (types[type].type == 'multiselect') {
                text += ' multiple="multiple"';
            }
            text += '>';
            if (types[type].name) {
                text += '<option value="">'+types[type].name+'</option>';
            }
            for (var k in this.faction[types[type].card]) {
                text += '<option id="'+this._id(type+'choice'+index+'.'+k)+'" value="'+k+'">'+this.faction[types[type].card][k].name+' ['+this.faction[types[type].card][k].points+' pts]</option>';
            }
            text += '</select>';
        }
        var c = document.getElementById(this._id('choice'+this.index));
        text += '<div class="totalpoints col-2-12"><span id="'+this._id('points'+this.index)+'">0</span> Points</div>';
        text += '<div id="'+this._id('upgrades'+this.index)+'" class="upgrades"></div>';
        c.innerHTML = text;

    },
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
    //Zentraedi
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
    QueadluunRauZCRMK2ConvergingBeamRifle: {
        name: 'Z-CR MK. II Converging Beam Rifle',
        range: 24,
        damage: 9,
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
    Maloquinn32mmPlasmaMachinePistol: {
        name: '32mm Plamsa Machine Pistol',
        range: 9,
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
    QueadluunGult103mmMiniMissiles: {
        name: 'Quad 103mm Mini-Missile Launchers',
        range: 12,
        damage: '2/missile',
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
    QueadluunGultHvyParticleCannons: {
        name: 'Quad Heavy Particle Cannons',
        range: 18,
        damage: 8,
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
            'Rear Fire'    : true,
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
    RegultDualChargedParticleCannons: {
        name: 'Dual Charged Particle Cannons',
        range: 18,
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
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    ZPRMkVIIIParticleAssaultRifle: {
        name: 'Z-PR Mk. VIII Particle Assault Rifle',
        range: 12,
        damage: 5,
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
    ZTFGMkVTacticalFlechetteCannon: {
        name: 'Z-TFG Mk. V Tactical Flechette Cannon',
        range: 9,
        damage: 4,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : 8,
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
    ZMLMkIIShoulderFiredMissileLauncher: {
        name: 'Z-ML MkII Shoulder-Fired Missile Launcher',
        range: 18,
        damage: '6/missile',
        abilities: {
            'Accurate'     : false,
            'Ammo'         : 5,
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
            'Volley X'     : false,
        }
    },
    // UEDF
    HPC155CParticleCannon: {
        name: 'Dual HPC-155 Heavy Particle Cannons',
        range: 36,
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
            'Overwhelming' : true,
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : true,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    DualTZIVGunClusters: {
        name: 'Dual TZ-IV Gun Clusters',
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
            'Rapid Fire'   : false,
            'Rear Fire'    : false,
            'Split Fire'   : false,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    TZIVGunClusters: {
        name: 'TZ-IV Gun Clusters',
        range: 9,
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
    MDSL12MultipleMissilePods: {
        name: 'Dual MDS-L-12 Multiple Missile Pods',
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
            'Volley'       : 4,
            'Volley X'     : false,
        }
    },
    MDSL70BarrageMissilePack: {
        name: 'MDS-L-70 Barrage Missile Pack',
        range: 18,
        damage: '6/missile',
        abilities: {
            'Accurate'     : false,
            'Ammo'         : 9,
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
    MDSL46HailstormMissilePack: {
        name: 'MDS-L-46 Hailstorm Missile Pack',
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
            'Volley'       : 8,
            'Volley X'     : false,
        }
    },
    MDSM6AirDefenseMissilePod: {
        name: 'MDS-M-6 Air Defense Missile Pod',
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
    RDS2RocketLauncherBoxes: {
        name: 'Quad RDS-2 Rocket Launcher Boxes',
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
            'Volley'       : false,
            'Volley X'     : true,
        }
    },
    GAU20A150CalMachineguns: {
        name: 'Dual GAU-20A1 .50 Cal Machineguns',
        range: 9,
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
    LWS20PointDefenseLaserTurret: {
        name: 'LWS-20 Point Defense Laser Turret',
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
    M99678mmAutoCannon: {
        name: 'Dual M-996 78mm Auto-Cannons',
        range: 36,
        damage: 8,
        abilities: {
            'Accurate'     : true,
            'Ammo'         : false,
            'Anti-Missile' : true,
            'Blast'        : false,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : true,
            'Rear Fire'    : true,
            'Split Fire'   : true,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    M99678mmAutoCannonAirBurst: {
        name: 'Dual M-996 78mm Auto-Cannons (Air Burst)',
        range: 36,
        damage: 4,
        abilities: {
            'Accurate'     : true,
            'Ammo'         : false,
            'Anti-Missile' : true,
            'Blast'        : true,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : false,
            'Overwhelming' : false,
            'Rapid Fire'   : true,
            'Rear Fire'    : true,
            'Split Fire'   : true,
            'Volley'       : false,
            'Volley X'     : false,
        }
    },
    MDSH22DerringerMissileLaunchers: {
        name: 'Dual MDS-H-22 Derringer Missile Launchers',
        range: 48,
        damage: '9/missile',
        abilities: {
            'Accurate'     : false,
            'Ammo'         : 11,
            'Anti-Missile' : false,
            'Blast'        : true,
            'Fly Over'     : false,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : true,
            'Overwhelming' : false,
            'Rapid Fire'   : false,
            'Rear Fire'    : true,
            'Split Fire'   : false,
            'Volley'       : 4,
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
            'Rapid Fire x2': true,
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
    ValkyrieImprovisedBombs: {
        name: 'Improvised Bombs',
        range: '-',
        damage: 6,
        abilities: {
            'Accurate'     : false,
            'Ammo'         : 2,
            'Anti-Missile' : false,
            'Blast'        : true,
            'Fly Over'     : true,
            'Inescapable'  : false,
            'Indirect Fire': false,
            'Missile'      : true,
            'Overwhelming' : false,
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
            'Ammo'         : 6,
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
    ValkyrieAutoCannon: {
        name: 'LAC-20 20mm Auto-Cannon',
        range: 9,
        damage: 3,
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
    ValkyrieMiniMissiles: {
        name: 'MDS-M-4 Mini-Missile Delivery System',
        range: 12,
        damage: '2/missile',
        abilities: {
            'Accurate'     : false,
            'Ammo'         : 4,
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
//
// The mecha are specified here
//
SquadronBuilder.data.mecha = {
    //       Zentraedi
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
    NousgarmaGer: {
        name: 'Nousgarma-Ger',
        speed: 10,
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
        'Regult313mmMRM', 'NousjadeulGer64mmGrenadeLauncher',
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
        'QueadluunRau64mmGrenadeLauncher', 'QueadluunRauMedParticleCannons',
            'QueadluunRau103mmMiniMissiles'
        ],
        handtohand: [
            'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    QueadluunGult: {
        name: 'Queadluun-Gult',
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
        'QueadluunRau64mmGrenadeLauncher', 'QueadluunRauMedParticleCannons',
        'QueadluunGult103mmMiniMissiles', 'QueadluunGultHvyParticleCannons'
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
    TelnestaRegult: {
        name: 'Telnesta-Regult',
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
        'RegultDualChargedParticleCannons'
        ],
        handtohand: [
        'Body Block', 'Kick', 'Jump Kick', 'Stomp'
        ],
    },
    // UEDF
    Tomahawk: {
        name: 'Tomahawk',
        speed: 5,
        piloting: 2,
        gunnery: 2,
        defense: 5,
        damage: 19,
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
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'HPC155CParticleCannon', 'DualTZIVGunClusters', 'MDSL12MultipleMissilePods',
            'MDSM6AirDefenseMissilePod', 'RDS2RocketLauncherBoxes',
            'GAU20A150CalMachineguns'
        ],
        handtohand: [
            'Body Block', 'Kick', 'Jump Kick', 'Punch', 'Stomp'
        ],
    },
    Defender: {
        name: 'Defender',
        speed: 6,
        piloting: 2,
        gunnery: 2,
        defense: 5,
        damage: 11,
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
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'M99678mmAutoCannon'
        ],
        handtohand: [
            'Body Block', 'Kick', 'Jump Kick', 'Punch', 'Stomp'
        ],
    },
    Phalanx: {
        name: 'Phalanx',
        speed: 5,
        piloting: 2,
        gunnery: 2,
        defense: 5,
        damage: 11,
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
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'MDSH22DerringerMissileLaunchers'
        ],
        handtohand: [
            'Body Block', 'Kick', 'Stomp'
        ],
    },
    Spartan: {
        name: 'Spartan',
        speed: 7,
        piloting: 2,
        gunnery: 2,
        defense: 6,
        damage: 16,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : false,
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
            'MDSL12MultipleMissilePods', 'TZIVGunClusters', 'LWS20PointDefenseLaserTurret'
        ],
        handtohand: [
            'Body Block', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ],
        extraabilities: {
            'Brawler': '1 free hand to hand attack per turn.  All hand to hand attacks do +2 MDC',
        }
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
    SuperVF1AValkyrie: {
        name: 'Super VF-1A Valkyrie',
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
            'Jettison'            : 'VF1AValkyrie',
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'ValkyrieWingHardPoints', 'ValkyrieHeadLaser',
        'GU11Battloid', 'GU11', 'GU11Fighter', 'MDSL46HailstormMissilePack'
        ],
        modes: {
            Battloid: {
                speed: 6,
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
                'GU11Battloid', 'ValkyrieHeadLaser', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                'Power Punch', 'Stomp'
                ],
            },
            Guardian: {
                speed: 14,
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
                'GU11', 'ValkyrieWingHardPoints', 'ValkyrieHeadLaser', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 16,
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
                'GU11Fighter', 'ValkyrieWingHardPoints', 'ValkyrieHeadLaser', 'MDSL46HailstormMissilePack'
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
            'Leadership'          : 2,
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
    SuperVF1JValkyrie: {
        name: 'Super VF-1J Valkyrie',
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
            'Jettison'            : 'VF1JValkyrie',
            'Leadership'          : 2,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers',
        'GU11Battloid', 'GU11', 'GU11Fighter', 'MDSL46HailstormMissilePack'
        ],
        modes: {
            Battloid: {
                speed: 6,
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
                'GU11Battloid', 'ValkyrieDualHeadLasers', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                'Power Punch', 'Stomp'
                ],
            },
            Guardian: {
                speed: 14,
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
                'GU11', 'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 16,
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
                'GU11Fighter', 'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'None'
                ],
            }
        }
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
            'Leadership'          : 3,
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
    SuperVF1SValkyrie: {
        name: 'Super VF-1S Valkyrie',
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
            'Jettison'            : 'VF1JValkyrie',
            'Leadership'          : 3,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers',
        'GU11Battloid', 'GU11', 'GU11Fighter', 'MDSL46HailstormMissilePack'
        ],
        modes: {
            Battloid: {
                speed: 6,
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
                'GU11Battloid', 'ValkyrieQuadHeadLasers', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                'Power Punch', 'Stomp'
                ],
            },
            Guardian: {
                speed: 14,
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
                'GU11', 'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 16,
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
                'GU11Fighter', 'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'None'
                ],
            }
        }
    },
    VF1RValkyrie: {
        name: 'VF-1R Valkyrie',
        damage: 17,
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
            'GU11Battloid', 'GU11', 'GU11Fighter',
            'ValkyrieAutoCannon', 'ValkyrieMiniMissiles'
        ],
        modes: {
            Battloid: {
                speed: 6,
                piloting: 0,
                gunnery: 0,
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
                'GU11Battloid', 'ValkyrieQuadHeadLasers', 'ValkyrieAutoCannon',
                'ValkyrieMiniMissiles'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                'Power Punch', 'Stomp'
                ]
            },
            Guardian: {
                speed: 12,
                piloting: 0,
                gunnery: 0,
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
                'GU11', 'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers',
                'ValkyrieAutoCannon', 'ValkyrieMiniMissiles'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 14,
                piloting: 0,
                gunnery: 0,
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
                'GU11Fighter', 'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers',
                'ValkyrieAutoCannon', 'ValkyrieMiniMissiles'
                ],
                handtohand: [
                'None'
                ]
            }
        },
    },
    SuperVF1RValkyrie: {
        name: 'Super VF-1R Valkyrie',
        damage: 17,
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
        'GU11Battloid', 'GU11', 'GU11Fighter',
        'ValkyrieAutoCannon', 'ValkyrieMiniMissiles', 'MDSL46HailstormMissilePack'
        ],
        modes: {
            Battloid: {
                speed: 7,
                piloting: 0,
                gunnery: 0,
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
                'GU11Battloid', 'ValkyrieQuadHeadLasers', 'ValkyrieAutoCannon',
                'ValkyrieMiniMissiles', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                'Power Punch', 'Stomp'
                ]
            },
            Guardian: {
                speed: 16,
                piloting: 0,
                gunnery: 0,
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
                'GU11', 'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers',
                'ValkyrieAutoCannon', 'ValkyrieMiniMissiles', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 18,
                piloting: 0,
                gunnery: 0,
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
                'GU11Fighter', 'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers',
                'ValkyrieAutoCannon', 'ValkyrieMiniMissiles', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'None'
                ]
            }
        },
    },
    ArmoredVF1AValkyrie: {
        name: 'Armored VF-1A Valkyrie',
        speed: 4,
        piloting: 2,
        gunnery: 3,
        defense: 5,
        damage: 14,
        extradamage: 8,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : true,
            'Hover'               : false,
            'Jettison'            : 'VF1AValkyrie',
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'GU11Battloid', 'ValkyrieHeadLaser', 'MDSL70BarrageMissilePack'
        ],
        handtohand: [
        'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    ArmoredVF1JValkyrie: {
        name: 'Armored VF-1J Valkyrie',
        speed: 4,
        piloting: 2,
        gunnery: 3,
        defense: 5,
        damage: 14,
        extradamage: 8,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : true,
            'Hover'               : false,
            'Jettison'            : 'VF1JValkyrie',
            'Leadership'          : 2,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'GU11Battloid', 'ValkyrieDualHeadLasers', 'MDSL70BarrageMissilePack'
        ],
        handtohand: [
        'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    ArmoredVF1SValkyrie: {
        name: 'Armored VF-1S Valkyrie',
        speed: 4,
        piloting: 2,
        gunnery: 3,
        defense: 5,
        damage: 14,
        extradamage: 8,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : true,
            'Hover'               : false,
            'Jettison'            : 'VF1JValkyrie',
            'Leadership'          : 3,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'GU11Battloid', 'ValkyrieQuadHeadLasers', 'MDSL70BarrageMissilePack'
        ],
        handtohand: [
        'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
}
//
// The core force cards are specified here
//
SquadronBuilder.force.core = {
    NousjadeulGerSquadron: {
        name: 'Nousjadeul-Ger Squadron',
        mecha: {
            'NousjadeulGer': 6,
        },
        points: 50,
        upgrades: {
            'ZPRMkVIIIParticleAssaultRifle': 15,
            'ZTFGMkVTacticalFlechetteCannon': 40,
            'ZMLMkIIShoulderFiredMissileLauncher': 30
        },
        factions: ['Zentraedi'],
    },
    QueadluunRauSquadron: {
        name: 'Queadluun-Rau Squadron',
        mecha: {
            'QueadluunRau': 3,
        },
        points: 100,
        upgrades: {
            'NousjadeulGer32mmPlasmaMachinePistol': 30,
            'QueadluunRauZCRMK2ConvergingBeamRifle': 30
        },
        factions: ['Zentraedi'],
    },
    RegultArtillerySquadron: {
        name: 'Regult Artillery Squadron',
        mecha: {
            'GluuhaugRegult': 4,
            'SerauhaugRegult': 2,
        },
        points: 90,
        upgrades: {},
        factions: ['Zentraedi'],
    },
    RegultAttackSquadron: {
        name: 'Regult Attack Squadron',
        mecha: {
            'Glaug': 1,
            'Regult': 9,
        },
        points: 80,
        upgrades: {
            'VeteranWarriors': 20,
            'GlaugEldare': 25
        },
        factions: ['Zentraedi'],
    },
    RegultAttritionSquadron: {
        name: 'Regult Attrition Squadron',
        mecha: {
            'Regult': 12,
        },
        points: 70,
        upgrades: {
            'VeteranWarriors': 25,
        },
        factions: ['Zentraedi'],
    },
    RegultReconSquadron: {
        name: 'Regult Recon Squadron',
        mecha: {
            'Glaug': 1,
            'Regult': 6,
            'QuelRegult': 1,
        },
        points: 70,
        upgrades: {
            'VeteranWarriors': 10,
            'GlaugEldare': 25,
        },
        factions: ['Zentraedi'],
    },
    ValkyrieSquadron: {
        name: 'Valkyrie Squadron',
        mecha: {
            'VF1JValkyrie': 1,
            'VF1AValkyrie': 3,
        },
        points: 80,
        upgrades: {
            'ValkyrieMLOPs': 5,
            'ValkyrieLongRangeMissiles': 15,
            'ValkyrieGravityBombs': 10,
            'SDF1AirWingNoseLasers': 5
        },
        factions: ['UEDF'],
    },
    SuperValkyrieSquadron: {
        name: 'Super Valkyrie Squadron',
        mecha: {
            'SuperVF1JValkyrie': 1,
            'SuperVF1AValkyrie': 3,
        },
        points: 110,
        upgrades: {
            'ValkyrieMLOPs': 5,
            'ValkyrieLongRangeMissiles': 15,
            'ValkyrieGravityBombs': 10,
            'SDF1AirWingNoseLasers': 5
        },
        factions: ['UEDF'],
    },
    ArmoredValkyrieSquadron: {
        name: 'Armored Valkyrie Squadron',
        mecha: {
            'ArmoredVF1JValkyrie': 1,
            'ArmoredVF1AValkyrie': 3,
        },
        points: 100,
        upgrades: {
            'ValkyrieMLOPs': 5,
            'ValkyrieLongRangeMissiles': 20,
            'ValkyrieGravityBombs': 10,
            'SDF1AirWingNoseLasers': 5
        },
        factions: ['UEDF'],
    },
    AirDefenseSquadron: {
        name: 'Air Defense Squadron',
        mecha: {
            'GluuhaugRegult': 4,
            'Defender': 2,
        },
        points: 70,
        upgrades: {
            'DefenderAirBurstMunitions': 5,
        },
        factions: ['Malcontents'],
    },
    AirSuperioritySquadron: {
        name: 'Air Superiority Squadron',
        mecha: {
            'VF1AValkyrie': 3,
            'QueadluunRau': 1,
        },
        points: 90,
        upgrades: {
            'ValkyrieImprovisedBombs': 8,
        },
        factions: ['Malcontents'],
    },
    HeavyDestroidSquadron: {
        name: 'Heavy Destroid Squadron',
        mecha: {
            'Glaug': 1,
            'Spartan': 2,
            'Tomahawk': 2
        },
        points: 90,
        upgrades: {
            'ZPRMkVIIIParticleAssaultRifle': 5,
            'ZTFGMkVTacticalFlechetteCannon': 15,
            'ZMLMkIIShoulderFiredMissileLauncher': 10,
            'GU11GunPod': 10
        },
        factions: ['Malcontents'],
    },
    MainBattleSquadron: {
        name: 'Main Battle Squadron',
        mecha: {
            'NousjadeulGer': 3,
            'Tomahawk': 2
        },
        points: 65,
        upgrades: {
            'ZPRMkVIIIParticleAssaultRifle': 5,
            'ZTFGMkVTacticalFlechetteCannon': 15,
            'ZMLMkIIShoulderFiredMissileLauncher': 10,
            'GU11GunPod': 10
        },
        factions: ['Malcontents'],
    },
    AreaDenialDestroidSquadron: {
        name: 'Area Denial Destroid Squadron',
        mecha: {
            'Tomahawk': 2,
            'Defender': 2,
        },
        points: 60,
        upgrades: {
            'DefenderAirBurstMunitions': 5,
        },
        factions: ['UEDF'],
    },
    ArmoredDestroidSquadron: {
        name: 'Armored Destroid Squadron',
        mecha: {
            'Tomahawk': 4,
        },
        points: 80,
        upgrades: {
        },
        factions: ['UEDF'],
    },
    CloseQuartersDestroidSquadron: {
        name: 'Close Quarters Destroid Squadron',
        mecha: {
            'Spartan': 4,
        },
        points: 60,
        upgrades: {
            'GU11GunPod': 20,
            'SpartanShockBaton': 10,
        },
        factions: ['UEDF'],
    },
    BrawlerDestroidSquadron: {
        name: 'Brawler Destroid Squadron',
        mecha: {
            'Tomahawk': 2,
            'Spartan': 2,
        },
        points: 70,
        upgrades: {
            'GU11GunPod': 10,
            'SpartanShockBaton': 5
        },
        factions: ['UEDF'],
    },
    // Malcontents
    HeavyDestroidSquadron: {
        name: 'Heavy Destroid Squadron',
        mecha: {
            'Tomahawk': 2,
            'Spartan': 2,
            'Glaug': 1
        },
        points: 90,
        upgrades: {
            GU11GunPod: 10,
            ZPRMkVIIIParticleAssaultRifle: 5,
            ZTFGMkVTacticalFlechetteCannon: 15,
            ZMLMkIIShoulderFiredMissileLauncher: 10
        },
        factions: ['Malcontents'],
    },
    AirDefenseSquadron: {
        name: 'Air Defense Squadron',
        mecha: {
            'GluuhaugRegult': 4,
            'Defender': 2,
        },
        points: 70,
        upgrades: {
            'DefenderAirBurstMunitions': 5,
        },
        factions: ['Malcontents'],
    },
}
//
// The core force cards are specified here
//
SquadronBuilder.force.characters = {
    /*******************************************************************
     *         Zentraedi
     *******************************************************************/
    Azonia: {
        name: "Azonia",
        mecha: [
            "Glaug", "GlaugEldare", "QueadluunRau"
        ],
        points: 5,
        factions: ["Zentraedi", "Malcontents"],
        modifyMecha: function (mecha)
        {
            mecha.changeAbility("Leadership", 1);
        },
        check: function (core)
        {
            return true;
        }
    },
    Breetai: {
        name: "Breetai",
        mecha: [
        "SerauGer", "GluuGer"
        ],
        points: 20,
        factions: ["Zentraedi"],
        modifyMecha: function (mecha)
        {
            mecha.changeAbility("Leadership", 5);
            mecha.changeStat("gunnery", 2);
            mecha.changeStat("piloting", 2);
            mecha.addExtraAbility(
                "High Lord",
                "Whenever Breetai is taking damage, any amount of it may be redirected \nto friendly mecha within 4 inches of him in any combination his player \nchooses.  Hand to hand attachks made by Breetai do double their normal\n damage, and Breetai can make 2 additional hand to hand attacks per turn for free."
            );
        },
        check: function (core)
        {
            return true;
        }
    },
    Khyron: {
        name: "Khyron",
        mecha: [
        "Glaug", "GlaugEldare", "NousjadeulGer", "SerauGer", "GluuGer"
        ],
        points: 10,
        factions: ["Zentraedi"],
        modifyMecha: function (mecha)
        {
            mecha.changeStat("piloting", 1);
            mecha.addExtraAbility(
                "The Backstabber",
                "When Khyron's squadron activates, his player may destroy a Mecha \nfrom his squadron, within 8 inches of him, to gain 3 Command Points.\nRegults destroyed in this way cannot be set aside to possibly return \nas Reinforcements."
            );
        },
        check: function (core)
        {
            return true;
        }
    },
    MiriyaParina: {
        name: "Miriya-Parina",
        mecha: [
        "QueadluunRau"
        ],
        points: 10,
        factions: ["Zentraedi"],
        modifyMecha: function (mecha)
        {
            mecha.changeAbility("Leadership", 2);
            mecha.addExtraAbility(
                "Agressive",
                "Miriya can re-roll all of her Strike rolls.  Remember, no single \nroll can be re-rolled more than once."
            );
        },
        check: function (core)
        {
            return true;
        }
    },
    Grell: {
        name: "Grell",
        mecha: [
        "Regult", "Glaug", "GlaugEldare", "NousjadeulGer", "NousgarmaGer", "SerauGer", "GluuGer"
        ],
        points: 5,
        factions: ["Zentraedi"],
        modifyMecha: function (mecha)
        {
            mecha.addExtraAbility(
                "Calling for Reinforcements",
                "Regults from Grell's squadron destroyed within 8 inches of him may \nbe put aside to return as Reinforcements even if he doesn't have line\n of sight to them.  Grell may set aside Regults from his squadron as \nReinforcements no matter what mecha he is piloting."
            );
        },
        check: function (core)
        {
            return true;
        }
    },
    Grell2: {
        name: "Grell",
        mecha: [
        "Regult", "Glaug", "GlaugEldare", "NousjadeulGer", "NousgarmaGer", "SerauGer", "GluuGer"
        ],
        points: 15,
        factions: ["Malcontents"],
        modifyMecha: function (mecha)
        {
            mecha.changeStat("piloting", 1);
            mecha.changeStat("gunnery", 1);
            mecha.addExtraAbility(
                "Devastating Firepower",
                "All of Grell's weapon systems gain the Overwhelming and Rapid Fire abilities."
            );

        },
        check: function (core)
        {
            return true;
        }
    },
    Maloquinn: {
        name: "Maloquinn",
        mecha: [
        "NousjadeulGer"
        ],
        points: 5,
        factions: ["Zentraedi"],
        modifyMecha: function (mecha)
        {
            mecha.changeAbility("Leadership", 1);
            mecha.replaceWeapon("NousjadeulGer32mmPlasmaMachinePistol", "Maloquinn32mmPlasmaMachinePistol");
            mecha.addWeapon("Maloquinn32mmPlasmaMachinePistol");
            mecha.addExtraAbility(
                "Watch the Skies",
                "Maloquinn's 32mm Plasma Machine Pistols get the Anti-Missile ability."
            );
        },
        check: function (core)
        {
            return true;
        }
    },
    PirionGalarr: {
        name: "Pirion-Galarr",
        mecha: [
        "Regult"
        ],
        points: 20,
        factions: ["Zentraedi"],
        modifyMecha: function (mecha)
        {
            mecha.addExtraAbility(
                "Swarm",
                "Once per game, when Pirion-Galarr's squadron is activated, all of \nthe mecha in the squadron can automatically boost their SPD once that \nturn without paying any Command Points or making Piloting rolls."
            );
        },
        check: function (core)
        {
            return true;
        }
    },
    PolusMjor: {
        name: "Polus-Mjor",
        mecha: [
        "NousjadeulGer"
        ],
        points: 5,
        factions: ["Zentraedi"],
        modifyMecha: function (mecha)
        {
            mecha.changeStat("piloting", 1);
            mecha.addHandToHand('Club');
            mecha.addExtraAbility(
                'Spartan Shock Baton',
                'Clubbing weapon. Reduces target\'s speed to 0 for the turn.  Target \ncan not spend Command Points to leave hand to hand combat.'
            );
            mecha.addExtraAbility(
                "Up Close and Personal",
                "Polus-Mjor may make an additional hand to hand attack each turn for free."
            );
        },
        check: function (core)
        {
            return true;
        }
    },
    SulreenTehr: {
        name: "Sulreen-Tehr",
        mecha: [
        "Gnerl"
        ],
        points: 5,
        factions: ["Zentraedi"],
        modifyMecha: function (mecha)
        {
            mecha.addExtraAbility(
                'Experienced Pilot',
                'When Sulreen-Tehr turns an Aircraft he is piloting, it can be turned \nto face any direction.'
            );
        },
        check: function (core)
        {
            return true;
        }
    },
    /*******************************************************************
     *         UEDF
     *******************************************************************/
    RoyFokker: {
        name: "Roy Fokker",
        mecha: [
        "VF1SValkyrie",
        "ArmoredVF1SValkyrie",
        "SuperVF1SValkyrie",
        "JotunVF1SValkyrie"
        ],
        points: 30,
        factions: ["UEDF"],
        modifyMecha: function (mecha)
        {
            mecha.changeStat("gunnery", 1);
            mecha.changeAbility("Leadership", 1);
            mecha.addExtraAbility(
                'Double Ace',
                'Roy may attempt to Dodge twice per turn without paying Command Points.'
            );
            mecha.addExtraAbility(
                'Iron Will',
                'When Roy\'s mecha runs out of MDC, roll a D6.  On a roll of 4+, Roy \nisn\'t destroyed until the end of the next turn, and will remain on \nthe board, even if he suffers more damage, until then.'
            );
        },
        check: function (core)
        {
            return true;
        }
    },
    RickHunter: {
        name: "Rick Hunter",
        mecha: [
        "VF1SValkyrie", "VF1JValkyrie", "VF1AValkyrie", "Spartan",
        "ArmoredVF1SValkyrie", "ArmoredVF1JValkyrie", "ArmoredVF1AValkyrie",
        "SuperVF1SValkyrie", "SuperVF1JValkyrie", "SuperVF1AValkyrie",
        "JotunVF1SValkyrie", "JotunVF1JValkyrie", "JotunVF1AValkyrie"
        ],
        points: 10,
        factions: ["UEDF"],
        modifyMecha: function (mecha)
        {
            mecha.changeStat("piloting", 1);
            mecha.addExtraAbility(
                'Natural Pilot',
                'Rick can boost his SPD once automatically each turn without paying \nCommand Points or making a Piloting roll.'
            );
        },
        check: function (core)
        {
            return true;
        }
    },
    BenDixon: {
        name: "Ben Dixon",
        mecha: [
        "VF1AValkyrie",
        "ArmoredVF1AValkyrie",
        "SuperVF1AValkyrie",
        "JotunVF1AValkyrie"
        ],
        points: 5,
        factions: ["UEDF"],
        modifyMecha: function (mecha)
        {
            mecha.addExtraAbility(
                'Selfless',
                'When a mecha within 4 inches of Ben\'s VF-1A is hit, his player may \nchoose to have Ben take the hit instead.'
            );
        },
        check: function (core)
        {
            return true;
        }
    },
    MaxSterling: {
        name: "Max Sterling",
        mecha: [
        "VF1JValkyrie", "VF1AValkyrie",
        "ArmoredVF1JValkyrie", "ArmoredVF1AValkyrie",
        "SuperVF1JValkyrie", "SuperVF1AValkyrie",
        "JotunVF1JValkyrie", "JotunVF1AValkyrie"
        ],
        points: 10,
        factions: ["UEDF"],
        modifyMecha: function (mecha)
        {
            mecha.changeStat("gunnery", 1);
            mecha.addExtraAbility(
                'Prescient',
                'Max can re-roll all of his Dodge rolls that fail.  Remember, no single \nroll can be re-rolled more than once.'
            );
            mecha.addExtraAbility(
                'True Love',
                'While Max is within 4 inches of Miriya, and they are in the same army, \nhe gains her Agressive ability as well.'
            );
        },
        check: function (core)
        {
            return true;
        }
    },
    Dietrich: {
        name: "Dietrich",
        mecha: [
        "Tomahawk"
        ],
        points: 10,
        factions: ["UEDF"],
        modifyMecha: function (mecha)
        {
            mecha.changeAbility("Leadership", 1);
            mecha.addExtraAbility(
                'Fire at Will',
                'Dietrich can fire 1 additional weapon system per turn for free.'
            );
        },
        check: function (core)
        {
            return true;
        }
    },
    FreemanDavidoff: {
        name: "Freeman Davidoff",
        mecha: [
        "Defender"
        ],
        points: 5,
        factions: ["UEDF"],
        modifyMecha: function (mecha)
        {
            mecha.addExtraAbility(
                'Itchy Trigger Finger',
                'Freeman\'s Defender\'s Dual M-996 78mm Anti-Aircraft Auto-Cannons may \nbe fired one additional time as per Rapid Fire each turn.  So he \ncan attack with the weapon system a total of 3 times per turn, at the \nstandard cost of one Command Point per additional attach.'
            );
        },
        check: function (core)
        {
            return true;
        }
    },
    KainWeller: {
        name: "Kain Weller",
        mecha: [
        "Spartan"
        ],
        points: 5,
        factions: ["UEDF"],
        modifyMecha: function (mecha)
        {
            mecha.addExtraAbility(
                'Charge',
                'Kain can boost his SPD automatically once each turn without paying \nCommand Points or making a Piloting roll.'
            );
            mecha.addExtraAbility(
                'Hand-to-Hand Specialist',
                'Kain can make one additional hand to hand attack per turn for free.'
            );
        },
        check: function (core)
        {
            return true;
        }
    },
    Magnus: {
        name: "Magnus",
        mecha: [
        "ArmoredVF1AValkyrie"
        ],
        points: 5,
        factions: ["UEDF"],
        modifyMecha: function (mecha)
        {
            mecha.addExtraAbility(
                'Charge',
                'If Magnus hasn\'t moved yet during a turn, his PIL is 3.  This only \napplies while in Armored VF form.'
            );
        },
        check: function (core)
        {
            return true;
        }
    },
    MiriyaSterling: {
        name: "Miriya Sterling",
        mecha: [
        "VF1JValkyrie", "VF1AValkyrie",
        "ArmoredVF1JValkyrie", "ArmoredVF1AValkyrie",
        "SuperVF1JValkyrie", "SuperVF1AValkyrie",
        "JotunVF1JValkyrie", "JotunVF1AValkyrie"
        ],
        points: 10,
        factions: ["UEDF"],
        modifyMecha: function (mecha)
        {
            mecha.addExtraAbility(
                "Agressive",
                "Miriya can re-roll all of her Strike rolls.  Remember, no single \nroll can be re-rolled more than once."
            );
            mecha.addExtraAbility(
                'True Love',
                'While Miriya is within 4 inches of Max, and they are in the same army, \nhe gains his Prescient ability as well.'
            );
        },
        check: function (core)
        {
            return true;
        }
    },

}
//
// The special force cards are specified here
//
SquadronBuilder.force.special = {
     Glaug: {
        name: 'Glaug',
        mecha: {
            'Glaug': 1,
        },
        points: 20,
        upgrades: {
            'GlaugEldare': 25,
        },
        factions: ['Zentraedi'],
        check: function (core)
        {
            mecha = core.getMecha();
            if ((mecha.indexOf("Glaug") == -1) && (mecha.indexOf("GlaugEldare") == -1)) {
                return true;
            }
            return false;
        },
        execute: function (core)
        {
            return true;
        }

    },
    QueadluunRau: {
        name: 'Queadluun-Rau',
        mecha: {
            'QueadluunRau': 1,
        },
        points: 30,
        upgrades: {
            'NousjadeulGer32mmPlasmaMachinePistol': 10,
            'QueadluunRauZCRMK2ConvergingBeamRifle': 10
        },
        factions: ['Zentraedi'],
        check: function (core)
        {
            mecha = core.getMecha();
            if ((mecha.indexOf("NousjadeulGer") != -1) || (mecha.indexOf("NousgarmaGer") != -1)) {
                return false;
            }
            return true;
        },
        execute: function (core)
        {
            return true;
        }

    },
    VF1S: {
        name: 'VF-1S Valkyrie',
        mecha: {
            'VF1SValkyrie': 1,
        },
        points: 30,
        upgrades: {
            'ValkyrieMLOPs': 1,
            'ValkyrieLongRangeMissiles': 4,
            'ValkyrieGravityBombs': 3,
            'SDF1AirWingNoseLasers': 1,
        },
        factions: ['UEDF'],
        check: function (core)
        {
            return true;
        },
        execute: function (core)
        {
        }
    },
    SuperVF1S: {
        name: 'Super VF-1S Valkyrie',
        mecha: {
            'SuperVF1SValkyrie': 1,
        },
        points: 40,
        upgrades: {
            'ValkyrieMLOPs': 1,
            'ValkyrieLongRangeMissiles': 4,
            'ValkyrieGravityBombs': 3,
            'SDF1AirWingNoseLasers': 1,
        },
        factions: ['UEDF'],
        check: function (core)
        {
            return true;
        },
        execute: function (core)
        {
        }
    },
    CommandDestroidDefender: {
        name: 'Command Defender Upgrade',
        mecha: {
        },
        points: 10,
        upgrades: {
        },
        factions: ['UEDF'],
        check: function (core)
        {
            mecha = core.getMecha();
            if (mecha.indexOf("Defender") == -1) {
                return false;
            }
            return true;
        },
        execute: function (core)
        {
            var mecha = core.replaceMecha('Defender', 'Defender', 1);
            mecha.changeStat('piloting', 1);
            mecha.changeStat('gunnery', 1);
            mecha.setAbility('Leadership', 2);
            mecha.mecha.name = "Command\n"+mecha.mecha.name;
            return true;
        }
    },
    CommandDestroidTomahawk: {
        name: 'Command Tomahawk Upgrade',
        mecha: {
        },
        points: 10,
        upgrades: {
        },
        factions: ['UEDF'],
        check: function (core)
        {
            mecha = core.getMecha();
            if (mecha.indexOf("Tomahawk") == -1) {
                return false;
            }
            return true;
        },
        execute: function (core)
        {
            var mecha = core.replaceMecha('Tomahawk', 'Tomahawk', 1);
            mecha.changeStat('piloting', 1);
            mecha.changeStat('gunnery', 1);
            mecha.setAbility('Leadership', 2);
            mecha.mecha.name = "Command\n"+mecha.mecha.name;
            return true;
        }
    },
    CommandDestroidSpartan: {
        name: 'Command Spartan Upgrade',
        mecha: {
        },
        points: 10,
        upgrades: {
        },
        factions: ['UEDF'],
        check: function (core)
        {
            mecha = core.getMecha();
            if (mecha.indexOf("Spartan") == -1) {
                return false;
            }
            return true;
        },
        execute: function (core)
        {
            var mecha = core.replaceMecha('Spartan', 'Spartan', 1);
            mecha.changeStat('piloting', 1);
            mecha.changeStat('gunnery', 1);
            mecha.setAbility('Leadership', 2);
            mecha.mecha.name = "Command\n"+mecha.mecha.name;
            return true;
        }
    },
    CommandDestroidPhalanx: {
        name: 'Command Phalanx Upgrade',
        mecha: {
        },
        points: 10,
        upgrades: {
        },
        factions: ['UEDF'],
        check: function (core)
        {
            mecha = core.getMecha();
            if (mecha.indexOf("Phalanx") == -1) {
                return false;
            }
            return true;
        },
        execute: function (core)
        {
            var mecha = core.replaceMecha('Phalanx', 'Phalanx', 1);
            mecha.changeStat('piloting', 1);
            mecha.changeStat('gunnery', 1);
            mecha.setAbility('Leadership', 2);
            mecha.mecha.name = "Command\n"+mecha.mecha.name;
            return true;
        }
    },

}
//
// The special force cards are specified here
//
SquadronBuilder.force.support = {
    QuelRegult: {
        name: "Quel-Regult",
        mecha: {
            "QuelRegult": 1,
        },
        points: 15,
        upgrades: {
        },
        factions: ["Zentraedi", "Malcontents"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    RegultSquad: {
        name: "Regult Squad",
        mecha: {
            "Regult": 6,
        },
        points: 35,
        upgrades: {
            'VeteranWarriors': 10
        },
        factions: ["Zentraedi", "Malcontents"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    NousjadeulGerSquad: {
        name: "Nousjadeul-Ger Squad",
        mecha: {
            "NousjadeulGer": 3,
        },
        points: 25,
        upgrades: {
            'ZPRMkVIIIParticleAssaultRifle': 8,
            'ZTFGMkVTacticalFlechetteCannon': 23,
            'ZMLMkIIShoulderFiredMissileLauncher': 15
        },
        factions: ["Zentraedi", "Malcontents"],
        check: function (core) {
            mecha = core.getMecha();
            if ((mecha.indexOf("QueadluunRau") != -1) || (mecha.indexOf("QueadluunGult") != -1)) {
                return false;
            }
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    GluuhaugRegultSquad: {
        name: "Gluuhaug-Regult Squad",
        mecha: {
            "GluuhaugRegult": 2,
        },
        points: 25,
        upgrades: {
        },
        factions: ["Zentraedi"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    SerauhaugRegultSquad: {
        name: "Serauhaug-Regult Squad",
        mecha: {
            "SerauhaugRegult": 2,
        },
        points: 40,
        upgrades: {
        },
        factions: ["Zentraedi"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    TelnestaRegultSquad: {
        name: "Telnesta-Regult Squad",
        mecha: {
            "TelnestaRegult": 2,
        },
        points: 15,
        upgrades: {
        },
        factions: ["Zentraedi"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    ValkyrieSquad: {
        name: "Valkyrie Squad",
        mecha: {
            "VF1AValkyrie": 2,
        },
        points: 40,
        upgrades: {
            'ValkyrieMLOPs': 2,
            'ValkyrieLongRangeMissiles': 8,
            'ValkyrieGravityBombs': 5,
            'SDF1AirWingNoseLasers': 2
        },
        factions: ["UEDF"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    SuperValkyrieSquad: {
        name: "Super Valkyrie Squad",
        mecha: {
            "SuperVF1AValkyrie": 2,
        },
        points: 55,
        upgrades: {
            'ValkyrieMLOPs': 2,
            'ValkyrieLongRangeMissiles': 8,
            'ValkyrieGravityBombs': 5,
            'SDF1AirWingNoseLasers': 2
        },
        factions: ["UEDF"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    TomahawkSquad: {
        name: "Tomahawk Squad",
        mecha: {
            "Tomahawk": 2,
        },
        points: 40,
        upgrades: {
        },
        factions: ["UEDF"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    PhalanxSquad: {
        name: "Phalanx Squad",
        mecha: {
            "Phalanx": 2,
        },
        points: 40,
        upgrades: {
        },
        factions: ["UEDF"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    DefenderSquad: {
        name: "Defender Squad",
        mecha: {
            "Defender": 2,
        },
        points: 20,
        upgrades: {
            'DefenderAirBurstMunitions': 5
        },
        factions: ["UEDF"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    RegultSquadMalcontents: {
        name: "Regult Support Squad",
        mecha: {
            "GluuhaugRegult": 2,
            "SerauhaugRegult": 2,
        },
        points: 65,
        upgrades: {
        },
        factions: ["Malcontents"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    VF1R: {
        name: "VF-1R Upgrade",
        mecha: {
        },
        points: 10,
        upgrades: {
        },
        factions: ["UEDF"],
        check: function (core) {
            mecha = core.getMecha();
            if ((mecha.indexOf("VF1AValkyrie") != -1) || (mecha.indexOf("VF1JValkyrie") != -1)) {
                return true;
            }

            return false;
        },
        execute: function (core) {
            var count = 2;
            core.upgradeMecha(function(mecha) {
                var piloting = mecha.getStat('piloting');
                var gunnery = mecha.getStat('gunnery');
                var leadership = mecha.getAbility('Leadership');
                if (mecha.count <= count) {
                    var newmecha = core.replaceMecha(mecha.class, 'VF1RValkyrie', mecha.count);
                    count -= mecha.count;
                } else {
                    mecha.count -= count;
                    var newmecha = core.addMecha('VF1RValkyrie', count, true);
                    count = 0;
                }
                if (newmecha) {
                    // This gets the piloting and gunnery for the mecha.
                    for (var mode in piloting) {
                        newmecha.setStat('piloting', piloting[mode], [mode]);
                    }
                    for (var mode in gunnery) {
                        newmecha.setStat('gunnery', gunnery[mode], [mode]);
                    }
                    newmecha.setAbility('Leadership', leadership);
                }
            }, ["VF1AValkyrie", "VF1JValkyrie"]);

            return true;
        },
    },
}
//
// The various upgrades are specified here
//
SquadronBuilder.force.upgrades = {
    // Zentraedi
    VeteranWarriors: {
        name: 'Veteran Warriors',
        desc: 'Regults, Serau-Ger and Gluu-Ger in this squadron get +1 to Piloting (or Physical) and +1 to Gunnery',
        execute: function (core)
        {
            core.card.name = "Veteran "+core.card.name;
            core.upgradeMecha(function(mecha) {
                mecha.changeStat('piloting', 1);
                mecha.changeStat('gunnery', 1);
            }, ["Regult", "SerauGer", "GluuGer"]);
        },
        blocks: []
    },
    GlaugEldare: {
        name: 'Glaug-Eldare',
        desc: 'Upgrade the Glaug in the squadron to a Glaug-Eldare',
        execute: function (core)
        {
            core.replaceMecha('Glaug', 'GlaugEldare');
        },
        blocks: []
    },
    NousjadeulGer32mmPlasmaMachinePistol: {
        name: '32mm plasma Machine pistols',
        desc: 'RG: 9, MD: 8, Rapid Fire',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('NousjadeulGer32mmPlasmaMachinePistol');
            }, ["QueadluunRau"]);
        },
        blocks: ['QueadluunRauZCRMK2ConvergingBeamRifle']
    },
    QueadluunRauZCRMK2ConvergingBeamRifle: {
        name: 'Z-CR MK. II Converging Beam rifles',
        desc: 'RG: 24, MD: 9, Accurate',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('QueadluunRauZCRMK2ConvergingBeamRifle');
            }, ["QueadluunRau"]);
        },
        blocks: ['NousjadeulGer32mmPlasmaMachinePistol']
    },
    ZPRMkVIIIParticleAssaultRifle: {
        name: 'Z-PR Mk. VIII Particle Assault Rifle',
        desc: 'RG:12, MD: 5, Accurate',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('ZPRMkVIIIParticleAssaultRifle');
            }, ["Spartan", "NousjadeulGer"]);
        },
        blocks: ['GU11GunPod', 'ZTFGMkVTacticalFlechetteCannon', 'ZMLMkIIShoulderFiredMissileLauncher']
    },
    ZTFGMkVTacticalFlechetteCannon: {
        name: 'Z-TFG Mk. V Tactical Flechette Cannon',
        desc: 'RG:9, MD: 4, Ammo 8, Blast',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('ZTFGMkVTacticalFlechetteCannon');
            }, ["Spartan", "NousjadeulGer"]);
        },
        blocks: ['GU11GunPod', 'ZPRMkVIIIParticleAssaultRifle', 'ZMLMkIIShoulderFiredMissileLauncher']
    },
    ZMLMkIIShoulderFiredMissileLauncher: {
        name: 'Z-ML MkII Shoulder-Fired Missile Launcher',
        desc: 'RG:18, MD: 6/missile, Ammo 5, Anti-Missile, Blast',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('ZMLMkIIShoulderFiredMissileLauncher');
            }, ["Spartan", "NousjadeulGer"]);
        },
        blocks: ['GU11GunPod', 'ZTFGMkVTacticalFlechetteCannon', 'ZPRMkVIIIParticleAssaultRifle']
    },
    // UEDF
    DefenderAirBurstMunitions: {
        name: 'Defender Air-Burst Munitions',
        desc: 'Changes Dual M-996 78mm Auto-Cannons to RG:36, MD:4, Accurate, Anti-missile, Blast, Rapid Fire, Rear Fire, Split Fire',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.replaceWeapon('M99678mmAutoCannon', 'M99678mmAutoCannonAirBurst');
            }, ["Defender"]);
        },
        blocks: []
    },
    GU11GunPod: {
        name: 'GU-11 Gun Pod',
        desc: 'RG:24, MD:6, Rapid Fire',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('GU11Battloid');
            }, ["Spartan", "NousjadeulGer"]);
        },
        blocks: ['ZTFGMkVTacticalFlechetteCannon', 'ZPRMkVIIIParticleAssaultRifle', 'ZMLMkIIShoulderFiredMissileLauncher']
    },
    SpartanShockBaton: {
        name: 'Spartan Shock Baton',
        desc: 'Clubbing weapon.  Reduces target\'s speed to 0 for the turn.',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addHandToHand('Club');
                mecha.addExtraAbility('Spartan Shock Baton', 'Clubbing weapon. Reduces target\'s speed to 0 for the turn.');
            }, ["Spartan"]);
        },
        blocks: []
    },
    ValkyrieMLOPs: {
        name: 'Valkyrie MLOPs',
        desc: 'Changes the wing mounted hard points to RG:12, MD:2/missile, Ammo 8, Anti-missile, Missile, Vollley 8',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.replaceWeapon('ValkyrieWingHardPoints', 'ValkyrieMLOPs');
            }, ["VF1AValkyrie", "VF1JValkyrie", "VF1SValkyrie"]);
        },
        blocks: ['ValkyrieLongRangeMissiles', 'ValkyrieGravityBombs']
    },
    ValkyrieLongRangeMissiles: {
        name: 'Valkyrie Long-Range Missiles',
        desc: 'Changes the wing mounted hard points to RG:48, MD:9/missile, Ammo 6, Missile, Vollley X',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.replaceWeapon('ValkyrieWingHardPoints', 'ValkyrieLRM');
            }, ["VF1AValkyrie", "VF1JValkyrie", "VF1SValkyrie"]);
        },
        blocks: ['ValkyrieGravityBombs', 'ValkyrieMLOPs']
    },
    ValkyrieGravityBombs: {
        name: 'Valkyrie Gravity Bombs',
        desc: 'Changes the wing mounted hard points to RG:-, MD:12, Ammo 4, Blast, Fly Over, Missile, Overwhelming',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.replaceWeapon('ValkyrieWingHardPoints', 'ValkyrieGravityBombs');
            }, ["VF1AValkyrie", "VF1JValkyrie", "VF1SValkyrie"]);
        },
        blocks: ['ValkyrieLongRangeMissiles', 'ValkyrieMLOPs']
    },
    ValkyrieImprovisedBombs: {
        name: 'Improvised Bombs',
        desc: 'The mecha has makeshift bombs mounted on its undercarriage with the following pro le: RG: -, MD: 6, Ammo 2, Blast, Fly Over, Missile. Note: On a Valkyrie, these are in addition to the normal Wing Mounted Articulated Missile Hardpoints',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('ValkyrieImprovisedBombs', ["Guardian", "Fighter"]);
            }, ["VF1AValkyrie", "VF1JValkyrie", "VF1SValkyrie"]);
        },
        blocks: []
    },
    SDF1AirWingNoseLasers: {
        name: 'SDF-1 Air Wing Nose Lasers',
        desc: 'Adds nose lasers to Figher and Guardian modes.  RG:18, MD:2, Anti-Missile',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('SDF1AirWingNoseLasers');
            }, ["VF1AValkyrie", "VF1JValkyrie", "VF1SValkyrie"]);
        },
        blocks: []
    },

}})();