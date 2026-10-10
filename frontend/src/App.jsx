import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import CustomCursor from './components/ui/CustomCursor';

// Placeholder Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';
import RequestNew from './pages/RequestNew';
import RequestDetail from './pages/RequestDetail';
import RequestEdit from './pages/RequestEdit';
import Approvals from './pages/Approvals';
import Workflows from './pages/Workflows';
import WorkflowEdit from './pages/WorkflowEdit';
import Users from './pages/Users';
import UserEdit from './pages/UserEdit';
import Departments from './pages/Departments';
import DepartmentEdit from './pages/DepartmentEdit';
import AuditLogs from './pages/AuditLogs';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Placeholder from './pages/Placeholder';
import Landing from './pages/Landing';

function App() {
  return (
    <AuthProvider>
      <Router>
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/requests/new" element={<RequestNew />} />
            <Route path="/requests/:id" element={<RequestDetail />} />
            <Route path="/requests/:id/edit" element={<RequestEdit />} />
            <Route path="/approvals" element={<ProtectedRoute allowedRoles={['ADMIN', 'MANAGER', 'FINANCE', 'DEPARTMENT_HEAD']}><Approvals /></ProtectedRoute>} />
            <Route path="/workflows" element={<ProtectedRoute allowedRoles={['ADMIN']}><Workflows /></ProtectedRoute>} />
            <Route path="/workflows/new" element={<ProtectedRoute allowedRoles={['ADMIN']}><WorkflowEdit /></ProtectedRoute>} />
            <Route path="/workflows/:id" element={<ProtectedRoute allowedRoles={['ADMIN']}><WorkflowEdit /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute allowedRoles={['ADMIN']}><Users /></ProtectedRoute>} />
            <Route path="/users/new" element={<ProtectedRoute allowedRoles={['ADMIN']}><UserEdit /></ProtectedRoute>} />
            <Route path="/users/:id" element={<ProtectedRoute allowedRoles={['ADMIN']}><UserEdit /></ProtectedRoute>} />
            <Route path="/departments" element={<ProtectedRoute allowedRoles={['ADMIN']}><Departments /></ProtectedRoute>} />
            <Route path="/departments/new" element={<ProtectedRoute allowedRoles={['ADMIN']}><DepartmentEdit /></ProtectedRoute>} />
            <Route path="/departments/:id" element={<ProtectedRoute allowedRoles={['ADMIN']}><DepartmentEdit /></ProtectedRoute>} />
            <Route path="/audit-logs" element={<ProtectedRoute allowedRoles={['ADMIN']}><AuditLogs /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            {/* Other routes can be added here */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
