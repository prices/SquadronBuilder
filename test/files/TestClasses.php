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
 * @category   test
 * @package    core
 * @subpackage base
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @version    GIT: $Id: $
 * @link       https://github.com/prices/SquadronBuilder
 */
namespace SquadronBuilder\mecha;

require_once CODE_BASE."/core/Mecha.php";
require_once CODE_BASE."/core/Weapon.php";
require_once dirname(__FILE__)."/force/core/CoreForceTest1.php";

/**
 * Test class for Mecha
 *
 * @category   html
 * @package    core
 * @subpackage mecha
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class MechaTest1 extends \SquadronBuilder\core\Mecha
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "Regult Test",
        /** This is our speed **/
        "speed" => 5,
        /** This is our piloting **/
        "piloting" => 2,
        /** This is our gunnery **/
        "gunnery" => 2,
        /** This is our defense **/
        "defense" => 5,
        /** This is a list of the special abilities for this object */
        "abilities" => array(
            'Afterburner'          => false,
            'Aircraft'             => false,
            'Battloid Restriction' => false,
            'Cumbersome'           => false,
            'Fast Mover'           => false,
            'Flight'               => true,
            'Focus Fire'           => false,
            'Hands'                => true,
            'Hover'                => false,
            'Jettison'             => "MechaTest2",
            'Leadership'           => 4,
            'Leap'                 => false,
            'Life is Cheap'        => false,
            'Variable Modes'       => false,
            'Zentraidi Infantry'   => false,
        ),
        /** These are our weapons */
        "ranged" => array(
            "MechaWeaponTest1", "MechaWeaponTest2"
        ),
        /** These are our weapons */
        "handtohand" => array(
            "Body Block", "Kick", "Jump Kick", "Stomp"
        ),
    );
}
/**
 * Test class for Mecha
 *
 * @category   html
 * @package    core
 * @subpackage mecha
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class MechaTest2 extends \SquadronBuilder\core\Mecha
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "Other Test",
        /** This is our speed **/
        "speed" => 5,
        /** This is our piloting **/
        "piloting" => 2,
        /** This is our gunnery **/
        "gunnery" => 2,
        /** This is our defense **/
        "defense" => 5,
        /** This is a list of the special abilities for this object */
        "abilities" => array(
            'Afterburner'          => false,
            'Aircraft'             => false,
            'Battloid Restriction' => false,
            'Cumbersome'           => false,
            'Fast Mover'           => false,
            'Flight'               => true,
            'Focus Fire'           => false,
            'Hands'                => true,
            'Hover'                => false,
            'Jettison'             => false,
            'Leadership'           => 4,
            'Leap'                 => false,
            'Life is Cheap'        => false,
            'Variable Modes'       => false,
            'Zentraidi Infantry'   => false,
        ),
        /** These are our weapons */
        "ranged" => array(
            "MechaWeaponTest1", "MechaWeaponTest2"
        ),
        /** These are our weapons */
        "handtohand" => array(
            "Body Block", "Kick", "Jump Kick", "Stomp"
        ),
    );
}
/**
 * Test class for Mecha
 *
 * @category   html
 * @package    core
 * @subpackage mecha
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class MechaTest3 extends \SquadronBuilder\core\Mecha
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "Other Test",
        /** This is a list of the special abilities for this object */
        "abilities" => array(
            'Afterburner'          => false,
            'Aircraft'             => false,
            'Battloid Restriction' => false,
            'Cumbersome'           => false,
            'Fast Mover'           => true,
            'Flight'               => true,
            'Focus Fire'           => false,
            'Hands'                => true,
            'Hover'                => false,
            'Jettison'             => false,
            'Leadership'           => false,
            'Leap'                 => false,
            'Life is Cheap'        => false,
            'Variable Modes'       => true,
            'Zentraidi Infantry'   => false,
        ),
        "modes" => array("Battloid", "Fighter"),
        "Battloid" => array(
            /** This is our speed **/
            "speed" => 5,
            /** This is our piloting **/
            "piloting" => 2,
            /** This is our gunnery **/
            "gunnery" => 3,
            /** This is our defense **/
            "defense" => 5,
            /** This is a list of the special abilities for this object */
            "abilities" => array(
                'Afterburner'          => false,
                'Aircraft'             => false,
                'Battloid Restriction' => true,
                'Cumbersome'           => false,
                'Fast Mover'           => false,
                'Flight'               => true,
                'Focus Fire'           => false,
                'Hands'                => true,
                'Hover'                => false,
                'Jettison'             => false,
                'Leadership'           => false,
                'Leap'                 => false,
                'Life is Cheap'        => false,
                'Variable Modes'       => false,
                'Zentraidi Infantry'   => false,
            ),
            /** These are our weapons */
            "ranged" => array(
                "MechaWeaponTest1", "MechaWeaponTest2"
            ),
            /** These are our weapons */
            "handtohand" => array(
                "Body Block", "Kick", "Jump Kick", "Stomp"
            ),
        ),
        "Fighter" => array(
            /** This is our speed **/
            "speed" => 12,
            /** This is our piloting **/
            "piloting" => 3,
            /** This is our gunnery **/
            "gunnery" => 2,
            /** This is our defense **/
            "defense" => 6,
            /** This is a list of the special abilities for this object */
            "abilities" => array(
                'Afterburner'          => false,
                'Aircraft'             => false,
                'Battloid Restriction' => true,
                'Cumbersome'           => false,
                'Fast Mover'           => false,
                'Flight'               => true,
                'Focus Fire'           => false,
                'Hands'                => true,
                'Hover'                => false,
                'Jettison'             => false,
                'Leadership'           => false,
                'Leap'                 => false,
                'Life is Cheap'        => false,
                'Variable Modes'       => false,
                'Zentraidi Infantry'   => false,
            ),
            /** These are our weapons */
            "ranged" => array(
                "MechaWeaponTest1"
            ),
            /** These are our weapons */
            "handtohand" => array(
            ),
        ),
    );
}
namespace SquadronBuilder\weapons;
/**
 * Test class for Weapon
 *
 * @category   html
 * @package    core
 * @subpackage mecha
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class MechaWeaponTest1 extends \SquadronBuilder\core\Weapon
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "This is a weapon",
        /** This is our range **/
        "range" => 9,
        /** This is our damage **/
        "damage" => 2,
        /** This is a list of the special abilities for this object */
        "abilities" => array(
            "Accurate"      => true,
            "Ammo"          => false,
            "Anti-Missile"  => true,
            "Blast"         => false,
            "Fly Over"      => false,
            "Inescapable"   => true,
            "Indirect Fire" => false,
            "Missile"       => false,
            "Overwhelming"  => false,
            "Rapid Fire"    => false,
            "Rear Fire"     => false,
            "Split Fire"    => false,
            "Volley"        => false,
            "Volley X"      => false,
        ),
    );
}
/**
 * Test class for Weapon
 *
 * @category   html
 * @package    core
 * @subpackage mecha
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class MechaWeaponTest2 extends \SquadronBuilder\core\Weapon
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "This is missile a weapon",
        /** This is our range **/
        "range" => 9,
        /** This is our damage **/
        "damage" => 2,
        /** This is a list of the special abilities for this object */
        "abilities" => array(
            "Accurate"      => true,
            "Ammo"          => 6,
            "Anti-Missile"  => true,
            "Blast"         => false,
            "Fly Over"      => false,
            "Inescapable"   => true,
            "Indirect Fire" => false,
            "Missile"       => true,
            "Overwhelming"  => false,
            "Rapid Fire"    => false,
            "Rear Fire"     => false,
            "Split Fire"    => false,
            "Volley"        => false,
            "Volley X"      => true,
        ),
    );
}

?>
