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
    );
    /**
    * This function exports the abilities list as a block
    *
    * @param int &$x     The x to translate
    * @param int &$y     The y to translate
    * 
    * @return string The svg text for the block
    */
    public function render($x = 0, $y = 0)
    {
    }
    /**
    * Checks if a character can use this mecha
    *
    * @param string $mecha The mecha to check
    * 
    * @return bool true if this character can be in this mecha
    */
    public function mecha($mecha)
    {
        if (array_search($mecha, $this->get("mecha")) !== false) {
            return true;
        }
        false;
    }
    /**
    * Upgrades a mecha with this card.
    *
    * @param object &$mecha The mecha to upgrade
    * 
    * @return bool true if the mecha was upgraded
    */
    public function upgrade(&$mecha)
    {
        return false;
    }

}
