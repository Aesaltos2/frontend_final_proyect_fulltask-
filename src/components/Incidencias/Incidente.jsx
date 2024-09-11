import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContex';

export const Incident = () => {
    const { reportFrUs, delReport } = useContext(AdminContext);
    const [reports, setReports] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        if (reportFrUs) {
            // Aplicar el filtro inicial basado en el estado
            applyFilter(statusFilter);
        }
    }, [reportFrUs, statusFilter]);

    const applyFilter = (status) => {
        if (status === '') {
            setReports(reportFrUs); // Mostrar todos los reportes
        } else {
            const filteredReports = reportFrUs.filter(rp => translateStatus(rp.estado) === status);
            setReports(filteredReports);
        }
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setStatusFilter(value);
        applyFilter(reverseTranslateStatus(value));
    };

    const handleUpdate = (id) => {
        localStorage.setItem('idIn', id);
    };

    const handleDelete = async (id) => {
        await delReport.mutateAsync(id);
    };

    // Función para traducir el valor del estado a la etiqueta mostrada en el filtro
    const translateStatus = (status) => {
        switch (status) {
            case 'pendiente':
                return 'Pendiente';
            case 'en_proceso':
                return 'Progreso';
            case 'resuelta':
                return 'Resuelto';
            default:
                return '';
        }
    };

    // Función para traducir la etiqueta del filtro al valor de estado
    const reverseTranslateStatus = (label) => {
        switch (label) {
            case 'Pendiente':
                return 'pendiente';
            case 'Progreso':
                return 'en_proceso';
            case 'Resuelto':
                return 'resuelta';
            default:
                return ''; // Valor para "Todos"
        }
    };

    return (
        <section className='w-full h-screen flex flex-col gap-4 bg-blue-50 p-4'>
            <header className='w-full flex flex-col gap-4 sm:flex-row items-center justify-between mb-4'>
                <h2 className='text-2xl font-bold text-purple-700'>Tus Reportes</h2>
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
                    <label className='text-blue-600 flex items-center gap-2'>
                        Estado:
                        <select
                            name='status'
                            className='rounded-xl border border-blue-300 p-2 outline-none text-black'
                            onChange={handleFilterChange}
                            value={statusFilter}
                        >
                            <option value="">Todos</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Progreso">Progreso</option>
                            <option value="Resuelto">Resuelto</option>
                        </select>
                    </label>
                </div>
            </header>
            <section className="overflow-x-auto w-full">
                <table className="min-w-full bg-white bg-opacity-90 border border-purple-200 rounded-md">
                    <thead>
                        <tr className="bg-blue-100 border-b border-blue-300">
                            <th className="py-2 px-4 text-center text-blue-600">Asunto</th>
                            <th className="py-2 px-4 text-center text-blue-600">Descripción</th>
                            <th className="py-2 px-4 text-center text-blue-600">Tipo</th>
                            <th className="py-2 px-4 text-center text-blue-600">Estado</th>
                            <th className="py-2 px-4 text-center text-blue-600">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((item) => (
                            <tr key={item.id} className="relative text-black border-b border-blue-300 hover:bg-blue-50 transition-colors">
                                <td className="py-2 px-4 text-center">{item.asunto}</td>
                                <td className="py-2 px-4 text-center">{item.descripcion}</td>
                                <td className="py-2 px-4 text-center">{item.tipo}</td>
                                <td className="py-2 px-4 text-center">{translateStatus(item.estado)}</td>
                                <td className="py-2 px-4 text-center flex justify-center gap-2">
                                    <button
                                        className="text-blue-500 cursor-pointer hover:underline"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </section>
    );
};
