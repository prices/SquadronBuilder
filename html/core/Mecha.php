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
    /**
    * This function exports the abilities list as a block
    *
    * @param int &$x     The x to translate
    * @param int &$y     The y to translate
    * @param int &$count The number of mecha to encode
    * 
    * @return string The svg text for the block
    */
    public function encode($x = 0, $y = 0, $count = 1)
    {
        $text = "";
        $dx = $x + $this->padding;
        $dy = $y + $this->padding;
        for ($i = 0; $i < $count; $i++) {
            $text .= $this->_name($dx, $dy);
        }
        $text .= $this->_ranged($dx, $dy);
        $text .= $this->_handtohand($dx, $dy);
        $text .= $this->_stats($dx, $dy);
        $text .= $this->_abilities($dx, $dy);
        $dy += $this->padding - 1.5;
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
        if (is_array($this->ranged) && (count($this->ranged) > 0)) {
            $text .= $this->bold($dx, $dy, "Ranged:");
            foreach ($this->ranged as $class) {
                $class = '\SquadronBuilder\weapons\\'.$class;
                if (class_exists($class)) {
                    $h     = 0;
                    $text .= $class::export(
                        $this->index, 
                        array("width" => $this->width - (2 * $this->padding)),
                        $h, 
                        $dx, 
                        $dy
                    );
                    $dy   += $h;
                }
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
        if (is_array($this->handtohand) && (count($this->handtohand) > 0)) {
            $text .= $this->bold($dx, $dy, "Hand to Hand:");
            $text .= $this->small($dx, $dy, implode(", ", $this->handtohand));
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
        $text .= $this->normal(
            $x, 
            $dy,
            "Speed: ".$this->speed
        );
        $dy = $y + self::NSIZE / 2;
        $x += ($width / 4.5);
        $text .= $this->normal(
            $x,
            $dy, 
            "Pilot: ".$this->piloting
        );
        $dy = $y + self::NSIZE / 2;
        $x += ($width / 5);
        $text .= $this->normal(
            $x,
            $dy, 
            "Gunnery: ".$this->gunnery
        );
        $dy = $y + self::NSIZE / 2;
        $x += ($width / 4);
        $text .= $this->normal(
            $x,
            $dy, 
            "Defense: ".$this->defense
        );
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
        foreach ($this->abilities as $name => $value) {
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
        $x    = $dx + 10;
        $text = $this->large($x, $dy, $this->name);
        $y    = $dy - self::LSIZE - (self::DSIZE / 2);
        $x   += (self::LSIZE * strlen($this->name)) / 2;
        $text .= $this->damageBoxes($x, $y, $this->damage);
        return $text;
    }
}
