import React from "react";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import {
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Box,
  SelectChangeEvent,
  Container,
  Chip,
  TextField,
} from "@mui/material";
import { useAddAstrologerMutation } from "../Redux/api";

const RegisterAstrologer: React.FC = () => {
  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [languages, setLanguages] = React.useState<string[]>([]);
  const [specialties, setSpecialties] = React.useState<string[]>([]);
  const [image, setImage] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLanguageChange = (event: SelectChangeEvent<string[]>) => {
    setLanguages(event.target.value as string[]);
  };

  const handleSpecialtyChange = (event: SelectChangeEvent<string[]>) => {
    setSpecialties(event.target.value as string[]);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const [astro] = useAddAstrologerMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    const imageUrl = await postDetails(image);

    if (!imageUrl) {
      console.error("Failed to upload image to Cloudinary");
      setIsLoading(false);
      return;
    }

    try {
      await astro({
        name,
        gender,
        email,
        languages,
        specialties,
        image: imageUrl,
      });
      console.log("Astrologer added successfully!");
      console.log({
        name,
        gender,
        email,
        languages,
        specialties,
        image: imageUrl,
      });

      setName("");
      setGender("");
      setEmail("");
      setLanguages([]);
      setSpecialties([]);
      setImage(null);
    } catch (error) {
      console.error("Error adding astrologer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const postDetails = async (image: any) => {
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
          setImage(responseData.url.toString());
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
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <h3 style={{ textAlign: "center", marginBottom: "5px" }}>Register</h3>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  labelId="gender-select-label"
                  id="gender-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as string)}
                  variant="outlined"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="languages-select-label">Languages</InputLabel>
                <Select
                  id="languages-select"
                  multiple
                  value={languages}
                  onChange={handleLanguageChange}
                  variant="outlined"
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} />
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
                <InputLabel id="specialties-select-label">
                  Specialties
                </InputLabel>
                <Select
                  id="specialties-select"
                  multiple
                  value={specialties}
                  onChange={handleSpecialtyChange}
                  variant="outlined"
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} />
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
                Select Profile Image
                <Input
                  type="file"
                  id="image-input"
                  onChange={handleImageChange}
                />
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
  <FormControl fullWidth>
    <InputLabel htmlFor="image-input">Upload Profile Image</InputLabel>
    <Input
      type="file"
      id="image-input"
      onChange={handleImageChange}
      inputProps={{ accept: "image/*" }} // Limit file types to images
      style={{ display: "none" }} // Hide the default input element
    />
    <label htmlFor="image-input">
      <Button
        variant="outlined"
        component="span"
        startIcon={<CloudUploadIcon />}
      >
        Choose File
      </Button>
    </label>
  </FormControl>
</Grid> */}
          </Grid>
          <Box mt={4} display="flex" justifyContent="center">
            <Button
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Register"}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterAstrologer;
