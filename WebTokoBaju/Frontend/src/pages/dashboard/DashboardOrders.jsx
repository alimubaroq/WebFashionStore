import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Package, Clock, CheckCircle, Download } from 'lucide-react';
import { generateOrderReceipt } from '../../utils/pdfGenerator';

const DashboardOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userId = user.id || user._id;
                const response = await api.get(`/orders/user/${userId}`);
                setOrders(response.data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (loading) return (
        <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6 font-display">Pesanan Saya</h1>

            {orders.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Belum ada pesanan</h3>
                    <p className="text-gray-500 mt-2">Anda belum pernah melakukan transaksi.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md">
                            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Nomor Pesanan</p>
                                    <p className="font-mono font-medium text-gray-900">#{order.id.slice(-6).toUpperCase()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Tanggal</p>
                                    <p className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString('id-ID')}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total</p>
                                    <p className="font-medium text-gray-900">Rp {order.totalAmount.toLocaleString('id-ID')}</p>
                                </div>
                                <div>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'Completed' || order.status === 'Paid' || order.status === 'Selesai' ? 'bg-green-100 text-green-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-4">
                                            <div className="h-16 w-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                                                <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold text-gray-900">{item.productName}</h4>
                                                <p className="text-sm text-gray-500">Ukuran: {item.size} x {item.quantity}</p>
                                            </div>
                                            <p className="font-medium text-gray-900">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-3">
                                    <button
                                        onClick={() => generateOrderReceipt(order)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                        title="Unduh Kuitansi PDF"
                                    >
                                        <Download className="h-4 w-4" />
                                        <span>Kuitansi</span>
                                    </button>
                                    <Link
                                        to={`/dashboard/orders/${order.id || order._id}`}
                                        className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors"
                                    >
                                        Lihat Detail
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DashboardOrders;
