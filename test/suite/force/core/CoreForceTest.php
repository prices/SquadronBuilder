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
 * @package    mecha
 * @subpackage base
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @version    GIT: $Id: $
 * @link       https://github.com/prices/SquadronBuilder
 */
/** This is the namespace */
namespace SquadronBuilder\force\core;

/** This is a required class */
require_once 'CoreTestBase.php';

/**
 * This class deals with printing out a single mecha.
 *
 * @category   test
 * @package    mecha
 * @subpackage base
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class CoreForceTest extends CoreTestBase
{

    /** The object under test */
    protected static $classes = array(
        "RegultAttackSquadron", "RegultAttritionSquadron",
        "RegultArtillerySquadron", "RegultReconSquadron",
        "NousjadeulGerSquadron"
    );
    /**
    * This function returns the classes we are testing
    *
    * @return array
    */
    public static function classes()
    {
        return self::$classes;
    }

    /**
    * This function includes all of the class files before the tests
    * are run.
    *
    * @return null
    */
    public static function setUpBeforeClass()
    {
        // This includes all of the classes for us
        foreach (self::$classes as $class) {
            include_once CODE_BASE."/force/core/".$class.".php";
        }
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
        foreach (self::$classes as $classname) {
            $class = '\\'.__NAMESPACE__.'\\'.$classname;
            include_once CODE_BASE."/force/core/".$classname.".php";
            if (class_exists($class)) {
                $o = new $class($index, array());
                $mecha = $o->get("mecha");
                foreach ((array)$mecha as $name => $count) {
                    $return[] = array($name, $count, $classname);
                }
            }
        }
        return $return;
    }
    /**
    * Tests the abilities to make sure that they are within spec
    *
    * @param string $mecha The ability to test
    * @param string $count The test function
    * @param string $class The class to test
    *
    * @return null
    *
    * @dataProvider dataMecha
    */
    public function testMechaName($name, $count, $class = null)
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
    * Tests the abilities to make sure that they are within spec
    *
    * @param string $mecha The ability to test
    * @param string $count The test function
    * @param string $class The class to test
    *
    * @return null
    *
    * @dataProvider dataMecha
    */
    public function testMechaCount($name, $count, $class = null)
    {
        $min = 1;
        $max = 24;
        $note = "Mecha $name count in $class must be an integer between $min and $max";
        $this->assertInternalType("int", $count, $note);
        $this->assertGreaterThanOrEqual($min, $count, $note);
        $this->assertLessThanOrEqual($max, $count, $note);
    }
    /**
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataUpgrades()
    {
        $return = array();
        $index = 0;
        foreach (self::$classes as $classname) {
            $class = '\\'.__NAMESPACE__.'\\'.$classname;
            include_once CODE_BASE."/force/core/".$classname.".php";
            if (class_exists($class)) {
                $o = new $class($index, array());
                $upgrades = $o->get("upgrades");
                foreach ((array)$upgrades as $name => $upgrade) {
                    $return[] = array($name, $upgrade, $classname);
                }
            }
        }
        return $return;
    }
    /**
    * Tests the abilities to make sure that they are within spec
    *
    * @param string $mecha   The ability to test
    * @param string $upgrade The upgrade array
    * @param string $class   The class to test
    *
    * @return null
    *
    * @dataProvider dataUpgrades
    */
    public function testUpgradePoints($name, $upgrade, $class = null)
    {
        if (is_array($upgrade)) {
            $this->assertTrue(isset($upgrade["points"]), "Upgrade must have a 'points' field in $class");
            $min = 1;
            $max = 100;
            $note = "Points must be an integer between $min and $max";
            $this->assertInternalType("int", $upgrade['points'], $note);
            $this->assertGreaterThanOrEqual($min, $upgrade['points'], $note);
            $this->assertLessThanOrEqual($max, $upgrade['points'], $note);
        }
    }
    /**
    * Tests the abilities to make sure that they are within spec
    *
    * @param string $mecha   The ability to test
    * @param string $upgrade The upgrade array
    * @param string $class   The class to test
    *
    * @return null
    *
    * @dataProvider dataUpgrades
    */
    public function testUpgradeDesc($name, $upgrade, $class = null)
    {
        if (is_array($upgrade)) {
            $this->assertTrue(isset($upgrade["desc"]), "Upgrade must have a 'desc' field in $class");
            $min = 5;
            $max = 100;
            $note = "Upgrade description must be a string between 5 and 40 characters in length in $class";
            $this->assertInternalType("string", $upgrade['desc'], $note);
            $this->assertGreaterThanOrEqual($min, strlen($upgrade['desc']), $note);
            $this->assertLessThanOrEqual($max, strlen($upgrade['desc']), $note);
        }
    }
    /**
    * Tests the abilities to make sure that they are within spec
    *
    * @param string $mecha   The ability to test
    * @param string $upgrade The upgrade array
    * @param string $class   The class to test
    *
    * @return null
    *
    * @dataProvider dataUpgrades
    */
    public function testUpgradeName($name, $upgrade, $class = null)
    {
        $min = 5;
        $max = 40;
        $note = "Upgrade name must be a string between 5 and 40 characters in length in $class";
        $this->assertInternalType("string", $name, $note);
        $this->assertGreaterThanOrEqual($min, strlen($name), $note);
        $this->assertLessThanOrEqual($max, strlen($name), $note);
    }

    /**
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataClasses()
    {
        $return = array();
        foreach (self::$classes as $class) {
            $return[] = array($class);
        }
        return $return;
    }
    /**
    * Checks the name
    *
    * @param string $class The class to test
    *
    * @return null
    *
    * @dataProvider dataClasses
    */
    public function testName($class)
    {
        $class = (is_null($class)) ? $this->class : $class;
        $class = __NAMESPACE__.'\\'.$class;
        $this->o = new $class($this->index, array());

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
    * @param string $class The class to test
    *
    * @return null
    *
    * @dataProvider dataClasses
    */
    public function testPoints($class)
    {
        $class = (is_null($class)) ? $this->class : $class;
        $class = __NAMESPACE__.'\\'.$class;
        $this->o = new $class($this->index, array());

        $min = 1;
        $max = 100;
        $note = "Points must be an integer between $min and $max in $class";
        $value = $this->o->get("points");
        $this->assertInternalType("int", $value, $note);
        $this->assertGreaterThanOrEqual($min, $value, $note);
        $this->assertLessThanOrEqual($max, $value, $note);
    }
    /**
    * Checks the range
    *
    * @param string $class The class to test
    *
    * @return null
    *
    * @dataProvider dataClasses
    */
    public function testMecha($class)
    {
        $class = (is_null($class)) ? $this->class : $class;
        $class = __NAMESPACE__.'\\'.$class;
        $this->o = new $class($this->index, array());

        $note = "Mecha must be an array in $class";
        $value = $this->o->get("mecha");
        $this->assertInternalType("array", $value, $note);
    }

    /**
    * Checks the range
    *
    * @param string $class The class to test
    *
    * @return null
    *
    * @dataProvider dataClasses
    */
    public function testUpgrades($class)
    {
        $class = (is_null($class)) ? $this->class : $class;
        $class = __NAMESPACE__.'\\'.$class;
        $this->o = new $class($this->index, array());

        $note = "Mecha must be an array in $class";
        $value = $this->o->get("upgrades");
        $this->assertInternalType("array", $value, $note);
    }
}

?>
