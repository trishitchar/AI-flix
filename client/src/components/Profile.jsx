import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';

const Profile = () => {
    const user = useSelector((store) => store.user.user);
    if (!user) return null;

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-blue-500 p-4">
                        <h1 className="text-2xl font-bold text-white">{user.name}'s Profile</h1>
                    </div>
                    <div className="p-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                            <p className="text-gray-900">{user.name}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                            <p className="text-gray-900">{user.email}</p>
                        </div>
                        {/* Add more user details here as needed */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;