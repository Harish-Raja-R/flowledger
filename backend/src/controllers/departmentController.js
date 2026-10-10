import Department from '../models/Department.js';

export const getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find();
    res.json({ success: true, data: departments });
  } catch (error) {
    next(error);
  }
};

export const getDepartmentById = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      res.status(404);
      throw new Error('Department not found');
    }
    res.json({ success: true, data: department });
  } catch (error) {
    next(error);
  }
};

export const createDepartment = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    
    const departmentExists = await Department.findOne({ name });
    if (departmentExists) {
      res.status(400);
      throw new Error('Department already exists');
    }

    const department = await Department.create({
      name,
      description
    });

    res.status(201).json({ success: true, data: department });
  } catch (error) {
    next(error);
  }
};

export const updateDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!department) {
      res.status(404);
      throw new Error('Department not found');
    }
    res.json({ success: true, data: department });
  } catch (error) {
    next(error);
  }
};

export const deleteDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      res.status(404);
      throw new Error('Department not found');
    }
    // Also we might want to prevent deleting a department if users are assigned to it.
    // For now, just delete it.
    res.json({ success: true, message: 'Department removed' });
  } catch (error) {
    next(error);
  }
};
