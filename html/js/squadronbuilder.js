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
        console.log(color);
        var rect = this._canvas.rect(
            width+"mm", height+"mm"
        ).x(x+"mm").y(y+"mm").stroke({ color: color, opacity: 1, width: '0.3mm' }).fill("none");

        this._elements.shift(rect);

        return rect;
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
        if ((boxes >= 10) && !rows) {
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
                    span.x(x+'mm').dy(height+'mm');
                }
                height += size;
                if (print[key].length > length) {
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
        this.small(dx, dy, this.weapon.name);

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
SquadronBuilder.mecha = function (canvas, mecha, width, count) {
    this._canvas = canvas;
    this.class   = mecha;
    this.count   = count;
    this.mecha   = SquadronBuilder.data.getMecha(mecha);
    this.width   = width ? width : 70;
    if (this.hasJettison()) {
        this._jettisonto = new SquadronBuilder.mecha(
            this._canvas, this.mecha.abilities.Jettison, this.width
        );
    }
};
SquadronBuilder.mecha.prototype = BaseClass.extend({
    height: 0,
    _jettisonto: null,
    _colors: ['#CF0000', '#CFCF00', '#00CF00'],
    _wpncolors: {},
    _jcolor: '#0000CF',
    _weapon: [],
    _character: false,
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
        this._canvas.x(x+'mm').y(y+'mm');
        // Set up our weapons
        var color = 0;
        this.count = count ? count : this.count;
        if (this.count == 0) {
            return;
        }
        var weapon = [];
        var width = this.width - (this.padding * 2);
        var hasammo = false;
        for (var key in this.mecha.ranged) {
            var wpn = this.mecha.ranged[key];
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
                var width  = this.width - (this.padding * 2);
                this.box(dx, sy, width, height, "#000000");
            }
        }
        dy  = ny + (this.padding * 2);
        dy += this._mechaRender(dx, dy, this.mecha);
        
        if (this.hasJettison()) {
            this._jettisonto.jettisonTo(dx, dy);
            dy += this._jettisonto.height;
        }
        
        
        // Put a rectangle around it all
        this.height = dy - y;
        this.box(x, y, this.width, this.height, "#000000");
        
        this._canvas.width(this.width+'mm').height(this.height+'mm');

        // This is the end
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
                (this.width - (this.padding * 2))
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
            if ((hth.length + text.length - len) > 50) {
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
        var width = this.width - (2 * this.padding);
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
            if ((abl.length + text.length - len) > 50) {
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
    // This function adds a weapon in one or more modes
    //
    // Function Parameters:
    //      stat  The stat to change
    //      vaue  The value to change it to
    //
    changeStat: function(stat, value)
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
        if (this.count == 1) {
            this._character = name;
        }
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
    // This function adds an extra ability to the mecha
    //
    // Function Parameters:
    //      name The name of the ability
    //      desc The description of the ability
    //
    addExtraAbility: function(name, value)
    {
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
    this.width  = width ? width : 70;
    this.height  = height ? height : 200;
    this.mecha = [];
    for (var mecha in this.card.mecha) {
        this.addMecha(mecha, this.card.mecha[mecha]);
    }
    this.upgrades = [];
};
SquadronBuilder.coreforce.prototype = BaseClass.extend({
    height: 0,
    columnwidth: 70,
    _weapon: [],
    //
    // This function renders the main output for this object
    //
    // Function Parameters:
    //      page   The page to render
    //      width  The width of the page
    //      height The height of the page
    //
    // Return:
    //      This object
    //
    render: function (page, width, height)
    {
        this.width  = width ? width : this.width;
        this.height  = height ? height : this.height;
        var x = 0;
        var y = 0;
        y += this.padding * 3;
        y += this.header(x, y, this.card.name);
        y += this.largebold(x, y, this.card.points+" Points");
        var dy = y;
        var count = 0;
        for (var key in this.mecha) {
            count++;
            this.mecha[key].render(x, dy);
            var h = this.mecha[key].height;
            h += this.padding;
            if ((dy + h) > this.height) {
                x += this.columnwidth + this.padding;
                dy = y + h;
                this.mecha[key].x(x);
                this.mecha[key].y(y);
            } else {
                dy += h;
            }
        }
        if (count == 2) {
            this.mecha[key].x(this.columnwidth + this.padding);
            this.mecha[key].y(y);
        }
        return 0;
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
        if (card && card.card.check(this)) {
            for (var key in card.mecha) {
                var mecha = this.replaceMecha(card.mecha[key], card.mecha[key], 1);
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
        if (name) {
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
    replaceMecha: function (oldmecha, newmecha, count)
    {
        for (var key in this.mecha) {
            if (this.mecha[key].class == oldmecha) {
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
            mecha.push(this.mecha[key].class);
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
        var ch = document.getElementById(this._id('characterchoice'+index));
        this.cards[index].character = ch.options[ch.selectedIndex].value;
        if (this.cards[index].core) {
            this.forces[index] = new SquadronBuilder.coreforce(null, this.cards[index].core, 70);
            if (this.cards[index].support1) {
                this.forces[index].support(this.cards[index].support1);
            }
            if (this.cards[index].support2) {
                this.forces[index].support(this.cards[index].support2);
            }
            if (this.cards[index].special) {
                this.forces[index].special(this.cards[index].special);
            }
            if (this.cards[index].character) {
                this.forces[index].character(this.cards[index].character);
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
        if (core.card) {
            document.getElementById(this._id('support1choice'+index)).disabled = false;
            document.getElementById(this._id('support2choice'+index)).disabled = false;
            document.getElementById(this._id('specialchoice'+index)).disabled = false;
            document.getElementById(this._id('characterchoice'+index)).disabled = false;


            var types = {
                'support1': { card: 'support', name: 'Support Force Card' },
                'support2': { card: 'support', name: 'Support Force Card' },
                'special': { card: 'special', name: 'Special Force Card' },
                'character': { card: 'characters', name: 'Character Card' },
            };
            for (var type in types) {
                for (var k in this.faction[types[type].card]) {
                    var option = document.getElementById(this._id(type+'choice'+index+'.'+k));
                    var card = this.faction[types[type].card][k].card;

                    if (card.check(core)) {
                        option.disabled = false;
                    } else {
                        var c = document.getElementById(this._id(type+'choice'+index));
                        var value = c.options[c.selectedIndex].value;
                        if (value == option.value) {
                            c.selectedIndex = 0;
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
                text += '<div class="mecha">'+core.mecha[key].mecha.name+': '+core.mecha[key].count+'</div>';
            }
            document.getElementById(this._id('info'+index)).innerHTML = text;

        } else {
            document.getElementById(this._id('info'+index)).innerHTML = "<div>No Mecha</div>";
            document.getElementById(this._id('support1choice'+index)).disabled = true;
            document.getElementById(this._id('support2choice'+index)).disabled = true;
            document.getElementById(this._id('specialchoice'+index)).disabled = true;
            document.getElementById(this._id('characterchoice'+index)).disabled = true;
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
            'core': { card: 'core', name: 'Core Force Card' },
            'support1': { card: 'support', name: 'Support Force Card' },
            'support2': { card: 'support', name: 'Support Force Card' },
            'special': { card: 'special', name: 'Special Force Card' },
            'character': { card: 'characters', name: 'Character Card' },
        };
        for (var type in types) {
            text += '<select id="'+this._id(type+'choice'+index)+'" onChange="faction.updateChoice('+index+')" class="'+type+' '+types[type].card+' col-2-12">';
            text += '<option value="">'+types[type].name+'</option>';
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
        name: 'Z-ML Mk. II Shoulder-Fired Missile Launcher',
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
            'ValkyrieLongRangeMissiles': 20,
            'ValkyrieGravityBombs': 10,
            'SDF1AirWingNoseLasers': 5
        },
        factions: ['UEDF'],
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
            mecha = core.getMecha();
            if (mecha.indexOf("Glaug") == -1) {
                return false;
            }
            return true;
        }
    }
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
    VF1S: {
        name: 'VF-1S Valkyrie',
        mecha: {
            'VF1SValkyrie': 1,
        },
        points: 30,
        upgrades: {
            'ValkyrieMLOPs': 1,
            'ValkyrieLongRangeMissiles': 5,
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
            'ValkyrieLongRangeMissiles': 10,
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
    ZPRMkVIIIParticleAssaultRifle: {
        name: 'Z-PR Mk. VIII Particle Assault Rifle',
        desc: 'RG:12, MD: 5, Accurate',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('ZPRMkVIIIParticleAssaultRifle');
            }, ["Spartan"]);
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
            }, ["Spartan"]);
        },
        blocks: ['GU11GunPod', 'ZPRMkVIIIParticleAssaultRifle', 'ZMLMkIIShoulderFiredMissileLauncher']
    },
    ZMLMkIIShoulderFiredMissileLauncher: {
        name: 'Z-ML Mk. II Shoulder-Fired Missile Launcher',
        desc: 'RG:18, MD: 6/missile, Ammo 5, Anti-Missile, Blast',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('ZMLMkIIShoulderFiredMissileLauncher');
            }, ["Spartan"]);
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
            }, ["Spartan"]);
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
        desc: 'Changes the wing mounted hard points to RG:48, MD:9/missile, Ammo 8, Missile, Vollley X',
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