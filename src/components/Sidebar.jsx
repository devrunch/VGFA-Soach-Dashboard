import { NavLink } from "react-router-dom";
import { DashboardFilled, ProfileFilled, SettingFilled, LogoutOutlined,QuestionCircleFilled,InfoCircleFilled } from '@ant-design/icons';
import cslx from 'clsx';
const linksTop = [
    {
        title: 'Dashboard',
        icon: <DashboardFilled />,
        href: '/dashboard',
    },
    {
        title: 'Profile',
        icon: <ProfileFilled />,
        href: '/profile',
    },
    {
        title: 'Settings',
        icon: <SettingFilled />,
        href: '/settings',
    },
    
];

const linksBottom = [
    {
        title: 'Help',
        icon: <QuestionCircleFilled />,
        href: '/help',
    },
    {
        title: 'About',
        icon: <InfoCircleFilled />,
        href: '/about',
    },
    {
        title: 'Logout',
        icon: <LogoutOutlined />,
        href: '/logout',
    },
];


const Sidebar = () => {
    return (
        <>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-56 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full py-4 overflow-y-auto or-gradient rounded-r-3xl">

                    <div className="flex justify-center mb-5 items-center font-bold font-poppins text-white text-xl">
                        VFGA
                    </div>
                    <div className="flex flex-col justify-between h-[85vh]" >
                    <ul className="space-y-2 font-medium">
                        {linksTop.map((link, index) => (
                            <li key={index}>
                                <NavLink
                                    to={link.href}
                                    className={({ isActive }) =>
                                        cslx(`flex items-center group px-8 border-l-4 py-2 border-transparent text-lg ${isActive ? 'border-l-4 border-solid border-white  text-white' : 'text-white  hover:bg-orange-600'}`)
                                    }
                                >
                                    {link.icon}
                                    <span className="flex-1 ms-3 whitespace-nowrap">{link.title}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <ul className="space-y-2 font-medium">
                        {linksBottom.map((link, index) => (
                            <li key={index}>
                                <NavLink
                                    to={link.href}
                                    className={({ isActive }) =>
                                        cslx(`flex items-center group px-8 border-l-4 border-transparent py-2 text-lg ${isActive ? 'border-l-4 border-solid border-white  text-white' : 'text-white  hover:bg-orange-600'}`)
                                    }
                                >
                                    {link.icon}
                                    <span className="flex-1 ms-3 whitespace-nowrap">{link.title}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
