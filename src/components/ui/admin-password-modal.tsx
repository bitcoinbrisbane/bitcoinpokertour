'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPasswordModal() {
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === '123456') {
            localStorage.setItem('admin_password', password);
            window.location.reload(); // Reload to trigger the check again
        } else {
            alert('Incorrect password');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                    Admin Access Required
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-neutral-300 dark:border-neutral-700 
                                     bg-white dark:bg-neutral-900 px-3 py-2 text-sm placeholder-neutral-400 
                                     shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 
                                     focus:ring-orange-500"
                            placeholder="Enter admin password"
                        />
                    </div>
                    <div className="flex justify-between space-x-3">
                        <button
                            type="button"
                            onClick={() => router.push('/')}
                            className="flex-1 rounded-md border border-neutral-300 dark:border-neutral-700 
                                     px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 
                                     hover:bg-neutral-50 dark:hover:bg-neutral-700 focus:outline-none 
                                     focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 rounded-md border border-transparent bg-orange-600 px-4 py-2 
                                     text-sm font-medium text-white hover:bg-orange-700 focus:outline-none 
                                     focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 