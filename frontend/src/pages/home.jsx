import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinners from "../components/Spinners";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import TableView from "../home/TableView";
import CardView from "../home/CardView";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:3000/Books").then((res) => {
      setBooks(res.data.books);
      console.log(books);
      setInterval(() => {
        setLoading(false);
      }, 600);
    });
  }, []);

  return (
    <div className="px-10 pb-10 pt-5">
      <div className="flex justify-between items-center bg-red-400 rounded-md px-6 py-0 mb-4">
        <div className="text-3xl my-8">Books List</div>
        <Link to="/books/create">
          <div className="p-2 rounded-full bg-green-500 border-2 border-black">
            <MdOutlineAddBox className="w-8 h-8 text-blue-900 " />
          </div>
        </Link>
      </div>
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinners />
        </div>
      ) : showType === "table" ? (
        <TableView books={books} />
      ) : (
        <CardView books={books} />
      )}

      <Link to={`/books/delete/`}>
        <div className="p-4 bg-red-700 mt-10 rounded-2xl w-fit text-5">
          Delete All
        </div>
      </Link>

    </div>
  );
};

export default Home;
