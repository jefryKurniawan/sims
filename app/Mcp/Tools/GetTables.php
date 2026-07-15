<?php

namespace App\Mcp\Tools;

use PhpMcp\Server\Attributes\McpTool;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

#[McpTool(
    name: 'get_tables',
    description: 'Get all table names from the database'
)]
class GetTables
{
    public function __invoke(): array
    {
        try {
            $tables = DB::select('SHOW TABLES');
            $tableNames = array_map(fn($t) => array_values((array)$t)[0], $tables);
            return ['tables' => $tableNames, 'count' => count($tableNames)];
        } catch (\Throwable $e) {
            return ['error' => $e->getMessage()];
        }
    }
}