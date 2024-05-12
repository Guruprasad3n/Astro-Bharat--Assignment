import { Request, Response } from "express";
import AstrologerModel from "../Model/AstrologerModel";


export const registerAstrologer = async (req: Request, res: Response) => {
  const {
    name,
    gender,
    email,
    languages,
    specialties,
    image,
  } = req.body;
  try {
    const astrologer = new AstrologerModel({
      name,
      gender,
      email,
      languages,
      specialties,
      profileImageUrl: image,
    });

    const existingAstrologer = await AstrologerModel.findOne({ email });
    if (existingAstrologer) {
      return res.status(409).send({ message: "Astrologer Already Exist" });
    }
    await astrologer.save();
    return res
      .status(201)
      .send({ message: "Astrologer Registration Successful ", astrologer });
  } catch (error) {
    console.log("Error in Register", error);
    return res.status(500).send({ message: "Error in Registration" });
  }
};

export const allAstrologers = async (req: Request, res: Response) => {
  try {
    const astrologers = await AstrologerModel.find();
    return res.status(200).send({
      message: "Successfully retrieved Astrologers data",
      total: astrologers.length,
      astrologers,
    });
  } catch (error) {
    console.error("Error retrieving astrologers:", error);
    return res
      .status(500)
      .send({ message: "Failed to retrieve astrologers data" });
  }
};

export const editAstrologer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const astrologer = await AstrologerModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    
    if (!astrologer) {
      return res.status(404).send({ message: "Astrologer not found" });
    }
    const updatedAstrologer = await AstrologerModel.findById(id);
    
    if (!updatedAstrologer) {
      return res.status(404).send({ message: "Updated Astrologer not found" });
    }
    return res
      .status(200)
      .send({ message: "Astrologer Data Updated Success", astrologer:updatedAstrologer });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
