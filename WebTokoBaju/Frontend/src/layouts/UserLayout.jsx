import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        navigate('/');
        return null;
    }

    const isActive = (path) => {
        return location.pathname === path
            ? "bg-primary/10 text-primary"
            : "text-text-secondary hover:bg-background-light hover:text-text-primary dark:hover:bg-background-dark dark:hover:text-surface-light";
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display text-text-primary">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-col border-r border-border-light bg-surface-light dark:bg-surface-dark md:flex">
                <div className="flex items-center gap-2 px-6 py-8">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                        <span className="material-symbols-outlined text-xl">diamond</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold leading-none text-text-primary dark:text-white">LuxeWear</h1>
                        <p className="text-xs font-medium text-text-secondary">Fashion Store</p>
                    </div>
                </div>
                <nav className="flex flex-1 flex-col gap-2 px-4 py-4">
                    <Link to="/dashboard" className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${isActive('/dashboard')}`}>
                        <span className="material-symbols-outlined fill-1">dashboard</span>
                        Dashboard
                    </Link>
                    <Link to="/dashboard/shop" className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive('/dashboard/shop')}`}>
                        <span className="material-symbols-outlined">storefront</span>
                        Belanja
                    </Link>
                    <Link to="/dashboard/orders" className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive('/dashboard/orders')}`}>
                        <span className="material-symbols-outlined">shopping_bag</span>
                        Pesanan Saya
                    </Link>
                    <Link to="/dashboard/cart" className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive('/dashboard/cart')}`}>
                        <span className="material-symbols-outlined">shopping_cart</span>
                        Keranjang
                    </Link>
                    <Link to="/dashboard/wishlist" className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive('/dashboard/wishlist')}`}>
                        <span className="material-symbols-outlined">favorite</span>
                        Wishlist
                    </Link>
                    <Link to="/dashboard/addresses" className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive('/dashboard/addresses')}`}>
                        <span className="material-symbols-outlined">location_on</span>
                        Alamat
                    </Link>

                </nav>
                <div className="px-4 py-4">
                    <button
                        onClick={handleLogout}
                        className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden relative">
                {/* Top Bar */}
                <header className="flex h-20 items-center justify-between border-b border-border-light bg-surface-light px-8 py-4 dark:bg-surface-dark z-20">
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 -ml-2 text-text-secondary hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>

                    {/* Search */}
                    <div className="hidden max-w-md flex-1 md:block">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">search</span>
                            <input
                                className="h-10 w-full rounded-xl border-none bg-background-light pl-10 text-sm placeholder:text-text-secondary focus:ring-2 focus:ring-primary/20 dark:bg-background-dark dark:text-white"
                                placeholder="Cari pesanan atau produk..."
                                type="text"
                            />
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-6">
                        <button className="relative text-text-secondary hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 overflow-hidden rounded-full border border-border-light bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                                {user?.fullName?.charAt(0) || 'U'}
                            </div>
                            <div className="hidden flex-col md:flex">
                                <span className="text-sm font-bold text-text-primary dark:text-white">{user?.fullName}</span>
                                <span className="text-xs text-text-secondary">{user?.role || 'Customer'}</span>
                            </div>
                            <span className="material-symbols-outlined text-text-secondary">expand_more</span>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto bg-background-light p-6 md:p-8 dark:bg-background-dark">
                    <Outlet />

                    {/* Footer */}
                    <footer className="mt-8 border-t border-border-light py-6 text-center md:text-left">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <p className="text-xs text-text-secondary">© 2026 LuxeWear Fashion Store. All rights reserved.</p>
                            <div className="flex gap-4">
                                <Link to="#" className="text-xs text-text-secondary hover:text-primary">Privacy Policy</Link>
                                <Link to="#" className="text-xs text-text-secondary hover:text-primary">Terms of Service</Link>
                                <Link to="#" className="text-xs text-text-secondary hover:text-primary">Help Center</Link>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="absolute left-0 top-0 h-full w-64 bg-surface-light dark:bg-surface-dark p-4">
                        {/* Mobile Nav Content Copy */}
                        <div className="flex items-center gap-2 mb-8">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                                <span className="material-symbols-outlined text-xl">diamond</span>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold leading-none text-text-primary dark:text-white">LuxeWear</h1>
                            </div>
                        </div>
                        <nav className="flex flex-col gap-2">
                            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-text-secondary">Dashboard</Link>
                            <Link to="/dashboard/orders" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-text-secondary">Pesanan Saya</Link>
                            <Link to="/dashboard/cart" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-text-secondary">Keranjang</Link>
                            <button onClick={handleLogout} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 mt-4">Logout</button>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserLayout;
