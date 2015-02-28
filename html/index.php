<?php
/**
 * PHP Version 5
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
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA  02110-1301, USA.
 * </pre>
 *
 * @category   html
 * @package    core
 * @subpackage weapons
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @version    GIT: $Id: $
 * @link       https://github.com/prices/SquadronBuilder
 */
define("_SQUADRONBUILDER", true);
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" dir="ltr">
    <head>
        <meta charset="UTF-8">
        <title>
            Robotech RPG Tactics SquadronBuilder
        </title>
        <link rel="stylesheet" href="css/default.css" />
    </head>
    <body>
        Pick a core force:
        <ul>
            <li><a href="coreforce.php?core=RegultAttackSquadron">Regult Attack Squadron</a></li>
            <li><a href="coreforce.php?core=RegultAttritionSquadron">Regult Attrition Squadron</a></li>
            <li><a href="coreforce.php?core=RegultReconSquadron">Regult Recon Squadron</a></li>
            <li><a href="coreforce.php?core=NousjadeulGerSquadron">Nousdadeul-Ger Squadron</a></li>
        </ul>
    </body>


