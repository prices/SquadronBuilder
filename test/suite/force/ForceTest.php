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
namespace SquadronBuilder\force;

/** This is a required class */
require_once CODE_BASE.'force/Force.php';
/** This is the test classes */
require_once TEST_CONFIG_BASE.'files/force/core/CoreForceTest1.php';
/** This is the test classes */
require_once TEST_CONFIG_BASE.'files/force/support/MechaSquad.php';

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
class ForceTest extends \SquadronBuilder\TestBase
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
        $this->o = new \SquadronBuilder\force\Force(
            "Zentraedi", 
            TEST_CONFIG_BASE.'files/force'
        );
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
    * Data provider for testSupport
    *
    * @return array
    */
    public static function dataSupport()
    {
        $index = 0;
        return array(
            array(
                new \SquadronBuilder\force\core\CoreForceTest1($index),
                array(
                    "MechaSquad" => array(
                        "name" => "Mecha Squad",
                        "points" => 35,
                    ),
                ),
            ),
        );
    }
    /**
    * Tests the iteration and preload functions
    *
    * @param float $core   The core force card to use
    * @param array $expect The info to expect returned
    *
    * @return null
    *
    * @dataProvider dataSupport
    */
    public function testSupport($core, $expect)
    {
        $mods = $this->o->support($core);
        $this->assertEquals(
            $expect,
            $mods
        );
    }
    /**
    * Data provider for testSpecial
    *
    * @return array
    */
    public static function dataSpecial()
    {
        $index = 0;
        return array(
            array(
                new \SquadronBuilder\force\core\CoreForceTest1($index),
                array(
                    "ExtraSpecialMecha" => array(
                        "name" => "Mecha #2",
                        "points" => 20,
                    ),
                ),
            ),
        );
    }
    /**
    * Tests the iteration and preload functions
    *
    * @param float $core   The core force card to use
    * @param array $expect The info to expect returned
    *
    * @return null
    *
    * @dataProvider dataSpecial
    */
    public function testSpecial($core, $expect)
    {
        $mods = $this->o->special($core);
        $this->assertEquals(
            $expect,
            $mods
        );
    }
    /**
    * Data provider for testCharacters
    *
    * @return array
    */
    public static function dataCharacters()
    {
        $index = 0;
        $core = new \SquadronBuilder\force\core\CoreForceTest1($index);
        $core->support("MechaSquad");
        return array(
            array(
                new \SquadronBuilder\force\core\CoreForceTest1($index),
                array(
                ),
            ),
            array(
                $core,
                array(
                    'Aztec' => array(
                        'name' => 'Aztec',
                        'points' => 5,
                    ),
                ),
            ),
        );
    }
    /**
    * Tests the iteration and preload functions
    *
    * @param float $core   The core force card to use
    * @param array $expect The info to expect returned
    *
    * @return null
    *
    * @dataProvider dataCharacters
    */
    public function testCharacters($core, $expect)
    {
        $mods = $this->o->characters($core);
        $this->assertEquals(
            $expect,
            $mods
        );
    }
    /**
    * Tests the iteration and preload functions
    *
    * @return null
    */
    public function testCore()
    {
        $core = $this->o->core();
        $this->assertSame(
            array(
                'CoreForceTest1' => array(
                    'name' => 'Test Squadron 1',
                    'points' => 50,
                ),
            ), 
            $core
        );
    }

}

?>
