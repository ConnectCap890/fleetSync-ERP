import AdminLayout from '../../src/pages/admin/AdminLayout'
import ManagerLayout from '../../src/pages/manager/ManagerLayout'
import DriverLayout from '../../src/pages/driver/DriverLayout'

const LoadSpinner =({layout = 'admin'}) =>{
    const spinner =(
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        
    )
        if (layout === 'manager') return<ManagerLayout>{spinner}</ManagerLayout>
        if (layout === 'driver') return<DriverLayout>{spinner}</DriverLayout>
        return <AdminLayout>{spinner}</AdminLayout>
}


export default LoadSpinner