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
/** This is a required class */
require_once 'MechaTestBase.php';

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
abstract class VariableMechaTestBase extends MechaTestBase
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
        unset($this->o);
    }
    /**
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataAbilities()
    {
        $modes = (array)self::getAttrib("modes");
        $return = array();
        foreach ($modes as $mode) {
            $mod = self::getAttrib($mode);
            $abilities = $mod["abilities"];
            $extra = " in mode $mode";
            $return = array_merge(
                $return,
                array(
                    array("Afterburner", "abilitiesTrueFalse", $mod["abilities"], $extra),
                    array("Aircraft", "abilitiesTrueFalse", $mod["abilities"], $extra),
                    array("Battloid Restriction", "abilitiesTrueFalse", $mod["abilities"], $extra),
                    array("Cumbersome", "abilitiesTrueFalse", $mod["abilities"], $extra),
                    array("Fast Mover", "abilitiesTrueFalse", $mod["abilities"], $extra),
                    array("Flight", "abilitiesTrueFalse", $mod["abilities"], $extra),
                    array("Focus Fire", "abilitiesTrueFalse", $mod["abilities"], $extra),
                    array("Hands", "abilitiesTrueFalse", $mod["abilities"], $extra),
                    array("Hover", "abilitiesTrueFalse", $mod["abilities"], $extra),
                    array("Jettison", "abilitiesFalseClass", $mod["abilities"], $extra),
                    array("Leadership", "abilitiesFalseInt", $mod["abilities"], $extra),
                    array("Leap", "abilitiesTrueFalse", $mod["abilities"], $extra),
                    array("Life is Cheap", "abilitiesTrueFalse", $mod["abilities"], $extra),
                    array("Variable Modes", "abilitiesTrueFalse", $mod["abilities"], $extra),
                    array("Zentraedi Infantry", "abilitiesTrueFalse", $mod["abilities"], $extra),
                )
            );
        }
        return $return;
    }
    /**
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataPiloting()
    {
        $modes = (array)self::getAttrib("modes");
        $return = array();
        foreach ($modes as $mode) {
            $mod = self::getAttrib($mode);
            $return[] = array($mod["piloting"], " in mode $mode");
        }
        return $return;
    }
    /**
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataGunnery()
    {
        $modes = (array)self::getAttrib("modes");
        $return = array();
        foreach ($modes as $mode) {
            $mod = self::getAttrib($mode);
            $return[] = array($mod["gunnery"], " in mode $mode");
        }
        return $return;
    }

    /**
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataSpeed()
    {
        $modes = (array)self::getAttrib("modes");
        $return = array();
        foreach ($modes as $mode) {
            $mod = self::getAttrib($mode);
            $return[] = array($mod["speed"], " in mode $mode");
        }
        return $return;
    }
    /**
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataDefense()
    {
        $modes = (array)self::getAttrib("modes");
        $return = array();
        foreach ($modes as $mode) {
            $mod = self::getAttrib($mode);
            $return[] = array($mod["defense"], " in mode $mode");
        }
        return $return;
    }
    /**
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataHandtoHand()
    {
        $modes = (array)self::getAttrib("modes");
        $return = array();
        foreach ($modes as $mode) {
            $mod = self::getAttrib($mode);
            $return[] = array($mod["handtohand"], " in mode $mode");
        }
        return $return;
    }
    /**
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataRanged()
    {
        $modes = (array)self::getAttrib("modes");
        $return = array();
        foreach ($modes as $mode) {
            $mod = self::getAttrib($mode);
            $return[] = array($mod["ranged"], " in mode $mode");
        }
        return $return;
    }

}

?>
