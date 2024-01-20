import React from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

const UpdateBooks = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [info, setInfo] = useState("");
  const [link, setLink] = useState("");
  const [isLinkValid, setIsLinkValid] = useState(true);
  const [linkError, setLinkError] = useState("");
  const nav = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/Books/${id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setTitle(res.data.title);
        setPublishYear(res.data.publishYear);
        setInfo(res.data.info);
        setLoading(false);
        setLink(res.data.link);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const validateLink = (link) => {
    const isValid = /^(http|https):\/\/[^ "]+$/.test(link);
    setIsLinkValid(isValid);
    setLinkError(isValid ? "" : "Please enter a valid URL");
    return isValid;
  };

  const handleLinkChange = (e) => {
    const linkValue = e.target.value;
    setLink(linkValue);
    if (linkValue) {
      validateLink(linkValue);
    } else {
      setIsLinkValid(true);
      setLinkError("");
    }
  };

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
      info,
      link,
    };

    if (!isLinkValid && link !== "") {
      enqueueSnackbar("Please fix the errors before submitting", {
        variant: "error",
      });
      return;
    }

    setLoading(true);
    axios
      .put(`http://localhost:3000/Books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book updated successfully", { variant: "success" });
        nav("/");
      })
      .catch((e) => {
        console.log(e);
        alert("An error happened. Please Check console");
        enqueueSnackbar("Error", { variant: "error" });
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Update Book</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Info</label>
          <input
            type="text"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Link</label>
          <input
            type="text"
            placeholder="http://example.com (optional)"
            value={link}
            onChange={handleLinkChange}
            className={`border-2 px-4 py-2 w-full ${
              isLinkValid ? "border-gray-500" : "border-red-500"
            }`}
          />
          {!isLinkValid && <p className="text-red-500">{linkError}</p>}
        </div>

        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateBooks;
