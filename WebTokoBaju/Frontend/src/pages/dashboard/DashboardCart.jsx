import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const DashboardCart = () => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
    const navigate = useNavigate();

    // Constants for demo calculations matching the design
    const SHIPPING_COST = 25000;
    const TAX_RATE = 0.11;

    const taxAmount = totalPrice * TAX_RATE;
    const finalTotal = totalPrice + SHIPPING_COST + taxAmount;

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center space-y-6 text-center py-12">
                <div className="bg-white dark:bg-neutral-800 p-8 rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-6xl text-neutral-400">shopping_cart_off</span>
                </div>
                <h2 className="text-2xl font-bold text-neutral-dark dark:text-white">Keranjang Belanja Kosong</h2>
                <p className="text-neutral-500 dark:text-neutral-400">Sepertinya Anda belum menambahkan produk apapun.</p>
                <Link
                    to="/products"
                    className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                >
                    Mulai Belanja
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl">
            {/* Page Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-black tracking-tight text-text-primary dark:text-white">Keranjang Belanja</h2>
                <p className="text-text-secondary mt-2">Kelola item yang akan Anda beli.</p>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 relative">
                {/* Left Column: Product List */}
                <div className="flex-1 w-full">
                    {/* List View for Dashboard (More compact than public cart table) */}
                    <div className="flex flex-col gap-4">
                        {cartItems.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-border-light dark:border-neutral-800 flex gap-4 items-center">
                                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 border border-border-light dark:border-neutral-700">
                                    <img
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                        src={item.image || item.imageUrl}
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row flex-1 justify-between md:items-center gap-4">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-text-primary dark:text-white text-lg">{item.name}</h3>
                                        <div className="flex gap-3 text-sm text-text-secondary mt-1">
                                            <span className="bg-background-light dark:bg-neutral-800 px-2 py-0.5 rounded text-xs font-semibold">{item.size || 'STD'}</span>
                                            <span className="bg-background-light dark:bg-neutral-800 px-2 py-0.5 rounded text-xs font-semibold">{item.color || 'Default'}</span>
                                        </div>
                                        <p className="text-primary font-bold mt-2">Rp {item.price.toLocaleString('id-ID')}</p>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center bg-background-light dark:bg-neutral-800 rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                className="w-8 h-8 rounded-md flex items-center justify-center text-text-secondary hover:bg-white dark:hover:bg-neutral-700 hover:shadow-sm transition-all"
                                            >
                                                <span className="material-symbols-outlined text-sm">remove</span>
                                            </button>
                                            <span className="w-8 text-center text-sm font-bold text-text-primary dark:text-white">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                className="w-8 h-8 rounded-md flex items-center justify-center text-text-secondary hover:bg-white dark:hover:bg-neutral-700 hover:shadow-sm transition-all"
                                            >
                                                <span className="material-symbols-outlined text-sm">add</span>
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id, item.size)}
                                            className="h-10 w-10 rounded-lg border border-border-light dark:border-neutral-700 flex items-center justify-center text-text-secondary hover:bg-red-50 hover:text-red-500 hover:border-red-100 dark:hover:bg-red-900/20 transition-all"
                                            title="Hapus"
                                        >
                                            <span className="material-symbols-outlined text-xl">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                            <span className="material-symbols-outlined text-[18px] rotate-180">arrow_right_alt</span>
                            Lanjut Belanja
                        </Link>
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="w-full xl:w-[380px] shrink-0">
                    <div className="rounded-2xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-border-light dark:border-neutral-800 sticky top-4">
                        <h2 className="text-xl font-bold text-text-primary dark:text-white mb-6">Ringkasan</h2>
                        <div className="flex flex-col gap-3 mb-6">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text-secondary">Subtotal</span>
                                <span className="font-semibold text-text-primary dark:text-white">Rp {totalPrice.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text-secondary">Ongkos Kirim (Est.)</span>
                                <span className="font-semibold text-text-primary dark:text-white">Rp {SHIPPING_COST.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text-secondary">Pajak (11%)</span>
                                <span className="font-semibold text-text-primary dark:text-white">Rp {taxAmount.toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        <div className="border-t border-dashed border-border-light dark:border-neutral-700 pt-4 mb-8">
                            <div className="flex justify-between items-end">
                                <span className="text-base font-bold text-text-primary dark:text-white">Total</span>
                                <span className="text-2xl font-black text-primary tracking-tight">Rp {finalTotal.toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/dashboard/checkout')}
                            className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-xl text-base font-bold shadow-lg shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <span>Checkout Sekarang</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCart;
