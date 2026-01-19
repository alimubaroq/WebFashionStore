import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Activity, Clock } from 'lucide-react';

const UserActivityLogs = () => {
    const { user } = useAuth();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchLogs();
        }
    }, [user]);

    const fetchLogs = async () => {
        try {
            const response = await api.get(`/activitylogs/user/${user.id}`);
            setLogs(response.data);
        } catch (error) {
            console.error("Failed to fetch logs:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Activity className="h-6 w-6 text-primary" />
                Aktivitas Saya
            </h1>

            <div className="bg-white rounded-xl shadow-sm border p-6">
                {logs.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Belum ada aktivitas tercatat.</p>
                ) : (
                    <div className="flow-root">
                        <ul className="-mb-8">
                            {logs.map((log, logIdx) => (
                                <li key={log.id}>
                                    <div className="relative pb-8">
                                        {logIdx !== logs.length - 1 ? (
                                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                        ) : null}
                                        <div className="relative flex space-x-3">
                                            <div>
                                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white 
                                                    ${log.action === 'Login' ? 'bg-green-500' : 'bg-primary'}`}>
                                                    <Clock className="h-4 w-4 text-white" />
                                                </span>
                                            </div>
                                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                <div>
                                                    <p className="text-sm text-gray-900 font-medium">{log.action}</p>
                                                    <p className="text-sm text-gray-500">{log.details}</p>
                                                </div>
                                                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                                    <time dateTime={log.timestamp}>{new Date(log.timestamp).toLocaleString('id-ID')}</time>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserActivityLogs;
