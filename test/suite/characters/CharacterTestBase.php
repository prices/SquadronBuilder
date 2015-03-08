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
namespace SquadronBuilder\characters;

/** This is a required class */
require_once CODE_BASE.'core/Character.php';

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
abstract class CharacterTestBase extends \SquadronBuilder\TestBase
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
        $this->class = static::getClass();
        if (!is_null($this->class)) {
            $class   = $this->class;
            $this->o = new $class($this->index, array());
        }
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
        unset($this->o);
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
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataMecha()
    {
        $return = array();
        $index = 0;
        $class = static::getClass();
        if (class_exists($class)) {
            $o = new $class($index, array());
            $mecha = $o->get("mecha");
            foreach ((array)$mecha as $name) {
                $return[] = array($name);
            }
        }
        return $return;
    }
    /**
    * Tests the abilities to make sure that they are within spec
    *
    * @param string $mecha The ability to test
    * @param string $count The test function
    *
    * @return null
    *
    * @dataProvider dataMecha
    */
    public function testMechaName($name)
    {
        $class = '\SquadronBuilder\mecha\\'.$name;
        $return = "Mecha $name does not exist. (Class $class not found)";
        $file = CODE_BASE."/mecha/".$name.".php";
        if (file_exists($file)) {
            include_once $file;
        }
        $this->assertTrue(class_exists($class), $return);
    }
    /**
    * Checks the name
    *
    * @return null
    */
    public function testName()
    {
        $min = 5;
        $max = 40;
        $note = "Name must be a string between 5 and 40 characters in length";
        $value = $this->o->get("name");
        $this->assertInternalType("string", $value, $note);
        $this->assertGreaterThanOrEqual($min, strlen($value), $note);
        $this->assertLessThanOrEqual($max, strlen($value), $note);
    }
    /**
    * Checks the range
    *
    * @return null
    */
    public function testPoints()
    {
        $min = 1;
        $max = 100;
        $note = "Points must be an integer between $min and $max";
        $value = $this->o->get("points");
        $this->assertInternalType("int", $value, $note);
        $this->assertGreaterThanOrEqual($min, $value, $note);
        $this->assertLessThanOrEqual($max, $value, $note);
    }
    /**
    * Checks the range
    *
    * @return null
    */
    public function testMecha()
    {
        $note = "Mecha must be an array";
        $value = $this->o->get("mecha");
        $this->assertInternalType("array", $value, $note);
    }

    /**
    * Checks the name
    *
    * @return null
    */
    public function testFactions()
    {
        $note = "'factions' must be an array and only contain the strings: 'UEDF', 'Zentraedi', or 'Malcontents'";
        $value = $this->o->get("factions");
        $this->assertInternalType("array", $value, $note);
        $this->assertSame(array(), array_diff($value, array("UEDF", "Zentraedi", "Malcontents")), $note);
    }

}

?>
