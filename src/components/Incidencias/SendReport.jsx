import React, { useContext, useState } from 'react';
import dayjs from 'dayjs';
import { AdminContext } from '../../context/AdminContex';

export const Report = () => {
    const [error, setError] = useState('');
    const { createReport } = useContext(AdminContext);
    const userId = localStorage.getItem('userId');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('fecha_creacion', date);
        formData.append('id', userId);
        formData.append('estado', 'pendiente'); 

        try {
            await createReport.mutateAsync(formData);
            e.target.reset();
            setError('');
        } catch {
            setError('No se pudo enviar el reporte. Inténtelo de nuevo.');
        }
    };

    return (
        <div className='container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>Crear un Nuevo Reporte</h2>
            <p className='text-lg text-gray-600 mb-6'>Complete el formulario a continuación para reportar un problema.</p>
            <form
                className='bg-white p-6 rounded-lg shadow-md space-y-6'
                onSubmit={handleSubmit}
            >
                <div className='flex flex-col space-y-2'>
                    <label className='flex flex-col'>
                        <span className='text-sm font-medium text-gray-700'>Asunto:</span>
                        <input
                            required
                            placeholder='Ingrese el título del problema'
                            className='mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500'
                            type="text"
                            name='asunto'
                        />
                    </label>
                </div>
                <div className='flex flex-col space-y-2'>
                    <label className='flex flex-col'>
                        <span className='text-sm font-medium text-gray-700'>Descripción:</span>
                        <textarea
                            required
                            placeholder='Proporcione una breve descripción'
                            className='mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500'
                            name='descripcion'
                        />
                    </label>
                </div>
                <div className='flex flex-col space-y-2'>
                    <label className='flex flex-col'>
                        <span className='text-sm font-medium text-gray-700'>Tipo:</span>
                        <select
                            required
                            className='mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500'
                            name='tipo'
                        >
                            <option value="fontaneria">Fontanería</option>
                            <option value="electricidad">Electricidad</option>
                            <option value="limpieza">Limpieza</option>
                            <option value="otros">Otros</option>
                        </select>
                    </label>
                </div>
                <div className='flex flex-col space-y-2'>
                    <label className='flex flex-col'>
                        <span className='text-sm font-medium text-gray-700'>Estado:</span>
                        <input
                            required
                            className='mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500'
                            type="text"
                            name='estado'
                            value='pendiente'
                            readOnly
                        />
                    </label>
                </div>
                {error && <p className='text-red-500 text-sm'>{error}</p>}
                <button className='w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500' type='submit'>
                    Enviar Reporte
                </button>
            </form>
        </div>
    );
};
