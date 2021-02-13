<?php
/**
 * Omeka
 *
 * @copyright Copyright 2007-2016 Roy Rosenzweig Center for History and New Media
 * @license http://www.gnu.org/licenses/gpl-3.0.txt GNU GPLv3
 */

/**
 * @package Omeka\Db\Migration
 */
class changeFileSizeBigInt extends Omeka_Db_Migration_AbstractMigration
{
    public function up()
    {
        $db = $this->db;
        $db->query("ALTER TABLE `{$db->prefix}files` MODIFY `size` bigint unsigned NOT NULL");
    }
}
