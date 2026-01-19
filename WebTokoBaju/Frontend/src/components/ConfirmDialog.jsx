import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Ya, Hapus", cancelText = "Batal", type = "danger" }) => {
    if (!isOpen) return null;

    const typeStyles = {
        danger: {
            icon: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
            button: 'bg-red-500 hover:bg-red-600 text-white'
        },
        warning: {
            icon: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
            button: 'bg-orange-500 hover:bg-orange-600 text-white'
        },
        info: {
            icon: 'bg-primary/10 text-primary',
            button: 'bg-primary hover:bg-primary/90 text-white'
        }
    };

    const style = typeStyles[type] || typeStyles.danger;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full ${style.icon} flex items-center justify-center`}>
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                                {title}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                {message}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-800/50 px-6 py-4 flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`px-4 py-2 rounded-lg font-bold transition-colors shadow-lg ${style.button}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
