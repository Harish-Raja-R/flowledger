import Request from '../models/Request.js';
import Approval from '../models/Approval.js';
import AuditLog from '../models/AuditLog.js';

export const getDashboardAnalytics = async (req, res, next) => {
  try {
    const user = req.user;
    let requestFilter = {};
    if (user.role === 'EMPLOYEE') {
      requestFilter = { requester: user._id };
    } else if (user.role !== 'ADMIN') {
      // Managers/Heads see their department's requests
      requestFilter = { department: user.department };
    }

    let approvalFilter = { status: 'PENDING' };
    if (user.role === 'EMPLOYEE') {
      approvalFilter = { _id: null }; // No approvals for employees
    } else if (user.role !== 'ADMIN') {
      approvalFilter.assignedRole = user.role;
    }

    const totalRequests = await Request.countDocuments(requestFilter);
    const pendingApprovals = await Approval.countDocuments(approvalFilter);
    const approvedRequests = await Request.countDocuments({ ...requestFilter, status: 'APPROVED' });
    const rejectedRequests = await Request.countDocuments({ ...requestFilter, status: 'REJECTED' });

    const recentRequests = await Request.find(requestFilter)
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('requester', 'name email')
      .populate('department', 'name');

    let auditFilter = {};
    if (user.role === 'EMPLOYEE') {
      auditFilter = { actor: user._id }; // See own activity
    } else if (user.role !== 'ADMIN') {
      // Could filter by department, but AuditLog doesn't have department directly. Let's show own activity for now unless admin
      auditFilter = { actor: user._id };
    }
    
    const recentActivity = await AuditLog.find(auditFilter)
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('actor', 'name email');

    res.json({
      success: true,
      data: {
        totalRequests,
        pendingApprovals,
        approvedRequests,
        rejectedRequests,
        recentRequests,
        recentActivity
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getRequestAnalytics = async (req, res, next) => {
  try {
    const user = req.user;
    let matchStage = {};
    if (user.role === 'EMPLOYEE') {
      matchStage = { requester: user._id };
    } else if (user.role !== 'ADMIN') {
      matchStage = { department: user.department };
    }

    const requestsByStatus = await Request.aggregate([
      { $match: matchStage },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const requestsByType = await Request.aggregate([
      { $match: matchStage },
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    // Monthly volume
    const monthlyVolume = await Request.aggregate([
      { $match: matchStage },
      { 
        $group: { 
          _id: { $month: "$createdAt" }, 
          count: { $sum: 1 } 
        } 
      },
      { $sort: { "_id": 1 } }
    ]);

    const requestsByDepartment = await Request.aggregate([
      { $match: matchStage },
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $lookup: { from: 'departments', localField: '_id', foreignField: '_id', as: 'dept' } },
      { $unwind: '$dept' },
      { $project: { department: '$dept.name', count: 1, _id: 0 } }
    ]);

    res.json({
      success: true,
      data: {
        requestsByStatus,
        requestsByType,
        requestsByDepartment,
        monthlyVolume
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getApprovalAnalytics = async (req, res, next) => {
  try {
    const totalApprovals = await Approval.countDocuments();
    const completedApprovals = await Approval.countDocuments({ status: { $in: ['APPROVED', 'REJECTED'] } });
    
    // Average approval time calculation could go here, omitting for brevity
    
    res.json({
      success: true,
      data: {
        totalApprovals,
        completedApprovals,
        approvalRate: totalApprovals ? (completedApprovals / totalApprovals) * 100 : 0
      }
    });
  } catch (error) {
    next(error);
  }
};
