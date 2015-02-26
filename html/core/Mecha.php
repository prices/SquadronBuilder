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
 * @subpackage mecha
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
 * This class deals with printing out a single mecha.
 *
 * @category   html
 * @package    core
 * @subpackage mecha
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class Mecha extends BaseObject
{    
    /** These are the colors for the ranged weapons */
    private $_colors = array("#CF0000", "#CFCF00", "#00CF00");
    /** These are the colors for the ranged weapons */
    private $_weapons = array();
    /** This says whether we use ammo or not */
    private $_usesAmmo = false;
    /**
    * This is the constructor for the class
    * 
    * @param float &$x     The x coordinate to start at
    * @param float &$y     The y coordinate to start at
    * @param float &$index The start index for ids
    * @param array $params The other parameters
    *
    * @return null
    */
    public function __construct(&$index, $params = array(), $x = 0, $y = 0)
    {
        parent::__construct($index, $params, $x, $y);
        $ind = 0;
        $ranged = $this->get("ranged");
        if (is_array($ranged) && (count($ranged) > 0)) {
            foreach ($ranged as $class) {
                include_once(dirname(__FILE__)."/../weapons/$class.php");
                $class = '\SquadronBuilder\weapons\\'.$class;
                if (class_exists($class)) {
                    $params["width"] = $this->width - ($this->padding * 2);
                    $wpn = new $class($index, $params);
                    if ($wpn->hasAmmo()) {
                        $this->_usesAmmo = true;
                        $color = $this->_colors[$ind];
                        if (is_string($color)) {
                            $wpn->set("color", $color);
                            $ind++;
                        }
                    }
                    $this->_weapons[] = $wpn;
                }
            }
        }
    }
    /**
    * This function exports the abilities list as a block
    *
    * @param int &$x     The x to translate
    * @param int &$y     The y to translate
    * @param int &$count The number of mecha to encode
    * 
    * @return string The svg text for the block
    */
    public function encode($x = 0, $y = 0)
    {
        $text  = "";
        $dx    = $x + $this->padding;
        $dy    = $y + $this->padding;
        $count = empty($this->get("count")) ? 1 : $this->get("count");
        
        for ($i = 0; $i < $count; $i++) {
            $text .= $this->_name($dx, $dy);
        }
        $dy += $this->padding;
        $text .= $this->_ranged($dx, $dy);
        $text .= $this->_handtohand($dx, $dy);
        $text .= $this->_stats($dx, $dy);
        $text .= $this->_abilities($dx, $dy);
        $dy += $this->padding;
        $this->height = $dy - $y;
        $text .= $this->rect($x, $y, $this->width, $this->height);
        $text = $this->group($text, $x, $y);
        return $text;
    }
    /**
    * This function returns the ranged weapons
    *
    * @param int &$dx The x to translate
    * @param int &$dy The y to translate
    * 
    * @return string The svg text for the block
    */
    private function _ranged(&$dx, &$dy)
    {
        $text = "";
        if (count($this->_weapons) > 0) {
            $text .= $this->bold($dx, $dy, "Ranged:");
            foreach ($this->_weapons as &$obj) {
                $text .= $obj->encode($dx,$dy);
                $dy += $obj->height();
            }
            $dy += 2;
        }
        return $text;
    }
    /**
    * This function returns the ranged weapons
    *
    * @param int &$dx The x to translate
    * @param int &$dy The y to translate
    * 
    * @return string The svg text for the block
    */
    private function _handtohand(&$dx, &$dy)
    {
        $text = "";
        $handtohand = $this->get("handtohand");
        if (is_array($handtohand) && (count($handtohand) > 0)) {
            $text .= $this->bold($dx, $dy, "Hand to Hand:");
            $text .= $this->small($dx, $dy, implode(", ", $handtohand));
        }
        return $text;
    }
    /**
    * This function returns the stats
    *
    * @param int &$dx The x to translate
    * @param int &$dy The y to translate
    * 
    * @return string The svg text for the block
    */
    private function _stats(&$dx, &$dy)
    {
        $text = "";
        $width = $this->width - (2 * $this->padding);
        $x = $dx + 1;
        $y = $dy;
        $dy = $y + self::NSIZE / 2;
        $text .= $this->normal($x, $dy, "Speed: ".$this->get("speed"));
        $dy = $y + self::NSIZE / 2;
        $x += ($width / 4.5);
        $text .= $this->normal($x, $dy, "Pilot: ".$this->get("piloting"));
        $dy = $y + self::NSIZE / 2;
        $x += ($width / 5);
        $text .= $this->normal($x, $dy, "Gunnery: ".$this->get("gunnery"));
        $dy = $y + self::NSIZE / 2;
        $x += ($width / 4);
        $text .= $this->normal($x, $dy, "Defense: ".$this->get("defense"));
        $height = $dy - $y;
        $dy += 2;
        $text .= $this->rect($dx, $y, $width, $height);
        return $text;
    }
    /**
    * This function returns the stats
    *
    * @param int &$dx The x to translate
    * @param int &$dy The y to translate
    * 
    * @return string The svg text for the block
    */
    private function _abilities(&$dx, &$dy)
    {
        $text .= $this->bold($dx, $dy, "Special Abilities:");
        $abilities = "";
        $sep = "";
        foreach ($this->get("abilities") as $name => $value) {
            if ($value === true) {
                $abilities .= $sep.$name;
                $sep = ", ";
            } else if ($value !== false) {
                $abilities .= $sep.$name." ".$value;
                $sep = ", ";
            }
        }
        $text .= $this->normal($dx, $dy, $abilities);
        return $text;
    }
    /**
    * This function returns the stats
    *
    * @param int &$dx The x to translate
    * @param int &$dy The y to translate
    * 
    * @return string The svg text for the block
    */
    private function _name(&$dx, &$dy)
    {
        $y     = $dy + $this->padding;
        $x     = $dx + $this->padding;
        $hasammo = $this->_hasammo();
        if ($hasammo) {
            $y += 1;
        }
        $text  = $this->large($x, $y, $this->get("name"));
        $by    = $y - self::LSIZE - (self::DSIZE / 2);
        $x    += (self::LSIZE * strlen($this->get("name"))) / 1.75;
        $text .= $this->damageBoxes($x, $by, $this->get("damage"));
        $x     = $dx + $this->padding;
        $ammo = $this->_ammo($x, $y);
        $height = $y - $dy;
        if ($hasammo) {
            $text  .= $ammo;
            $width  = $this->width - ($this->padding * 2);
            $text  .= $this->rect($dx, $dy, $width, $height);
        }
        $text = $this->group($text, $dx, $dy);
        
        $dy += $height;
        return $text;
    }
    /**
    * This function returns the stats
    *
    * @param int &$dx The x to translate
    * @param int &$dy The y to translate
    * 
    * @return string The svg text for the block
    */
    private function _ammo(&$dx, &$dy)
    {
        $text = "";
        if (count($this->_weapons) > 0) {
            foreach ($this->_weapons as &$obj) {
                $text .= $obj->ammo($dx, $dy);
            }
        }
        return $text;
    }
    /**
    * This function returns the stats
    *
    * @return string The svg text for the block
    */
    private function _hasammo()
    {
        return $this->_usesAmmo;
    }
}
