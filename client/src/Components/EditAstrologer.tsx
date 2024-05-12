import React, { useEffect, useState, useRef } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { useSelector } from "react-redux";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useUpdateAstrologerMutation } from "../Redux/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface AstrologerFormData {
  name: string;
  gender: string;
  email: string;
  languages: string[];
  specialties: string[];
  image?: File | null;
}

const EditAstrologer: React.FC = () => {
  const userData = localStorage.getItem("astrologersData");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const toBeEdit = useSelector((state: any) => state.astrologer.toBeEdit);
  console.log(toBeEdit);
  const [formData, setFormData] = useState<AstrologerFormData>({
    name: "",
    gender: "",
    email: "",
    languages: [],
    specialties: [],
    image: null,
  });

  const [updateAstrologer, { isLoading }] = useUpdateAstrologerMutation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userData) {
      const storedData = JSON.parse(userData);
      setFormData({
        name: storedData.name || "",
        gender: storedData.gender || "",
        email: storedData.email || "",
        languages: storedData.languages || [],
        specialties: storedData.specialties || [],
        image: storedData.profileImageUrl || null,
      });
    }
  }, [userData]);

  const handleLanguageChange = (event: SelectChangeEvent<string[]>) => {
    const selectedLanguages = event.target.value as string[];
    setFormData({ ...formData, languages: selectedLanguages });
  };

  const handleSpecialtyChange = (event: SelectChangeEvent<string[]>) => {
    const selectedSpecialties = event.target.value as string[];
    setFormData({ ...formData, specialties: selectedSpecialties });
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedImage = files[0];
      setFormData({ ...formData, image: selectedImage });

      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setPreviewImage(imageUrl);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userData) {
      try {
        toast.loading("Updating astrologer data...");
        let imageUrl = null;

        if (formData.image && formData.image instanceof File) {
          imageUrl = await postDetails(formData.image);
          if (!imageUrl) {
            toast.error("Failed to upload image to Cloudinary");
            return;
          }
        } else {
          const storedData = JSON.parse(userData);
          imageUrl = storedData.profileImageUrl;
        }

        const astrologerUpdateInput: AstrologerFormData = {
          ...formData,
          image: imageUrl,
        };
        const storedData = JSON.parse(userData);
        const updatedData = await updateAstrologer({
          id: storedData._id,
          ...astrologerUpdateInput,
        });
        toast.success("Astrologer Data Updated");
        console.log("Updated Data:", updatedData);
        navigate("/");
      } catch (error) {
        console.error("Error updating astrologer data:", error);
        toast.error("Error updating astrologer data");
      } finally {
        toast.dismiss();
      }
    } else {
      console.error("No data to update");
    }
  };

  useEffect(() => {
    localStorage.setItem("astrologerFormData", JSON.stringify(formData));
  }, [formData]);

  const postDetails = async (image: any) => {
    if (!image) {
      return null;
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "arba-dev");
      data.append("cloud_name", "dreyat4ae");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dreyat4ae/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          return responseData.url.toString();
        } else {
          console.error("Failed to upload image to Cloudinary");
          return null;
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return null;
      }
    } else {
      console.error("Image type must be either JPEG or PNG");
      toast.error("Image type must be either JPEG or PNG");
      return null;
    }
  };

  return (
    <Container maxWidth="md">
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h4"
          style={{ marginBottom: "20px", textAlign: "center", color: "#333" }}
        >
          Edit Astrologer
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="name-input">Name</InputLabel>
              <Input
                id="name-input"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="gender-select-label">Gender</InputLabel>
              <Select
                labelId="gender-select-label"
                id="gender-select"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value as string })
                }
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="email-input">Email address</InputLabel>
              <Input
                id="email-input"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="languages-select">Languages</InputLabel>
              <Select
                id="languages-select"
                multiple
                variant="outlined"
                value={formData.languages}
                onChange={handleLanguageChange}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as string[]).map((value) => (
                      <div key={value}>{value}</div>
                    ))}
                  </Box>
                )}
              >
                {["English", "Telugu", "Hindi", "Tamil", "Kannada"].map(
                  (language) => (
                    <MenuItem key={language} value={language}>
                      {language}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="specialties-select">Specialties</InputLabel>
              <Select
                id="specialties-select"
                multiple
                variant="outlined"
                value={formData.specialties}
                onChange={handleSpecialtyChange}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as string[]).map((value) => (
                      <div key={value}>{value}</div>
                    ))}
                  </Box>
                )}
              >
                {[
                  "Astrology",
                  "Numerology",
                  "Tarot Reading",
                  "Palmistry",
                  "Horoscope",
                ].map((specialty) => (
                  <MenuItem key={specialty} value={specialty}>
                    {specialty}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <img
                src={
                  previewImage ||
                  (typeof formData.image === "string" ? formData.image : "")
                }
                alt="Profile"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={handleImageClick}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </Box>
          </Grid>
        </Grid>
        <Box mt={3} display="flex" justifyContent="center">
          <Button
            style={{ marginTop: "20px", borderRadius: "8px" }}
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Update"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default EditAstrologer;
