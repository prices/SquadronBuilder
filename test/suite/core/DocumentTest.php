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
require_once CODE_BASE.'core/Document.php';

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
class DocumentTest extends \PHPUnit_Framework_TestCase
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
        $this->o = new Document(array());
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
                '\SquadronBuilder\core\BaseObjectTest1',
                '<text
                    sodipodi:linespacing="125%"
                    xml:space="preserve"
                 >
             <tspan
             id="tspan0"
             y="5"
             x="5"
             sodipodi:role="line"
             style="font-size:14px;font-weight:bold;">
             ASDF
             </tspan>
             </text><text
                    sodipodi:linespacing="125%"
                    xml:space="preserve"
                 >
             <tspan
             id="tspan1"
             y="5"
             x="20"
             sodipodi:role="line"
             style="font-size:9px;font-weight:bold;">
             Property1
             </tspan><tspan
             id="tspan2"
             y="5"
             x="31"
             sodipodi:role="line"
             style="font-size:6px;">
             Description for Property1
             </tspan><tspan
             id="tspan3"
             y="5"
             x="39"
             sodipodi:role="line"
             style="font-size:9px;font-weight:bold;">
             Property #
             </tspan><tspan
             id="tspan4"
             y="5"
             x="50"
             sodipodi:role="line"
             style="font-size:6px;">
             Description for Property #
             </tspan><tspan
             id="tspan5"
             y="5"
             x="58"
             sodipodi:role="line"
             style="font-size:9px;font-weight:bold;">
             Property X
             </tspan><tspan
             id="tspan6"
             y="5"
             x="69"
             sodipodi:role="line"
             style="font-size:6px;">
             Description for Property X
             </tspan>
             </text><rect
             id="rect7"
             y="0"
             x="0"
             height="15"
             width="87"
             id="rect23737"
             style="fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1" />',
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
    * @dataProvider dataEncode
    */
    public function testEncode($class, $expect)
    {
        $this->o = new Document(array());
        $this->assertSame($expect, $this->o->encode());
    }

}
?>
