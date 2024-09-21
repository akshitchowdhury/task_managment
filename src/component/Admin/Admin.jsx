import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, LogOutIcon, User } from 'lucide-react';
import UserTrack from './UserTrack';
import { Link, useNavigate } from 'react-router-dom';

export default function Admin({ isAuth, setIsAuth }) {
  const [workers, setWorkers] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskUser, setTaskUser] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [updatedTaskList, setUpdatedTaskList] = useState([]);

  const handleDrop = () => setToggle(!toggle);

  const userList = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users');
      const data = await response.json();
      setWorkers(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    userList();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdatedTaskList([...updatedTaskList, { name: taskName, description: taskDescription, taskUser }]);
    setTaskName('');
    setTaskDescription('');
    setTaskUser('');
  };
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-6 flex flex-col items-center relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-indigo-800 mb-8"
      >
        Welcome, Admin!
      </motion.div>

      {/* Show User List Button as a Dropdown */}
      <motion.button
        onClick={handleDrop}
        className="mb-6 px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition duration-300 flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <User className="w-5 h-5 mr-2" />
        {toggle ? 'Hide' : 'Show'} User List
      </motion.button>

      {/* User List Dropdown */}
      {toggle && (
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-indigo-800 mb-4">User List</h2>
          {workers.length > 0 ? (
            <ul className="space-y-2">
              {workers.map((worker, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between border-b border-gray-200 pb-2 last:border-none"
                >
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      value={worker.name}
                      checked={taskUser === worker.name}
                      onChange={() => setTaskUser(worker.name)}
                      className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span className="text-gray-800">{worker.name}</span>
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No workers to display at the moment.</p>
          )}
        </motion.div>
      )}

      {/* Task Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 mb-8 w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task name"
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Task description"
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Task
        </button>
      </motion.form>

      {/* Task List */}
   
        <motion.div
          className="w-full max-w-2xl space-y-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
        {/* Task List in Table Format */}
<div className="w-full max-w-2xl mb-8">
  <table className="min-w-full bg-white rounded-lg shadow-md">
    <thead className="bg-indigo-100">
      <tr>
        <th className="py-3 px-4 text-left text-indigo-800 font-semibold">Task Name</th>
        <th className="py-3 px-4 text-left text-indigo-800 font-semibold">Description</th>
        <th className="py-3 px-4 text-left text-indigo-800 font-semibold">Assigned User</th>
        <th className="py-3 px-4 text-center text-indigo-800 font-semibold">Status</th>
        <th className="py-3 px-4 text-center text-indigo-800 font-semibold">Actions</th>
        
      </tr>
    </thead>
    <tbody>
      {updatedTaskList.map((task, index) => (
        <motion.tr
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="border-b last:border-none"
        >
          <td className="py-3 px-4 text-gray-800">{task.name}</td>
          <td className="py-3 px-4 text-gray-600">{task.description}</td>
          <td className="py-3 px-4 text-indigo-600">{task.taskUser}</td>
          <td className="py-3 px-4 text-indigo-600">Task Status</td>
          <td className="py-3 px-4 text-center">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              onClick={() => setUpdatedTaskList(updatedTaskList.filter((_, i) => i !== index))}
            >
              Delete
            </button>
          </td>
        </motion.tr>
      ))}
    </tbody>
  </table>
</div>

        </motion.div>

<button>
    <Link to="/admin/usertrack">User Track</Link>
</button>

{/* <UserTrack/> */}
      {/* Log Out Button */}
      <motion.button
        onClick={() => {setIsAuth(!isAuth)
        navigate('/')
        }}
        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition duration-300 flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LogOutIcon className="w-5 h-5 mr-2" />
        Log out
      </motion.button>
    </div>
  );
}
