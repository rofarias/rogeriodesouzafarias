<?php
/**
 * @defgroup plugins_generic_pdfJsViewer PDF submission file plugin
 */

/**
 * @file plugins/generic/pdfJsViewer/index.php
 *
 * Copyright (c) 2014-2020 Simon Fraser University
 * Copyright (c) 2003-2020 John Willinsky
 * Distributed under the GNU GPL v3. For full terms see the file docs/COPYING.
 *
 * @ingroup plugins_generic_pdfJsViewer
 * @brief Wrapper for pdf submission file plugin.
 *
 */

require_once('PdfJsViewerPlugin.inc.php');

return new PdfJsViewerPlugin();


