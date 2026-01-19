import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Ticket, X } from 'lucide-react';

const Checkout = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        customerName: user ? user.fullName : '',
        shippingAddress: '',
        phoneNumber: '',
    });

    // Promo states
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [promoLoading, setPromoLoading] = useState(false);
    const [promoError, setPromoError] = useState('');

    const SHIPPING_COST = 25000;
    const TAX_RATE = 0.11;

    // Calculate totals
    const taxAmount = totalPrice * TAX_RATE;
    const preDiscountTotal = totalPrice + SHIPPING_COST + taxAmount;
    const discountAmount = appliedPromo ? appliedPromo.discountAmount : 0;
    const finalTotal = Math.max(0, preDiscountTotal - discountAmount);

    const handleApplyPromo = async () => {
        if (!promoCode.trim()) return;

        setPromoLoading(true);
        setPromoError('');

        try {
            const response = await api.post('/promos/validate', {
                code: promoCode,
                totalAmount: totalPrice
            });

            setAppliedPromo({
                code: promoCode,
                discountAmount: response.data.discountAmount,
                details: response.data.promo
            });
        } catch (error) {
            setAppliedPromo(null);
            setPromoError(error.response?.data?.message || "Kode promo tidak valid");
        } finally {
            setPromoLoading(false);
        }
    };

    const handleRemovePromo = () => {
        setAppliedPromo(null);
        setPromoCode('');
        setPromoError('');
    };

    const handleCreateOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderPayload = {
            userId: user ? user.id : null,
            items: cartItems,
            totalAmount: finalTotal,
            customerName: formData.customerName,
            shippingAddress: formData.shippingAddress,
            phoneNumber: formData.phoneNumber,
            status: 'Pending',
            promoCode: appliedPromo ? appliedPromo.code : null,
            discountAmount: discountAmount
        };

        try {
            await createOrder(orderPayload);
            setSuccess(true);
            clearCart();
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            alert("Gagal membuat pesanan. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0 && !success) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Keranjang kosong.</p>
            </div>
        )
    }

    if (success) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <CheckCircle className="h-20 w-20 text-green-500 mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Pesanan Berhasil!</h2>
                <p className="text-gray-600 mb-8">Terima kasih telah berbelanja. Kami akan segera memproses pesanan Anda.</p>
                <p className="text-sm text-gray-500">Anda akan dialihkan ke beranda dalam beberapa detik...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button onClick={() => navigate('/cart')} className="mb-8 text-neutral-500 hover:text-primary flex items-center transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Keranjang
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Form Section */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Informasi Pengiriman</h2>
                    <form onSubmit={handleCreateOrder} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                            <input
                                type="text"
                                required
                                className="w-full border-neutral-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-3 border transition-all"
                                value={formData.customerName}
                                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                            <textarea
                                required
                                rows="3"
                                className="w-full border-neutral-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-3 border transition-all"
                                value={formData.shippingAddress}
                                onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon / WhatsApp</label>
                            <input
                                type="tel"
                                required
                                className="w-full border-neutral-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-3 border transition-all"
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Memproses...' : `Bayar Sekarang - Rp ${finalTotal.toLocaleString('id-ID')}`}
                        </button>
                    </form>
                </div>

                {/* Order Summary Preview */}
                <div className="bg-gray-50 p-8 rounded-2xl h-fit">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h3>
                    <div className="space-y-4 mb-6 border-b pb-6">
                        {cartItems.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex justify-between items-center text-sm">
                                <div className="flex items-center space-x-3">
                                    <span className="bg-neutral-200 text-neutral-600 px-2 py-1 rounded text-xs font-bold">{item.quantity}x</span>
                                    <span className="text-neutral-700">{item.name} ({item.size})</span>
                                </div>
                                <span className="font-medium">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                            </div>
                        ))}
                    </div>

                    {/* Promo Code Section */}
                    <div className="mb-6 border-b pb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kode Promo</label>
                        {appliedPromo ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Ticket className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="text-sm font-bold text-green-800">{appliedPromo.code}</p>
                                        <p className="text-xs text-green-600">Hemat Rp {appliedPromo.discountAmount.toLocaleString('id-ID')}</p>
                                    </div>
                                </div>
                                <button onClick={handleRemovePromo} className="text-gray-400 hover:text-red-500">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Masukkan kode promo"
                                    className="flex-1 border-neutral-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-2 text-sm uppercase"
                                    value={promoCode}
                                    onChange={(e) => {
                                        setPromoCode(e.target.value.toUpperCase());
                                        setPromoError('');
                                    }}
                                />
                                <button
                                    onClick={handleApplyPromo}
                                    disabled={promoLoading || !promoCode}
                                    className="bg-neutral-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-700 disabled:opacity-50 transition-colors"
                                >
                                    {promoLoading ? 'Cek...' : 'Pakai'}
                                </button>
                            </div>
                        )}
                        {promoError && (
                            <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                                <X className="h-3 w-3" /> {promoError}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2 mb-6 border-b pb-6 text-sm">
                        <div className="flex justify-between text-neutral-500">
                            <span>Subtotal</span>
                            <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between text-neutral-500">
                            <span>Ongkos Kirim</span>
                            <span>Rp {SHIPPING_COST.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between text-neutral-500">
                            <span>Pajak (11%)</span>
                            <span>Rp {taxAmount.toLocaleString('id-ID')}</span>
                        </div>

                        {appliedPromo && (
                            <div className="flex justify-between text-green-600 font-medium">
                                <span>Diskon ({appliedPromo.code})</span>
                                <span>- Rp {discountAmount.toLocaleString('id-ID')}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Total Pembayaran</span>
                        <span className="text-primary">Rp {finalTotal.toLocaleString('id-ID')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
