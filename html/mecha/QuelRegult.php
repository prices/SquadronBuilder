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
class QuelRegult extends \SquadronBuilder\core\Mecha
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "Quel-Regult",
        /** This is our speed **/
        "speed" => 6,
        /** This is our piloting **/
        "piloting" => 3,
        /** This is our gunnery **/
        "gunnery" => '-',
        /** This is our defense **/
        "defense" => 6,
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
            'Focus Fire'           => false,
            'Hands'                => false,
            'Hover'                => false,
            'Jettison'             => false,
            'Leadership'           => 2,
            'Leap'                 => true,
            'Life is Cheap'        => false,
            'Variable Modes'       => false,
            'Zentraidi Infantry'   => false,
        ),
        /** These are our weapons */
        "ranged" => array(
        ),
        /** These are our weapons */
        "handtohand" => array(
            "Body Block", "Kick", "Jump Kick", "Stomp"
        ),
        "extraabilities" => array(
            "Advanced Reconnaissance Suite" => "Spend 2 command points to give +1 to strike to mecha within 12\"",
            "Electronic Attack Suite" => "Spend 1 command point to give -1 to strike to enemy mecha within 24\"",
        ),
    );
    
}
