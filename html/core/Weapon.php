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
defined( '_SQUADRONBUILDER' ) or die( 'Restricted access' );

/** This is our namespace */
namespace \SquadronBuilder\core;

/** These are our required files */
require_once "BaseObject.php"

/**
 * This class deals with printing out a single weapon.
 *
 * @category   html
 * @package    core
 * @subpackage weapons
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class Weapon extends BaseObject
{
    /** This is a list of the special abilities for this object */
    protected static $_abilities = array(
        "Accurate"      => "+1 to hit if no movement during this turns activation.",
        "Ammo #"        => "The number of shots available for this weapon.",
        "Anti-Missile"  => "Can shoot down incoming missles with out spending command points",
        "Blast"         => "Uses blast template, can scatter",
        "Fly Over"      => "Must fly over the target to attack it",
        "Inescapable"   => "Can not be dodged",
        "Indirect Fire" => "May fire over terrain if friendly mecha has line of sight",
        "Missile"       => "Missiles can be shot down",
        "Overwhelming"  => "Can not roll with impact",
        "Rapid Fire"    => "May be fired one additional time per turn",
        "Rear Fire"     => "Can attack to the rear",
        "Split Fire"    => "May split the damage between two targets",
        "Volley"        => "Fires this many missiles in one shot.",
        "Volley X"      => "One round of ammo is used per missile fired.  Any number of missiles fired up to the amount of ammo can be fired in a single volley.",
    );
    
}
