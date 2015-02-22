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

/**
 * This class is the base for all of our printing objects
 *
 * @category   html
 * @package    core
 * @subpackage mecha
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
abstract class BaseObject
{    
    /** This is our header for abilities **/
    protected static $abilitiesHeader = "";
    /** This is a list of the special abilities for this object */
    protected static $abilities = array(
    );
    /**
    * This function exports the abilities list as a block
    *
    * @param array $translate The x and y values to translate this block to
    * 
    * @return string The svg text for the block
    */
    public static function exportAbilities($translate = array())
    {
        $text = "";
        if (!is_array(static::$abilities) || (count(static::$abilities) == 0)) {
            return $text;
        }
        $x       = 5;
        $y       = 5;
        $text   .= static::text($x, $y, static::header($x, $y, static::$abilitiesHeader));
        $ability = "";
        $tx      = $x;
        $ty      = $y;
        foreach (static::$abilities as $value => $description) {
            $ability .= static::bold($x, $y, $value);
            $ability .= static::small($x, $y, $description);
        }
        $text .= static::text($tx, $ty, $ability);
        $text .= static::rect(
        return $text;
    }
    /**
    * Prints normal bold text
    *
    * @param float $x   The xposition
    * @param float $y   The yposition
    * @param array $text The text to output
    * 
    * @return string The svg text for the block
    */
    protected static function text($x, $y, $text)
    {
        if (strlen($text) == 0) {
            return "";
        }
        $ret = '<text
                    sodipodi:linespacing="125%"
                    xml:space="preserve"
                 >
             '.$text.'
             </text>';
        return $ret;
    }
    /**
    * Prints normal bold text
    *
    * @param float &$x   The xposition
    * @param float &$y   The yposition
    * @param array $text The text to output
    * 
    * @return string The svg text for the block
    */
    protected static function bold(&$x, &$y, $text)
    {
        if (strlen($text) == 0) {
            return "";
        }
        $ret = '<tspan
             id="tspan23715"
             y="'.$y.'"
             x="'.$x.'"
             sodipodi:role="line"
             style="font-size:9px;font-weight:bold;">
             '.$text.'
             </tspan>';
        $x += 11;
        $y += 0;
        return $ret;
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
    protected static function small(&$x, &$y, $text)
    {
        if (strlen($text) == 0) {
            return "";
        }
        $ret = '<tspan
             id="tspan23715"
             y="'.$y.'"
             x="'.$x.'"
             sodipodi:role="line"
             style="font-size:6px;">
             '.$text.'
             </tspan>';
        $x += 8;
        $y += 0;
        return $ret;
    }
    /**
    * Prints normal header text
    *
    * @param float &$x   The xposition
    * @param float &$y   The yposition
    * @param array $text The text to output
    * 
    * @return string The svg text for the block
    */
    protected static function header(&$x, &$y, $text)
    {
        if (strlen($text) == 0) {
            return "";
        }
        $ret = '<tspan
             id="tspan23715"
             y="'.$y.'"
             x="'.$x.'"
             sodipodi:role="line"
             style="font-size:14px;font-weight:bold;">
             '.$text.'
             </tspan>';
        $x += 15;
        $y += 0;
        return $ret;
    }
    /**
    * Prints a rectangle
    *
    * @param float $x1     The top left corner
    * @param float $y1     The top left corner
    * @param float $width  The width
    * @param float $height The height
    * 
    * @return string The svg text for the block
    */
    protected static function rectangle($x, $y, $width, $height)
    {
        if (($height == 0) || ($width == 0)) {
            return "";
        }
        $ret = '<rect
             id="rect23715"
             y="'.$y.'"
             x="'.$x.'"
             height="'.$height.'"
             width="'.$width.'"
             id="rect23737"
             style="fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1" />
             />';
        $x += 15;
        $y += 0;
        return $ret;
    }
}
