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
 * @package    bootstrap
 * @subpackage bootstrap
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @version    GIT: $Id: $
 * @link       https://github.com/prices/SquadronBuilder
 */

/** This is the base where the code resides */
define("CODE_BASE", realpath(dirname(__FILE__)."/../html/")."/");
/** This is the base where the test suite resides */
define("TEST_BASE", realpath(dirname(__FILE__)."/suite/")."/");
/** This is the base where the test config resides */
define("TEST_CONFIG_BASE", realpath(dirname(__FILE__))."/");
/** This define allows everything else to be included */
define("_SQUADRONBUILDER", true);
/** This define allows everything else to be included */
define("_TESTMODE", true);

?>
