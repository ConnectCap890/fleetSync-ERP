import { useState } from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const ManagerLayout = ({ children }) => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [collapsed, setCollapsed] = useState(false)

    const handleLogout = () => {
        const toastId = toast.loading("Logging out...",{position:"top-center"});


        setTimeout(()=>{
        logout()
        toast.dismiss(toastId);
        navigate('/login')
        },1000)
    }

    const navItems = [
        { to: '/manager/dashboard', label: 'Dashboard', icon: '📊' },
        
        { to: '/manager/drivers', label: 'Drivers', icon: '🚘' },
        { to: '/manager/Vehicles', label: 'Vehicles', icon: '🚛' },
        { to: '/manager/cities', label: 'Cities', icon: '🏙️' },
        { to: '/manager/trips', label: 'Trips', icon: '📋' },
        { to: '/manager/profile', label: 'My Profile', icon: '👤' }
    ]

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`${collapsed ? 'w-16' : 'w-64'} bg-red-900 text-white flex flex-col transition-all duration-300`}>
                
                {/* Header */}
                <div className="p-4 flex items-center justify-between">
                    {!collapsed && (
                        <div>
                            <h1 className="text-xl font-bold">FleetSync</h1>
                            <p className="text-gray-400 text-xs">Manager's Panel</p>
                        </div>
                    )}
                    <button 
                        onClick={() => setCollapsed(!collapsed)}
                        className="text-white hover:bg-gray-700 p-1 rounded">
                        {collapsed ? '☰' : '✕'}
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 p-2">
                    <ul className="space-y-1">
                        {navItems.map(item => (
                            <li key={item.to}>
                                <Link 
                                   to={item.to} 
                                   className={`flex items-center gap-3 p-2 rounded ${
                                   location.pathname === item.to 
                                    ? 'bg-red-700 text-white' 
                                    : 'hover:bg-red-700'
                                       }`}>
                                    <span className="text-xl">{item.icon}</span>
                                     {!collapsed && <span>{item.label}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Logout */}
                <div className="p-2">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-2 rounded bg-red-600 hover:bg-red-700">
                        <span className="text-xl">🚪</span>
                        {!collapsed && <span>Logout</span>}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div>
    )
}

export default ManagerLayout
