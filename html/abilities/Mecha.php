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
 * @subpackage mecha
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @version    GIT: $Id: $
 * @link       https://github.com/prices/SquadronBuilder
 */
/** This is our namespace */
namespace SquadronBuilder\abilities;

defined( '_SQUADRONBUILDER' ) or die( 'Restricted access' );

/** These are our required files */
require_once dirname(__FILE__)."/../core/Abilities.php";

/**
 * This class deals with printing out a single weapon.
 *
 * @category   html
 * @package    abilities
 * @subpackage mecha
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class Mecha extends \SquadronBuilder\core\Abilities
{
    /** This is a list of the special abilities for this object */
    protected $name = "Mecha Special Abilities";
    /** This is a list of the special abilities for this object */
    protected $abilities = array(
        'Afterburner'          => "Must make a secondary movement of 1 facing change up to 90 degrees, then full movement rate straight in the direction the mecha is pointed.",
        'Aircraft'             => "May make one facing change up to 90 degrees, then must move at least half movement rate in a straight line.",
        'Battloid Restriction' => "When in battloid mode the Valkyrie can not fire the wing mounted missiles",
        'Cumbersome'           => "Rough terrain is counted as deadly terrain for purposes of movement.",
        'Fast Mover'           => "Command points can not be spent to fire multiple weapon systems.",
        'Flight'               => "All terrain is open terrain for the purposes of movement",
        'Focus Fire'           => "Fire one additional weapon for free if mecha did not move",
        'Hands'                => "May climb vertical surfaces, pick up weapons, etc",
        'Hover'                => "Rough terrain treated as open terrain.  -1 to strike this mecha with ranged attacks",
        'Jettison'             => "Jettison attachements to get back to the base mecha.",
        'Leadership'           => "Extra command points per turn equal to this value",
        'Leap'                 => "May take a leap movement each turn equal to its total move",
        'Life is Cheap'        => "Does not generate command points.  Can be targeted by friendly mecha",
        'Variable Modes'       => "Mode may be changed once turn, before movement.  Squadrons must all start in the same mode.",
        'Zentraidi Infantry'   => "Uses PH instead of PIL.  Can not use command points to boost the speed.",
    );
    
}
