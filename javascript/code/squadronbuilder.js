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
