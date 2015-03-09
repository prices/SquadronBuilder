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
abstract class Weapon extends BaseObject
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "",
        /** This is our range **/
        "range" => 0,
        /** This is our damage **/
        "damage" => 0,
        /** This is a list of the special abilities for this object */
        "abilities" => array(
            "Accurate"      => false,
            "Ammo"          => false,
            "Anti-Missile"  => false,
            "Blast"         => false,
            "Fly Over"      => false,
            "Inescapable"   => false,
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
        $text = "";
        $dx = $x + $this->padding;
        $dy = $y + ($this->padding * 1.4);
        $abilities = "RG: ".$this->get("range").", MD: ".$this->get("damage");
        foreach ($this->get("abilities") as $name => $value) {
            if ($value === true) {
                $abilities .= ", ".$name;
            } else if ($value !== false) {
                $abilities .= ", ".$name." ".$value;
            }
        }
        $text .= $this->normal($dx, $dy, $this->get("name"));
        $dy   += (self::NSIZE / 10);
        $text .= $this->small($dx, $dy, $abilities);
        $dy += ($this->padding * 0.6);
        $this->height = $dy - $y;
        $text .= $this->rect($x, $y, $this->width, $this->height, $this->get("color"));
        $text = $this->group($text, $x, $y);
        return $text;
    }
    /**
    * This function exports the abilities list as a block
    *
    * @param int &$x     The x to translate
    * @param int &$y     The y to translate
    * 
    * @return string The svg text for the block
    */
    public function ammo(&$x = 0, &$y = 0)
    {
        if (!$this->hasAmmo()) {
            return "";
        }
        $abilities = $this->get("abilities");
        $ammo      = $abilities["Ammo"];
        $dx        = $x;
        $dy        = $y;
        $text      = $this->small($dx, $dy, $this->get("name"));
        
        $by        = $dy - self::SSIZE - (self::DSIZE / 2);
        $dx       += $this->width - (self::DSIZE * $ammo * self::DMULT) - ($this->padding * 1.5);
        $text     .= $this->damageBoxes($dx, $by, $ammo);
        
        $diff      = $dy - $y;
        $diff = (abs($diff) > abs($by - $y)) ? $diff : ($by - $y);
        
        if ($diff < (self::DSIZE * (self::DMULT + 0.1))) {
            $diff = self::DSIZE * (self::DMULT + 0.1);
        }
        
        $y    += $diff;
        return $text;
    }
    /**
    * Says if this weapon has ammo, or not.
    *
    * @return bool True if ammo is present, false otherwise
    */
    public function hasAmmo()
    {
        $abilities = $this->get("abilities");
        if (!isset($abilities["Ammo"])) {
            return false;
        }
        $ammo = $abilities["Ammo"];
        return is_int($ammo) && ($ammo > 0);
    }
}
