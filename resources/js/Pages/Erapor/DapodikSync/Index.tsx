/// <reference types="vite/client" />
import React from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import AppLayout from '@/Layout/AppLayout';

interface SyncLog {
    id: number;
    entity_type: string;
    entity_id: number;
    action: string;
    status: 'pending' | 'success' | 'failed';
    synced_at: string;
    created_at: string;
}

interface Mapping {
    entity_type: string;
    local_id: number;
    dapodik_id: string;
    last_sync_at: string;
}

interface Props {
    syncLogs: SyncLog[];
    stats: {
        pending: number;
        success: number;
        failed: number;
        total_mappings: number;
    };
    mappings: Mapping[];
}

export default function Index({ syncLogs, stats, mappings }: Props) {
    const form = useForm({
        entity_type: 'siswa',
        entity_id: '',
    });

    const handleSyncManual = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route('admin.erapor.dapodik-sync.manual'), {
            onSuccess: () => form.reset(),
        });
    };

    const handlePullData = (entityType: string) => {
        form.post(route('admin.erapor.dapodik-sync.pull'), {
            data: { entity_type: entityType },
        });
    };

    const statusBadge = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            success: 'bg-green-100 text-green-800',
            failed: 'bg-red-100 text-red-800',
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
                {status}
            </span>
        );
    };

    const entityTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            siswa: 'Siswa',
            guru: 'Guru',
            rombongan_belajar: 'Rombel',
        };
        return labels[type] || type;
    };

    return (
        <>
            <Head title="Sinkronisasi Dapodik" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            e-Rapor - Sinkronisasi Dapodik
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Kelola sinkronisasi data dengan Dapodik Kemendikdasmen
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Pending</div>
                            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Success (Hari Ini)</div>
                            <div className="text-2xl font-bold text-green-600">{stats.success}</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Failed (Hari Ini)</div>
                            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Total Mappings</div>
                            <div className="text-2xl font-bold text-blue-600">{stats.total_mappings}</div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Sinkronisasi Manual
                        </h2>
                        <form onSubmit={handleSyncManual} className="flex gap-4 items-end">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Entity Type
                                </label>
                                <select
                                    value={form.data.entity_type}
                                    onChange={(e) => form.setData('entity_type', e.target.value)}
                                    className="rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                >
                                    <option value="siswa">Siswa</option>
                                    <option value="guru">Guru</option>
                                    <option value="rombongan_belajar">Rombel</option>
                                </select>
                            </div>
                            {form.data.entity_type !== 'rombongan_belajar' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Entity ID
                                    </label>
                                    <input
                                        type="number"
                                        value={form.data.entity_id}
                                        onChange={(e) => form.setData('entity_id', e.target.value)}
                                        className="rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white w-32"
                                    />
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700 disabled:opacity-50"
                            >
                                {form.processing ? 'Syncing...' : 'Sync Sekarang'}
                            </button>
                        </form>

                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => handlePullData('siswa')}
                                className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700"
                            >
                                Pull Data Siswa
                            </button>
                            <button
                                onClick={() => handlePullData('guru')}
                                className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700"
                            >
                                Pull Data Guru
                            </button>
                            <button
                                onClick={() => handlePullData('rombongan_belajar')}
                                className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700"
                            >
                                Pull Data Rombel
                            </button>
                        </div>
                    </div>

                    {/* ID Mappings */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Mapping ID Dapodik
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Entity</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Local ID</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Dapodik ID</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Last Sync</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {mappings.map((m) => (
                                        <tr key={`${m.entity_type}-${m.local_id}`}>
                                            <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                                                {entityTypeLabel(m.entity_type)}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                                {m.local_id}
                                            </td>
                                            <td className="px-4 py-2 text-sm font-medium text-navy-600">
                                                {m.dapodik_id}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                                {m.last_sync_at || 'Belum pernah'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Sync Logs */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Riwayat Sinkronisasi
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Entity</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Synced</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {syncLogs.map((log) => (
                                        <tr key={log.id}>
                                            <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                                                {entityTypeLabel(log.entity_type)} #{log.entity_id}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                                {log.action}
                                            </td>
                                            <td className="px-4 py-2">
                                                {statusBadge(log.status)}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                                {log.synced_at || '-'}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                                {log.created_at}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactElement) => <AppLayout children={page} />