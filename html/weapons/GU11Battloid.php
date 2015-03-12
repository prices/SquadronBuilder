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
 * @package    abilities
 * @subpackage weapons
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @version    GIT: $Id: $
 * @link       https://github.com/prices/SquadronBuilder
 */
/** This is our namespace */
namespace SquadronBuilder\weapons;

defined( '_SQUADRONBUILDER' ) or die( 'Restricted access' );

/** These are our required files */
require_once dirname(__FILE__)."/../core/Weapon.php";

/**
 * This class deals with printing out a single weapon.
 *
 * @category   html
 * @package    abilities
 * @subpackage weapons
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class GU11Battloid extends \SquadronBuilder\core\Weapon
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "GU-11 Gun Pod",
        /** This is our range **/
        "range" => 24,
        /** This is our damage **/
        "damage" => 6,
        /** This is a list of the special abilities for this object */
        "abilities" => array(
            "Accurate"      => false,
            "Ammo"          => false,
            "Anti-Missile"  => false,
            "Blast"         => false,
            "Fly Over"      => false,
            "Inescapable"   => false,
            "Indirect Fire" => false,
            "Missile"       => false,
            "Overwhelming"  => false,
            "Rapid Fire"    => true,
            "Rear Fire"     => false,
            "Split Fire"    => false,
            "Volley"        => false,
            "Volley X"      => false,
        ),
    );
}
