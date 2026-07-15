<?php

namespace App\Mcp\Tools;

use PhpMcp\Server\Attributes\McpTool;
use PhpMcp\Server\Attributes\McpTool\Param;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

#[McpTool(
    name: 'get_table_columns',
    description: 'Get column information for a specific table'
)]
class GetTableColumns
{
    #[Param(
        name: 'table',
        type: 'string',
        description: 'The table name to get columns for'
    )]
    public function __invoke(string $table): array
    {
        try {
            $columns = DB::select("DESCRIBE `{$table}`");
            return [
                'table' => $table,
                'columns' => array_map(fn($c) => (array) $c, $columns),
            ];
        } catch (\Throwable $e) {
            return ['error' => $e->getMessage()];
        }
    }
}