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
class CoreForce extends BaseObject
{    
    /** These are the mecha that will be in the force */
    protected $mecha = array();
    /** This is the cache of mecha objects */
    private $_mecha = array();
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
        if (is_array($this->mecha) && (count($this->mecha) > 0)) {
            foreach ($this->mecha as $class => $count) {
                include_once(dirname(__FILE__)."/../mecha/$class.php");
                $class = '\SquadronBuilder\mecha\\'.$class;
                if (class_exists($class)) {
                    $params["count"] = $count;
                    $mecha = new $class($index, $params);
                    $this->_mecha[] = $mecha;
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
    public function encode($x = 0, $y = 0, $count = 1)
    {
        $text = "";
        $dy   = $y;
        foreach ($this->_mecha as &$mecha) {
            $text .= $mecha->encode($x, $dy);
            $dy    += $mecha->height() + $this->padding;
        }
        $this->height =  $dy - $y + $this->padding;
        return $text;
    }
}
