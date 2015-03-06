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
require_once CODE_BASE.'core/Abilities.php';

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
class AbilitiesTest extends \PHPUnit_Framework_TestCase
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
        $this->o = new AbilitiesTest1($this->x, $this->y, $this->index, array());
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
                '\SquadronBuilder\core\AbilitiesTest2',
                0,
                0,
                "",
            ),
            array(
                '\SquadronBuilder\core\AbilitiesTest1',
                1,
                5,
                '<g transform="translate(1mm, 5mm)" id="g8">
         <text id="text0" x="4mm" y="11mm"  font-size="6mm" fill="black" stroke="none" style="font-weight:bold;">ASDF</text>
<text id="text1" x="4mm" y="16.75mm"  font-size="3.5mm" fill="black" stroke="none" style="font-weight:bold;">Property1</text>
<text id="text2" x="4mm" y="20mm"  font-size="2.5mm" fill="black" stroke="none" >Description for Property1</text>
<text id="text3" x="4mm" y="24.25mm"  font-size="3.5mm" fill="black" stroke="none" style="font-weight:bold;">Property #</text>
<text id="text4" x="4mm" y="27.5mm"  font-size="2.5mm" fill="black" stroke="none" >Description for Property #</text>
<text id="text5" x="4mm" y="31.75mm"  font-size="3.5mm" fill="black" stroke="none" style="font-weight:bold;">Property X</text>
<text id="text6" x="4mm" y="35mm"  font-size="2.5mm" fill="black" stroke="none" >Description for Property X</text>
<rect id="rect7" y="5mm" x="1mm" height="35.5mm" width="100mm" style="fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1" />
</g>',
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
        $this->assertSame($expect, $this->o->render($x, $y));
    }

}
/**
 * Test class for Abilities
 *
 * @category   html
 * @package    core
 * @subpackage mecha
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class AbilitiesTest1 extends Abilities
{
    /** This is our header for abilities **/
    protected $name = "ASDF";
    /** This is a list of the special abilities for this object */
    protected $abilities = array(
        "Property1" => "Description for Property1",
        "Property #" => "Description for Property #",
        "Property X" => "Description for Property X",
    );

}
/**
 * Test class for Abilities
 *
 * @category   html
 * @package    core
 * @subpackage mecha
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class AbilitiesTest2 extends Abilities
{
    /** This is our header for abilities **/
    protected $name = "";
    /** This is a list of the special abilities for this object */
    protected $abilities = array(
    );

}
?>
