import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useSnackbar } from 'notistack'; // Import if you're using notistack for snackbars
import Spinner from '../components/Spinners'; // Import your Spinner component

const DeleteBooks = () => {
  const [loading, setLoading] = useState(false); // Define loading state
  const { id } = useParams(); // Get id from URL parameters
  const navigate = useNavigate(); // Define navigate
  const { enqueueSnackbar } = useSnackbar(); // Initialize enqueueSnackbar if using notistack

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/Books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert(error) ;
        enqueueSnackbar("Error deleting book", { variant: "error" }); // User feedback on error
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure You want to delete this book?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBooks;
