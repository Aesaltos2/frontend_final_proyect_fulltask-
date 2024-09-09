import React, { useContext, useState } from 'react';
import { Link } from 'wouter';
import { AuthContext } from '../context/AuthContex';
import { ChevronDown, Users, FileText, UserPlus, Home, LogOut, User } from 'lucide-react';

const OpcionesAdm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { to: '/dashboard/users', icon: Users, text: 'Usuarios' },
    { to: '/dashboard/incidentAll', icon: FileText, text: 'Reportes' },
    { to: '/dashboard/create', icon: UserPlus, text: 'Crear Usuario' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
      >
        <span>Admin</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          {options.map((option, index) => (
            <Link key={index} href={option.to} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 transition duration-300">
              <option.icon className="h-4 w-4 mr-2 text-indigo-500" />
              <span>{option.text}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const OpcionesUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { to: '/dashboard/report', text: 'Reportar un problema' },
    { to: '/dashboard/incident', text: 'Ver mis reportes' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
      >
        <span>Opciones</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10">
          {options.map((option, index) => (
            <Link key={index} href={option.to} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 transition duration-300">
              {option.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export const Navbar = () => {
  const { infoUser, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <Home className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold hidden md:block">Servicio de Incidencias</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {infoUser && (
              <>
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">
                    {infoUser.rol === 'administrador' ? 'Admin' : 'Resident'}: {infoUser.nombre}
                  </span>
                </div>
                {infoUser.rol === 'administrador' ? <OpcionesAdm /> : <OpcionesUser />}
              </>
            )}
            <Link href="/dashboard/profile" className="text-blue-200 hover:text-white transition duration-300">
              Profile
            </Link>
            <button 
              onClick={logout}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
