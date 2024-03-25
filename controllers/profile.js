// controllers/profile.js
import Profile from "../models/Profile.js";
import { validBody } from "../utils/validBody.js";
import { profileSchema } from "../validations/profile.js";

export const createProfile = async (req, res, next) => {
  try {
    const { userId, username, ...profileData } = req.body;

    validBody(profileData, profileSchema);
    const data = await Profile.create(profileData);
    if (data) {
      return res.status(201).json({
        message: "Create profile successfully",
        data,
      });
    }
    return res.status(500).json({
      message: "Create profile failed",
    });
  } catch (error) {
    next(error);
  }
};

export const getProfiles = async (req, res, next) => {
  try {
    const data = await Profile.find({});
    if (data) {
      return res.status(200).json({
        message: "Get profiles successfully",
        data,
      });
    }
    return res.status(404).json({
      message: "No profiles found",
    });
  } catch (error) {
    next(error);
  }
};

export const getProfileById = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (profile) {
      return res.status(200).json({
        message: "Get profile successfully",
        profile,
      });
    }
    return res.status(404).json({
      message: "Profile not found",
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { userId, username, ...profileData } = req.body;

    validBody(profileData, profileSchema);
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      profileData,
      { new: true }
    );
    if (updatedProfile) {
      return res.status(200).json({
        message: "Update profile successfully",
        updatedProfile,
      });
    }
    return res.status(404).json({
      message: "Profile not found",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProfile = async (req, res, next) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
    if (deletedProfile) {
      return res.status(200).json({
        message: "Delete profile successfully",
        deletedProfile,
      });
    }
    return res.status(404).json({
      message: "Profile not found",
    });
  } catch (error) {
    next(error);
  }
};
