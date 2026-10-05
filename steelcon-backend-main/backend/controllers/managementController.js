import {
  Announcement,
  ManpowerRequest,
  Resignation,
  SupportRequest,
  Training,
  CompanyPolicy,
  OfferLetter,
  DisciplinaryAction,
  Referral,
} from "../models/managementModels.js";

const ok = (res, data, status = 200) => res.status(status).json({ success: true, data });
const list = (Model, query = {}) => async (req, res, next) => {
  try {
    ok(res, await Model.find(query).sort({ createdAt: -1 }));
  } catch (e) {
    next(e.message);
  }
};
const create = (Model, map = (body) => body) => async (req, res, next) => {
  try {
    ok(res, await Model.create(map(req.body, req.user)), 201);
  } catch (e) {
    next(e.message);
  }
};
const update = (Model) => async (req, res, next) => {
  try {
    const d = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!d) return next("Record not found");
    ok(res, d);
  } catch (e) {
    next(e.message);
  }
};
const remove = (Model) => async (req, res, next) => {
  try {
    const d = await Model.findByIdAndDelete(req.params.id);
    if (!d) return next("Record not found");
    ok(res, d);
  } catch (e) {
    next(e.message);
  }
};

export const listAnnouncements = async (req, res, next) => {
  try {
    const role = req.user.typeOfUser;
    const sendTo = role === "manager"
      ? { $in: ["All", "Manager", "Team"] }
      : role === "employee"
        ? { $in: ["All", "Employee", "Team"] }
        : { $exists: true };
    ok(res, await Announcement.find({ published: true, sendTo }).sort({ createdAt: -1 }));
  } catch (e) {
    next(e.message);
  }
};
export const createAnnouncement = create(Announcement, (b, u) => ({ ...b, createdBy: u._id }));
export const updateAnnouncement = update(Announcement);
export const deleteAnnouncement = remove(Announcement);

export const listManpower = async (req, res, next) => {
  try {
    const q = req.user.typeOfUser === "admin" ? {} : { requestedBy: req.user._id };
    ok(res, await ManpowerRequest.find(q).sort({ createdAt: -1 }));
  } catch (e) {
    next(e.message);
  }
};
export const createManpower = create(ManpowerRequest, (b, u) => ({
  ...b,
  requestedBy: u._id,
  managerId: u.typeOfUser === "manager" ? u._id : b.managerId,
}));
export const updateManpower = update(ManpowerRequest);
export const deleteManpower = remove(ManpowerRequest);

export const listResignations = async (req, res, next) => {
  try {
    if (req.user.typeOfUser === "employee") {
      return ok(res, await Resignation.find({ empId: req.user.empId }).sort({ createdAt: -1 }));
    }
    if (req.user.typeOfUser === "manager") {
      const managerName = `${req.user.firstName} ${req.user.lastName}`;
      const team = await (await import("../models/userModel.js")).default.find({ typeOfUser: "employee", teamManager: managerName }).select("empId");
      return ok(res, await Resignation.find({ empId: { $in: team.map((e) => e.empId) } }).sort({ createdAt: -1 }));
    }
    return ok(res, await Resignation.find().sort({ createdAt: -1 }));
  } catch (e) {
    next(e.message);
  }
};
export const createResignation = create(Resignation, (b, u) => ({
  ...b,
  empId: u.typeOfUser === "employee" ? u.empId : b.empId,
}));
export const reviewResignation = async (req, res, next) => {
  try {
    const resignation = await Resignation.findById(req.params.id);
    if (!resignation) return next("Record not found");

    if (req.user.typeOfUser === "manager") {
      const User = (await import("../models/userModel.js")).default;
      const employee = await User.findOne({ empId: resignation.empId, typeOfUser: "employee", teamManager: `${req.user.firstName} ${req.user.lastName}` });
      if (!employee) return res.status(403).json({ success: false, message: "You can only review resignations from your own team." });
      if (!["Manager Approved", "Rejected"].includes(req.body.status)) {
        return res.status(400).json({ success: false, message: "Managers may only approve at manager level or reject a resignation." });
      }
      resignation.status = req.body.status;
      resignation.notes = req.body.notes ?? resignation.notes;
      await resignation.save();
      return ok(res, resignation);
    }

    if (req.user.typeOfUser === "admin") {
      const allowed = ["Pending", "Manager Approved", "Approved", "Rejected", "Completed"];
      if (!allowed.includes(req.body.status)) return res.status(400).json({ success: false, message: "Invalid resignation status." });
      resignation.status = req.body.status;
      resignation.notes = req.body.notes ?? resignation.notes;
      resignation.approvedBy = ["Approved", "Completed"].includes(req.body.status) ? req.user._id : resignation.approvedBy;
      await resignation.save();
      return ok(res, resignation);
    }

    return res.status(403).json({ success: false, message: "You do not have permission to review resignations." });
  } catch (e) {
    next(e.message);
  }
};

export const listSupport = async (req, res, next) => {
  try {
    const q = req.user.typeOfUser === "admin" ? {} : { createdBy: req.user._id };
    ok(res, await SupportRequest.find(q).sort({ createdAt: -1 }));
  } catch (e) {
    next(e.message);
  }
};
export const createSupport = create(SupportRequest, (b, u) => ({ ...b, createdBy: u._id }));
export const updateSupport = update(SupportRequest);

export const listTraining = async (req, res, next) => {
  try {
    const all = await Training.find().sort({ createdAt: -1 });
    if (req.user.typeOfUser === "admin") return ok(res, all);
    ok(res, all.filter((training) => !training.assignedTo?.length || training.assignedTo.includes(req.user.empId)));
  } catch (e) {
    next(e.message);
  }
};
export const createTraining = create(Training);
export const updateTraining = update(Training);
export const deleteTraining = remove(Training);

export const listPolicies = async (req, res, next) => {
  try {
    const q = req.user.typeOfUser === "admin" ? {} : { published: true };
    ok(res, await CompanyPolicy.find(q).sort({ createdAt: -1 }));
  } catch (e) {
    next(e.message);
  }
};
export const createPolicy = create(CompanyPolicy, (b, u) => ({ ...b, createdBy: u._id, publishedAt: b.published ? new Date() : undefined }));
export const updatePolicy = update(CompanyPolicy);
export const deletePolicy = remove(CompanyPolicy);

export const listOffers = async (req, res, next) => {
  try {
    const q = req.user.typeOfUser === "admin" ? {} : { employeeId: req.user.empId };
    ok(res, await OfferLetter.find(q).sort({ createdAt: -1 }));
  } catch (e) {
    next(e.message);
  }
};
export const createOffer = create(OfferLetter, (b, u) => ({ ...b, createdBy: u._id }));
export const updateOffer = update(OfferLetter);
export const deleteOffer = remove(OfferLetter);

export const listDiscipline = async (req, res, next) => {
  try {
    let q = {};
    if (req.user.typeOfUser === "employee") q.empId = req.user.empId;
    if (req.user.typeOfUser === "manager") {
      const User = (await import("../models/userModel.js")).default;
      const managerName = `${req.user.firstName} ${req.user.lastName}`;
      const team = await User.find({ typeOfUser: "employee", teamManager: managerName }).select("empId");
      q.empId = { $in: team.map((e) => e.empId) };
    }
    ok(res, await DisciplinaryAction.find(q).sort({ date: -1 }));
  } catch (e) {
    next(e.message);
  }
};
export const createDiscipline = create(DisciplinaryAction, (b, u) => ({ ...b, managerId: u.typeOfUser === "manager" ? u._id : b.managerId }));
export const updateDiscipline = update(DisciplinaryAction);
export const deleteDiscipline = remove(DisciplinaryAction);

export const listReferrals = async (req, res, next) => {
  try {
    const q = req.user.typeOfUser === "employee" ? { employeeId: req.user.empId } : {};
    ok(res, await Referral.find(q).sort({ createdAt: -1 }));
  } catch (e) {
    next(e.message);
  }
};
export const createReferral = create(Referral, (b, u) => ({ ...b, employeeId: u.typeOfUser === "employee" ? u.empId : b.employeeId }));
export const updateReferral = update(Referral);
export const deleteReferral = remove(Referral);
