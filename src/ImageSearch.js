import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { RiDownloadCloudLine } from "react-icons/ri";
import ShareImage from "./ShareImage";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ImageSearch = () => {
  const [query, setQuery] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Kuch to lik ke search karle Bhai :)");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?query=${query}&client_id=rhjOio-KLsnIJ_B5LFzep7fhXdLi2qb2kvVphYW2yTk`
      );

      if (response.status === 200) {
        const data = response.data;
        const fetchedImageUrl = data.urls.regular;
        setImageUrl(fetchedImageUrl);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(imageUrl, {
        responseType: "blob", // Set responseType to 'blob' to receive binary data
      });

      // Create a temporary anchor element
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(new Blob([response.data]));
      downloadLink.setAttribute("download", `${query}.jpg`);

      downloadLink.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleAddFavorite = () => {
    setIsFavorite(true);
    if (!imageUrl || favorites.includes(imageUrl)) return;
    const updatedFavorites = [...favorites, imageUrl];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleRemoveFavorite = (url) => {
    setIsFavorite(false);

    const updatedFavorites = favorites.filter((favorite) => favorite !== url);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <h1 className="text-5xl text-center  uppercase mb-10 text-slate-600 underline">
        Image Search App
      </h1>
      <div className="container my-0 mx-auto text-center flex  mt-5">
        <div className="w-2/3 ml-10">
          <div className="flex items-center mb-5">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter search term..."
              className="p-2 text-base border border-gray-300 rounded w-1/3"
            />
            <button
              className="py-2.5 px-5 text-xl bg-blue-500 text-white rounded-lg cursor-pointer ml-2.5 hover:bg-blue-700 flex items-center"
              onClick={handleSearch}
            >
              Search <FaSearch className="ml-2 text-md" />
            </button>
          </div>
          {imageUrl && (
            <div className="mt-5">
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  className="max-w-full h-96 rounded-md w-96"
                  src={imageUrl}
                  alt="Searched Image"
                />
                <button
                  onClick={handleAddFavorite}
                  style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
                >
                  <FaHeart
                    className={`text-2xl ${
                      isFavorite ? "text-pink-500" : "text-white"
                    }`}
                  />
                </button>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleDownload}
                  className="mt-5  justify-start bg-green-500 hover:bg-green-700 text-white flex items-center font-bold py-2 px-4 rounded"
                >
                  Download <RiDownloadCloudLine className="ml-2 text-lg" />
                </button>
                <ShareImage imageUrl={imageUrl} />
              </div>
            </div>
          )}
        </div>
        <div className="w-2/3">
          <h2 className="text-xl font-semibold text-gray-500 underline">
            Favorite Images
          </h2>
          <div className="flex flex-wrap">
            {favorites.map((favorite) => (
              <div key={favorite} className="relative w-1/2">
                <img className="w-full" src={favorite} alt="Favorite" />
                <button
                  onClick={() => handleRemoveFavorite(favorite)}
                  className="absolute top-0 right-0 p-2 text-white"
                >
                  <MdDelete className="text-3xl" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageSearch;
