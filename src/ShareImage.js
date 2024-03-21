import React from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa";

const ShareImage = ({ imageUrl }) => {
  const shareOnFacebook = () => {
    const url = encodeURIComponent(imageUrl);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(imageUrl);
    window.open(`https://twitter.com/intent/tweet?url=${url}`, "_blank");
  };
  return (
    <div className="flex pl-4 rounded-lg bg-slate-200  items-center align-middle gap-2 mt-5 justify-center">
      <p className="text-semibold text-slate-500">Share : </p>
      <button
        onClick={shareOnFacebook}
        className="  text-blue-400 hover:text-blue-700 text-3xl font-bold  rounded mr-3"
      >
        <FaFacebook />
      </button>
      <button
        onClick={shareOnTwitter}
        className="text-blue-400 hover:text-blue-700 text-3xl  font-bold py-2 px-4 rounded mr-3"
      >
        <FaTwitter />
      </button>
    </div>
  );
};

export default ShareImage;
