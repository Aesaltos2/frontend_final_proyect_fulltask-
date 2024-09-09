import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContex';
import { User, Phone, Mail, Building, Edit, Check } from 'lucide-react';

export const InfoUser = () => {
    const { infoUser, updateUserInfo } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedInfo, setEditedInfo] = useState({ ...infoUser });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        updateUserInfo(editedInfo);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setEditedInfo({ ...editedInfo, [e.target.name]: e.target.value });
    };

    if (!infoUser) return null;

    return (
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
            <div className="flex justify-center items-center mb-6">
                <h2 className="text-3xl font-bold text-indigo-700">Perfil de Usuario</h2>
            </div>

            <div className="space-y-6">
                <div className="flex items-center">
                    <User className="text-indigo-500 mr-4" size={24} />
                    <div className="flex-grow">
                        <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="nombre"
                                value={editedInfo.nombre}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        ) : (
                            <p className="text-lg text-indigo-800">{`${infoUser.nombre} ${infoUser.apellido}`}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center">
                    <Phone className="text-indigo-500 mr-4" size={24} />
                    <div className="flex-grow">
                        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                        {isEditing ? (
                            <input
                                type="tel"
                                name="numero_contacto"
                                value={editedInfo.numero_contacto}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        ) : (
                            <p className="text-lg text-indigo-800">{infoUser.numero_contacto}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center">
                    <Mail className="text-indigo-500 mr-4" size={24} />
                    <div className="flex-grow">
                        <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <p className="text-lg text-indigo-800">{infoUser.email}</p>
                    </div>
                </div>

                <div className="flex items-center">
                    <Building className="text-indigo-500 mr-4" size={24} />
                    <div className="flex-grow">
                        <label className="block text-sm font-medium text-gray-700">Departamento</label>
                        <p className="text-lg text-indigo-800">{infoUser.departamento}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};