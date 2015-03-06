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
    /** This is the size of the damage squares in mm*/
    const DSIZE = 3;
    /** This is the size of normal text in mm */
    const SSIZE = 1.75;
    /** This is the size of normal text in mm */
    const NSIZE = 2.75;
    /** This is the size of normal text in mm */
    const LSIZE = 4;
    /** This is the size of normal text in mm */
    const HSIZE = 5;
    /** This is our font family */
    const FONTFAMILY = "'Bitstream Vera Sans', sans-serif";
    /** This is our initial X coord */
    protected $x = 0;
    /** This is our initial Y coord */
    protected $y = 0;
    /** This is our padding value */
    protected $padding = 1.5;
    /** This is our width */
    protected $width = 70;
    /** This is our width */
    protected $height = 0;
    /** This is our index */
    protected $index = 0;
    /** This is other parameters */
    protected $params = array(
    );
    /** This is our upgrade status*/
    private $_upgrades = array();
    /** This our defaults parameters */
    protected $defaults = array(
        "color" => "#000000",
        "count" => 1,
    );
    
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
        $this->x      = $x;
        $this->y      = $y;
        $this->index  = &$index;
        foreach ((array)$params as $key => $value) {
            $this->params[$key] = $value;
        }
        if (isset($params["padding"])) {
            $this->padding = $params["padding"];
        }
        if (isset($params["width"])) {
            $this->width   = $params["width"];
        }
    }
    /**
    * This function sets a parameter
    *
    * @param string $name  The name of the parameter
    * @param mixed  $value The value to set the parameter to.
    * 
    * @return string The svg text for the block
    */
    public function set($name, $value)
    {
        $this->params[$name] = $value;
        return $this->get($name);
    }
    /**
    * This function gets a parameter
    *
    * @param string $name The name of the parameter
    * 
    * @return string The svg text for the block
    */
    public function get($name)
    {
        if (isset($this->params[$name])) {
            return $this->params[$name];
        }
        if (isset($this->defaults[$name])) {
            return $this->defaults[$name];
        }
        return null;
    }
    /**
    * This function runs an upgrade
    *
    * @param string $name  The name of the upgrade
    * 
    * @return true if ready to apply, false if already applied
    */
    public function upgrade($name)
    {
        if (isset($this->_upgrades[$name])) {
            return false;
        }
        $this->_upgrades[$name] = true;
        return true;
    }
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
        return "";
    }
    /**
    * This function exports the abilities list as a block
    *
    * @return float The height of this object built.
    */
    public function height()
    {
        if (empty($this->height)) {
            $this->render();
        }
        return $this->height;
    }
    /**
    * This function exports the abilities list as a block
    *
    * @return float The width of this object built.
    */
    public function width()
    {
        return $this->width;
    }
    
    /**
    * Prints normal normal text
    *
    * @param float &$x   The xposition
    * @param float &$y   The yposition
    * @param array $text The text to output
    * 
    * @return string The svg text for the block
    */
    protected function normal(&$x, &$y, $text)
    {
        if (strlen($text) == 0) {
            return "";
        }
        $values = explode("\n", $text);
        $ret = "";
        foreach ($values as $txt) {
            $y += self::NSIZE * 0.5;
            $ret .= $this->text(
                $txt, $x, $y, "black", "none", self::NSIZE."mm", "text".$this->index++, ''
            );
            $y += self::NSIZE * 0.5;
            $x += 0;
        }
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
    protected function bold(&$x, &$y, $text)
    {
        if (strlen($text) == 0) {
            return "";
        }
        $y += self::NSIZE * 0.5;
        $ret = $this->text(
            $text, $x, $y, "black", "none", self::NSIZE."mm", "text".$this->index++, 'font-weight:bold;'
        );
        $y += self::NSIZE * 0.5;
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
            $y += self::SSIZE * 0.5;
            $ret .= $this->text(
                $txt, $x, $y, "black", "none", self::SSIZE."mm", "text".$this->index++, ''
            );
            $y += self::SSIZE * 0.6;
            $x += 0;
        }
        return $ret;
    }
    /**
    * Prints normal large text
    *
    * @param float &$x   The xposition
    * @param float &$y   The yposition
    * @param array $text The text to output
    * 
    * @return string The svg text for the block
    */
    protected function large(&$x, &$y, $text)
    {
        if (strlen($text) == 0) {
            return "";
        }
        $y += self::LSIZE * 0.5;
        $ret = $this->text(
            $text, $x, $y, "black", "none", self::LSIZE."mm", "text".$this->index++, ''
        );
        $y += self::LSIZE * 0.6;
        $x += 0;
        return $ret;
    }
    /**
    * Prints normal large text
    *
    * @param float &$x   The xposition
    * @param float &$y   The yposition
    * @param array $text The text to output
    * 
    * @return string The svg text for the block
    */
    protected function largebold(&$x, &$y, $text)
    {
        if (strlen($text) == 0) {
            return "";
        }
        $y += self::LSIZE * 0.5;
        $ret = $this->text(
            $text, $x, $y, "black", "none", self::LSIZE."mm", "text".$this->index++, 'font-weight:bold;'
        );
        $y += self::LSIZE * 0.6;
        $x += 0;
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
        $y += self::HSIZE * 0.5;
        $ret = $this->text(
            $text, $x, $y, "black", "none", self::HSIZE."mm", "text".$this->index++, 'font-weight:bold;'
        );
        $y += self::HSIZE * 0.6;
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
            .' style="'.$extra.'" font-family="'.self::FONTFAMILY.'" >'.strip_tags($text).'</text>'."\n";
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
        $ret = '<g>
         '.$object.'</g>';
        return $ret;
    }
    /**
    * Prints a rectangle
    *
    * @param float  $x1     The top left corner
    * @param float  $y1     The top left corner
    * @param float  $width  The width
    * @param float  $height The height
    * @param string $stroke The stroke color
    * @param string $fill   The fill color
    * 
    * @return string The svg text for the block
    */
    protected function rect($x, $y, $width, $height, $stroke = "#000000", $fill = "none")
    {
        if (($height == 0) || ($width == 0)) {
            return "";
        }
        $ret = '<rect id="rect'.$this->index++.'" y="'.$y.'mm" x="'.$x.'mm"'
              .' height="'.(float)$height.'mm" width="'.(float)$width.'mm"'
              .' style="fill:'.$fill.';stroke:'.$stroke.';stroke-width:1.47185135;stroke-opacity:1" />'."\n";
        return $ret;
    }
    /**
    * Prints a rectangle
    *
    * @param float $x1    The top left corner
    * @param float $y1    The top left corner
    * @param float $color The color the damage box should be
    * 
    * @return string The svg text for the block
    */
    protected function damageBox($x, $y, $color)
    {
        $ret = $this->rect($x, $y, self::DSIZE, self::DSIZE, $color);
        return $ret;
    }
    /**
    * Includes a file if the file exists
    *
    * @param string $file The file to include
    * 
    * @return true if found, false otherwise
    */
    protected function getFile($file)
    {
        if (file_exists($file)) {
            include_once $file;
            return true;
        }
        return false;
    }
    /**
    * Prints a rectangle
    *
    * @param float  &$x    The top left corner
    * @param float  &$y    The top left corner
    * @param int    $boxes The number of boxes
    * @param int    $rows  The number of rows
    * @param string $color The color of the boxes
    * 
    * @return string The svg text for the block
    */
    protected function damageBoxes(&$x, &$y, $boxes, $rows = null, $color = null)
    {
        if (($boxes >= 10) && is_null($rows)) {
            $rows = 2;
        } else {
            $rows  = is_int($rows) ? $rows : 1;
        }
        $color = is_string($color) ? $color : $this->get("color");
        $dx = $x;
        $dy = $y;
        $ret = "";
        $cutoff = round($boxes / $rows);
        for ($i = 0; $i < $boxes; $i++) {
            if (($i > 0) && (($i % $cutoff) == 0)) {
                $dy += self::DSIZE * 1.2;
                $dx = $x;
            }
            $ret .= $this->damageBox($dx, $dy, $color);
            $dx += self::DSIZE * 1.2;
        }
        $y += self::DSIZE * $rows * 1.2;
        
        return $ret;
    }
}
