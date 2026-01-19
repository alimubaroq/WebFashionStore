import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Package, Search, Eye, Filter } from 'lucide-react';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const fetchOrders = async () => {
        try {
            const response = await api.get('/orders');
            setOrders(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id, newStatus) => {
        try {
            await api.put(`/orders/${id}/status`, newStatus, {
                headers: { 'Content-Type': 'application/json' }
            });
            fetchOrders();
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Gagal update status");
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            'Pending': 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
            'Processing': 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
            'Shipped': 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
            'Completed': 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
            'Cancelled': 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
        };
        return badges[status] || badges['Pending'];
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.phoneNumber.includes(searchTerm);
        const matchesFilter = filterStatus === 'All' || order.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    if (loading) return (
        <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-neutral-dark dark:text-white">Kelola Pesanan</h1>
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <Package className="h-4 w-4" />
                    <span>{filteredOrders.length} Pesanan</span>
                </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-800 overflow-hidden">
                <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-neutral-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari pesanan, customer, atau phone..."
                            className="pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border-none rounded-lg w-full focus:ring-1 focus:ring-primary text-sm text-neutral-dark dark:text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-neutral-400" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="bg-neutral-50 dark:bg-neutral-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary text-neutral-dark dark:text-white"
                        >
                            <option value="All">Semua Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-100 dark:divide-neutral-800">
                        <thead className="bg-neutral-50 dark:bg-neutral-800/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">Items</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-100 dark:divide-neutral-800">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-mono font-bold text-neutral-900 dark:text-white">
                                                #{order.id.slice(-8).toUpperCase()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-bold text-neutral-900 dark:text-white">{order.customerName}</div>
                                                <div className="text-sm text-neutral-500 dark:text-neutral-400">{order.phoneNumber}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                                {order.items.length} item{order.items.length > 1 ? 's' : ''}
                                                <div className="text-xs text-neutral-400 mt-1">
                                                    {order.items.slice(0, 2).map((item, i) => item.name).join(', ')}
                                                    {order.items.length > 2 && '...'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-neutral-900 dark:text-white">
                                                Rp {order.totalAmount.toLocaleString('id-ID')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateStatus(order.id, e.target.value)}
                                                className={`text-xs font-bold px-3 py-1 rounded-full border-0 cursor-pointer focus:ring-2 focus:ring-primary ${getStatusBadge(order.status)}`}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                                {new Date(order.createdAt).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                                <div className="text-xs text-neutral-400">
                                                    {new Date(order.createdAt).toLocaleTimeString('id-ID', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-neutral-500">
                                        {loading ? 'Memuat data...' : 'Tidak ada pesanan ditemukan.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
