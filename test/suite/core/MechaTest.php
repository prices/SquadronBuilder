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
namespace SquadronBuilder\core;

/** This is a required class */
require_once CODE_BASE.'core/Mecha.php';
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
class MechaTest extends \PHPUnit_Framework_TestCase
{
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
        $this->o = new MechaTest1($this->x, $this->y, $this->index, array());
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
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataEncode()
    {
        return array(
            array(
                '\SquadronBuilder\core\MechaTest1',
                1,
                5,
                '',
            ),
        );
    }
    /**
    * Tests the iteration and preload functions
    *
    * @param string $class  The clas to use
    * @param float  $x      The xcoord to translate to
    * @param float  $y      The ycoord to translate to
    * @param array  $expect The info to expect returned
    *
    * @return null
    *
    * @dataProvider dataEncode
    */
    public function testEncode($class, $x, $y, $expect)
    {
        $this->o = new $class($this->x, $this->y, $this->index, array());
        $this->assertSame($expect, $this->o->encode($x, $y));
    }

}
/**
 * Test class for Mecha
 *
 * @category   html
 * @package    core
 * @subpackage mecha
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class MechaTest1 extends Mecha
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "Regult Test",
        /** This is our speed **/
        "speed" => 5,
        /** This is our piloting **/
        "piloting" => 2,
        /** This is our gunnery **/
        "gunnery" => 2,
        /** This is our defense **/
        "defense" => 5,
        /** This is a list of the special abilities for this object */
        "abilities" => array(
            'Afterburner'          => false,
            'Aircraft'             => false,
            'Battloid Restriction' => false,
            'Cumbersome'           => false,
            'Fast Mover'           => false,
            'Flight'               => trues,
            'Focus Fire'           => false,
            'Hands'                => true,
            'Hover'                => false,
            'Jettison'             => "to something",
            'Leadership'           => 4,
            'Leap'                 => false,
            'Life is Cheap'        => false,
            'Variable Modes'       => false,
            'Zentraidi Infantry'   => false,
        ),
        /** These are our weapons */
        "ranged" => array(
            "MechaWeaponTest1", "MechaWeaponTest2"
        ),
        /** These are our weapons */
        "handtohand" => array(
            "Body Block", "Kick", "Jump Kick", "Stomp"
        ),
    );
}
/**
 * Test class for Weapon
 *
 * @category   html
 * @package    core
 * @subpackage mecha
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class MechaWeaponTest1 extends Weapon
{
    /** This is our header for abilities **/
    protected $name = "This is a weapon";
    /** This is our range **/
    protected $range = 9;
    /** This is our damage **/
    protected $damage = 2;
    /** This is a list of the special abilities for this object */
    protected $abilities = array(
        "Accurate"      => true,
        "Ammo"          => false,
        "Anti-Missile"  => true,
        "Blast"         => false,
        "Fly Over"      => false,
        "Inescapable"   => true,
        "Indirect Fire" => false,
        "Missile"       => false,
        "Overwhelming"  => false,
        "Rapid Fire"    => false,
        "Rear Fire"     => false,
        "Split Fire"    => false,
        "Volley"        => false,
        "Volley X"      => false,
    );

}
/**
 * Test class for Weapon
 *
 * @category   html
 * @package    core
 * @subpackage mecha
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class MechaWeaponTest2 extends Weapon
{
    /** This is our header for abilities **/
    protected $name = "This is missile a weapon";
    /** This is our range **/
    protected $range = 9;
    /** This is our damage **/
    protected $damage = 2;
    /** This is a list of the special abilities for this object */
    protected $abilities = array(
        "Accurate"      => true,
        "Ammo"          => 6,
        "Anti-Missile"  => true,
        "Blast"         => false,
        "Fly Over"      => false,
        "Inescapable"   => true,
        "Indirect Fire" => false,
        "Missile"       => true,
        "Overwhelming"  => false,
        "Rapid Fire"    => false,
        "Rear Fire"     => false,
        "Split Fire"    => false,
        "Volley"        => false,
        "Volley X"      => true,
    );

}

?>
