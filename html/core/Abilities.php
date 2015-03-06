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
abstract class Abilities extends BaseObject
{
    /** This is our width */
    protected $width = 60;
    /** This is a list of the special abilities for this object */
    protected $name = "Abilities";
    /** This is a list of the special abilities for this object */
    protected $abilities = array(
        "None"      => "No Abilities",
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
        if (!is_array($this->abilities) || (count($this->abilities) == 0)) {
            return $text;
        }
        $dx = $x + $this->padding;
        $dy = $y + $this->padding + (self::LSIZE * 0.3);
        $text   .= $this->largebold($dx, $dy, $this->name);
        foreach ($this->abilities as $value => $description) {
            $text .= $this->bold($dx, $dy, $value);
            $text .= $this->small($dx, $dy, $description);
            $dy += 1;
        }
        $this->height = $dy - $y;
        $text .= $this->rect($x, $y, $this->width, $this->height);
        $text = $this->group($text, $x, $y);
        return $text;
    }
    /**
    * Prints small text
    *
    * @param float &$x   The xposition
    * @param float &$y   The yposition
    * @param array $text The text to output
    * 
    * @return string The svg text for the block
    */
    protected function small(&$x, &$y, $text)
    {
        $text = wordwrap($text, 58);
        return parent::small($x, $y, $text);
    }

}
