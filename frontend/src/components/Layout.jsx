import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';


const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
        <> 
        <nav className="top-0 border-gray-200 dark:bg-violet-800 backdrop-blur-xl">
            <div className="w-full flex flex-wrap items-center justify-center mx-auto p-3">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Story Teller</span>
                </Link>
            </div>
        </nav>
        <Outlet />
        
        </>
    );
};

export default Layout;