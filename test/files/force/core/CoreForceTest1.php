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
namespace SquadronBuilder\force\core;
/** Required Class */
require_once CODE_BASE."/core/CoreForce.php";
/** This is the test classes */
require_once TEST_CONFIG_BASE.'files/TestClasses.php';

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
class CoreForceTest1 extends \SquadronBuilder\core\CoreForce
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "Test Squadron 1",
        /** These are our weapons */
        "mecha" => array(
            "MechaTest1" => 1, 
        ),
        "points" => 50,
        "upgrades" => array(
            "Veteran Warriors" => array(
                "desc" => "Regults, Serau-Ger and Gluu-Ger in this squadron get +1 to Piloting (or Physical) and +1 to Gunnery",
                "points" => 10,
            ),
        ),
        "faction" => "Zentraedi",
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
            case "":
                break;
            }
            return true;
        }
        return false;
    }
}

?>
