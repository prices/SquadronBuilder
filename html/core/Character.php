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
 * @package    core
 * @subpackage weapons
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @version    GIT: $Id: $
 * @link       https://github.com/prices/SquadronBuilder
 */
/** This is our namespace */
namespace SquadronBuilder\core;

defined( '_SQUADRONBUILDER' ) or die( 'Restricted access' );

/** These are our required files */
require_once "BaseObject.php";

/**
 * This class deals with printing out a single weapon.
 *
 * @category   html
 * @package    core
 * @subpackage weapons
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
abstract class Character extends BaseObject
{
    protected $params = array(
        /** This is a list of the special abilities for this object */
        "name" => "Character",
        /** This is a list of the special abilities for this object */
        "abilities" => array(
            "None"      => "No Abilities",
        ),
        "mecha" => array(
        ),
        "factions" => array(
        ),
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
        $return  = true;
        $return &= in_array($core->get("faction"), (array)$this->get("factions"));
        // Check to see if the right mecha is available.
        $options = $this->get("mecha");
        $mecha   = array_keys($core->getMecha());
        $return &= (count(array_intersect($mecha, $options)) > 0);
        return $return;
    }
    /**
    * Attaches this card to the given core force card
    * 
    * @param \SquadronBuilder\core\CoreForce &$core The core force card
    * 
    * @return bool True if compatible, False otherwise
    */
    public function attach(\SquadronBuilder\core\CoreForce &$core)
    {
        $return = $this->check($core);
        if ($return) {
            // Do the points
            $points  = $core->get("points") + $this->get("points");
            $core->set("points", $points);
            // Do the mecha
            $return = false;
            foreach ((array)$this->get("mecha") as $mecha) {
                $res = $core->replaceMecha($mecha, $mecha, 1);
                if (is_object($res)) {
                    $res->character($this->get("name"));
                    $this->modifyMecha($res);
                    $return = true;
                    break;
                }
            }
        }
        return $return;
    }
    /**
    * Modifies the mecha that this character is given
    * 
    * @param \SquadronBuilder\core\Mecha &$mecha The mecha to modify
    * 
    * @return bool True if compatible, False otherwise
    */
    protected function modifyMecha(\SquadronBuilder\core\Mecha &$mecha)
    {
    }

}
