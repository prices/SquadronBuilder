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
namespace SquadronBuilder\mecha;

/** This is a required class */
require_once 'MechaTestBase.php';
/** This is a required class */
require_once dirname(__FILE__).'/../weapons/WeaponsTest.php';

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
class mechasTest extends MechaTestBase
{

    /** The object under test */
    protected static $classes = array(
        "Glaug", "GlaugEldare", "GluuhaugRegult", "Regult",
        "SerauhaugRegult", "QuelRegult", "NousjadeulGer"
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
            include_once CODE_BASE."/mecha/".$class.".php";
        }
    }

    /**
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataAbilities()
    {
        $return = array();
        foreach (self::$classes as $class) {
            $return = array_merge(
                $return,
                array(
                    array("Afterburner", "abilitiesTrueFalse", $class),
                    array("Aircraft", "abilitiesTrueFalse", $class),
                    array("Battloid Restriction", "abilitiesTrueFalse", $class),
                    array("Cumbersome", "abilitiesTrueFalse", $class),
                    array("Fast Mover", "abilitiesTrueFalse", $class),
                    array("Flight", "abilitiesTrueFalse", $class),
                    array("Focus Fire", "abilitiesTrueFalse", $class),
                    array("Hands", "abilitiesTrueFalse", $class),
                    array("Hover", "abilitiesTrueFalse", $class),
                    array("Jettison", "abilitiesFalseClass", $class),
                    array("Leadership", "abilitiesFalseInt", $class),
                    array("Leap", "abilitiesTrueFalse", $class),
                    array("Life is Cheap", "abilitiesTrueFalse", $class),
                    array("Variable Modes", "abilitiesTrueFalse", $class),
                    array("Zentraedi Infantry", "abilitiesTrueFalse", $class),
                )
            );
        }
        return $return;
    }
    /**
    * Tests the abilities to make sure that they are within spec
    *
    * @param string $ability  The ability to test
    * @param string $function The test function
    * @param string $class    The class to test
    *
    * @return null
    *
    * @dataProvider dataAbilities
    */
    public function testAbilities($ability, $function, $class = null)
    {
        $class = (is_null($class)) ? $this->class : $class;
        $class = '\SquadronBuilder\mecha\\'.$class;
        $this->assertTrue(class_exists($class), "Class $class doesn't exist");
        $this->o = new $class($this->index, array());

        $abilities = $this->o->get("abilities");
        $this->assertInternalType("array", $abilities, "'abilities' must be an array");
        if (isset($abilities[$ability])) {
            $this->$function($ability, $abilities[$ability]);
        }
    }
    /**
    * Tests the abilities to make sure that they are within spec
    *
    * @param string $ability The ability to test
    * @param string $value   The value of that ability
    *
    * @return null
    *
    * @dataProvider dataAbilities
    */
    public function abilitiesTrueFalse($ability, $value)
    {
        $this->assertInternalType("bool", $value, "Ability '$ability' must be true or false");
    }
    /**
    * Tests the abilities to make sure that they are within spec
    *
    * @param string $ability The ability to test
    * @param string $value   The value of that ability
    *
    * @return null
    *
    * @dataProvider dataAbilities
    */
    public function abilitiesFalseInt($ability, $value)
    {
        $return = "Ability '$ability' must be false or a positive integer";
        if (is_bool($value)) {
            $this->assertFalse($value, $return);
        } else {
            $this->assertTrue(is_int($value) && ($value > 0), $return);
        }
    }
    /**
    * Tests the abilities to make sure that they are within spec
    *
    * @param string $ability The ability to test
    * @param string $value   The value of that ability
    *
    * @return null
    *
    * @dataProvider dataAbilities
    */
    public function abilitiesFalseClass($ability, $value)
    {
        $return = "Ability '$ability' must be false or a positive integer";
        if (is_bool($value)) {
            $this->assertFalse($value, $return);
        } else {
            $this->assertTrue(class_exists(__NAMESPACE__.'\\'.$value), $return);
        }
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
    public function testPiloting($class)
    {
        $class = (is_null($class)) ? $this->class : $class;
        $class = __NAMESPACE__.'\\'.$class;
        $this->o = new $class($this->index, array());

        $min = 1;
        $max = 5;
        $note = "Piloting must be an integer between $min and $max";
        $value = $this->o->get("piloting");
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
    public function testGunnery($class)
    {
        $class = (is_null($class)) ? $this->class : $class;
        $class = __NAMESPACE__.'\\'.$class;
        $this->o = new $class($this->index, array());

        $min = 1;
        $max = 5;
        $note = "Gunnery must be an integer between $min and $max, or a '-' if the mecha has no weapons";
        $value = $this->o->get("gunnery");
        if ($value === "-") {
            $ranged = $this->o->get("ranged");
            $this->assertSame(array(), $ranged, "Mecha must not have any weapons if gunnery is '-'");
        } else {
            $this->assertInternalType("int", $value, $note);
            $this->assertGreaterThanOrEqual($min, $value, $note);
            $this->assertLessThanOrEqual($max, $value, $note);
        }
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
    public function testSpeed($class)
    {
        $class = (is_null($class)) ? $this->class : $class;
        $class = __NAMESPACE__.'\\'.$class;
        $this->o = new $class($this->index, array());

        $min = 1;
        $max = 20;
        $note = "Speed must be an integer between $min and $max";
        $value = $this->o->get("speed");
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
    public function testDamage($class)
    {
        $class = (is_null($class)) ? $this->class : $class;
        $class = __NAMESPACE__.'\\'.$class;
        $this->o = new $class($this->index, array());

        $min = 1;
        $max = 30;
        $note = "Damage must be an integer between $min and $max";
        $value = $this->o->get("damage");
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
    public function testDefense($class)
    {
        $class = (is_null($class)) ? $this->class : $class;
        $class = __NAMESPACE__.'\\'.$class;
        $this->o = new $class($this->index, array());

        $min = 4;
        $max = 10;
        $note = "Defense must be an integer between $min and $max";
        $value = $this->o->get("defense");
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
    public function testExtraDamage($class)
    {
        $class = (is_null($class)) ? $this->class : $class;
        $class = __NAMESPACE__.'\\'.$class;
        $this->o = new $class($this->index, array());

        $min = 0;
        $max = 20;
        $note = "Extradamage must be an integer between $min and $max, or null";
        $value = $this->o->get("extradamage");
        if (!is_null($value)) {
            $this->assertInternalType("int", $value, $note);
            $this->assertGreaterThanOrEqual($min, $value, $note);
            $this->assertLessThanOrEqual($max, $value, $note);
        }
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
    public function testHandtoHand($class)
    {
        $class = (is_null($class)) ? $this->class : $class;
        $class = __NAMESPACE__.'\\'.$class;
        $this->o = new $class($this->index, array());

        $hth = array(
            "Grab", "Body Block", "Kick", "Jump Kick", "Punch", "Power Punch", "Stomp", "Club"
        );
        
        $note = "Hand to hand must only include ".implode(", ", $hth);
        $value = $this->o->get("handtohand");
        if (!is_null($value)) {
            $this->assertInternalType("array", $value, $note);
            $this->assertSame(array(), array_diff($value, $hth), $note);
        }
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
    public function testRanged($class)
    {
        $class = (is_null($class)) ? $this->class : $class;
        $class = __NAMESPACE__.'\\'.$class;
        $this->o = new $class($this->index, array());

        $ranged = \SquadronBuilder\weapons\WeaponsTest::classes();
        
        $note = "Ranged weapon classes must be tested.  Please add the missing classes to test/suite/weapons/WeaponsTest::\$classes";
        $value = $this->o->get("ranged");
        if (!is_null($value)) {
            $this->assertInternalType("array", $value, "'ranged' must be an array");
            $this->assertSame(array(), array_diff($value, $ranged), $note);
        }
    }

}

?>
