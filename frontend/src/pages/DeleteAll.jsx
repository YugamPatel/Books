import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import BackButton from "../components/BackButton";


const DeleteAll = () => {
  const nav = useNavigate();

  const click = async (e) => {
    await axios
      .delete("http://localhost:3000/Books/")
      .then(() => {
        nav("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">
          Are You Sure You want to delete all books ?
        </h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={click}
        >
          Yes, Delete All
        </button>
      </div>
    </div>
  );
};

export default DeleteAll;
