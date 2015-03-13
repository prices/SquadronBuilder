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

$coreclass = $_GET["core"];
$file  = dirname(__FILE__)."/force/core/$coreclass.php";
if (!file_exists($file)) {
    header("Location: index.php");
}
include_once $file;
$class = '\SquadronBuilder\force\core\\'.$coreclass;
if (!class_exists($class)) {
    header("Location: index.php");
}
require_once dirname(__FILE__)."/force/Force.php";

$index = 0;
$core = new $class($index);

$force = new \SquadronBuilder\force\Force($core->get("faction"));

$done   = null;
$hidden = "";
$print  = "";
if (isset($_GET["support"]) && is_array($_GET["support"])) {
    $done = "support";
    $print .= "<h3>Support</h3><ol>";
    foreach ($_GET["support"] as $supp) {
        if (!empty($supp)) {
            $core->support($supp);
            $hidden .= '<input type="hidden" name="support[]" value="'.$supp.'" />'."\n";
            $print .= "<li>".$supp."</li>";
        }
    }
    $print .= "</ol>";
}
if (isset($_GET["special"]) && is_array($_GET["special"])) {
    $done = "special";
    $print .= "<h3>Special</h3><ol>";
    foreach ($_GET["special"] as $supp) {
        if (!empty($supp)) {
            $core->special($supp);
            $hidden .= '<input type="hidden" name="special[]" value="'.$supp.'" />'."\n";
            $print .= "<li>".$supp."</li>";
        }
    }
    $print .= "</ol>";
}
if (isset($_GET["character"]) && is_string($_GET["character"])) {
    $done = "character";
    $print .= "<h3>Character</h3><ol>";
    if (!empty($_GET["character"])) {
        $core->character($_GET["character"]);
        $hidden .= '<input type="hidden" name="character" value="'.$_GET["character"].'" />'."\n";
        $print .= "<li>".$_GET["character"]."</li>";
    }
    $print .= "</ol>";
}

$target = "coreforce.php";
if ($done == "character") {
    $core->render();
    $upgrades = (array)$core->get("upgrades");
    $target = "document.php";
} else if ($done == "special") {
    $characters = $force->characters($core);
} else if ($done == "support") {
    $special = $force->special($core);
} else {
    $support = $force->support($core);
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" dir="ltr">
    <head>
        <meta charset="UTF-8">
        <title>
            <?php print $core->get("name"); ?>
        </title>
        <link rel="stylesheet" href="css/default.css" />
    </head>
    <body>
        <h2><?php print $core->get("name"); ?></h2>
            <h3><?php print $core->get("points"); ?> Points</h3>
            <a href="index.php">Choose a different Core Squadron</a>
        <form action="<?php print $target; ?>" method="get">
            <input type="hidden" name="core" value="<?php print $coreclass; ?>" />
            <input type="hidden" name="test" value="1" />
            <?php print $hidden.$print; ?>
            <?php if (isset($support)): ?>
                <h3>Support:</h3>
                <select name="support[]">
                    <option value="">None</option>
                <?php foreach ($support as $name => $val): ?>
                    <option value="<?php print $name; ?>"><?php print $val["name"]; ?></option>
                <?php endforeach; ?>
                </select>
                <select name="support[]">
                    <option value="">None</option>
                <?php foreach ($support as $name => $val): ?>
                    <option value="<?php print $name; ?>"><?php print $val["name"]; ?></option>
                <?php endforeach; ?>
                </select>
            <?php elseif (isset($special)): ?>
                <h3>Special Support:</h3>
                <select name="special[]">
                    <option value="">None</option>
                <?php foreach ($special as $name => $val): ?>
                    <option value="<?php print $name; ?>"><?php print $val["name"]; ?></option>
                <?php endforeach; ?>
                </select>
            <?php elseif (isset($characters)): ?>
                <h3>Characters:</h3>
                <select name="character">
                    <option value="">None</option>
                <?php foreach ($characters as $name => $val): ?>
                    <option value="<?php print $name; ?>"><?php print $val["name"]; ?></option>
                <?php endforeach; ?>
                </select>
            <?php elseif (isset($upgrades)): ?>
                <h3>Upgrades:</h3>
                <dl>
                <?php foreach ($upgrades as $name => $upgrade): ?>
                    <dd>
                        <input type="checkbox" name="upgrades[<?php print $name; ?>]" value="1" />
                        <span style="font-weight: bold;"/>
                            <?php print ($upgrade["exclusive"] === true) ? "*" : ""; ?>
                            <?php print $name; ?>
                            [<?php print ($upgrade["points"] > 0) ? "+" : "-"; ?><?php print $upgrade["points"]; ?> pts]
                        </span>
                        <?php print $upgrade["desc"]; ?>
                    </dd>  
                <?php endforeach; ?>
                </dl>
                <strong>* Only one exclusive upgrade can be chosen</strong>
            <?php endif; ?>
            <br />
            <input type="submit" name="submit" value="Submit" />
        </form>
    </body>


