import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

const Navbar = () => {
    const { cartItems: cart } = useCart();
    const { user } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="sticky top-0 z-50 w-full bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-neutral-light dark:border-neutral-800 transition-colors duration-200">
            <div className="px-4 md:px-10 lg:px-20 py-4 max-w-[1440px] mx-auto flex items-center justify-between">
                <div className="flex items-center gap-12">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 text-neutral-dark dark:text-white group">
                        <div className="size-8 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl">diamond</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">LuxeWear</h2>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link to="/" className="text-sm font-semibold hover:text-primary transition-colors text-neutral-dark dark:text-neutral-200">Home</Link>
                        <Link to="/products" className="text-sm font-semibold hover:text-primary transition-colors text-neutral-dark dark:text-neutral-200">Koleksi</Link>
                        <Link to="/about" className="text-sm font-semibold hover:text-primary transition-colors text-neutral-dark dark:text-neutral-200">Tentang Kami</Link>
                        <Link to="/contact" className="text-sm font-semibold hover:text-primary transition-colors text-neutral-dark dark:text-neutral-200">Kontak</Link>
                    </nav>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex relative group">
                        <input
                            className="bg-neutral-light dark:bg-neutral-800 border-none rounded-lg py-2 pl-4 pr-10 text-sm focus:ring-1 focus:ring-primary w-48 transition-all focus:w-64 placeholder:text-neutral-500 text-neutral-dark dark:text-white"
                            placeholder="Cari produk..."
                            type="text"
                        />
                        <span className="material-symbols-outlined absolute right-3 top-2 text-neutral-500">search</span>
                    </div>

                    <div className="flex gap-3">
                        <Link to="/cart" className="relative p-2 rounded-lg hover:bg-neutral-light dark:hover:bg-neutral-800 transition-colors text-neutral-dark dark:text-white">
                            <span className="material-symbols-outlined">shopping_bag</span>
                            {totalItems > 0 && (
                                <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <Link to={user.role === 'Admin' ? "/admin" : "/dashboard"} className="hidden sm:flex items-center gap-2 bg-neutral-light dark:bg-neutral-800 px-3 py-2 rounded-lg text-sm font-bold text-neutral-dark dark:text-white hover:bg-primary hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-lg">person</span>
                                <span>{user.fullName.split(' ')[0]}</span>
                            </Link>
                        ) : (
                            <button
                                onClick={() => setIsLoginModalOpen(true)}
                                className="hidden sm:block bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-transform active:scale-95 shadow-md shadow-primary/20"
                            >
                                Masuk
                            </button>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-2 rounded-lg hover:bg-neutral-light dark:hover:bg-neutral-800 text-neutral-dark dark:text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-background-light dark:bg-background-dark border-t border-neutral-light dark:border-neutral-800 p-4 absolute w-full shadow-lg">
                    <div className="flex flex-col space-y-4">
                        <Link to="/" className="text-neutral-dark dark:text-white font-bold text-sm">Home</Link>
                        <Link to="/products" className="text-neutral-dark dark:text-white font-bold text-sm">Koleksi</Link>
                        <hr className="border-neutral-light dark:border-neutral-800" />
                        {user ? (
                            <Link to="/dashboard" className="text-primary font-bold text-sm">Dashboard Saya</Link>
                        ) : (
                            <button
                                onClick={() => {
                                    setIsLoginModalOpen(true);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="text-left w-full text-neutral-dark dark:text-white font-bold text-sm"
                            >
                                Masuk
                            </button>
                        )}
                    </div>
                </div>
            )}
            {/* Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </header>
    );
};

export default Navbar;
