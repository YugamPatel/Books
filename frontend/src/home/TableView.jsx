import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

let TableView = ({ books }) => {
  return (
    <div>
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-600 rounded-md py-3">No</th>
            <th className="border border-slate-600 rounded-md py-3 ">Title</th>
            <th className="border border-slate-600 rounded-md max-md:hidden py-3">
              Author
            </th>
            <th className="border border-slate-600 rounded-md max-md:hidden py-3">
              Publish Year
            </th>
            <th className="border border-slate-600 rounded-md py-3">
              Operations
            </th>
          </tr>
        </thead>

        <tbody>
          {books.map((tbook, index) => (
            <tr key={tbook._id}>
              <td className="border border-slate-600 rounded-md text-center p-4">
                {index + 1}
              </td>
              <td className="border border-slate-600 rounded-md text-center p-6">
                {tbook.title}
              </td>
              <td className="border border-slate-600 rounded-md text-center p-6 max-md:hidden">
                {tbook.author}
              </td>
              <td className="border border-slate-600 rounded-md text-center p-6 max-md:hidden">
                {tbook.publishYear}
              </td>
              <td className="border border-slate-600 rounded-md text-center p-3">
                <div className="flex justify-center items-center gap-x-5">
                  <Link to={`/books/details/${tbook._id}`}>
                    <div className="bg-green-400 p-2 rounded-full">
                      <BsInfoCircle className="w-7 h-7 text-green-900"></BsInfoCircle>
                    </div>
                  </Link>

                  <Link to={`/books/update/${tbook._id}`}>
                    <div className="bg-blue-400 p-2 rounded-full">
                      <AiOutlineEdit className="w-7 h-7 text-yellow-400"></AiOutlineEdit>
                    </div>
                  </Link>

                  <Link to={`/books/delete/${tbook._id}`}>
                    <div className="bg-red-400 p-2 rounded-full">
                      <MdOutlineDelete className="w-7 h-7 text-red-900"></MdOutlineDelete>
                    </div>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
