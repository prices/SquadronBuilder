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
namespace SquadronBuilder\force\special;

defined( '_SQUADRONBUILDER' ) or die( 'Restricted access' );

/** These are our required files */
require_once dirname(__FILE__)."/../../core/SpecialForce.php";

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
class Glaug extends \SquadronBuilder\core\SpecialForce
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "Glaug",
        /** These are our weapons */
        "mecha" => array(
            "Glaug" => 1, 
        ),
        "points" => 20,
        "upgrades" => array(
            "Glaug-Eldare" => array(
                "desc" => "Upgrade the Glaug in the squadron to a Glaug-Eldare",
                "points" => 30,
            ),
        ),
        "factions" => array("Zentraedi"),
    );
    /**
    * Checks to see if this card is compatible with the core force card
    * 
    * @param \SquadronBuilder\core\CoreForce $core The core force card
    * 
    * @return bool True if compatible, False otherwise
    */
    public function check(\SquadronBuilder\core\CoreForce $core)
    {
        $return  = parent::check($core);
        if ($return) {
            $mecha = $core->getMecha();
            if (isset($mecha["Glaug"])) {
                $return = false;
            }
        }
        return $return;
    }
    /**
    * Runs upgrades for this card
    * 
    * @param \SquadronBuilder\core\CoreForce &$core   The core force card
    * @param string                          $upgrade The upgrade to perform
    * 
    * @return bool True if compatible, False otherwise
    */
    public function upgrade(\SquadronBuilder\core\CoreForce &$core, $upgrade)
    {
        switch ($upgrade) {
        case "Glaug-Eldare":
            $core->replaceMecha("Glaug", "GlaugEldare");
            break;
        }
        return true;
    }
    
}
