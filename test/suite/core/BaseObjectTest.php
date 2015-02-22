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
require_once CODE_BASE.'core/BaseObject.php';

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
class BaseObjectTest extends \PHPUnit_Framework_TestCase
{
    /** The object under test */
    protected $o = null;
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
        $this->o = new BaseObjectTest1();
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
    public static function dataExportAbilities()
    {
        return array(
            array(
                '\SquadronBuilder\core\BaseObjectTest2',
                "",
            ),
            array(
                '\SquadronBuilder\core\BaseObjectTest1',
                '<tspan
             id="tspan23715"
             y="0"
             x="0"
             sodipodi:role="line"
             style="font-size:14px;font-weight:bold;">
             ASDF
             </tspan><tspan
             id="tspan23715"
             y="0"
             x="15"
             sodipodi:role="line"
             style="font-size:9px;font-weight:bold;">
             Property1
             </tspan><tspan
             id="tspan23715"
             y="0"
             x="26"
             sodipodi:role="line"
             style="font-size:6px;">
             Description for Property1
             </tspan><tspan
             id="tspan23715"
             y="0"
             x="34"
             sodipodi:role="line"
             style="font-size:9px;font-weight:bold;">
             Property #
             </tspan><tspan
             id="tspan23715"
             y="0"
             x="45"
             sodipodi:role="line"
             style="font-size:6px;">
             Description for Property #
             </tspan><tspan
             id="tspan23715"
             y="0"
             x="53"
             sodipodi:role="line"
             style="font-size:9px;font-weight:bold;">
             Property X
             </tspan><tspan
             id="tspan23715"
             y="0"
             x="64"
             sodipodi:role="line"
             style="font-size:6px;">
             Description for Property X
             </tspan>',
            ),
        );
    }
    /**
    * Tests the iteration and preload functions
    *
    * @param string $class  The clas to use
    * @param array  $expect The info to expect returned
    *
    * @return null
    *
    * @dataProvider dataExportAbilities
    */
    public function testExportAbilities($class, $expect)
    {
        $this->assertSame($expect, $class::exportAbilities());
    }

}
/**
 * Test class for BaseObject
 *
 * @category   html
 * @package    core
 * @subpackage mecha
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class BaseObjectTest1 extends BaseObject
{
    /** This is our header for abilities **/
    protected static $abilitiesHeader = "ASDF";
    /** This is a list of the special abilities for this object */
    protected static $abilities = array(
        "Property1" => "Description for Property1",
        "Property #" => "Description for Property #",
        "Property X" => "Description for Property X",
    );

}
/**
 * Test class for BaseObject
 *
 * @category   html
 * @package    core
 * @subpackage mecha
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class BaseObjectTest2 extends BaseObject
{
    /** This is a list of the special abilities for this object */
    protected static $abilities = array(
    );

}
?>
