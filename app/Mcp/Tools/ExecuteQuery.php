<?php

namespace App\Mcp\Tools;

use PhpMcp\Server\Attributes\McpTool;
use PhpMcp\Server\Attributes\McpTool\Param;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

#[McpTool(
    name: 'execute_query',
    description: 'Execute a read-only SQL query on the database'
)]
class ExecuteQuery
{
    #[Param(
        name: 'query',
        type: 'string',
        description: 'The SQL query to execute (SELECT only for safety)'
    )]
    #[Param(
        name: 'bindings',
        type: 'array',
        description: 'Parameter bindings for the query',
        required: false
    )]
    public function __invoke(string $query, array $bindings = []): array
    {
        // Safety: Only allow SELECT queries
        $trimmed = trim(strtoupper($query));
        if (!str_starts_with($trimmed, 'SELECT')) {
            return ['error' => 'Only SELECT queries are allowed'];
        }

        try {
            $results = DB::select($query, $bindings);
            return [
                'columns' => $results ? array_keys((array) $results[0]) : [],
                'rows' => array_map(fn($row) => (array) $row, $results),
                'count' => count($results),
            ];
        } catch (\Throwable $e) {
            return ['error' => $e->getMessage()];
        }
    }
}