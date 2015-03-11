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
/** This is the test classes */
require_once TEST_CONFIG_BASE.'files/TestClasses.php';

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
class MechaTest extends \SquadronBuilder\TestBase
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
        $this->o = new \SquadronBuilder\mecha\MechaTest1($this->x, $this->y, $this->index, array());
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
                '\SquadronBuilder\mecha\MechaTest1',
                1,
                5,
                array(
                    'g' => array(
                        0 => array(
                        'text' => array(
                            0 => 'Regult Test',
                            1 => 'This is missile a weapon',
                            2 => 'Jettison to Other Test',
                        ),
                        'rect' => array(
                            0 => array(
                                'attributes' => array(
                                    'id' => 'rect2',
                                    'y' => '11.675mm',
                                    'x' => '47.15mm',
                                    'height' => '3mm',
                                    'width' => '3mm',
                                    'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                            1 => array(
                                'attributes' => array(
                                    'id' => 'rect3',
                                    'y' => '11.675mm',
                                    'x' => '50.75mm',
                                    'height' => '3mm',
                                    'width' => '3mm',
                                    'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                            2 => array(
                                'attributes' => array(
                                    'id' => 'rect4',
                                    'y' => '11.675mm',
                                    'x' => '54.35mm',
                                    'height' => '3mm',
                                    'width' => '3mm',
                                    'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                            3 => array(
                                'attributes' => array(
                                    'id' => 'rect5',
                                    'y' => '11.675mm',
                                    'x' => '57.95mm',
                                    'height' => '3mm',
                                    'width' => '3mm',
                                    'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                            4 => array(
                                'attributes' => array(
                                    'id' => 'rect6',
                                    'y' => '11.675mm',
                                    'x' => '61.55mm',
                                    'height' => '3mm',
                                    'width' => '3mm',
                                    'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                            5 => array(
                                'attributes' => array(
                                    'id' => 'rect7',
                                    'y' => '11.675mm',
                                    'x' => '65.15mm',
                                    'height' => '3mm',
                                    'width' => '3mm',
                                    'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                            6 => array(
                                'attributes' => array(
                                    'id' => 'rect8',
                                    'y' => '16.9mm',
                                    'x' => '4mm',
                                    'height' => '3mm',
                                    'width' => '3mm',
                                    'style' => 'fill:none;stroke:#0000CF;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                            7 => array(
                                'attributes' => array(
                                    'id' => 'rect10',
                                    'y' => '6.5mm',
                                    'x' => '2.5mm',
                                    'height' => '15.8mm',
                                    'width' => '67mm',
                                    'style' => 'fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                        ),
                        ),
                        1 => array(
                            'text' => array(
                                0 => 'This is a weapon',
                                1 => 'RG: 9, MD: 2, Accurate, Anti-Missile, Inescapable',
                            ),
                            'rect' => array(
                                'attributes' => array(
                                    'id' => 'rect14',
                                    'y' => '26.55mm',
                                    'x' => '2.5mm',
                                    'height' => '7.95mm',
                                    'width' => '67mm',
                                    'style' => 'fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                        ),
                        2 => array(
                            'text' => array(
                                0 => 'This is missile a weapon',
                                1 => 'RG: 9, MD: 2, Accurate, Ammo 6, Anti-Missile, Inescapable, Missile, Volley X',
                            ),
                            'rect' => array(
                                'attributes' => array(
                                    'id' => 'rect17',
                                    'y' => '34.5mm',
                                    'x' => '2.5mm',
                                    'height' => '7.95mm',
                                    'width' => '67mm',
                                    'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                        ),
                        3 => array(
                            'text' => array(
                                0 => 'Jettison to Other Test',
                                1 => 'Ranged:',
                                2 => 'Hand to Hand:',
                                3 => 'Body Block, Kick, Jump Kick, Stomp',
                                4 => 'Speed: 5',
                                5 => 'Pilot: 2',
                                6 => 'Gunnery: 2',
                                7 => 'Defense: 5',
                                8 => 'Special Abilities:',
                                9 => 'Flight, Hands, Leadership 4',
                            ),
                            'g' => array(
                                0 => array(
                                    'text' => array(
                                        0 => 'This is a weapon',
                                        1 => 'RG: 9, MD: 2, Accurate, Anti-Missile, Inescapable',
                                    ),
                                    'rect' => array(
                                        'attributes' => array(
                                            'id' => 'rect31',
                                            'y' => '70.9mm',
                                            'x' => '2.5mm',
                                            'height' => '7.95mm',
                                            'width' => '67mm',
                                            'style' => 'fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1',
                                        ),
                                    ),
                                ),
                                1 => array(
                                    'text' => array(
                                        0 => 'This is missile a weapon',
                                        1 => 'RG: 9, MD: 2, Accurate, Ammo 6, Anti-Missile, Inescapable, Missile, Volley X',
                                    ),
                                    'rect' => array(
                                        'attributes' => array(
                                            'id' => 'rect34',
                                            'y' => '78.85mm',
                                            'x' => '2.5mm',
                                            'height' => '7.95mm',
                                            'width' => '67mm',
                                            'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                        ),
                                    ),
                                ),
                            ),
                            'rect' => array(
                                'attributes' => array(
                                    'id' => 'rect41',
                                    'y' => '93.475mm',
                                    'x' => '2.5mm',
                                    'height' => '4.125mm',
                                    'width' => '67mm',
                                    'style' => 'fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                        ),
                    ),
                    'text' => array(
                        0 => 'Ranged:',
                        1 => 'Hand to Hand:',
                        2 => 'Body Block, Kick, Jump Kick, Stomp',
                        3 => 'Speed: 5',
                        4 => 'Pilot: 2',
                        5 => 'Gunnery: 2',
                        6 => 'Defense: 5',
                        7 => 'Special Abilities:',
                        8 => 'Flight, Hands, Jettison to Other Test, Leadership 4',
                    ),
                    'rect' => array(
                        0 => array(
                            'attributes' => array(
                                'id' => 'rect24',
                                'y' => '49.125mm',
                                'x' => '2.5mm',
                                'height' => '4.125mm',
                                'width' => '67mm',
                                'style' => 'fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1',
                            ),
                        ),
                        1 => array(
                            'attributes' => array(
                                'id' => 'rect44',
                                'y' => '5mm',
                                'x' => '1mm',
                                'height' => '103.1mm',
                                'width' => '70mm',
                                'style' => 'fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1',
                            ),
                        ),
                    ),
                ),
            ),
            /*
            array(
                '\SquadronBuilder\mecha\MechaTest3',
                1,
                5,
                array(
                    'g' => array(
                        0 => array(
                        'text' => array(
                            0 => 'Regult Test',
                            1 => 'This is missile a weapon',
                            2 => 'Jettison to Other Test',
                        ),
                        'rect' => array(
                            0 => array(
                                'attributes' => array(
                                    'id' => 'rect2',
                                    'y' => '11.675mm',
                                    'x' => '47.15mm',
                                    'height' => '3mm',
                                    'width' => '3mm',
                                    'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                            1 => array(
                                'attributes' => array(
                                    'id' => 'rect3',
                                    'y' => '11.675mm',
                                    'x' => '50.75mm',
                                    'height' => '3mm',
                                    'width' => '3mm',
                                    'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                            2 => array(
                                'attributes' => array(
                                    'id' => 'rect4',
                                    'y' => '11.675mm',
                                    'x' => '54.35mm',
                                    'height' => '3mm',
                                    'width' => '3mm',
                                    'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                            3 => array(
                                'attributes' => array(
                                    'id' => 'rect5',
                                    'y' => '11.675mm',
                                    'x' => '57.95mm',
                                    'height' => '3mm',
                                    'width' => '3mm',
                                    'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                            4 => array(
                                'attributes' => array(
                                    'id' => 'rect6',
                                    'y' => '11.675mm',
                                    'x' => '61.55mm',
                                    'height' => '3mm',
                                    'width' => '3mm',
                                    'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                            5 => array(
                                'attributes' => array(
                                    'id' => 'rect7',
                                    'y' => '11.675mm',
                                    'x' => '65.15mm',
                                    'height' => '3mm',
                                    'width' => '3mm',
                                    'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                            6 => array(
                                'attributes' => array(
                                    'id' => 'rect8',
                                    'y' => '16.9mm',
                                    'x' => '4mm',
                                    'height' => '3mm',
                                    'width' => '3mm',
                                    'style' => 'fill:none;stroke:#0000CF;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                            7 => array(
                                'attributes' => array(
                                    'id' => 'rect10',
                                    'y' => '6.5mm',
                                    'x' => '2.5mm',
                                    'height' => '15.8mm',
                                    'width' => '67mm',
                                    'style' => 'fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                        ),
                        ),
                        1 => array(
                            'text' => array(
                                0 => 'This is a weapon',
                                1 => 'RG: 9, MD: 2, Accurate, Anti-Missile, Inescapable',
                            ),
                            'rect' => array(
                                'attributes' => array(
                                    'id' => 'rect14',
                                    'y' => '26.55mm',
                                    'x' => '2.5mm',
                                    'height' => '7.95mm',
                                    'width' => '67mm',
                                    'style' => 'fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                        ),
                        2 => array(
                            'text' => array(
                                0 => 'This is missile a weapon',
                                1 => 'RG: 9, MD: 2, Accurate, Ammo 6, Anti-Missile, Inescapable, Missile, Volley X',
                            ),
                            'rect' => array(
                                'attributes' => array(
                                    'id' => 'rect17',
                                    'y' => '34.5mm',
                                    'x' => '2.5mm',
                                    'height' => '7.95mm',
                                    'width' => '67mm',
                                    'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                        ),
                        3 => array(
                            'text' => array(
                                0 => 'Jettison to Other Test',
                                1 => 'Ranged:',
                                2 => 'Hand to Hand:',
                                3 => 'Body Block, Kick, Jump Kick, Stomp',
                                4 => 'Speed: 5',
                                5 => 'Pilot: 2',
                                6 => 'Gunnery: 2',
                                7 => 'Defense: 5',
                                8 => 'Special Abilities:',
                                9 => 'Flight, Hands, Leadership 4',
                            ),
                            'g' => array(
                                0 => array(
                                    'text' => array(
                                        0 => 'This is a weapon',
                                        1 => 'RG: 9, MD: 2, Accurate, Anti-Missile, Inescapable',
                                    ),
                                    'rect' => array(
                                        'attributes' => array(
                                            'id' => 'rect31',
                                            'y' => '70.9mm',
                                            'x' => '2.5mm',
                                            'height' => '7.95mm',
                                            'width' => '67mm',
                                            'style' => 'fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1',
                                        ),
                                    ),
                                ),
                                1 => array(
                                    'text' => array(
                                        0 => 'This is missile a weapon',
                                        1 => 'RG: 9, MD: 2, Accurate, Ammo 6, Anti-Missile, Inescapable, Missile, Volley X',
                                    ),
                                    'rect' => array(
                                        'attributes' => array(
                                            'id' => 'rect34',
                                            'y' => '78.85mm',
                                            'x' => '2.5mm',
                                            'height' => '7.95mm',
                                            'width' => '67mm',
                                            'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                        ),
                                    ),
                                ),
                            ),
                            'rect' => array(
                                'attributes' => array(
                                    'id' => 'rect41',
                                    'y' => '93.475mm',
                                    'x' => '2.5mm',
                                    'height' => '4.125mm',
                                    'width' => '67mm',
                                    'style' => 'fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                        ),
                    ),
                    'text' => array(
                        0 => 'Ranged:',
                        1 => 'Hand to Hand:',
                        2 => 'Body Block, Kick, Jump Kick, Stomp',
                        3 => 'Speed: 5',
                        4 => 'Pilot: 2',
                        5 => 'Gunnery: 2',
                        6 => 'Defense: 5',
                        7 => 'Special Abilities:',
                        8 => 'Flight, Hands, Jettison to Other Test, Leadership 4',
                    ),
                    'rect' => array(
                        0 => array(
                            'attributes' => array(
                                'id' => 'rect24',
                                'y' => '49.125mm',
                                'x' => '2.5mm',
                                'height' => '4.125mm',
                                'width' => '67mm',
                                'style' => 'fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1',
                            ),
                        ),
                        1 => array(
                            'attributes' => array(
                                'id' => 'rect44',
                                'y' => '5mm',
                                'x' => '1mm',
                                'height' => '103.1mm',
                                'width' => '70mm',
                                'style' => 'fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1',
                            ),
                        ),
                    ),
                ),
            ),
            */
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

?>
