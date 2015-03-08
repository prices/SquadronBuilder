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
 * @category   html
 * @package    core
 * @subpackage weapons
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @version    GIT: $Id: $
 * @link       https://github.com/prices/SquadronBuilder
 */
 
define("_SQUADRONBUILDER", true);

/** These are our required files */
require_once dirname(__FILE__)."/abilities/Weapon.php";
require_once dirname(__FILE__)."/abilities/Mecha.php";
require_once dirname(__FILE__)."/abilities/HandToHand.php";


$test = isset($_GET["test"]) ? (bool)$_GET["test"] : false;

$index = 0;
$height = 279;
$width = 216;
$margin = 7;

$class = $_GET["core"];
$file  = dirname(__FILE__)."/force/core/$class.php";
if (!file_exists($file)) {
    header("Location: index.php");
}
include_once $file;
$class = '\SquadronBuilder\force\core\\'.$class;
if (!class_exists($class)) {
    header("Location: index.php");
}
$core = new $class(
    $index, 
    array(
        "maxheight" => ($height - $margin),
    )
);
foreach ((array)$_GET["upgrades"] as $name => $value) {
    if ($value == 1) {
        $core->upgrade($name);
    }
}
foreach ((array)$_GET["support"] as $value) {
    $core->support($value);
}


$Weapon = new \SquadronBuilder\abilities\Weapon($index);
$Mecha  = new \SquadronBuilder\abilities\Mecha($index);
$HtH  = new \SquadronBuilder\abilities\HandToHand($index);

$name = str_replace(" ", "_", trim($core->get("name")));
$name = empty($name) ? "Untitled.svg" : $name.".svg";

if (!$test) {
    header('Content-type: image/svg+xml');
    header('Content-Disposition: attachment; filename="'.$name.'"');
}

print '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'."\n";
?>

<!-- Created with SquadronBuilder (https://github.com/prices/SquadronBuilder) -->
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   width="<?php print $width; ?>mm"
   height="<?php print $height; ?>mm"
   id="svg<?php print $index++;?>"
   version="1.1"
   sodipodi:docname="<?php print $name; ?>">
<?php
        $x = $margin;
        $y = $margin;
        print $core->render($x, $y);
        
        $ax = $width - $margin - $Weapon->width();
        $ay = $margin;
        
        print $Weapon->render($ax, $ay);
        $ay += $Weapon->height();
        print $Mecha->render($ax, $ay);
        $ay += $Mecha->height();
        print $HtH->render($ax, $ay);

?>
<!-- Bitstream Vera can be obtained at http://ftp.gnome.org/pub/GNOME/sources/ttf-bitstream-vera/ -->
<?php print file_get_contents(dirname(__FILE__)."/ttf/Vera.svg"); ?>
   
</svg>