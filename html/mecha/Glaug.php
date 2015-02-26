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
class Glaug extends \SquadronBuilder\core\Mecha
{
    protected $params = array(

        /** This is our header for abilities **/
        "name" => "Glaug",
        /** This is our speed **/
        "speed" => 7,
        /** This is our piloting **/
        "piloting" => 3,
        /** This is our gunnery **/
        "gunnery" => 3,
        /** This is our defense **/
        "defense" => 7,
        /** This is our damage **/
        "damage" => 9,
        /** This is our damage **/
        "extradamage" => 10,
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
            'Leadership'           => 4,
            'Leap'                 => true,
            'Life is Cheap'        => false,
            'Variable Modes'       => false,
            'Zentraidi Infantry'   => false,
        ),
        /** These are our weapons */
        "ranged" => array(
            "GlaugChargedParticleCannon", "GlaugHeavyParticleCannons", 
            "GlaugRailCannons", "RegultAutoCannons", "Glaug150mmSRM"
        ),
        /** These are our weapons */
        "handtohand" => array(
            "Body Block", "Kick", "Jump Kick", "Punch", "Power Punch", "Stomp"
        ),
    );
    /**
    * This function runs an upgrade
    *
    * @param string $name  The name of the upgrade
    * 
    * @return true if ready to apply, false if already applied
    */
    public function upgrade($name)
    {
        if (parent::upgrade($name)) {
            switch ($name) {
            case "Glaug-Eldare":
                $this->set("name", "Glaug-Eldare");
                $this->set("gunnery", 3);
                $this->set("piloting", 2);
                $this->set("speed", 12);
                $this->set(
                    "abilities",
                    array(
                        'Afterburner'          => true,
                        'Aircraft'             => true,
                        'Battloid Restriction' => false,
                        'Cumbersome'           => false,
                        'Fast Mover'           => false,
                        'Flight'               => true,
                        'Focus Fire'           => false,
                        'Hands'                => false,
                        'Hover'                => false,
                        'Jettison'             => " to Glaug",
                        'Leadership'           => 4,
                        'Leap'                 => false,
                        'Life is Cheap'        => false,
                        'Variable Modes'       => false,
                        'Zentraidi Infantry'   => false,
                    )
                );
                $this->set(
                    "handtohand",
                    array(
                        "Body Block", "Punch", "Power Punch"
                    )
                );
                $this->set(
                    "ranged",
                    array(
                        "GlaugChargedParticleCannon", "GlaugHeavyParticleCannons", 
                        "GlaugRailCannons", "RegultAutoCannons", "Glaug150mmSRM",
                        "Glaug103mmMiniMissiles", "Glaug178mmSRM"
                    )
                );
                $this->setupRanged();

            }
            return true;
        }
        return false;
    }
}
