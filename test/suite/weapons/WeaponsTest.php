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
 * @package    weapons
 * @subpackage base
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @version    GIT: $Id: $
 * @link       https://github.com/prices/SquadronBuilder
 */
/** This is the namespace */
namespace SquadronBuilder\weapons;

/** This is a required class */
require_once 'WeaponTestBase.php';

/**
 * This class deals with printing out a single mecha.
 *
 * @category   test
 * @package    weapons
 * @subpackage base
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class WeaponsTest extends WeaponTestBase
{

    /** The object under test */
    protected static $classes = array(
        "Glaug103mmMiniMissiles", 
        "NousjadeulGer64mmGrenadeLauncher",
        "Glaug150mmSRM",
        "NousjadeulGerChargedParticleCannon",
        "Glaug178mmSRM",
        "Regult313mmMRM",
        "GlaugChargedParticleCannon",
        "Regult791mmBallisticMissile",
        "GlaugHeavyParticleCannons",
        "RegultAirDefenseLasers",
        "GlaugRailCannons",
        "RegultAutoCannons",
        "NousjadeulGer32mmPlasmaMachinePistol",  
        "RegultHeavyParticleCannons",
        "QueadluunRau103mmMiniMissiles",
        "QueadluunRauMedParticleCannons",
        "QueadluunRau64mmGrenadeLauncher",
        "GU11", "GU11Battloid", "GU11Fighter",
        "ValkyrieWingHardPoints", "ValkyrieMLOPs", "ValkyrieLRM",
        "ValkyrieGravityBombs", "SDF1AirWingNoseLasers",
        "ValkyrieHeadLaser", "ValkyrieDualHeadLasers"
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
            include_once CODE_BASE."/weapons/".$class.".php";
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
                    array("Accurate", "abilitiesTrueFalse", $class),
                    array("Ammo", "abilitiesFalseInt", $class),
                    array("Anti-Missile", "abilitiesTrueFalse", $class),
                    array("Blast", "abilitiesTrueFalse", $class),
                    array("Fly Over", "abilitiesTrueFalse", $class),
                    array("Inescapable", "abilitiesTrueFalse", $class),
                    array("Indirect Fire", "abilitiesTrueFalse", $class),
                    array("Missile", "abilitiesTrueFalse", $class),
                    array("Overwhelming", "abilitiesTrueFalse", $class),
                    array("Rapid Fire", "abilitiesTrueFalse", $class),
                    array("Rear Fire", "abilitiesTrueFalse", $class),
                    array("Split Fire", "abilitiesTrueFalse", $class),
                    array("Volley", "abilitiesFalseInt", $class),
                    array("Volley X", "abilitiesTrueFalse", $class),
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
        $class = __NAMESPACE__.'\\'.$class;
        $this->assertTrue(class_exists($class), "Class $class doesn't exist");
        $this->o = new $class($this->index, array());

        $abilities = $this->o->get("abilities");
        $this->assertInternalType("array", $abilities, "'abilities' must be an array");
        if (isset($abilities[$ability])) {
            $this->$function($ability, $abilities[$ability]);
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
            include_once CODE_BASE."/weapons/".$class.".php";
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
        $class = '\SquadronBuilder\weapons\\'.$class;
        $this->o = new $class($this->index, array());

        $min = 5;
        $max = 40;
        $value = $this->o->get("name");
        $this->assertInternalType("string", $value, "Name must be a string");
        $this->assertGreaterThanOrEqual($min, strlen($value), "Name must be $min characters or more");
        $this->assertLessThanOrEqual($max, strlen($value), "Name must be $max characters or fewer");
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
    public function testRange($class)
    {
        $class = (is_null($class)) ? $this->class : $class;
        $class = '\SquadronBuilder\weapons\\'.$class;
        $this->o = new $class($this->index, array());

        $min = 5;
        $max = 60;
        $value = $this->o->get("range");
        if ($value !== "-") {
            $this->assertInternalType("int", $value, "Range must be an integer or '-' for gravity bombs");
            $this->assertGreaterThanOrEqual($min, $value, "Range must be $min or more");
            $this->assertLessThanOrEqual($max, $value, "Range must be $max or less");
        }
    }
    /**
    * Checks the damage
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
        $class = '\SquadronBuilder\weapons\\'.$class;
        $this->o = new $class($this->index, array());

        $min = 1;
        $max = 20;
        $value = $this->o->get("damage");
        $note  = "damage must be either an integer or a string of the form '#/missile' where ";
        $note .= "the number is between $min and $max.  The second form is only acceptable ";
        $note .= "when the missile ability is set to true";
        if (is_int($value)) {
            $this->assertGreaterThanOrEqual($min, $value, $note);
            $this->assertLessThanOrEqual($max, $value, $note);
        } else {
            $this->assertInternalType("string", $value, $note." (Not a string)");
            $abilities = $this->o->get("abilities");
            $this->assertTrue(isset($abilities["Missile"]), $note." (Missile ability not set)");
            $this->assertTrue($abilities["Missile"], $note." (Missile ability not set to true)");
            $stuff = explode("/", $value);
            
            $this->assertSame("missile", $stuff[1], $note." (Does not end in 'missile'");
            $this->assertGreaterThanOrEqual($min, $stuff[0], $note." (Damage less than $min)");
            $this->assertLessThanOrEqual($max, $stuff[0], $note." (Damage greater than $max)");
        }
    }

}

?>
