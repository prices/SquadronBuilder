# SquadronBuilder

## Introduction

This is a force builder for Robotech® RPG Tactics™

The game can be found at http://www.palladiumbooks.com/

## Status
This is still a work in progress.  There are bugs, and some of the rendering is not
correct.  However, it is in a usable state.  Most things work.  It will output actual
SVG files now, instead of ones that you can't save to disk.

## Goals

The goal of this project is to create a web interface in HTML and JavaScript
that will allow a player to create squadron cards to play the game with.  The
squadron cards will be output is SVG format, which Firefox and Chrome will both
open natively.  From there they can be printed.

## Requirements
* A recent web broswer that supports JavaScript and HTML5

I was thinking about the project, written in PHP, and realized that PHP was not
the right language.  Using JavaScript worked much better, as a web server is not
needed.  The files can just be opened in a web browser, and everything works.

## Testing

Just run phpunit in the root directory of the git repository.  It will Run
all of the tests automatically.

## Contributions

Want to contribute?  Fork the repository, make your changes, the submit a pull
request.  I welcome changes that are within the scope of the project.

### Requirements
* All code additions should include tests
* All tests must pass

## License
This is released under the GNU GPL V2.  You can find the complete text in the
LICENSE file, or at http://opensource.org/licenses/gpl-2.0.html

    SquadronBuilder
    Copyright (C) 2015 Scott Price

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.


## Other Legal Stuff
This project is not in any way affiliated with Palladium Books, Harmony Gold, or 
any other company.  It is purely written to make it easier for me to play the
game.

Robotech® and associated names, logos, and all related indicia are trademarks
of Harmony Gold USA, Inc. http://www.harmonygold.com/

Palladium Books®, game terms, names, titles, and other game related words,
system of play, and slogans are trademarks owned by Palladium Books, Inc.

Robotech® RPG Tactics™ is published by Palladium Books, Inc.
http://palladiumbooks.com/
