import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const CategoryLayout: React.FC = () => {
    return (
        <div className="space-y-4">
            <nav className="flex space-x-4 mb-4">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-600 font-bold' : 'text-gray-600'
                    }
                >
                    All
                </NavLink>
                <NavLink
                    to="jewelry"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-600 font-bold' : 'text-gray-600'
                    }
                >
                    Jewelry
                </NavLink>
                <NavLink
                    to="clothes"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-600 font-bold' : 'text-gray-600'
                    }
                >
                    Clothes
                </NavLink>
                <NavLink
                    to="technology"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-600 font-bold' : 'text-gray-600'
                    }
                >
                    Technology
                </NavLink>
                <NavLink
                    to="foods"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-600 font-bold' : 'text-gray-600'
                    }
                >
                    Foods
                </NavLink>
            </nav>
            <Outlet />
        </div>
    );
};

export default CategoryLayout;
