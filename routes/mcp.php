<?php

use PhpMcp\Laravel\Facades\Mcp;

/*
|--------------------------------------------------------------------------
| MCP Tools, Resources, and Prompts
|--------------------------------------------------------------------------
|
| This file is automatically discovered and loaded by the MCP server
| when MCP_AUTO_DISCOVER is enabled (default: true).
|
| Register your MCP tools, resources, resource templates, and prompts here.
|
*/

// Example: Register a simple tool
// Mcp::tool('welcome_message', \App\Mcp\GenerateWelcomeMessage::class);

// Example: Register a resource
// Mcp::resource('app://version', \App\Mcp\GetAppVersion::class)
//     ->name('laravel_app_version')
//     ->mimeType('text/plain');

// Example: Register a resource template
// Mcp::resourceTemplate('content://articles/{articleId}', \App\Mcp\GetArticleContent::class)
//     ->name('article_content')
//     ->mimeType('application/json');

// Example: Register a prompt
// Mcp::prompt('seo_keywords_generator', \App\Mcp\GenerateSeoKeywordsPrompt::class);

// Database tools
// Mcp::tool('execute_query', \App\Mcp\Tools\ExecuteQuery::class);
// Mcp::tool('get_tables', \App\Mcp\Tools\GetTables::class);

// Laravel-specific tools
// Mcp::tool('route_list', \App\Mcp\Tools\RouteList::class);
// Mcp::tool('config_get', \App\Mcp\Tools\ConfigGet::class);