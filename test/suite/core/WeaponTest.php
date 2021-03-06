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
class WeaponTest extends \SquadronBuilder\TestBase
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
        $this->o = new WeaponTest1($this->x, $this->y, $this->index, array());
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
    public static function dataRender()
    {
        return array(
            array(
                '\SquadronBuilder\core\WeaponTest2',
                0,
                0,
                array(
                    'text' => array(
                        0 => 'This is a weapon',
                        1 => 'RG: 18, MD: 4',
                    ),
                    'rect' => array(
                        "attributes" => array(
                            'id' => 'rect2',
                            'y' => '0mm',
                            'x' => '0mm',
                            'height' => '7.95mm',
                            'width' => '70mm',
                            'style' => 'fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1',
                        ),
                    ),
                ),
            ),
            array(
                '\SquadronBuilder\core\WeaponTest1',
                1,
                5,
                array(
                    'text' => array(
                        0 => 'This is a weapon',
                        1 => 'RG: 9, MD: 2, Accurate, Ammo 6, Anti-Missile, Inescapable, Missile, Volley X',
                    ),
                    'rect' => array(
                        "attributes" => array(
                            'id' => 'rect2',
                            'y' => '5mm',
                            'x' => '1mm',
                            'height' => '7.95mm',
                            'width' => '70mm',
                            'style' => 'fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1',
                        ),
                    ),
                ),
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
    * @dataProvider dataRender
    */
    public function testRender($class, $x, $y, $expect)
    {
        $this->o = new $class($this->x, $this->y, $this->index, array());
        $xml = $this->o->render($x, $y);
        $this->assertEquals($expect, $this->xml2array($xml));
    }

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
class WeaponTest1 extends Weapon
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "This is a weapon",
        /** This is our range **/
        "range" => 9,
        /** This is our damage **/
        "damage" => 2,
        /** This is a list of the special abilities for this object */
        "abilities" => array(
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
        )
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
class WeaponTest2 extends Weapon
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "This is a weapon",
        /** This is our range **/
        "range" => 18,
        /** This is our damage **/
        "damage" => 4,
        /** This is a list of the special abilities for this object */
        "abilities" => array(
        )
    );
}
?>
