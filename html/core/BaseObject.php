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
    /** This is our initial X coord */
    protected $x = 0;
    /** This is our initial Y coord */
    protected $y = 0;
    /** This is our padding value */
    protected $padding = 3;
    /** This is our width */
    protected $width = 100;
    /** This is our width */
    protected $height = 0;
    /** This is our index */
    protected $index = 0;
    
    /**
    * This function exports the abilities list as a block
    *
    * @param int $x The x to translate
    * @param int $y The y to translate
    * 
    * @return string The svg text for the block
    */
    public function encode($x = 0, $y = 0)
    {
        return "";
    }
    /**
    * This function exports the abilities list as a block
    *
    * @param int &$x The x to translate
    * @param int &$y The y to translate
    * 
    * @return float The height of this object built.
    */
    public function height()
    {
        $this->encode();
        return $this->height;
    }
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
        $this->x     = $x;
        $this->y     = $y;
        $this->index = &$index;
        if (isset($params["padding"])) {
            $this->padding = $params["padding"];
        }
        if (isset($params["width"])) {
            $this->width   = $params["width"];
        }
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
    protected function bold(&$x, &$y, $text)
    {
        if (strlen($text) == 0) {
            return "";
        }
        $y += 1.75;
        $ret = $this->text(
            $text, $x, $y, "black", "none", "3.5mm", "text".$this->index++, 'style="font-weight:bold;"'
        );
        $y += 1.75;
        $x += 0;
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
    protected function small(&$x, &$y, $text)
    {
        if (strlen($text) == 0) {
            return "";
        }
        $values = explode("\n", $text);
        $ret = "";
        foreach ($values as $txt) {
            $y += 1.5;
            $ret .= $this->text(
                $txt, $x, $y, "black", "none", "2.5mm", "text".$this->index++, ''
            );
            $y += 1.5;
            $x += 0;
        }
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
    protected function header(&$x, &$y, $text)
    {
        if (strlen($text) == 0) {
            return "";
        }
        $y += 3;
        $ret = $this->text(
            $text, $x, $y, "black", "none", "6mm", "text".$this->index++, 'style="font-weight:bold;"'
        );
        $y += 4;
        $x += 0;
        return $ret;
    }
    /**
    * Returns a text object
    *
    * @param string $text     The text to print
    * @param int    $x        The x-coordinate of the upper left corner
    * @param int    $y        The y-coordinate of the upper left corner
    * @param string $fill     The fill color (be sure to add "#")
    * @param string $stroke   The line color (be sure to add "#")
    * @param string $fontsize The size of font to use
    * @param string $id       The id of the shape
    * @param string $extra    Extra stuff to add to the tag
    *
    * @return string
    */
    protected function text(
        $text, $x, $y, $fill, $stroke, $fontsize = "3mm", $id = "",
        $extra = ""
    ) {
        return '<text id="'.$id.'" x="'.(float)$x.'mm" y="'.(float)$y.'mm"'
            .'  font-size="'.$fontsize.'" fill="'.$fill.'" stroke="'.$stroke.'"'
            .' '.$extra.'>'.strip_tags($text).'</text>'."\n";
    }
    /**
    * Returns a grouped object
    *
    * @param string $object The text to print
    * @param int    $x      The x-coordinate of the upper left corner
    * @param int    $y      The y-coordinate of the upper left corner
    *
    * @return string
    */
    protected function group($object, $x, $y) 
    {
        $ret = '<g transform="translate('.$x.'mm, '.$y.'mm)" id="g'.$this->index++.'">
         '.$object.'</g>';
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
    protected function rect($x, $y, $width, $height)
    {
        if (($height == 0) || ($width == 0)) {
            return "";
        }
        $ret = '<rect id="rect'.$this->index++.'" y="'.$y.'mm" x="'.$x.'mm"'
              .' height="'.(float)$height.'mm" width="'.(float)$width.'mm"'
              .' style="fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1" />'."\n";
        return $ret;
    }
}
