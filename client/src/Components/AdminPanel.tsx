import React, { useEffect } from "react";
import { Astrologer, useGetAstrologersQuery } from "../Redux/api";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToBeEdit } from "../Redux/reducer";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const AdminPanel: React.FC = () => {
  const { isLoading, isError, isSuccess, data, error, refetch } =
    useGetAstrologersQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
  }, []);

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
        const astrologerString = JSON.stringify(astrologer);
        localStorage.setItem("astrologersData", astrologerString);
        dispatch(setToBeEdit(astrologer));
        navigate(`/edit/${astrologerId}`);
      }
    } else {
      console.error("Data is not in the expected format:", data);
    }
  };

  if (isSuccess) {
    const columns: GridColDef[] = [
      {
        field: "",
        headerName: "",
        width: 50,
      },
      {
        field: "profileImageUrl",
        headerName: "Profile Image",
        flex: 1,
        renderCell: (params: any) => (
          <img
            src={params.value}
            alt="Profile"
            style={{ width: 55, height: 50, borderRadius: "50%" }}
          />
        ),
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        // renderCell: (params: any) => (
        //   <Typography
        //     variant="body1"
        //   >
        //     {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
        //   </Typography>
        // ),
      },
      {
        field: "gender",
        headerName: "Gender",
        flex: 1,
      

      },
      { field: "email", headerName: "Email", flex: 1 },
      { field: "languages", headerName: "Languages", flex: 1 },
      { field: "specialties", headerName: "Specialties", flex: 1 },
      {
        field: "edit",
        headerName: "Edit",
        flex: 1,
        renderCell: (params: any) => (
          <Button
            variant="contained"
            onClick={() => handleEdit(params.row._id)}
          >
            Edit
          </Button>
        ),
      },
    ];

    return (
      <div style={{ height: "87vh", width: "100%" }}>
        <DataGrid
          rows={data.astrologers}
          columns={columns}
          getRowId={(row) => row._id}
          checkboxSelection
          pagination
          sortingOrder={["asc", "desc"]}
          filterModel={{
            items: [
              { field: "name", value: "", operator: "contains" },
              { field: "gender", value: "", operator: "contains" },
              { field: "email", value: "", operator: "contains" },
              { field: "languages", value: "", operator: "contains" },
              { field: "specialties", value: "", operator: "contains" },
            ],
          }}
        />
      </div>
    );
  }

  return null;
};

export default AdminPanel;
