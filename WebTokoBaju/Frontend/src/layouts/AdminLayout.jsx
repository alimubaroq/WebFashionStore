import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Users,
    BarChart,
    Settings,
    LogOut,
    Search,
    Bell,
    ChevronDown,
    Menu,
    Shirt,
    Tags,
    ClipboardList,
    Percent,
    FileText,
    Lock,
    Diamond,
} from 'lucide-react';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user || user.role !== 'Admin') {
        return (
            <div className="flex h-screen items-center justify-center flex-col gap-4 bg-background-light">
                <div className="p-4 rounded-full bg-red-100 text-red-600">
                    <Lock className="h-8 w-8" />
                </div>
                <h1 className="text-2xl font-bold text-neutral-dark">Akses Ditolak</h1>
                <p className="text-neutral-500">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl font-bold transition-all"
                >
                    Kembali ke Beranda
                </button>
            </div>
        );
    }

    const isActive = (path) => {
        if (path === '/admin') {
            return location.pathname === '/admin' ? "bg-primary/10 text-primary" : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-400 dark:hover:text-white";
        }
        return location.pathname.startsWith(path) ? "bg-primary/10 text-primary" : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-400 dark:hover:text-white";
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-neutral-dark dark:text-white font-display">
            {/* Sidebar Navigation */}
            <aside className={`flex h-full flex-col border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all duration-300 z-20 shadow-sm ${isSidebarOpen ? 'w-64 absolute md:relative' : 'w-20 lg:w-64'} md:translate-x-0`}>
                <div className="flex h-16 items-center justify-between px-6 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="flex-shrink-0 flex items-center justify-center rounded-lg bg-primary/20 p-1.5">
                            <Diamond className="h-6 w-6 text-primary" />
                        </div>
                        <span className={`text-lg font-bold tracking-tight text-neutral-900 dark:text-white whitespace-nowrap transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 lg:opacity-100 hidden lg:block'}`}>
                            LuxeWear
                        </span>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 hide-scrollbar">
                    <Link to="/admin" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors group ${isActive('/admin')}`}>
                        <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
                        <span className={`text-sm font-medium whitespace-nowrap ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>Dashboard</span>
                        {/* Tooltip */}
                        <div className={`absolute left-16 bg-neutral-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity lg:hidden pointer-events-none z-50 ${isSidebarOpen ? 'hidden' : 'block'}`}>Dashboard</div>
                    </Link>

                    <p className={`px-3 pt-4 pb-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>Menu</p>

                    <Link to="/admin/products" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors group ${isActive('/admin/products')}`}>
                        <Shirt className="h-5 w-5 flex-shrink-0" />
                        <span className={`text-sm font-medium whitespace-nowrap ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>Produk</span>
                    </Link>

                    <Link to="/admin/categories" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors group ${isActive('/admin/categories')}`}>
                        <Tags className="h-5 w-5 flex-shrink-0" />
                        <span className={`text-sm font-medium whitespace-nowrap ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>Kategori</span>
                    </Link>

                    <Link to="/admin/orders" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors group ${isActive('/admin/orders')}`}>
                        <ShoppingBag className="h-5 w-5 flex-shrink-0" />
                        <span className={`text-sm font-medium whitespace-nowrap ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>Pesanan</span>
                        <span className={`hidden lg:flex ml-auto h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ${isSidebarOpen ? 'flex' : 'hidden'}`}>3</span>
                    </Link>

                    <Link to="/admin/stock" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors group ${isActive('/admin/stock')}`}>
                        <Package className="h-5 w-5 flex-shrink-0" />
                        <span className={`text-sm font-medium whitespace-nowrap ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>Stok</span>
                    </Link>

                    <Link to="/admin/customers" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors group ${isActive('/admin/customers')}`}>
                        <Users className="h-5 w-5 flex-shrink-0" />
                        <span className={`text-sm font-medium whitespace-nowrap ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>Pelanggan</span>
                    </Link>

                    <Link to="/admin/promos" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors group ${isActive('/admin/promos')}`}>
                        <Percent className="h-5 w-5 flex-shrink-0" />
                        <span className={`text-sm font-medium whitespace-nowrap ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>Promo</span>
                    </Link>


                </nav>

                <div className="mt-auto border-t border-neutral-100 dark:border-neutral-800 p-3 space-y-1">
                    <Link to="/admin/settings" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors group ${isActive('/admin/settings')}`}>
                        <Settings className="h-5 w-5 flex-shrink-0" />
                        <span className={`text-sm font-medium whitespace-nowrap ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>Pengaturan</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
                    >
                        <LogOut className="h-5 w-5 flex-shrink-0" />
                        <span className={`text-sm font-medium whitespace-nowrap ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>Keluar</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden relative">
                {/* Top Bar */}
                <header className="flex h-16 w-full items-center justify-between border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 px-4 lg:px-6 backdrop-blur-md z-10 transition-colors">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                        >
                            <Menu className="h-6 w-6" />
                        </button>

                        <div className="hidden md:flex w-full max-w-md items-center rounded-full bg-neutral-100 dark:bg-neutral-800 px-4 py-2">
                            <Search className="h-5 w-5 text-neutral-400" />
                            <input
                                className="w-full bg-transparent border-none focus:ring-0 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 ml-2"
                                placeholder="Cari produk atau pesanan..."
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative rounded-full p-2 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-colors">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-neutral-900"></span>
                        </button>
                        <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-800 hidden sm:block"></div>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                {user?.fullName?.charAt(0) || 'A'}
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-bold text-neutral-900 dark:text-white leading-none">{user?.fullName || 'Admin User'}</p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Administrator</p>
                            </div>
                            <ChevronDown className="h-4 w-4 text-neutral-500" />
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 lg:p-8">
                    <Outlet />

                    <footer className="mt-12 border-t border-neutral-200 dark:border-neutral-800 pt-6 pb-2 text-center text-xs text-neutral-500">
                        <p>© 2024 LuxeWear Admin Panel. Made with elegance.</p>
                    </footer>
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-10 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default AdminLayout;
