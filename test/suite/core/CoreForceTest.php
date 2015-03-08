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
require_once CODE_BASE.'core/CoreForce.php';
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
class CoreForceTest extends \SquadronBuilder\TestBase
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
        $this->o = new \SquadronBuilder\force\core\CoreForceTest1($this->x, $this->y, $this->index, array());
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
                '\SquadronBuilder\force\core\CoreForceTest1',
                1,
                5,
                array(
                    'g' => array(
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
                                            'id' => 'rect47',
                                            'y' => '21.575mm',
                                            'x' => '52mm',
                                            'height' => '3mm',
                                            'width' => '3mm',
                                            'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                        ),
                                    ),
                                    1 => array(
                                        'attributes' => array(
                                            'id' => 'rect48',
                                            'y' => '21.575mm',
                                            'x' => '55.6mm',
                                            'height' => '3mm',
                                            'width' => '3mm',
                                            'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                        ),
                                    ),
                                    2 => array(
                                        'attributes' => array(
                                            'id' => 'rect49',
                                            'y' => '21.575mm',
                                            'x' => '59.2mm',
                                            'height' => '3mm',
                                            'width' => '3mm',
                                            'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                        ),
                                    ),
                                    3 => array(
                                        'attributes' => array(
                                            'id' => 'rect50',
                                            'y' => '21.575mm',
                                            'x' => '62.8mm',
                                            'height' => '3mm',
                                            'width' => '3mm',
                                            'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                        ),
                                    ),
                                    4 => array(
                                        'attributes' => array(
                                            'id' => 'rect51',
                                            'y' => '21.575mm',
                                            'x' => '66.4mm',
                                            'height' => '3mm',
                                            'width' => '3mm',
                                            'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                        ),
                                    ),
                                    5 => array(
                                        'attributes' => array(
                                            'id' => 'rect52',
                                            'y' => '21.575mm',
                                            'x' => '70mm',
                                            'height' => '3mm',
                                            'width' => '3mm',
                                            'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                        ),
                                    ),
                                    6 => array(
                                        'attributes' => array(
                                            'id' => 'rect53',
                                            'y' => '26.8mm',
                                            'x' => '75.5mm',
                                            'height' => '3mm',
                                            'width' => '3mm',
                                            'style' => 'fill:none;stroke:#0000CF;stroke-width:1.47185135;stroke-opacity:1',
                                        ),
                                    ),
                                    7 => array(
                                        'attributes' => array(
                                            'id' => 'rect55',
                                            'y' => '16.4mm',
                                            'x' => '74mm',
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
                                        'id' => 'rect59',
                                        'y' => '36.45mm',
                                        'x' => '74mm',
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
                                        'id' => 'rect62',
                                        'y' => '44.4mm',
                                        'x' => '74mm',
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
                                                'id' => 'rect76',
                                                'y' => '80.8mm',
                                                'x' => '74mm',
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
                                                'id' => 'rect79',
                                                'y' => '88.75mm',
                                                'x' => '74mm',
                                                'height' => '7.95mm',
                                                'width' => '67mm',
                                                'style' => 'fill:none;stroke:#CF0000;stroke-width:1.47185135;stroke-opacity:1',
                                            ),
                                        ),
                                    ),
                                ),
                                'rect' => array(
                                    'attributes' => array(
                                        'id' => 'rect86',
                                        'y' => '103.375mm',
                                        'x' => '74mm',
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
                                    'id' => 'rect69',
                                    'y' => '59.025mm',
                                    'x' => '74mm',
                                    'height' => '4.125mm',
                                    'width' => '67mm',
                                    'style' => 'fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                            1 => array(
                                'attributes' => array(
                                    'id' => 'rect89',
                                    'y' => '14.9mm',
                                    'x' => '72.5mm',
                                    'height' => '103.1mm',
                                    'width' => '70mm',
                                    'style' => 'fill:none;stroke:#000000;stroke-width:1.47185135;stroke-opacity:1',
                                ),
                            ),
                        ),
                    ),
                    "text" => array(
                        0 => 'Test Squadron 1',
                        1 => '50 Points',
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
    /**
    * Data provider for testRemove
    *
    * @return array
    */
    public static function dataGetMods()
    {
        return array(
            array(
                '\SquadronBuilder\force\core\CoreForceTest1',
                1,
                5,
                array(
                    "support" => array(
                        'RegultSquad' => 'SquadronBuilder\force\support\RegultSquad',
                    ),
                    "special" => array(
                        'Glaug' => 'SquadronBuilder\force\special\Glaug',
                    ),
                    "character" => array(
                        'Azonia' => 'SquadronBuilder\characters\Azonia',
                    ),
                    "upgrades" => array(
                        "Veteran Warriors" => array(
                            "desc" => "Regults, Serau-Ger and Gluu-Ger in this squadron get +1 to Piloting (or Physical) and +1 to Gunnery",
                            "points" => 10,
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
    * @dataProvider dataGetMods
    */
    public function testGetMods($class, $x, $y, $expect)
    {
        $this->o = new $class($this->x, $this->y, $this->index, array());
        $mods = $this->o->getMods();
        foreach ($mods as $key => &$type) {
            foreach ($type as $k => &$obj) {
                if (is_object($obj)) {
                    $obj = get_class($obj);
                }
            }
        }
        $this->assertEquals($expect, $mods);
    }

}
namespace SquadronBuilder\force\core;
/**
 * This class deals with printing out a single weapon.
 *
 * @category   html
 * @package    abilities
 * @subpackage weapons
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class CoreForceTest1 extends \SquadronBuilder\core\CoreForce
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "Test Squadron 1",
        /** These are our weapons */
        "mecha" => array(
            "MechaTest1" => 1, 
        ),
        "points" => 50,
        "upgrades" => array(
            "Veteran Warriors" => array(
                "desc" => "Regults, Serau-Ger and Gluu-Ger in this squadron get +1 to Piloting (or Physical) and +1 to Gunnery",
                "points" => 10,
            ),
        ),
        "faction" => "Zentraedi",
    );
    /**
    * This function runs an upgrade
    *
    * @param string $name  The name of the upgrade
    * 
    * @return true if ready to apply, false if already applied
    */
    public function upgrade($name)
    {
        if (parent::upgrade($name)) {
            switch ($name) {
            case "":
                break;
            }
            return true;
        }
        return false;
    }
}
namespace SquadronBuilder\mecha;
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
class MechaTest1 extends \SquadronBuilder\core\Mecha
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
            'Flight'               => true,
            'Focus Fire'           => false,
            'Hands'                => true,
            'Hover'                => false,
            'Jettison'             => "MechaTest2",
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
class MechaTest2 extends \SquadronBuilder\core\Mecha
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "Other Test",
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
            'Flight'               => true,
            'Focus Fire'           => false,
            'Hands'                => true,
            'Hover'                => false,
            'Jettison'             => false,
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
namespace SquadronBuilder\weapons;
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
class MechaWeaponTest1 extends \SquadronBuilder\core\Weapon
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
class MechaWeaponTest2 extends \SquadronBuilder\core\Weapon
{
    protected $params = array(
        /** This is our header for abilities **/
        "name" => "This is missile a weapon",
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
        ),
    );
}

?>
