import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import {
    TrendingUp,
    TrendingDown,
    ShoppingCart,
    Package,
    Users,
    Download,
    Plus,
    MoreHorizontal,
    Eye,
    AlertCircle,
    Shirt
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateSalesReport } from '../../utils/pdfGenerator';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        totalProducts: 0,
        recentOrders: [],
        itemsSold: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const ordersRes = await api.get('/orders');
                const productsRes = await api.get('/products');

                const orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
                const products = Array.isArray(productsRes.data) ? productsRes.data : [];

                const revenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
                const itemsSold = orders.reduce((acc, order) => acc + (order.items?.length || 1), 0);

                setStats({
                    totalOrders: orders.length,
                    totalRevenue: revenue,
                    totalProducts: products.length,
                    recentOrders: orders.slice(0, 5),
                    itemsSold: itemsSold
                });
            } catch (error) {
                console.error("Failed to load admin stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(val);
    };

    const handleExport = async () => {
        try {
            setLoading(true);
            const response = await api.get('/orders/stats');
            const statsData = response.data;

            // Ensure data structure matches what pdfGenerator expects
            // Backend sends raw numbers for revenue in topProducts, pdfGenerator currently expects strings or needs update.
            // I will update pdfGenerator to format it.

            generateSalesReport(statsData);
        } catch (error) {
            console.error("Failed to export report:", error);
            // Fallback or alert?
            alert("Gagal mengunduh laporan. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-dark dark:text-white">Dashboard Overview</h1>
                    <p className="text-sm text-neutral-500">Selamat datang kembali, berikut ringkasan toko Anda hari ini.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2 text-sm font-bold text-neutral-700 dark:text-neutral-200 shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    >
                        <Download className="h-4 w-4" />
                        Export
                    </button>
                    <Link to="/admin/products/new" className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white shadow-md shadow-primary/30 hover:bg-primary/90 transition-colors">
                        <Plus className="h-4 w-4" />
                        Tambah Produk
                    </Link>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Total Sales */}
                <div className="rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-neutral-500">Total Penjualan</p>
                        <div className="bg-primary/10 p-2 rounded-lg text-primary">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-bold text-neutral-dark dark:text-white tracking-tight">{formatCurrency(stats.totalRevenue)}</h3>
                        <div className="flex items-center gap-1 mt-1 text-primary">
                            <TrendingUp className="h-3 w-3" />
                            <span className="text-xs font-bold">+12.5%</span>
                            <span className="text-xs text-neutral-400 font-normal ml-1">vs bulan lalu</span>
                        </div>
                    </div>
                </div>

                {/* Total Orders */}
                <div className="rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-neutral-500">Total Pesanan</p>
                        <div className="bg-primary/10 p-2 rounded-lg text-primary">
                            <ShoppingCart className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-bold text-neutral-dark dark:text-white tracking-tight">{stats.totalOrders}</h3>
                        <div className="flex items-center gap-1 mt-1 text-primary">
                            <TrendingUp className="h-3 w-3" />
                            <span className="text-xs font-bold">+5.2%</span>
                            <span className="text-xs text-neutral-400 font-normal ml-1">vs bulan lalu</span>
                        </div>
                    </div>
                </div>

                {/* Items Sold */}
                <div className="rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-neutral-500">Produk Terjual</p>
                        <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500">
                            <Package className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-bold text-neutral-dark dark:text-white tracking-tight">{stats.itemsSold}</h3>
                        <div className="flex items-center gap-1 mt-1 text-primary">
                            <TrendingUp className="h-3 w-3" />
                            <span className="text-xs font-bold">+8.1%</span>
                            <span className="text-xs text-neutral-400 font-normal ml-1">vs bulan lalu</span>
                        </div>
                    </div>
                </div>

                {/* Active Customers */}
                <div className="rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-neutral-500">Pelanggan</p>
                        <div className="bg-primary/10 p-2 rounded-lg text-primary">
                            <Users className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-bold text-neutral-dark dark:text-white tracking-tight">120</h3>
                        <div className="flex items-center gap-1 mt-1 text-red-500">
                            <TrendingDown className="h-3 w-3" />
                            <span className="text-xs font-bold">-2.4%</span>
                            <span className="text-xs text-neutral-400 font-normal ml-1">vs bulan lalu</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts & Best Sellers */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="lg:col-span-2 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-neutral-dark dark:text-white">Analitik Penjualan</h3>
                            <p className="text-xs text-neutral-500">Performa penjualan bulanan tahun ini</p>
                        </div>
                        <select className="bg-neutral-50 dark:bg-neutral-800 border-none rounded-lg text-sm text-neutral-700 dark:text-neutral-200 focus:ring-1 focus:ring-primary px-3 py-1.5 focus:outline-none">
                            <option>Tahun Ini</option>
                            <option>Bulan Lalu</option>
                        </select>
                    </div>
                    {/* Simple SVG Chart */}
                    <div className="w-full h-64 relative">
                        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                            {/* Grid lines */}
                            {[10, 20, 30, 40].map(y => (
                                <line key={y} stroke="#f3f4f6" strokeWidth="0.5" x1="0" x2="100" y1={y} y2={y} />
                            ))}
                            {/* Chart Line */}
                            <defs>
                                <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                                    <stop offset="0%" stopColor="#e64c19" stopOpacity="0.2"></stop>
                                    <stop offset="100%" stopColor="#e64c19" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>
                            <path d="M0,45 C10,40 20,42 30,30 C40,18 50,35 60,25 C70,15 80,20 90,10 L100,5" fill="none" stroke="#e64c19" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8"></path>
                            <path d="M0,45 C10,40 20,42 30,30 C40,18 50,35 60,25 C70,15 80,20 90,10 L100,5 V50 H0 Z" fill="url(#gradient)" stroke="none"></path>
                        </svg>
                        {/* Labels */}
                        <div className="flex justify-between text-xs text-neutral-400 mt-2">
                            <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
                        </div>
                    </div>
                </div>

                {/* Best Selling Products (Static Demo for Visuals) */}
                <div className="lg:col-span-1 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-neutral-dark dark:text-white mb-4">Produk Terlaris</h3>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-3 pb-3 border-b border-neutral-50 dark:border-neutral-800 last:border-0 last:pb-0">
                                <div className="h-12 w-12 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-300">
                                    <Shirt className="h-6 w-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-neutral-dark dark:text-white truncate">Fashion Item {i}</p>
                                    <p className="text-xs text-neutral-500">{1000 - i * 50} terjual</p>
                                </div>
                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${i === 1 ? 'bg-yellow-50 text-yellow-700 ring-yellow-600/20' : 'bg-neutral-50 text-neutral-600 ring-neutral-500/10'}`}>
                                    #{i}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Orders & Stock Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Orders Table */}
                <div className="lg:col-span-2 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-neutral-dark dark:text-white">Pesanan Terbaru</h3>
                        <Link to="/admin/orders" className="text-sm font-bold text-primary hover:text-primary/80">Lihat Semua</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-400">
                            <thead className="bg-neutral-50 dark:bg-neutral-800/50 text-xs uppercase text-neutral-500 font-bold">
                                <tr>
                                    <th className="px-6 py-4">ID Pesanan</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                {stats.recentOrders.length > 0 ? (
                                    stats.recentOrders.map((order) => (
                                        <tr key={order.id || order._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-neutral-900 dark:text-white">#{(order.id || order._id || '').slice(-6)}</td>
                                            <td className="px-6 py-4">{formatCurrency(order.totalAmount)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'Completed' || order.status === 'Paid' || order.status === 'Selesai' ? 'bg-green-100 text-green-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-neutral-400 hover:text-primary transition-colors">
                                                    <Eye className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-neutral-500">Belum ada pesanan terbaru.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Stock Alerts (Static) */}
                <div className="lg:col-span-1 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-neutral-dark dark:text-white mb-6">Stok Menipis</h3>
                    <div className="space-y-5">
                        <div>
                            <div className="flex justify-between items-end mb-1">
                                <div>
                                    <p className="text-sm font-bold text-neutral-900 dark:text-white">Denim Jacket (M)</p>
                                    <p className="text-xs text-red-500 font-bold">Sisa 3 pcs</p>
                                </div>
                                <button className="text-xs font-bold text-primary hover:underline">Restock</button>
                            </div>
                            <div className="w-full bg-neutral-100 rounded-full h-1.5 dark:bg-neutral-700 overflow-hidden">
                                <div className="bg-red-400 h-1.5 rounded-full" style={{ width: '15%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-end mb-1">
                                <div>
                                    <p className="text-sm font-bold text-neutral-900 dark:text-white">Silk Scarf</p>
                                    <p className="text-xs text-orange-500 font-bold">Sisa 8 pcs</p>
                                </div>
                                <button className="text-xs font-bold text-primary hover:underline">Restock</button>
                            </div>
                            <div className="w-full bg-neutral-100 rounded-full h-1.5 dark:bg-neutral-700 overflow-hidden">
                                <div className="bg-orange-300 h-1.5 rounded-full" style={{ width: '35%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
