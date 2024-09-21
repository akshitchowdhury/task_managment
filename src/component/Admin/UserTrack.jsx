'use client';

import React, { useEffect, useState } from 'react';
import { LogOut, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserTrack = () => {
  const [trackList, setTrackList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users');
      const data = await response.json();
      setTrackList(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
    <Link to="/admin">
    <LogOut className="w-6 h-6 text-red-500" />
      </Link>
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">
        User Tracker
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center space-y-4 animate-pulse"
            >
              <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            </div>
          ))
        ) : (
          trackList.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-primary">
                    {user.name}
                  </h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-1" />
                    {user.email}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserTrack;
