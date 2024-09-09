import React from 'react';
import { Route, Router } from 'wouter';
import { Login } from './Pages/Login';
import { Dashboard } from './Pages/Dashboard';
import { Layout } from './Layout/Layout';
import Rediriguir from './components/Rediriguir';
import { ProtectRouter } from './components/ProtectRouter';

export default function App() {
  return (
    <Router>
      <Route path="/" component={Rediriguir} />
      <Route path="/login" component={Login} />
      <ProtectRouter>
        <Layout>
          <Route path="/dashboard/:subpage?" component={Dashboard} />
        </Layout>
      </ProtectRouter>
    </Router>
  );
}
