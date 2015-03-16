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
            return this.core[card];
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
            return this.support[card];
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
            return this.special[card];
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
            return this.characters[card];
        }
        return false;
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
    fontfamily: "'Bitstream Vera Sans', sans-serif",
    // This is our groups from all of this.
    _elements: [],
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
    canvas: function ()
    {
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
        for (k in stuff) {
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
        ).x(x+"mm").y(y+"mm").stroke(color).fill("none");

        this._elements.shift(rect);

        return height;
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
        var cutoff = parseInt((boxes / rows), 10);
        var rect = [];
        for (var i = 0; i < boxes; i++) {
            if ((i > 0) && ((i % cutoff) == 0)) {
                dy += this.boxsize * this.boxmult;
                dx = x;
            }
            rect[i] = this._canvas.rect(
                this.boxsize+"mm", this.boxsize+"mm"
            ).x(dx+"mm").y(dy+"mm").stroke(color).fill("none");
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
        var print = text.split("\n");
        var print = this._canvas.text(function(add) {
            // This accomodates multiple lines
            for (key in print) {
                var span = add.tspan(print[key]);
                if (height > 0) {
                    span.x(x+'mm').dy(height+'mm');
                }
                height += size;
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
        this._elements.shift(print);
        return height;
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
    this._canvas = canvas.nested();
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
        var weapon = [];
        var width = this.width - (this.padding * 2);
        var hasammo = false;
        for (key in this.mecha.ranged) {
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
        
        
        // This does the names and damage boxes
        var nx = dx + this.padding;
        var ny = dy + this.padding;
        for (var i = 0; i < this.count; i++) {
            
            // Put in the mecha name
            sy = ny;
            if (hasammo) {
                ny += this.padding * 2;
            }
            this.large(nx, ny, this.mecha.name);
            
            // Put in the damage boxes
            var bx = nx + ((this.largesize * this.mecha.name.length / 1.75) + 2);
            var by = ny + (this.largesize / 2) - (this.boxsize / 2) - this.padding;
            var h = this.boxes(bx, by, this.mecha.damage);

            if (this.mecha.extradamage) {
                // Put in the extradamage boxes
                by += h;
                h += this.boxes(bx, by, this.mecha.extradamage, 1, this._jcolor);
            }

            ny  = (h > this.largesize) ? ny + h : ny + this.largesize;
            if (hasammo) {
                ny += this.padding;
            }
            // Add any ammo boxes we need for this mecha
            for (key in weapon) {
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
            dy += this._abilities(x, y, mecha);
            dy += this.padding;
            for (mode in mecha.modes) {
                dy += this.padding;
                dy += this.largebold(dx, dy, mode);
                dy += this._baseRender(dx, dy, mecha.modes[mode]);
            }
        } else {
            dy += this._baseRender(x, y, mecha);
        }
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
        for (key in mecha.ranged) {
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
        for (key in mecha.handtohand) {
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
        for (key in mecha.abilities) {
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
            for (key in modes) {
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
            for (key in modes) {
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
            for (key in this.mecha.modes) {
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
    // This function is used to check if this weapon uses ammo
    // 
    // Return:
    //      true if this weapon uses ammo
    //
    hasJettison: function ()
    {
        return (this.mecha.abilities.Jettison !== false);
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
SquadronBuilder.coreforce = function (canvas, card, width) {
    this._canvas = canvas;
    this.card  = SquadronBuilder.force.getCore(card);
    this.width  = width ? width : 70;
    this.mecha = [];
    for (mecha in this.card.mecha) {
        this.addMecha(mecha, this.card.mecha[mecha]);
    }

};
SquadronBuilder.coreforce.prototype = BaseClass.extend({
    height: 0,
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
    render: function (x, y)
    {
        y += this.padding * 3;
        y += this.header(x, y, this.card.name);
        y += this.largebold(x, y, this.card.points+" Points");
        for (key in this.mecha) {
            this.mecha[key].render(x, y);
            x += 70;
        }
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
        if (this.card.upgrades[name]) {
            this.card.upgrades[name].execute(this);
            this.card.points += this.card.upgrades[name].points;
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
        console.log(card);
        if (card && card.check(this)) {
            for (key in card.upgrades) {
                if (this.card.upgrades[key]) {
                    this.card.upgrades[key].points += card.upgrades[key].points;
                } else if (card.upgrades[key].desc) {
                    this.card.upgrades[key] = card.upgrades[key];
                }
            }
            for (mecha in card.mecha) {
                this.addMecha(mecha, card.mecha[mecha]);
            }
            this.card.points += card.points;
            card.execute(this);
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
        for (key in this.mecha) {
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
        for (key in this.mecha) {
            if (this.mecha[key].class == oldmecha) {
                if (oldmecha == newmecha) {
                    this.mecha[key].count -= count;
                    this.addMecha(oldmecha, count, true);
                    return this;
                } else {
                    count = this.mecha[key].count;
                    this.mecha[key] = new SquadronBuilder.mecha(this._canvas, newmecha, this.width, count);
                }
            }
        }
        return this;
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
            for (key in this.mecha) {
                if (this.mecha[key].class == mecha) {
                    this.mecha[key].count += count;
                    return this;
                }
            }
        }
        this.mecha.push(
            new SquadronBuilder.mecha(this._canvas, mecha, this.width, count)
        );
        return this;
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
        for (key in this.mecha) {
            mecha.push(this.mecha[key].class);
        }
        return mecha;
    }
});
