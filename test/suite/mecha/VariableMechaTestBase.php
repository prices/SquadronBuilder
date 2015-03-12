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
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataPiloting()
    {
        return array(array(null));
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
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataSpeed()
    {
        return array(array(null));
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
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataHandtoHand()
    {
        return array(array(null));
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

}

?>
