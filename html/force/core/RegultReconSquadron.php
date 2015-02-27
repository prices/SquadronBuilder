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
namespace SquadronBuilder\force\core;

defined( '_SQUADRONBUILDER' ) or die( 'Restricted access' );

/** These are our required files */
require_once dirname(__FILE__)."/../../core/CoreForce.php";

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
class RegultReconSquadron extends \SquadronBuilder\core\CoreForce
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "Regult Recon Squadron",
        /** These are our weapons */
        "mecha" => array(
            "Glaug" => 1, 
            "Regult" => 6, 
            "QuelRegult" => 1, 
        ),
        "points" => 70,
        "upgrades" => array(
            "Veteran Warriors" => array(
                "desc" => "Regults, Serau-Ger and Gluu-Ger in this squadron get +1 to Piloting (or Physical) and +1 to Gunnery",
                "points" => 10,
            ),
            "Glaug-Eldare" => array(
                "desc" => "Upgrade the Glaug in the squadron to a Glaug-Eldare",
                "points" => 25,
            ),
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
            case "Veteran Warriors":
                $name = $this->get("name");
                $name = "Veteran ".$name;
                $this->set("name", $name);
                $points = $this->get("points");
                $points += 10;
                $this->set("points", $points);
                break;
            case "Glaug-Eldare":
                $points = $this->get("points");
                $points += 25;
                $this->set("points", $points);
                $mecha = $this->get("mecha");
                unset($mecha["Glaug"]);
                $mecha = array_reverse($mecha);
                $mecha["GlaugEldare"] = 1;
                $mecha = array_reverse($mecha);
                $this->set("mecha", $mecha);
                $this->setupMecha();
                break;
            }
            return true;
        }
        return false;
    }
}
