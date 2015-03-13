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
    /** This is the jettison color */
    const JETTISON_COLOR = "#0000CF";
    /** These are the colors for the ranged weapons */
    private $_colors = array("#CF0000", "#CFCF00", "#00CF00");
    /** These are the colors for the ranged weapons */
    private $_weapons = array();
    /** This says whether we use ammo or not */
    private $_usesAmmo = false;
    /** This says whether we have a jettison attribute */
    private $_jettisonto = false;
    /** This is the character in this mecha */
    private $_character = null;
    /** The number of rows in our damage boxes.  null for auto */
    protected $rows = null;
    /** The number of rows in our extra damage boxes.  null for auto */
    protected $extrarows = null;
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
        $this->_weapons = $this->setupRanged();
        if ($class = $this->_hasJettison()) {
            $this->getFile(dirname(__FILE__)."/../mecha/$class.php");
            $class = '\SquadronBuilder\mecha\\'.$class;
            if (class_exists($class)) {
                $this->_jettisonto = new $class($this->index);
            }
        }
    }
    /**
    * This sets up our ranged weapons
    *
    * @param array $ranged Our ranged weapons
    *
    * @return string The svg text for the block
    */
    protected function &setupRanged($ranged = null)
    {
        $ind = 0;
        $ranged = is_array($ranged) ? $ranged : $this->get("ranged");
        $weapons = array();
        if (is_array($ranged) && (count($ranged) > 0)) {
            foreach ($ranged as $class) {
                $params = array();
                $this->getFile(dirname(__FILE__)."/../weapons/$class.php");
                $class = '\SquadronBuilder\weapons\\'.$class;
                if (class_exists($class)) {
                    $params["width"] = $this->width - ($this->padding * 2);
                    $wpn = new $class($this->index, $params);
                    if ($wpn->hasAmmo()) {
                        $this->_usesAmmo = true;
                        $color = $this->_colors[$ind];
                        if (is_string($color)) {
                            $wpn->set("color", $color);
                            $ind++;
                        }
                    }
                    $weapons[] = $wpn;
                }
            }
        }
        return $weapons;
    }
    /**
    * This function exports the abilities list as a block
    *
    * @param int &$x The x to translate
    * @param int &$y The y to translate
    * 
    * @return string The svg text for the block
    */
    public function render($x = 0, $y = 0)
    {
        $text  = "";
        $dx    = $x + $this->padding;
        $dy    = $y + $this->padding;
        $count = empty($this->get("count")) ? 1 : $this->get("count");
        
        if (is_string($this->_character)) {
            $count = 1;
            $dy += $this->padding;
            $text .= $this->header($dx, $dy, $this->_character);
            
        }
        for ($i = 0; $i < $count; $i++) {
            $text .= $this->_name($dx, $dy);
        }
        $dy   += $this->padding;
        $text .= $this->_render($dx, $dy);
        if (is_object($this->_jettisonto)) {
            $text .= $this->_jettisonto->jettisonTo($x, $dy);
            $dy   += $this->_jettisonto->height();
        }
        $dy += $this->padding;
        $this->height = $dy - $y;
        $text .= $this->rect($x, $y, $this->width, $this->height);
        $text = $this->group($text, $x, $y);
        return $text;
    }
    /**
    * This function exports the abilities list as a block
    *
    * @param int &$x The x to translate
    * @param int &$y The y to translate
    * 
    * @return string The svg text for the block
    */
    private function _render(&$x = 0, &$y = 0)
    {
        $text  = "";
        if ($this->_hasModes()) {
            $text .= $this->_abilities($x, $y);
            $modes = (array)$this->get("modes");
            foreach ($modes as $mode) {
                $text .= $this->_mode($x, $y, $mode);
            }
        } else {
            $text .= $this->_ranged($x, $y);
            $text .= $this->_handtohand($x, $y);
            $text .= $this->_stats($x, $y);
            $text .= $this->_abilities($x, $y);
        }
        return $text;
    }
    /**
    * This function exports the abilities list as a block
    *
    * @param int    &$dx  The x to translate
    * @param int    &$dy  The y to translate
    * @param string $mode The mode to render
    * 
    * @return string The svg text for the block
    */
    private function _mode(&$dx = 0, &$dy = 0, $mode)
    {
        $text  = "";
        $stats = $this->get($mode);
        $stat = array(
            "speed" => $stats["speed"],
            "piloting" => $stats["piloting"],
            "gunnery" => $stats["gunnery"],
            "defense" => $stats["defense"],
        );
        $weapons = $this->setupRanged($stats["ranged"]);
        $x = $dx;
        $y = $dy;

        $dy += $this->padding;
        $text .= $this->largebold($dx, $dy, $mode);
        $text .= $this->_ranged($dx, $dy, $weapons);
        $text .= $this->_handtohand($dx, $dy, $stats["handtohand"]);
        $text .= $this->_stats($dx, $dy, $stat);
        $text .= $this->_abilities($dx, $dy, $stats["abilities"]);
        $dy += $this->padding;
//        $text .= $this->rect($x, $y, $this->width, $this->height);
        $text = $this->group($text, $x, $y);
        return $text;
    }
    /**
    * This function exports the abilities list as a block
    *
    * @param int &$x The x to translate
    * @param int &$y The y to translate
    * 
    * @return string The svg text for the block
    */
    public function jettisonTo($x = 0, $y = 0)
    {
        $text  = "";
        $dx    = $x + $this->padding;
        $dy    = $y + $this->padding;
        
        $dy += $this->padding;
        $text .= $this->largebold($dx, $dy, "Jettison to ".$this->get("name"));
        $text .= $this->_render($dx, $dy);
        $dy += $this->padding;
        $this->height = $dy - $y;
        $text = $this->group($text, $x, $y);
        return $text;
    }
    /**
    * Adds a character name to the mecha
    *
    * @param string $character The full name of the character to use
    * 
    * @return string The svg text for the block
    */
    public function character($name)
    {
        if (is_string($name)) {
            $this->_character = $name;
        }
    }
    /**
    * This function returns the ranged weapons
    *
    * @param int   &$dx     The x to translate
    * @param int   &$dy     The y to translate
    * @param array $weapons The weapons to use
    * 
    * @return string The svg text for the block
    */
    private function _ranged(&$dx, &$dy, $weapons = null)
    {
        $text = "";
        $weapons = is_array($weapons) ?  $weapons : $this->_weapons;
        $text .= $this->bold($dx, $dy, "Ranged:");
        if (count($weapons) > 0) {
            foreach ($weapons as &$obj) {
                $text .= $obj->render($dx,$dy);
                $dy += $obj->height();
            }
            $dy += 2;
        } else {
            $text .= $this->normal($dx, $dy, "None");
            $dy += 2;
        }
        return $text;
    }
    /**
    * This function returns the ranged weapons
    *
    * @param int   &$dx The x to translate
    * @param int   &$dy The y to translate
    * @param array $hth The hand to hand array to use
    * 
    * @return string The svg text for the block
    */
    private function _handtohand(&$dx, &$dy, $hth = null)
    {
        $text = "";
        $handtohand = is_array($hth) ? $hth : $this->get("handtohand");
        $text .= $this->bold($dx, $dy, "Hand to Hand:");
        if (is_array($handtohand) && (count($handtohand) > 0)) {
            $text .= $this->small($dx, $dy, implode(", ", $handtohand));
        } else {
            $text .= $this->small($dx, $dy, "None");
        }
        return $text;
    }
    /**
    * This function returns the stats
    *
    * @param int   &$dx   The x to translate
    * @param int   &$dy   The y to translate
    * @param array $stats The stats to use
    * @return string The svg text for the block
    */
    private function _stats(&$dx, &$dy, $stats = null)
    {
        if (!is_array($stats)) {
            $stats = array(
                "speed" => $this->get("speed"),
                "piloting" => $this->get("piloting"),
                "gunnery" => $this->get("gunnery"),
                "defense" => $this->get("defense"),
            );
        }
        $text = "";
        $width = $this->width - (2 * $this->padding);
        $x = $dx + 1;
        $y = $dy;
        $dy = $y + self::NSIZE / 2;
        $text .= $this->normal($x, $dy, "Speed: ".$stats["speed"]);
        $dy = $y + self::NSIZE / 2;
        $x += ($width / 4);
        $text .= $this->normal($x, $dy, "Pilot: ".$stats["piloting"]);
        $dy = $y + self::NSIZE / 2;
        $x += ($width / 5.5);
        $text .= $this->normal($x, $dy, "Gunnery: ".$stats["gunnery"]);
        $dy = $y + self::NSIZE / 2;
        $x += ($width / 3.5);
        $text .= $this->normal($x, $dy, "Defense: ".$stats["defense"]);
        $height = $dy - $y;
        $dy += 2;
        $text .= $this->rect($dx, $y, $width, $height);
        return $text;
    }
    /**
    * This function returns the stats
    *
    * @param int   &$dx  The x to translate
    * @param int   &$dy  The y to translate
    * @param array $abil The abilities to use
    * 
    * @return string The svg text for the block
    */
    private function _abilities(&$dx, &$dy, $abil = null)
    {
        $text = $this->bold($dx, $dy, "Special Abilities:");
        $abilities = "";
        $sep = "";
        $abil = is_array($abil) ? $abil : $this->get("abilities");
        foreach ($abil as $name => $value) {
            if ($value === true) {
                $abilities .= $sep.$name;
                $sep = ", ";
            } else if ($value !== false) {
                if ($name == "Jettison") {
                    $abilities .= $sep.$name." to ".$this->_jettisonto->get("name");
                } else {
                    $abilities .= $sep.$name." ".$value;
                    $sep = ", ";
                }
            }
        }
        $abilities = wordwrap($abilities, 55);
        $text .= $this->normal($dx, $dy, $abilities);
        $extra = $this->get("extraabilities");
        if (is_array($extra)) {
            foreach ($extra as $name => $value) {
                $text .= $this->bold($dx, $dy, $name);
                $text .= $this->small($dx, $dy, $value);
            }
            
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
        $x    += ((self::LSIZE * strlen($this->get("name"))) / 1.75) + 2;
        $text .= $this->damageBoxes($x, $by, $this->get("damage"), $this->rows);

        $y = $by;
        if ($hasammo) {
            $y += self::DSIZE * .5;
        }
        $extra = (int)$this->get("extradamage");
        if ($extra > 0) {
            $text .= $this->damageBoxes($x, $by, $extra, $this->extrarows, self::JETTISON_COLOR);
            $y += (self::DSIZE * 1.2);
        }
        $ammo = "";
        if ($hasammo) {
            $x     = $dx + $this->padding;
            $ammo .= $this->_ammo($x, $y);
            $y    += $this->padding;
        }
        $jetti = "";
        if ($this->_hasJettison()) {
            $jetti = $this->jettison($x, $y);
        }
        $height = $y - $dy;
        if ($hasammo || $this->_hasJettison()) {
            $text  .= $ammo.$jetti;
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
    /**
    * This function returns the stats
    *
    * @return string The svg text for the block
    */
    private function _hasJettison()
    {
        $attrib = $this->get("abilities");
        return $attrib["Jettison"];
    }
    /**
    * This function returns the stats
    *
    * @return string The svg text for the block
    */
    private function _hasModes()
    {
        $attrib = $this->get("abilities");
        return $attrib["Variable Modes"];
    }
    /**
    * This function exports the abilities list as a block
    *
    * @param int &$x     The x to translate
    * @param int &$y     The y to translate
    * 
    * @return string The svg text for the block
    */
    protected function jettison(&$x = 0, &$y = 0)
    {
        $text = "";
        if (!$this->_hasJettison()) {
            return "";
        }
        $dx    = $x;
        $dy    = $y;
        $by    = $dy - (self::DSIZE/2);
        $text .= $this->damageBoxes($dx, $by, 1, null, self::JETTISON_COLOR);
        
        $name = "Jettison to ".$this->_jettisonto->get("name");
        $dx   += (self::DSIZE * 1.4);
        $text  .= $this->bold($dx, $dy, $name);
        $diff  = $dy - $y;
        
        $dy    = $dy - self::NSIZE - (self::DSIZE / 2);
        $dx    = $this->width - $this->padding - (self::DSIZE);
        if ($diff < (self::DSIZE * 1.3)) {
            $diff = self::DSIZE * 1.3;
        }
        $y    += $diff;
        return $text;
    }
    /**
    * This replaces a weapon in our _weapons array.
    *
    * @param string $old  The name of the old mecha
    * @param string $new  The name of the new mecha
    * @param string $mode The name of the mode to replace the weapon in
    *
    * @return pointer to new mecha on success, null otherwise
    */
    public function replaceWeapon($old, $new, $mode = "")
    {
        $ranged = (array)$this->get("ranged");
        $key    = array_search($old, $ranged);
        if ($key !== false) {
            if (empty($new)) {
                unset($ranged[$key]);
            } else {
                $ranged[$key] = $new;
            }
            $this->set("ranged", $ranged);
        }
        if (!empty($mode)) {
            $mode = is_string($mode) ? array($mode) : (array)$mode;
            foreach ($mode as $mod) {
                $m = (array)$this->get($mod);
                if (isset($m["ranged"]) && is_array($m["ranged"])) {
                    $key    = array_search($old, $m["ranged"]);
                    if ($key !== false) {
                        if (empty($new)) {
                            unset($ranged[$key]);
                        } else {
                            $m["ranged"][$key] = $new;
                        }
                        $this->set($mod, $m);
                    }
                }
            }
        }
        $this->_weapons = $this->setupRanged();

        return null;
    }
    /**
    * This adds weapons in our array.  If the weapon already exists in the
    * array, it will just add another
    *
    * @param string $name The name of the mecha to add
    * @param string $mode The name of the mode to add the weapon in
    *
    * @return pointer to new mecha on success, null otherwise
    */
    public function addWeapon($name, $mode = "")
    {
        if (empty($name)) {
            return;
        }
        $ranged = (array)$this->get("ranged");
        $ranged[] = $name;
        $this->set("ranged", $ranged);
        if (!empty($mode)) {
            $mode = is_string($mode) ? array($mode) : (array)$mode;
            foreach ($mode as $mod) {
                $m = (array)$this->get($mod);
                if (isset($m["ranged"]) && is_array($m["ranged"])) {
                    $m["ranged"][] = $name;
                    $this->set($mod, $m);
                }
            }
        }
        $this->_weapons = $this->setupRanged();
    }
    /**
    * This returns the mecha in the _mecha array
    *
    * @param string $mode The mode to get the weapons from
    *
    * @return array of the form array(name => count)
    */
    public function getWeapons($mode = "")
    {
        $return = array();
        if (empty($mode)) {
            foreach ($this->_weapons as $key => &$weapon) {
                $class = get_class($weapon);
                $name  = substr($class, strrpos($class, "\\") + 1);
                $return[] = $name;
            }
        } else {
            $m = (array)$this->get($mode);
            if (isset($m["ranged"])) {
                $return = (array)$m["ranged"];
            }
        }
        return $return;
    }
}
