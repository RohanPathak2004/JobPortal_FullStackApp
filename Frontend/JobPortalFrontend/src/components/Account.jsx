import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'; // Adjust paths
import { JobContext } from '../context/JobContext';

const Account = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [displayName, setDisplayName] = useState('');

    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const { user, setToken, setUser } = useAuthContext();
    const { setReload } = useContext(JobContext);

    useEffect(() => {
        if (user?.email) {
            setDisplayName(user.email.split('@')[0]);
        }
    }, [user]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = () => {
        setToken(null);
        setUser(null);
        setReload(prev => !prev);
        setIsOpen(false);
        navigate('/'); // Optional: redirect to home
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Profile Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none border border-transparent active:border-gray-200"
            >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                    {displayName.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {displayName}
                </span>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-150">
                    <div className="px-4 py-2 border-bottom border-gray-50 mb-1">
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Account</p>
                    </div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-3 transition-colors cursor-pointer"
                    >
                        <span>Dashboard</span>
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-3 transition-colors"
                    >
                        🔄 <span>Switch Account</span>
                    </button>

                    <div className="my-1 border-t border-gray-100"></div>

                    <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors font-medium"
                    >
                        🚪 <span>Sign Out</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Account;