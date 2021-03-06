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
 * @category   test
 * @package    core
 * @subpackage base
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @version    GIT: $Id: $
 * @link       https://github.com/prices/SquadronBuilder
 */
/** This is the namespace */
namespace SquadronBuilder;

/** This is a required class */
require_once CODE_BASE.'core/Weapon.php';

/**
 * This class deals with printing out a single mecha.
 *
 * @category   test
 * @package    core
 * @subpackage base
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
abstract class TestBase extends \PHPUnit_Framework_TestCase
{
    /** The object under test */
    protected $class = null;

    /** The object under test */
    protected $o = null;
    /** This is our index */
    protected $index = 0;
    /** This is our x */
    protected $x = 0;
    /** This is our y */
    protected $y = 0;
    /**
    * Sets up the fixture, for example, opens a network connection.
    * This method is called before a test is executed.
    *
    * @access protected
    *
    * @return null
    */
    protected function setUp()
    {
        parent::setUp();
    }

    /**
    * Tears down the fixture, for example, closes a network connection.
    * This method is called after a test is executed.
    *
    * @access protected
    *
    * @return null
    */
    protected function tearDown()
    {
        parent::tearDown();
    }
    /**
    * Includes the right file, and returns the class name
    *
    * @access protected
    *
    * @return string
    */
    protected static function getClass()
    {
        $classname = get_called_class();
        $class = substr($classname, 0, strlen($classname) - 4);
        $file  = implode("/", explode("\\", substr($class, strpos($class, "\\")))).".php";
        include_once CODE_BASE.$file;
        return $class;
    }
    /**
    * Tests the iteration and preload functions
    *
    * @param string $xml The simplexml object to work on
    *
    * @return null
    */
    protected static function getAttrib($attrib)
    {
        $index = 0;
        $class = self::getClass();
        $obj = new $class($index, array());
        return $obj->get($attrib);
    }
    /**
    * Tests the iteration and preload functions
    *
    * @param string $xml The simplexml object to work on
    *
    * @return null
    */
    protected function xml2array($xml)
    {
        $payload = simplexml_load_string($xml);
        return $this->_xml2array($payload);
    }
    /**
    * Tests the iteration and preload functions
    *
    * @param string $xml The simplexml object to work on
    *
    * @return null
    *
    * @dataProvider dataRender
    */
    private function _xml2array($xml)
    {
        foreach ((array)$xml as $key => $obj) {
            $key = str_replace("@", "", $key);
            if (is_object($obj) || is_array($obj)) {
	        $ret[$key] = $this->_xml2array($obj);
	    } else {
		$ret[$key] = $obj;
	    }
        }
        return $ret;
    }
    /**
    * Tests the abilities to make sure that they are within spec
    *
    * @param string $ability The ability to test
    * @param string $value   The value of that ability
    * @param string $extra   Extra text to add to the message
    *
    * @return null
    *
    * @dataProvider dataAbilities
    */
    public function abilitiesTrueFalse($ability, $value, $extra = "")
    {
        $this->assertInternalType("bool", $value, "Ability '$ability' must be true or false".$extra);
    }
    /**
    * Tests the abilities to make sure that they are within spec
    *
    * @param string $ability The ability to test
    * @param string $value   The value of that ability
    * @param string $extra   Extra text to add to the message
    *
    * @return null
    *
    * @dataProvider dataAbilities
    */
    public function abilitiesFalseInt($ability, $value, $extra = "")
    {
        $return = "Ability '$ability' must be false or a positive integer".$extra;
        if (is_bool($value)) {
            $this->assertFalse($value, $return);
        } else {
            $this->assertTrue(is_int($value) && ($value > 0), $return);
        }
    }

}

?>
