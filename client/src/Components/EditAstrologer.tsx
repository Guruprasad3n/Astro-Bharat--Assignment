import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface AstrologerFormData {
  name: string;
  gender: string;
  email: string;
  languages: string[];
  specialties: string[];
  image?: File | null;
}

const EditAstrologer: React.FC = () => {
  const toBeEdit = useSelector((state: any) => state.astrologer.toBeEdit);
  const [formData, setFormData] = useState<AstrologerFormData>({
    name: toBeEdit?.name || "",
    gender: toBeEdit?.gender || "",
    email: toBeEdit?.email || "",
    languages: toBeEdit?.languages || [],
    specialties: toBeEdit?.specialties || [],
    image: null,
  });

  const [updateAstrologer, { isLoading }] = useUpdateAstrologerMutation();
  const navigate = useNavigate();

  const handleLanguageChange = (
    event: SelectChangeEvent<string[]>
  ) => {
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
      setFormData({ ...formData, image: files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (toBeEdit) {
      try {
        let imageUrl = null;
        if (formData.image) {
          imageUrl = await postDetails(formData.image);
          if (!imageUrl) {
            console.error("Failed to upload image to Cloudinary");
            return;
          }
        }
        const finalImageUrl = imageUrl || toBeEdit.image;

        const astrologerUpdateInput: AstrologerFormData = {
          ...formData,
          image: finalImageUrl,
        };

        const updatedData = await updateAstrologer({
          id: toBeEdit._id,
          ...astrologerUpdateInput,
        });
        console.log("Updated Data:", updatedData);
        navigate("/");
      } catch (error) {
        console.error("Error updating astrologer data:", error);
      }
    }
  };

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
      return null;
    }
  };

  return (
    <Container maxWidth="md">
    <form onSubmit={handleSubmit} style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
      <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>Edit Astrologer</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="name-input">Name</InputLabel>
            <Input
              id="name-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as string })}
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
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          <FormControl fullWidth>
            <InputLabel htmlFor="image-input">Profile Image</InputLabel>
            <Input
              type="file"
              id="image-input"
              onChange={handleImageChange}
            />
          </FormControl>
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
