import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, X, User } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, register } = useAuth();
    const navigate = useNavigate();

    // Disable body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to ensure scroll is restored if component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle ESC key to close
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            const result = await login(email, password);
            if (result.success) {
                onClose();
                if (result.role === 'Admin') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError(result.message);
            }
        } else {
            const result = await register(fullName, email, password);
            if (result.success) {
                alert("Registrasi berhasil! Silakan masuk.");
                setIsLogin(true);
            } else {
                setError(result.message);
            }
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setFullName('');
        setEmail('');
        setPassword('');
    };

    const modalContent = (
        <div className="fixed inset-0 z-[9999] overflow-y-auto w-screen h-screen">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                {/* Backdrop - High Blur and Darker Overlay */}
                <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
                    onClick={onClose}
                    aria-hidden="true"
                ></div>

                {/* Modal Content - High Z-Index, clean design */}
                <div className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 text-left shadow-2xl transition-all sm:w-full sm:max-w-md opacity-100 scale-100 border border-white/20">
                    <div className="absolute top-4 right-4 z-10">
                        <button
                            onClick={onClose}
                            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors bg-neutral-100 dark:bg-neutral-700 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="p-8 sm:p-10">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-extrabold text-neutral-dark dark:text-white tracking-tight font-display">
                                {isLogin ? 'Selamat Datang' : 'Buat Akun'}
                            </h2>
                            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                                {isLogin ? 'Masuk untuk melanjutkan belanja' : 'Daftar untuk mulai berbelanja'}
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 p-4 rounded-lg text-sm text-center border border-red-100 dark:border-red-900/50">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                {!isLogin && (
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-neutral-400 group-focus-within:text-primary transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            required={!isLogin}
                                            className="block w-full pl-10 pr-3 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl text-neutral-dark dark:text-white placeholder-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all"
                                            placeholder="Nama Lengkap"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </div>
                                )}

                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-neutral-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl text-neutral-dark dark:text-white placeholder-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all"
                                        placeholder="Alamat Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-neutral-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl text-neutral-dark dark:text-white placeholder-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all"
                                        placeholder="Kata Sandi"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-primary/30 active:scale-[0.98]"
                                >
                                    {isLogin ? 'Masuk Sekarang' : 'Daftar Sekarang'}
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-700 text-center">
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
                                <button
                                    onClick={toggleMode}
                                    className="font-bold text-primary hover:text-primary/80 transition-colors focus:outline-none underline decoration-2 underline-offset-4 decoration-transparent hover:decoration-primary"
                                >
                                    {isLogin ? 'Daftar disini' : 'Masuk disini'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default AuthModal;
