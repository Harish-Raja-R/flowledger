import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import User from './models/User.js';
import Department from './models/Department.js';
import Workflow from './models/Workflow.js';
import Request from './models/Request.js';
import Approval from './models/Approval.js';
import AuditLog from './models/AuditLog.js';
import Notification from './models/Notification.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Department.deleteMany();
    await Workflow.deleteMany();
    await Request.deleteMany();
    await Approval.deleteMany();
    await AuditLog.deleteMany();
    await Notification.deleteMany();

    const createdDepartments = await Department.insertMany([
      { name: 'Engineering', description: 'Tech department' },
      { name: 'Finance', description: 'Finance department' },
      { name: 'Operations', description: 'Ops department' }
    ]);

    const engineeringId = createdDepartments[0]._id;

    const users = [
      { name: 'Admin User', email: 'admin@flowledger.com', password: 'password', role: 'ADMIN', department: engineeringId },
      { name: 'Employee User', email: 'employee@flowledger.com', password: 'password', role: 'EMPLOYEE', department: engineeringId },
      { name: 'Manager User', email: 'manager@flowledger.com', password: 'password', role: 'MANAGER', department: engineeringId },
      { name: 'Finance User', email: 'finance@flowledger.com', password: 'password', role: 'FINANCE', department: engineeringId },
      { name: 'Head User', email: 'head@flowledger.com', password: 'password', role: 'DEPARTMENT_HEAD', department: engineeringId },
    ];
    for (const u of users) {
      await User.create(u);
    }

    const purchaseWorkflow = await Workflow.create({
      name: 'Standard Purchase Approval',
      description: 'Approval workflow for purchase requests',
      type: 'Purchase Request',
      department: engineeringId,
      isActive: true,
      steps: [
        { name: 'Manager Approval', approverRole: 'MANAGER', order: 1 },
        { name: 'Finance Approval', approverRole: 'FINANCE', order: 2 },
        { name: 'Department Head Approval', approverRole: 'DEPARTMENT_HEAD', order: 3 },
      ]
    });

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // destroyData();
} else {
  importData();
}
