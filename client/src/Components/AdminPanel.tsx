import React from "react";
import { Astrologer, useGetAstrologersQuery } from "../Redux/api";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToBeEdit } from "../Redux/reducer";

const AdminPanel: React.FC = () => {
  const { isLoading, isError, isSuccess, data, error } =
    useGetAstrologersQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <div>
          {" "}
          <CircularProgress size={80} />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error}</div>;
  }

  const handleEdit = (astrologerId: string) => {
    if (data && Array.isArray(data.astrologers)) {
      const astrologer = data.astrologers.find(
        (astro: Astrologer) => astro._id === astrologerId
      );
      if (astrologer) {
        dispatch(setToBeEdit(astrologer));
        navigate(`/edit/${astrologerId}`);
      }
    } else {
      console.error("Data is not in the expected format:", data);
    }
  };

  if (isSuccess) {
    return (
      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center" }}>Admin Panel</h1>
        <Grid container spacing={3}>
          {data &&
            data?.astrologers.map((e: Astrologer) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3} // Adjusted width here
                key={e._id}
                style={{ marginBottom: "20px" }}
              >
                <div
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "15px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {e.profileImageUrl && (
                    <img
                      src={e.profileImageUrl}
                      alt="Astrologer"
                      style={{
                        width: "100%",
                        height: "240px",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                  <Typography variant="subtitle1">Name: {e.name}</Typography>
                  <Typography variant="body2">Gender: {e.gender}</Typography>
                  <Typography variant="body2">Email: {e.email}</Typography>
                  <Typography variant="body2">
                    Languages: {e.languages.join(", ")}
                  </Typography>
                  <Typography variant="body2">
                    Specialties: {e.specialties.join(", ")}
                  </Typography>
                  <Box display="flex" justifyContent="center">
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(e._id)}
                      style={{ marginTop: "10px" }}
                    >
                      Edit
                    </Button>
                  </Box>
                </div>
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }

  return null;
};

export default AdminPanel;
