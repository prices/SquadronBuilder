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
namespace SquadronBuilder\force\support;

defined( '_SQUADRONBUILDER' ) or die( 'Restricted access' );

/** These are our required files */
require_once dirname(__FILE__)."/../../core/SupportForce.php";

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
class ValkyrieSquad extends \SquadronBuilder\core\SupportForce
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "Valkyrie Squad",
        /** These are our weapons */
        "mecha" => array(
            "VF1AValkyrie" => 2,
        ),
        "points" => 40,
        "upgrades" => array(
            "Valkyrie MLOPs" => array(
                "desc" => "Changes the wing mounted hard points to RG:12, MD:2/missile, Ammo 8, Anti-missile, Missile, Vollley 8",
                "points" => 2,
                "exclusive" => true,
            ),
            "Valkyrie Long-Range Missiles" => array(
                "desc" => "Changes the wing mounted hard points to RG:48, MD:9/missile, Ammo 8, Missile, Vollley X",
                "points" => 10,
                "exclusive" => true,
            ),
            "Valkyrie Gravity Bombs" => array(
                "desc" => "Changes the wing mounted hard points to RG:-, MD:12, Ammo 4, Blast, Fly Over, Missile, Overwhelming",
                "points" => 5,
                "exclusive" => true,
            ),
            "SDF-1 Air Wing Nose Lasers" => array(
                "desc" => "Adds nose lasers to Figher and Guardian modes.  RG:18, MD:2, Anti-Missile",
                "points" => 2,
            ),
        ),
        "factions" => array("UEDF"),
    );
}
