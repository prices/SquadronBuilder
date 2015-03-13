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
SquadronBuilder.data = {};
SquadronBuilder.PADDING = 1;
SquadronBuilder.MARGIN = 7;
SquadronBuilder.DSIZE = 3;
    /** This is the size of the damage squares in mm*/
SquadronBuilder.DMULT = 1.2;
    /** This is the size of normal text in mm */
SquadronBuilder.SSIZE = 1.75;
    /** This is the size of normal text in mm */
SquadronBuilder.NSIZE = 2.75;
    /** This is the size of normal text in mm */
SquadronBuilder.LSIZE = 4;
    /** This is the size of normal text in mm */
SquadronBuilder.HSIZE = 5;
    /** This is our font family */
SquadronBuilder.FONTFAMILY = "'Bitstream Vera Sans', sans-serif";

SquadronBuilder.boxes = function (canvas, x, y, boxes, rows, color)
{
    
    if ((boxes >= 10) && !rows) {
        rows = 2;
    } else {
        rows  = rows ? rows : 1;
    }
    color = color ? color : "#000000";
    var dx = x;
    var dy = y;
    var cutoff = parseInt((boxes / rows), 10);
    var rect = [];
    for (var i = 0; i < boxes; i++) {
        if ((i > 0) && ((i % cutoff) == 0)) {
            dy += SquadronBuilder.DSIZE * SquadronBuilder.DMULT;
            dx = x;
        }
        rect[i] = canvas.rect(
            SquadronBuilder.DSIZE+"mm", SquadronBuilder.DSIZE+"mm"
        ).x(dx+"mm").y(dy+"mm").stroke(color).fill("none");
        dx += SquadronBuilder.DSIZE * SquadronBuilder.DMULT;
    }
    height = y - dy + (SquadronBuilder.DSIZE * SquadronBuilder.DMULT);
    return height;
};

SquadronBuilder.text = {
    large: function(canvas, x, y, text)
    {
        return this._text(
            canvas, 
            x, 
            y, 
            text, 
            SquadronBuilder.LSIZE, 
            SquadronBuilder.FONTFAMILY,
            'normal'
        );
    },
    normal: function(canvas, x, y, text)
    {
        return this._text(
            canvas, 
            x, 
            y, 
            text, 
            SquadronBuilder.NSIZE, 
            SquadronBuilder.FONTFAMILY,
            'normal'
        );
    },
    bold: function(canvas, x, y, text)
    {
        return this._text(
            canvas, 
            x, 
            y, 
            text, 
            SquadronBuilder.NSIZE, 
            SquadronBuilder.FONTFAMILY,
            'bold'
        );
    },
    small: function(canvas, x, y, text)
    {
        return this._text(
            canvas, 
            x, 
            y, 
            text, 
            SquadronBuilder.SSIZE, 
            SquadronBuilder.FONTFAMILY,
            'normal'
        );
    },
    _text: function(canvas, x, y, text, size, font, weight)
    {
        y += size / 2;
        var print = canvas.text(
            text
        ).x(
            x+'mm'
        ).y(
            y+'mm'
        ).font({
            family:   font,
            size:     size+'mm',
            anchor:   'start',
            leading:  SquadronBuilder.padding+'mm',
            'font-weight': weight,
        });
        return print;
    }
};
SquadronBuilder.svg = {
    pages: [],
    page: 0,
    render: function ()
    {
        var w = window.open('force.svg','page'+this.page,'');
        this.pages[this.page]
        $(this.pages[this.page].document.body).css("background", "red");
    }
};
SquadronBuilder.mecha = function (canvas, mecha, width) {
    this.canvas = canvas;
    this.mecha  = mecha;
    this.width  = width ? width : 70;
    this.padding = SquadronBuilder.PADDING;
};
SquadronBuilder.mecha.prototype = {
    canvas: null,
    colors: ['#CF0000', '#CFCF00', '#00CF00'],
    render: function (x, y, count)
    {
        var color = 0;
        var weapon = [];
        var width = this.width - (this.padding * 2);
        for (key in this.mecha.ranged) {
            var wpn = this.mecha.ranged[key];
            weapon[key] = new SquadronBuilder.weapon(
                this.canvas, 
                SquadronBuilder.data.weapons[wpn], 
                width
            );
            if (weapon[key].hasAmmo()) {
                weapon[key].color(this.colors[color++]);
            }
        }

        var dy = y;
        var dx = x;
        dx += this.padding;
        dy += this.padding * 2;
        
        var nx = dx + this.padding;
        var ny = dy;
        for (var i = 0; i < count; i++) {
            
            ny += this.padding * 2;
            SquadronBuilder.text.large(this.canvas, nx, ny, this.mecha.name);
            var bx = nx + ((SquadronBuilder.LSIZE * this.mecha.name.length / 1.75) + 2);
            var by = ny + (SquadronBuilder.LSIZE / 2) - (SquadronBuilder.DSIZE / 2) - this.padding;
            var h = SquadronBuilder.boxes(this.canvas, bx, by, this.mecha.damage);

            ny  = (h > SquadronBuilder.LSIZE) ? ny + h : ny + SquadronBuilder.LSIZE;
            ny += this.padding;

            var hasammo = false;
            for (key in weapon) {
                if (weapon[key].hasAmmo()) {
                    var h = weapon[key].ammo(nx, ny);
                    ny += h;
                    hasammo = true;
                }
            }
            if (hasammo && (count > 1)) {
                var height = ny - dy;
                var width  = this.width - (this.padding * 2);
                var rect = this.canvas.rect(
                    width+"mm", height+"mm"
                ).x(dx+"mm").y(dy+"mm").stroke("#000000").fill("none");
            }
        }
        dy = ny + (this.padding * 2);

        SquadronBuilder.text.bold(this.canvas, dx, dy, "Ranged:");
        dy += SquadronBuilder.NSIZE;
        
        for (key in weapon) {
            weapon[key].render(dx, dy);
            dy += weapon[key].height;
        }
        dy += this.padding;
        
        this.height = dy - y;
        var rect = this.canvas.rect(
            this.width+"mm", this.height+"mm"
        ).x(x+"mm").y(y+"mm").stroke("#000000").fill("none");
    }
};
SquadronBuilder.weapon = function (canvas, weapon, width) {
    this.canvas = canvas;
    this.weapon = weapon;
    this.width  = width ? width : 70;
    this.padding = SquadronBuilder.PADDING;
};
SquadronBuilder.weapon.prototype = {
    stroke: "#000000",
    height: 0,
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
        var name = SquadronBuilder.text.normal(this.canvas, x, y, this.weapon.name);
        y += SquadronBuilder.NSIZE;
        var attrib = SquadronBuilder.text.small(this.canvas, x, y, abilities);
        y += SquadronBuilder.SSIZE;
        y += this.padding;
        this.height = y - dy;

        var rect = this.canvas.rect(
            this.width+"mm", this.height+"mm"
        ).x(dx+"mm").y(dy+"mm").stroke(this.stroke).fill("none");
        return this;
    },
    color: function (color)
    {
        this.stroke = color;
    },
    hasAmmo: function ()
    {
        return (this.weapon.abilities.Ammo !== false);
    },
    ammo: function(x, y)
    {
        if (!this.hasAmmo()) {
            return;
        }
        var ammo = this.weapon.abilities.Ammo;
        var dx   = x;
        var dy   = y;
        var name = SquadronBuilder.text.small(this.canvas, dx, dy, this.weapon.name);

        var bx = dx + this.width - (SquadronBuilder.DSIZE * ammo * SquadronBuilder.DMULT) - (this.padding * 1.5);
        var by = dy + (SquadronBuilder.SSIZE / 2) - (SquadronBuilder.DSIZE / 2);
        return SquadronBuilder.boxes(this.canvas, bx, by, ammo, false, this.stroke);
    }
};
