"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  //fetch all books from localhost:8000/api/books

  const fetchBooks = async () => {
    const response = await fetch("http://localhost:8000/books");
    const data = await response.json();
    setBooks(data);
    console.log(data);
  }

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, selectedCategory]);

  const deleteBook = async (id) => {
    const response = await fetch(`http://localhost:8000/books/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Book deleted successfully");
      fetchBooks();
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center text-black justify-between p-24">
      
      <h1 className="text-4xl text-white font-bold text-center mb-5"> Library Management System</h1>

      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Search for a book"
        className="border-2 border-black rounded-lg p-2 mb-5"
      />

      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border-2 border-black rounded-lg p-2">
        <option value="All">All</option>
        <option value="fiction">Fiction</option>
        <option value="Non-fiction">Non-fiction</option>
      </select>

      <button className="bg-blue-500 hover:bg-blue-700 mt-10 mb-10 text-white font-bold py-2 px-4 rounded">
      <Link href="/addbooks">Add a new book</Link>
      </button>

      <div className="grid grid-cols-3 gap-4">

      {
        //show all books here

        books
          .filter(book => book.title.includes(searchTerm) && (selectedCategory === 'All' || book.category === selectedCategory))
          .map((book) => (
          <div key={book.id} className="flex flex-col bg-black mr-5 text-white items-center justify-center p-4 border w-full rounded-xl shadow-md">
            <img src={book.img} alt={book.title} className="w-full h-32" />
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.genre}</p>
            <p>{book.category}</p>
            <p>{book.published}</p>

            <button onClick={() => deleteBook(book.id)} className="bg-red-500 hover:bg-red-700 mt-5 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
           
          </div>
        ))


      }

      </div>

    </main>
  );
}