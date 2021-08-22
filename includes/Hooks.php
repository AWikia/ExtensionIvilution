<?php
/**
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * @file
 */

namespace MediaWiki\Extension\Ivilution;

class Hooks implements \MediaWiki\Hook\BeforePageDisplayHook {
	/**
	 * @see https://www.mediawiki.org/wiki/Manual:Hooks/BeforePageDisplay
	 * @param \OutputPage $out
	 * @param \Skin $skin
	 */
	public function onBeforePageDisplay( $out, $skin ): void {
		$config = $out->getConfig();
		if ( ($skin->getSkinName() === 'Evelution') ||  ($skin->getSkinName() === 'evelution') ||  ($skin->getSkinName() === 'tunic') ) { // Only load in non-CPE_Langauge Skins
			$out->addModules( 'ext.Ivilution2' );
		} else {
			$out->addModules( 'ext.Ivilution' );
		}
	}
/*
public static function onSkinAddFooterLinks( Skin $skin, string $key, array &$footerlinks  ) {
		$wgFooterIcons['poweredby']['ivilution'] = [
			"src" => "powered.png",
			"url" => "http://github.com/AWikia/ExtensionIvilution",
			"alt" => "Powered by Ivilution",
			"width" => "92",
			"height" => "31"
		];
}
*/

}