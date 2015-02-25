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
 * @subpackage document
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @version    GIT: $Id: $
 * @link       https://github.com/prices/SquadronBuilder
 */
/** This is our namespace */
namespace SquadronBuilder\core;

defined( '_SQUADRONBUILDER' ) or die( 'Restricted access' );


/** These are our required files */
require_once "BaseObject.php";
/** These are our required files */
require_once dirname(__FILE__)."/../abilities/Weapon.php";
require_once dirname(__FILE__)."/../abilities/Mecha.php";
require_once dirname(__FILE__)."/../abilities/HandToHand.php";
require_once dirname(__FILE__)."/../mecha/GluuhaugRegult.php";
require_once dirname(__FILE__)."/../mecha/Regult.php";

/**
 * This class deals with printing out a single mecha.
 *
 * @category   html
 * @package    core
 * @subpackage document
 * @author     Scott Price <prices@dflytech.com>
 * @copyright  2015 Scott Price
 * @license    http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link       https://github.com/prices/SquadronBuilder
 */
class Document extends BaseObject
{    
    /** This is the name of the document */
    protected $name = "Untitled";
    /** This is our width in mm */
    protected $width = 216;
    /** This is our height in mm */
    protected $height = 279;
    /** This is our document margin in mm */
    protected $margin = 7;
    
    
    /**
    * This is the constructor for the class
    * 
    * @param array $params The other parameters
    *
    * @return null
    */
    public function __construct($params = array())
    {
        $x     = 0;
        $y     = 0;
        $index = 0;
        if (isset($params["name"])) {
            $this->name = $params["name"];
        }
        parent::__construct($x, $y, $index, $params);
    }
    /**
    * This function returns the text of the document
    * 
    * @return string The document content
    */
    public function encode()
    {
        $Weapon = new \SquadronBuilder\abilities\Weapon($this->index);
        $Mecha  = new \SquadronBuilder\abilities\Mecha($this->index);
        $HtH  = new \SquadronBuilder\abilities\HandToHand($this->index);
        $GRegult = new \SquadronBuilder\mecha\GluuhaugRegult($this->index);
        $Regult = new \SquadronBuilder\mecha\Regult($this->index);

        $text = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with SquadronBuilder (https://github.com/prices/SquadronBuilder) -->

<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   width="'.$this->width.'mm"
   height="'.$this->height.'mm"
   id="svg'.$this->index++.'"
   version="1.1"
   sodipodi:docname="'.$this->name.'.svg">
';
        $x = $this->margin;
        $y = $this->margin;
        $text .= $Regult->encode($x, $y, 5);
        $y    += $Regult->height();
        $text .= $GRegult->encode($x, $y, 5);
        
        $ax = $this->width - $this->margin - $Weapon->width();
        $ay = $this->margin;
        
        $text .= $Weapon->encode($ax, $ay);
        $ay    += $Weapon->height();
        $text .= $Mecha->encode($ax, $ay);
        $ay    += $Mecha->height();
        $text .= $HtH->encode($ax, $ay);
 
 
        $text .= $this->_font();
        $text .= '</svg>';
        return $text;
    }
    /**
    * This includes our font
    *
    * @return string The font text
    */
    private function _font()
    {
        $text = "\n<!-- Deja Vu Font license at http://dejavu-fonts.org/wiki/License -->\n";
        $text .= file_get_contents(dirname(__FILE__)."/../ttf/DejaVuSans.svg");
        return $text;
   }
}