<?php

namespace App\Services;

use App\Models\MenuItem;
use Illuminate\Support\Facades\Auth;

class MenuService
{
    public function getMenuTree(): array
    {
        $user = Auth::user();
        $role = $user?->roles->first()?->name;

        $parents = MenuItem::active()->parents()->with('children')->get();

        return $parents->map(fn ($group) => [
            'label' => $group->label,
            'icon' => $group->icon,
            'route' => $group->route,
            'children' => $group->children
                ->filter(fn ($child) => $this->visibleForRole($child, $role))
                ->values()
                ->map(fn ($c) => [
                    'label' => $c->label,
                    'icon' => $c->icon,
                    'route' => $c->route,
                ]),
        ])->filter(fn ($g) => $g['children']->isNotEmpty() || $g['route'] !== null)
        ->values()
        ->toArray();
    }

    private function visibleForRole(MenuItem $item, ?string $role): bool
    {
        if (!$item->permission) {
            return true;
        }
        if (!$role) {
            return false;
        }

        $allowed = array_map('trim', explode(',', $item->permission));

        return in_array($role, $allowed, true);
    }
}
