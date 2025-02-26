'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import AdminPasswordModal from "@/components/ui/admin-password-modal";

const AdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const adminPassword = localStorage.getItem('admin_password');
        setIsAuthenticated(adminPassword === '123456');
        setLoading(false);
    }, []);

    // Group pages by category for better organization
    const pages = {
        main: [
            { name: "Home", path: "/" },
            { name: "Schedule", path: "/schedule" },
            { name: "Sponsors", path: "/sponsors" },
            { name: "Treasury", path: "/treasury" },
            { name: "Bitcoin Guide", path: "/bitcoinguide" },
            { name: "Contact", path: "/contact" },
        ],
        resources: [
            { name: "Buy Bitcoin", path: "/buybitcoin" },
            { name: "Inscriptions", path: "/inscriptions" },
        ],
        admin: [
            { name: "Register New Event", path: "/admin" },
            { name: "Admin Page", path: "/admin-page" },
        ],
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <AdminPasswordModal />;
    }

    return (
        <main className="flex min-h-screen w-full flex-col items-center p-4">
            <div className="w-full max-w-4xl space-y-12">
                {/* Header */}
                <div className="text-center space-y-6">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient">
                        Admin Site Map
                    </h1>
                    <p className="text-xl text-neutral-700 dark:text-neutral-300">
                        Complete overview of all pages in the Bitcoin Poker Tour website
                    </p>
                </div>

                {/* Site Map */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Pages */}
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-orange-500">Main Pages</h2>
                        <ul className="space-y-2">
                            {pages.main.map((page) => (
                                <li key={page.path}>
                                    <Link 
                                        href={page.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-neutral-600 dark:text-neutral-400 hover:text-orange-500 dark:hover:text-orange-500"
                                    >
                                        {page.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resource Pages */}
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-orange-500">Resources</h2>
                        <ul className="space-y-2">
                            {pages.resources.map((page) => (
                                <li key={page.path}>
                                    <Link 
                                        href={page.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-neutral-600 dark:text-neutral-400 hover:text-orange-500 dark:hover:text-orange-500"
                                    >
                                        {page.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Admin Pages */}
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-orange-500">Admin Section</h2>
                        <ul className="space-y-2">
                            {pages.admin.map((page) => (
                                <li key={page.path}>
                                    <Link 
                                        href={page.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-neutral-600 dark:text-neutral-400 hover:text-orange-500 dark:hover:text-orange-500"
                                    >
                                        {page.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Dynamic Routes */}
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-orange-500">Dynamic Routes</h2>
                    <ul className="space-y-2">
                        <li className="text-neutral-600 dark:text-neutral-400">
                            /schedule/[slug] - Individual Event Pages
                        </li>
                        <li className="text-neutral-600 dark:text-neutral-400">
                            /registration/[slug] - Event Registration Pages
                        </li>
                        <li className="text-neutral-600 dark:text-neutral-400">
                            /event/[eventId] - Event Details Pages
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default AdminPage; 