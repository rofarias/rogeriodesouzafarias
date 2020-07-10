<?php

/**
 * @file pages/sitemap/SitemapHandler.inc.php
 *
 * Copyright (c) 2014-2020 Simon Fraser University
 * Copyright (c) 2003-2020 John Willinsky
 * Distributed under the GNU GPL v3. For full terms see the file docs/COPYING.
 *
 * @class SitemapHandler
 * @ingroup pages_sitemap
 *
 * @brief Produce a sitemap in XML format for submitting to search engines.
 */

import('lib.pkp.pages.sitemap.PKPSitemapHandler');

class SitemapHandler extends PKPSitemapHandler {

	/**
	 * @copydoc PKPSitemapHandler::_createContextSitemap()
	 */
	function _createContextSitemap($request) {
		$doc = parent::_createContextSitemap($request);
		$root = $doc->documentElement;

		$press = $request->getPress();
		$pressId = $press->getId();

		// Catalog
		$root->appendChild($this->_createUrlTree($doc, $request->url($press->getPath(), 'catalog')));

		$submissionsIterator = Services::get('submission')->getMany(['status' => STATUS_PUBLISHED, 'contextId' => $pressId, 'count' => 1000]);
		foreach ($submissionsIterator as $submission) {
			// Book
			$root->appendChild($this->_createUrlTree($doc, $request->url($press->getPath(), 'catalog', 'view', array($submission->getBestId()))));
			// Files
			// Get publication formats
			$publicationFormats = DAORegistry::getDAO('PublicationFormatDAO')->getApprovedByPublicationId($submission->getCurrentPublication()->getId())->toArray();
			foreach ($publicationFormats as $format) {
				// Consider only available publication formats
				if ($format->getIsAvailable()) {
					// Consider only available publication format files
					$submissionDao = DAORegistry::getDAO('SubmissionDAO'); /* @var $submissionDao SubmissionDAO */
					$availableFiles = array_filter(
						$submissionDao->getLatestRevisionsByAssocId(ASSOC_TYPE_PUBLICATION_FORMAT, $format->getId(), $submission->getId()),
						function($a) {
							return $a->getDirectSalesPrice() !== null;
						}
					);
					foreach ($availableFiles as $file) {
						$root->appendChild($this->_createUrlTree($doc, $request->url($press->getPath(), 'catalog', 'view', array($submission->getBestId(), $format->getBestId(), $file->getBestId()))));
					}
				}
			}
		}

		// New releases
		$root->appendChild($this->_createUrlTree($doc, $request->url($press->getPath(), 'catalog', 'newReleases')));
		// Browse by series
		$seriesDao = DAORegistry::getDAO('SeriesDAO'); /* @var $seriesDao SeriesDAO */
		$seriesResult = $seriesDao->getByPressId($pressId);
		while ($series = $seriesResult->next()) {
			$root->appendChild($this->_createUrlTree($doc, $request->url($press->getPath(), 'catalog', 'series', $series->getPath())));
		}
		// Browse by categories
		$categoryDao = DAORegistry::getDAO('CategoryDAO'); /* @var $categoryDao CategoryDAO */
		$categoriesResult = $categoryDao->getByContextId($pressId);
		while ($category = $categoriesResult->next()) {
			$root->appendChild($this->_createUrlTree($doc, $request->url($press->getPath(), 'catalog', 'category', $category->getPath())));
		}

		$doc->appendChild($root);

		// Enable plugins to change the sitemap
		HookRegistry::call('SitemapHandler::createPressSitemap', array(&$doc));

		return $doc;
	}

}


