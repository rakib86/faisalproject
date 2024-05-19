"use client";

import Link from "next/link";
import { useState } from "react";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [published, setPublished] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState(""); // new state variable for category


  const handleSubmit = async (e) => {
    e.preventDefault();

    const book = { title, author, genre, published, img };

    const response = await fetch("http://localhost:8000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    if (response.ok) {
      alert("Book added successfully");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl text-white font-bold mb-5">Add a new book</h1>
      <Link href="/">Back to home
      </Link>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-white  text-sm font-bold mb-2">
            Title:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-white  text-sm font-bold mb-2">
            Author:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Genre:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-white  text-sm font-bold mb-2">
            Category:
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-fiction">Non-fiction</option>
              <option value="Biography">Biography</option>
              <option value="History">History</option>
              {/* Add more options here based on your categories */}
            </select>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-white  text-sm font-bold mb-2">
            Published:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={published}
              onChange={(e) => setPublished(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-white  text-sm font-bold mb-2">
            Image URL:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}
