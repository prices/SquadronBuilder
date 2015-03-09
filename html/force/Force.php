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
namespace SquadronBuilder\force;

defined( '_SQUADRONBUILDER' ) or die( 'Restricted access' );

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
class Force
{    
    /** This is the cache of mecha objects */
    private $_basedir = null;
    /** This is the cache of mecha objects */
    private $_index = 0;
    /** This is our faction */
    private $_faction = null;
    /**
    * This is the constructor for the class
    * 
    * @param string $faction The faction to get cards for
    * @param string $basedir The base directory to look for files
    *
    * @return null
    */
    public function __construct($faction, $basedir = null)
    {
        $this->_faction = in_array($faction, array("UEDF", "Zentraedi", "Malcontents")) ? $faction : "Zentraedi";
        $this->_basedir = is_null($basedir) ? dirname(__FILE__) : $basedir;
    }
    /**
    * Gets all of the files in a directory
    *
    * @return null
    */
    public function core()
    {
        $classes = $this->_getClasses("core");
        $return = array();
        foreach ($classes as $classname) {
            $class = __NAMESPACE__."\\core\\".$classname;
            if (class_exists($class)) {
                $obj = new $class($this->_index, array());
                if ($obj->get("faction") == $this->_faction) {
                    $return[$classname] = array(
                        "name" => $obj->get("name"),
                        "points" => $obj->get("points"),
                    );
                }
            }
        }
        return $return;
    }
    /**
    * Gets all of the files in a directory
    *
    * @param \SquadronBuilder\core\CoreForce $core The core force card to check
    * 
    * @return null
    */
    public function support(\SquadronBuilder\core\CoreForce $core)
    {
        return $this->_stuff("support", $core);
    }
    /**
    * Gets all of the files in a directory
    *
    * @param \SquadronBuilder\core\CoreForce $core The core force card to check
    * 
    * @return null
    */
    public function special(\SquadronBuilder\core\CoreForce $core)
    {
        return $this->_stuff("special", $core);
    }
    /**
    * Gets all of the files in a directory
    *
    * @param \SquadronBuilder\core\CoreForce $core The core force card to check
    * 
    * @return null
    */
    public function characters(\SquadronBuilder\core\CoreForce $core)
    {
        return $this->_stuff("characters", $core);
    }
    /**
    * Gets all of the files in a directory
    *
    * @param string                          $type The type to get
    * @param \SquadronBuilder\core\CoreForce $core The core force card to check
    * 
    * @return null
    */
    public function _stuff($type, \SquadronBuilder\core\CoreForce $core)
    {
        $core->render();
        $return = array();
        $classes = $this->_getClasses($type);
        foreach ($classes as $classname) {
            $class = __NAMESPACE__."\\".$type."\\".$classname;
            if (class_exists($class)) {
                $obj = new $class($this->_index);
                if ($obj->check($core)) {
                    $return[$classname] = array(
                        'name' => $obj->get("name"),
                        'points' => $obj->get('points'),
                    );
                }
            }
        }
        return $return;
    }
    /**
    * Gets all of the files in a directory
    *
    * @param string $dir The directory to get the files of
    * 
    * @return null
    */
    private function _getClasses($dir)
    {
        $dir = $this->_basedir."/".$dir;
        $return = array();
        if ($handle = opendir($dir)) {
            while (false !== ($entry = readdir($handle))) {
                if (strtolower(substr(trim($entry), -4) == ".php")) {
                    include_once $dir."/".$entry;
                    $return[] = substr(trim($entry), 0, strlen($entry) - 4);
                }
            }
            closedir($handle);
        }
        return $return;
    }

}
