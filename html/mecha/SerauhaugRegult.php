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
namespace SquadronBuilder\mecha;

defined( '_SQUADRONBUILDER' ) or die( 'Restricted access' );

/** These are our required files */
require_once dirname(__FILE__)."/../core/Mecha.php";

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
class GluuhaugRegult extends \SquadronBuilder\core\Mecha
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "Serauhaug-Regult",
        /** This is our speed **/
        "speed" => 4,
        /** This is our piloting **/
        "piloting" => 2,
        /** This is our gunnery **/
        "gunnery" => 2,
        /** This is our defense **/
        "defense" => 5,
        /** This is our defense **/
        "damage" => 5,
        /** This is a list of the special abilities for this object */
        "abilities" => array(
            'Afterburner'          => false,
            'Aircraft'             => false,
            'Battloid Restriction' => false,
            'Cumbersome'           => false,
            'Fast Mover'           => false,
            'Flight'               => false,
            'Focus Fire'           => true,
            'Hands'                => false,
            'Hover'                => false,
            'Jettison'             => false,
            'Leadership'           => false,
            'Leap'                 => true,
            'Life is Cheap'        => false,
            'Variable Modes'       => false,
            'Zentraidi Infantry'   => false,
        ),
        /** These are our weapons */
        "ranged" => array(
            "RegultHeavyParticleCannons", "RegultAutoCannons", 
            "Regult791mmBallisticMissile"
        ),
        /** These are our weapons */
        "handtohand" => array(
            "Body Block", "Kick", "Jump Kick", "Stomp"
        ),
    );
}
