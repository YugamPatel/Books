import React from "react";
import axios from "axios";
import Spinners from "../components/Spinners";
import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import BackButton from "../components/BackButton";

const ShowBooks = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/Books/${id}`)
      .then((res) => {
        console.log(res.data.createdAt);
        setBook(res.data) ;
        setInterval(() => {
          setLoading(false);
        }, 600);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <BackButton></BackButton>
      <h1 className="text-xl mt-4 bg-red-400 p-5 rounded-lg text-center">Show Book</h1>
      {loading ? (
        <Spinners></Spinners>
      ) : (
        <div className="border-4 border-solid border-blue-900 rounded-3xl p-4 mt-7">
          <div className="border-4 border-solid border-blue-900 rounded-lg p-4 mt-2">Id Number : {book._id}</div>
          <div className="border-4 border-solid border-blue-900 rounded-lg p-4 mt-2">Title : {book.title}</div>
          <div className="border-4 border-solid border-blue-900 rounded-lg p-4 mt-2">Author : {book.author}</div>
          <div className="border-4 border-solid border-blue-900 rounded-lg p-4 mt-2">Publish Year :{book.publishYear}</div>
          <div className="border-4 border-solid border-blue-900 rounded-lg p-4 mt-2">Created At :  {new Date(book.createdAt).toString().substring(0,25)}</div>
          <div className="border-4 border-solid border-blue-900 rounded-lg p-4 mt-2">Updated At :  {new Date(book.updatedAt).toString().substring(0,25)}</div>
        </div>
      )}
    </div>
  );
};

export default ShowBooks;
