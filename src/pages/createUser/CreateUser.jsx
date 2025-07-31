import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Button from '../../components/atoms/Button';
import { createUser } from '../../services/apiServices';
import './CreateUser.css';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        role: 'normal' // valor por defecto
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await createUser(formData);
            setSuccess('Usuario creado exitosamente');
            setFormData({
                userName: '',
                email: '',
                password: '',
                role: 'normal'
            });
            setTimeout(() => navigate('/Menu'), 2000);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="create-user-container">
                <div className="create-user-form-container">
                    <h1>Crear Usuario</h1>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    <form className="create-user-form" onSubmit={handleSubmit}>
                        <label htmlFor="userName">Nombre de Usuario:</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="role">Rol:</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="normal">Normal</option>
                            <option value="admin">Administrador</option>
                        </select>

                        <Button type="submit">Crear Usuario</Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateUser;