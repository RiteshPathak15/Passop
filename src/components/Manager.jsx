import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LuCopy } from "react-icons/lu";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    // Password Toggle
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Form data and local storage
    const [form, setForm] = useState({ site: "", username: "", password: "", id: null });
    const [passwords, setPasswords] = useState([]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    // Save password to local storage
    const savePassword = () => {
        const storedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
        let updatedPasswords;

        if (form.id) {
            // Edit existing password
            updatedPasswords = storedPasswords.map((pass) =>
                pass.id === form.id ? form : pass
            );
        } else {
            // Add new password
            updatedPasswords = [...storedPasswords, { ...form, id: uuidv4() }];
        }

        localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
        setPasswords(updatedPasswords);
        setForm({ site: "", username: "", password: "", id: null });
    };

    // Load passwords from local storage when component mounts
    useEffect(() => {
        const storedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
        setPasswords(storedPasswords);
    }, []);

    // Function to copy text to clipboard
    const copytext = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const editPassword = (id) => {
        const passwordToEdit = passwords.find(pass => pass.id === id);
        setForm(passwordToEdit); // Pre-fill the form with selected password data
    };

    const deletePassword = (id) => {
        const updatedPasswords = passwords.filter(item => item.id !== id);
        localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
        setPasswords(updatedPasswords);
        toast.success('Password delete successfully !!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="container flex-col text-center justify-center p-5">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
                <div className="logo font-bold text-xl">
                    <span className="text-green-400">&lt;Rits</span>
                    <span className="text-green-900">Pass /&gt;</span>
                </div>
                <div>You Own Password Manager</div>
                <div className="flex flex-col p-10 gap-5 items-center">
                    <input
                        className="border w-4/6 border-green-500 rounded-lg p-2"
                        type="text"
                        placeholder="Enter the URL"
                        value={form.site}
                        name="site"
                        id="site"
                        onChange={handleInputChange}
                    />

                    <div className="flex gap-4 justify-center">
                        <input
                            className="border border-green-500 rounded-lg p-2"
                            type="text"
                            placeholder="Enter the username"
                            value={form.username}
                            name="username"
                            id="username"
                            onChange={handleInputChange}
                        />

                        <div className="relative">
                            <input
                                className="border border-green-500 rounded-lg p-2 pr-10"
                                type={passwordVisible ? 'text' : 'password'}
                                value={form.password}
                                name="password"
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                            />
                            <span className="absolute right-2 top-2 p-1 cursor-pointer" onClick={togglePasswordVisibility}>
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <button
                        className="flex gap-4 bg-green-500 justify-center rounded-full p-2 px-4 items-center"
                        onClick={savePassword}
                    >
                        Add Password
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                    </button>
                </div>

                <div className="passwords p-5">
                    <h2 className="font-bold text-xl border-b-2 border-green-400 w-fit mb-4">Saved Passwords</h2>
                    {passwords.length > 0 ? (
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-green-100">
                                    <th className="text-center border border-green-500 p-2">Site</th>
                                    <th className="text-center border border-green-500 p-2">Username</th>
                                    <th className="text-center border border-green-500 p-2">Password</th>
                                    <th className="text-center border border-green-500 p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwords.map((pass) => (
                                    <tr key={pass.id} className="even:bg-green-50">
                                        <td className="border border-green-500 p-2">
                                            <a href={pass.site} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                {pass.site}
                                            </a>
                                            <LuCopy className="cursor-pointer ml-2" onClick={() => { copytext(pass.site); }} />
                                        </td>
                                        <td className="border border-green-500 p-2">
                                            {pass.username}
                                            <LuCopy className="cursor-pointer ml-2" onClick={() => { copytext(pass.username); }} />
                                        </td>
                                        <td className="border border-green-500 p-2">
                                            {pass.password}
                                            <LuCopy className="cursor-pointer ml-2" onClick={() => { copytext(pass.password); }} />
                                        </td>
                                        <td className="border border-green-500 p-2">
                                            <span onClick={() => { editPassword(pass.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/fikcyfpp.json"
                                                    trigger="hover"
                                                    style={{ width: "50px", height: "30px" }}>
                                                </lord-icon>
                                            </span>
                                            <span onClick={() => { deletePassword(pass.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/hwjcdycb.json"
                                                    trigger="hover"
                                                    style={{ width: "50px", height: "30px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No passwords saved yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
