import React from "react";
import { useSelector } from "react-redux";
import Header from "../common/Header";
import LazyLoad from "react-lazyload";

const Profile = () => {
  const user = useSelector((store) => store?.user?.user);
  const likedVideos = useSelector((state) => state?.user?.likedVideos || []);

  if (!user) return null;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-500 p-4">
            <h1 className="text-2xl font-bold text-white">
              {user.name}'s Profile
            </h1>
          </div>
          <div className="p-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name:
              </label>
              <p className="text-gray-900">{user.name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email:
              </label>
              <p className="text-gray-900">{user.email}</p>
            </div>
          </div>
          <div className="p-4">
            <h1 className="text-black text-xl font-bold mb-4">
              Your Liked Videos
            </h1>
            {likedVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {likedVideos.map((videoKey) => (
                  <div
                    key={videoKey}
                    className="border rounded-lg overflow-hidden shadow-md"
                  >
                    <LazyLoad height={200} offset={100}>
                      <iframe
                        className="w-full h-40 md:h-48"
                        src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0&showinfo=0`}
                        title={`YouTube video player - ${videoKey}`}
                        allow="encrypted-media"
                        allowFullScreen
                      ></iframe>
                    </LazyLoad>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                You have not liked any videos yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
