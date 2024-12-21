import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import axios from "./axiosInstance";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    designation: "",
    department: "",
    dateofjoining: "",
    salary: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/Employee/AddEmployee", formData);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Employee added successfully!");
      setEmployees([...employees, formData]); // Add new employee to the list
      setShowModal(false); // Close the modal after submission
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        designation: "",
        department: "",
        dateofjoining: "",
        salary: "",
      });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <nav className="text-black p-4 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center justify-center w-full">
            <input
              type="text"
              placeholder="Search..."
              className="ml-20 w-1/3 p-2 rounded-lg border border-teal-500 focus:outline-none focus:ring focus:ring-teal-300"
            />
            <button type="button" className="ml-2 text-gray-500">
              <CiSearch />
            </button>
          </div>
          <ul className="flex space-x-4 ml-auto">
            <li>
              <a href="#" className="hover:text-gray-500">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                Staff
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                Employees
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Add Employee Button */}
      <div className="flex items-end justify-end mt-5 mr-4">
        <button onClick={() => setShowModal(true)} className="  p-2 rounded">
          <FaPlus />
        </button>
      </div>

      {/* Employee Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {employees.map((employee, index) => (
          <div
            key={index}
            className="border p-6 rounded-lg shadow-md bg-white text-center flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              <span className="text-gray-600 text-lg font-semibold">Photo</span>
            </div>
            <h3 className="font-bold text-xl mb-2">
              {employee.firstname} {employee.lastname}
            </h3>

            <div className="mb-4">
              <p className="text-gray-500">{employee.email}</p>
            </div>

            {/* Icons Row */}
            <div className="flex justify-center space-x-12 mt-2">
              <button className="text-green-500 hover:text-green-700">
                <MdModeEdit />
              </button>
              <button className="text-blue-500 hover:text-blue-700">
                <GrView />
              </button>
              <button className="text-red-500 hover:text-red-700">
                <MdDelete />
              </button>
            </div>

            <div className="flex justify-between items-center w-full mb-4">
              <div className="text-center flex-1">
                <p className="text-lg">{employee.designation}</p>
                <p className="text-gray-500 text-sm">Designation</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-lg">{employee.department}</p>
                <p className="text-gray-500 text-sm">Department</p>
              </div>
            </div>

            <div className="flex justify-between items-center w-full mb-2">
              <div className="text-center flex-1">
                <p className="text-lg">{employee.dateofjoining}</p>
                <p className="text-gray-500 text-sm">Date of Joining</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-lg">{employee.salary}</p>
                <p className="text-gray-500 text-sm">Salary</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add Employee</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Date of Joining
                </label>
                <input
                  type="date"
                  name="dateofjoining"
                  value={formData.dateofjoining}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
