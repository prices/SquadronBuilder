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
namespace SquadronBuilder\mecha;

/** This is a required class */
require_once CODE_BASE.'core/Mecha.php';

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
abstract class MechaTestBase extends \SquadronBuilder\TestBase
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
        if (!is_null($this->class)) {
            include_once CODE_BASE."/mecha/".$this->class.".php";
            $class = '\SquadronBuilder\mecha\\'.$this->class;
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
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataAbilities()
    {
        $return = array(
            array("Afterburner", "abilitiesTrueFalse"),
            array("Aircraft", "abilitiesTrueFalse"),
            array("Battloid Restriction", "abilitiesTrueFalse"),
            array("Cumbersome", "abilitiesTrueFalse"),
            array("Fast Mover", "abilitiesTrueFalse"),
            array("Flight", "abilitiesTrueFalse"),
            array("Focus Fire", "abilitiesTrueFalse"),
            array("Hands", "abilitiesTrueFalse"),
            array("Hover", "abilitiesTrueFalse"),
            array("Jettison", "abilitiesFalseClass"),
            array("Leadership", "abilitiesFalseInt"),
            array("Leap", "abilitiesTrueFalse"),
            array("Life is Cheap", "abilitiesTrueFalse"),
            array("Variable Modes", "abilitiesTrueFalse"),
            array("Zentraedi Infantry", "abilitiesTrueFalse"),
        );
        return $return;
    }
    /**
    * Tests the abilities to make sure that they are within spec
    *
    * @param string $ability  The ability to test
    * @param string $function The test function
    *
    * @return null
    *
    * @dataProvider dataAbilities
    */
    public function testAbilities($ability, $function)
    {

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
    public function abilitiesFalseClass($ability, $value)
    {
        $return = "Ability '$ability' must be false or a class in the \$classes array in this test class";
        if (is_bool($value)) {
            $this->assertFalse($value, $return);
        } else {
            $file = CODE_BASE."/mecha/".$value.".php";
            if (file_exists($file)) {
                include_once $file;
            }
            $this->assertTrue(class_exists(__NAMESPACE__."\\$value"), $return);
        }
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
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataPiloting()
    {
        return array(array(null));
    }

    /**
    * Checks the range
    *
    * @param mixed $value The value to test
    *
    * @return null
    *
    * @dataProvider dataPiloting
    */
    public function testPiloting($value)
    {
        $min = 1;
        $max = 5;
        $note = "Piloting must be an integer between $min and $max";
        $value = is_null($value) ? $this->o->get("piloting") : $value;
        $this->assertInternalType("int", $value, $note);
        $this->assertGreaterThanOrEqual($min, $value, $note);
        $this->assertLessThanOrEqual($max, $value, $note);
    }
    /**
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataGunnery()
    {
        return array(array(null));
    }

    /**
    * Checks the range
    *
    * @param mixed $value The value to test
    *
    * @return null
    *
    * @dataProvider dataGunnery
    */
    public function testGunnery($value)
    {
        $min = 1;
        $max = 5;
        $note = "Gunnery must be an integer between $min and $max, or a '-' if the mecha has no weapons";
        $value = is_null($value) ? $this->o->get("gunnery") : $value;
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
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataSpeed()
    {
        return array(array(null));
    }

    /**
    * Checks the range
    *
    * @param mixed $value The value to test
    *
    * @return null
    *
    * @dataProvider dataSpeed
    */
    public function testSpeed($value)
    {
        $min = 1;
        $max = 20;
        $note = "Speed must be an integer between $min and $max";
        $value = is_null($value) ? $this->o->get("speed") : $value;
        $this->assertInternalType("int", $value, $note);
        $this->assertGreaterThanOrEqual($min, $value, $note);
        $this->assertLessThanOrEqual($max, $value, $note);
    }
    /**
    * Checks the range
    *
    * @return null
    */
    public function testDamage()
    {
        $min = 1;
        $max = 30;
        $note = "Damage must be an integer between $min and $max";
        $value = $this->o->get("damage");
        $this->assertInternalType("int", $value, $note);
        $this->assertGreaterThanOrEqual($min, $value, $note);
        $this->assertLessThanOrEqual($max, $value, $note);
    }
    /**
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataDefense()
    {
        return array(array(null));
    }

    /**
    * Checks the range
    *
    * @param mixed $value The value to test
    *
    * @return null
    *
    * @dataProvider dataDefense
    */
    public function testDefense($value)
    {
        $min = 4;
        $max = 10;
        $note = "Defense must be an integer between $min and $max";
        $value = is_null($value) ? $this->o->get("defense") : $value;
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
    */
    public function testExtraDamage()
    {
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
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataHandtoHand()
    {
        return array(array(null));
    }

    /**
    * Checks the range
    *
    * @param mixed $value The value to test
    *
    * @return null
    *
    * @dataProvider dataHandtoHand
    */
    public function testHandtoHand($value)
    {
        $hth = array(
            "Grab", "Body Block", "Kick", "Jump Kick", "Punch", "Power Punch", "Stomp", "Club"
        );
        
        $note = "Hand to hand must only include ".implode(", ", $hth);
        $value = is_null($value) ? $this->o->get("handtohand") : $value;
        if (!is_null($value)) {
            $this->assertInternalType("array", $value, $note);
            $this->assertSame(array(), array_diff($value, $hth), $note);
        }
    }
    /**
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataRanged()
    {
        return array(array(null));
    }

    /**
    * Checks the range
    *
    * @param mixed $value The value to test
    *
    * @return null
    *
    * @dataProvider dataRanged
    */
    public function testRanged($value)
    {
        include_once dirname(__FILE__).'/../weapons/WeaponsTest.php';

        $ranged = \SquadronBuilder\weapons\WeaponsTest::classes();
        
        $note = "Ranged weapon classes must be tested.  Please add the missing classes to test/suite/weapons/WeaponsTest::\$classes";
        $value = is_null($value) ? $this->o->get("ranged") : $value;
        if (!is_null($value)) {
            $this->assertInternalType("array", $value, "'ranged' must be an array");
            $this->assertSame(array(), array_diff($value, $ranged), $note);
        }
    }

}

?>
