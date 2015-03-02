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
        $this->_setupMecha();
    }
    /**
    * This sets up our ranged weapons
    *
    * @return string The svg text for the block
    */
    private function _setupMecha()
    {
        $ind = 0;
        $mecha = $this->get("mecha");
        $this->_mecha = array();
        if (is_array($mecha) && (count($mecha) > 0)) {
            foreach ($mecha as $classname => $count) {
                $mecha = $this->_loadMecha($classname, $count);
                if (!is_null($mecha)) {
                    $this->_mecha[] = $mecha;
                }
            }
        }
    }
    /**
    * This sets up our ranged weapons
    *
    * @param string $classname The name of the mecha to load
    * @param int    $count     The number of mecha
    *
    * @return The mecha object
    */
    private function &_loadMecha($classname, $count = 1)
    {
        $mecha = null;
        $file  = dirname(__FILE__)."/../mecha/$classname.php";
        if (file_exists($file)) {
            include_once $file;
            $class = '\SquadronBuilder\mecha\\'.$classname;
            if (class_exists($class)) {
                $params["count"] = $count;
                $mecha = new $class($index, $params);
            }
        }
        return $mecha;
    }
    /**
    * This function exports the abilities list as a block
    *
    * @param int &$x The x to translate
    * @param int &$y The y to translate
    * 
    * @return string The svg text for the block
    */
    public function encode($x = 0, $y = 0)
    {
        $text  = "";
        $dy    = $y;
        $text .= $this->header($x, $dy, $this->get("name"));
        $text .= $this->largebold($x, $dy, $this->get("points")." Points");
        $savey = $dy;
        foreach ($this->_mecha as &$mecha) {
            if (($dy + $mecha->height()) > $this->get("maxheight")) {
                $x += $mecha->width() + $this->padding;
                $dy = $savey;
            }
            $text .= $mecha->encode($x, $dy);
            $dy    += $mecha->height() + $this->padding;
        }
        $this->height =  $dy - $y + $this->padding;
        return $text;
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
        if (parent::upgrade($name)) {
            foreach ($this->_mecha as &$mecha) {
                $mecha->upgrade($name);
            }
            return true;
        }
        return false;
    }
    /**
    * This replaces mechs in our _mechas array.
    *
    * This will also split off a group of mecha from a bunch.  So if you have 9
    * Regults that will be printed out in a group, you could ask for 4 of them to
    * be split off.  This would give you a group of 4 Regults, followed by a group
    * of 5 regults.  This would be used if you are applying something (like a 
    * character card) to only a subset of the mecha in a group.  You would split
    * them out, then apply the card.
    *
    * @param string $old   The name of the old mecha
    * @param string $new   The name of the new mecha
    * @param string $count The number of mecha to replace
    * 
    * @return pointer to new mecha on success, null otherwise
    */
    protected function replaceMecha($old, $new, $count = 1)
    {
        
        foreach ($this->_mecha as $key => &$mecha) {
            if ($mecha->get("name") == $old) {
                if ($new == $old) {
                    // If this is the same mecha, clone the one there to get any
                    // changes made to it.
                    $add = clone $mecha;
                } else {
                    // If it is a new mecha, load it now.
                    $add = $this->_loadMecha($new, $count);
                }
                if (!is_null($add)) {
                    $actual = $mecha->get("count");
                    // The next is chosen based on how many mechas are asked to be
                    // split off.  
                    if ($actual > $count) {
                        // This deals with if we are only splitting the mecha into
                        // two groups.
                        $mecha->set("count", $actual - $count);
                        $add->set("count", $count);
                        array_splice($this->_mecha, $key, 0, array($add));
                    } else {
                        // This deals with totally replacing the mecha
                        $add->set("count", $actual);
                        $this->_mecha[$key] = $add;
                    }
                    return $this->_mecha[$key];
                }
            }
        }
        return null;
    }
    
}
