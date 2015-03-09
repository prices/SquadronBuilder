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
namespace SquadronBuilder\force\characters;

defined( '_SQUADRONBUILDER' ) or die( 'Restricted access' );

/** These are our required files */
require_once dirname(__FILE__)."/../../core/Character.php";

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
class Azonia extends \SquadronBuilder\core\Character
{
    protected $params = array(
        /** This is a list of the special abilities for this object */
        "name" => "Azonia",
        "mecha" => array(
            "Glaug", "QueadluunRau"
        ),
        "points" => 5,
        "factions" => array("Zentraedi", "Malcontents"),
    );
    /**
    * Modifies the mecha that this character is given
    * 
    * @param \SquadronBuilder\core\Mecha &$mecha The mecha to modify
    * 
    * @return bool True if compatible, False otherwise
    */
    protected function modifyMecha(\SquadronBuilder\core\Mecha &$mecha)
    {
        $abilities = $mecha->get("abilities");
        if (!isset($abilities["Leadership"])) {
            $abilities["Leadership"] = 1;
        } else {
            $abilities["Leadership"] += 1;
        }
        $mecha->set("abilities", $abilities);
    }
    
}
