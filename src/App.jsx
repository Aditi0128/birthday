import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function App() {
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audio, setAudio] = useState(null);
  const [buttonPos, setButtonPos] = useState({ top: "50%", left: "50%" });
  const [trollMode, setTrollMode] = useState(true);

  const slides = [
    {
      src: "/cool_ahh.jpg",
      caption: "Entering new era! 19(old ahh) 😎",
      song: "/dynamite.mp3",
    },
    {
      src: "/cute.jpg",
      caption: "Flashback to you were 16 💕",
      song: "/flashback.mp3",
    },
    {
      src: "/explorer.jpg",
      caption: "Our little explorer 🌍",
      song: "/jump.mp3",
    },
    {
      src: "/flashback.jpg",
      caption: " Previous era  🎞️",
      song: "/flashback.mp3",
    },
    {
      src: "/getting_cooler.jpg",
      caption: "Getting cooler every year 🔥",
      song: "/wiser.mp3",
    },
    {
      src: "/photo1.jpg",
      caption: "Rickshaw vibes 🫶",
      song: "/areyouready.mp3",
    },
    { src: "/photo2.jpg", caption: "happy happy🌸", song: "/dynamite.mp3" },
  ];

  // 🎂 Play Happy Birthday on homepage
  useEffect(() => {
    if (!showSlideshow) {
      const birthdaySong = new Audio("/happybirthday.mp3");
      birthdaySong.loop = true;
      birthdaySong.play();
      setAudio(birthdaySong);
      return () => birthdaySong.pause();
    }
  }, [showSlideshow]);

  // 🎵 Play song for slideshow photo
  useEffect(() => {
    if (showSlideshow) {
      if (audio) audio.pause();
      const song = new Audio(slides[currentIndex].song);
      song.play();
      setAudio(song);
      return () => song.pause();
    }
  }, [currentIndex, showSlideshow]);

  // 🏃 Troll button random movement (first 5s)
  useEffect(() => {
    if (trollMode) {
      const interval = setInterval(() => {
        const top = Math.random() * 70 + 10;
        const left = Math.random() * 70 + 10;
        setButtonPos({ top: `${top}%`, left: `${left}%` });
      }, 500);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setButtonPos({ top: "50%", left: "50%" });
        setTrollMode(false);
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [trollMode]);

  // 🏃 Troll button dodge
  const handleButtonHover = (e) => {
    if (!trollMode) return;
    const button = e.target.getBoundingClientRect();
    const offset = 50;
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    if (!x || !y) return;
    let newLeft = Math.random() * 80 + 10;
    let newTop = Math.random() * 80 + 10;
    if (x > button.left && x < button.right)
      newLeft = newLeft > 50 ? newLeft - offset : newLeft + offset;
    if (y > button.top && y < button.bottom)
      newTop = newTop > 50 ? newTop - offset : newTop + offset;
    setButtonPos({ top: `${newTop}%`, left: `${newLeft}%` });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-300 to-yellow-200 overflow-hidden">
      <Confetti
        recycle={!showSlideshow}
        numberOfPieces={showSlideshow ? 0 : 400}
      />

      {!showSlideshow && (
        <div className="flex flex-col items-center justify-center text-center min-h-screen p-4 sm:p-6 relative bg-gradient-to-b from-pink-100 to-purple-200 overflow-hidden">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHIzYTA5eHMwMzN2ZXQ0MmtuYjdtOWtzdGJmeTNld2tucDFjdnU0NiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/lgPVnjdVYshd8MfhYR/giphy.gif"
            alt="spinning"
            className="w-24 sm:w-28 h-24 sm:h-28 rounded-full border-4 border-purple-600 shadow-lg animate-spin mb-6"
          />

          <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-700 drop-shadow-lg mb-4">
            🎉 Happy Birthday Vruddhi 🎉
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-8">
            With love, memes, and Taylor Swift vibes from aditi 💖
          </p>

          <button
            onClick={() => setShowSlideshow(true)}
            onMouseMove={handleButtonHover}
            onTouchMove={handleButtonHover}
            style={{
              top: buttonPos.top,
              left: buttonPos.left,
              position: "absolute",
              transform: "translate(-50%, -50%)",
              zIndex: 20,
            }}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm sm:text-lg shadow-lg transition-all duration-300"
          >
            Open Memories 🎁
          </button>

          {/* Floating GIFs */}
          <img
            src="https://media1.giphy.com/media/xT0Cyhi8GCSU91PvtC/giphy.gif"
            alt="dog"
            className="w-20 sm:w-28 absolute top-10 left-4 sm:left-6 rounded-xl shadow-lg animate-bounce z-10"
          />
          <img
            src="https://media4.giphy.com/media/XMmf6i3xuKZiPMvNZe/giphy.gif"
            alt="cat"
            className="w-24 sm:w-32 absolute top-20 right-4 sm:right-6 rounded-xl shadow-lg animate-pulse z-10"
          />
          <img
            src="https://media.giphy.com/media/TSVr7oZUj8InuTofCD/giphy.gif"
            alt="taylor"
            className="w-24 sm:w-28 absolute bottom-10 left-4 sm:left-10 rounded-xl shadow-lg animate-spin-slow z-10"
          />
          <img
            src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
            alt="party dog"
            className="w-24 sm:w-32 absolute bottom-20 right-4 sm:right-8 rounded-xl shadow-lg animate-bounce z-10"
          />
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3Z4NWdmYnQ5NW91ZzI0YWg4MjgwaTVyanJ2aGoxMW51dzZ5N3NneCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/9bc43u6nFOxgpfoPyF/giphy.gif"
            alt="cake"
            className="w-20 sm:w-24 absolute top-1/2 left-0 rounded-xl shadow-lg animate-pulse z-10"
          />
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG00d2hpemVnZnJ2c2lsY20xczhzY3dnOGN4b2FjYnp1aTZmNHVvdiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/wSLgAC3rqQljfeQE2f/giphy.gif"
            alt="dancing cat"
            className="w-24 sm:w-28 absolute top-1/3 right-0 rounded-xl shadow-lg animate-bounce z-10"
          />
        </div>
      )}

      {/* Slideshow Popup with animated gradient */}
      {showSlideshow && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center z-50 p-4
             bg-gradient-to-b from-[#0A0F2B] via-[#1A1F4B] to-[#2A2E6B]
             overflow-hidden"
        >
          <img
            src={slides[currentIndex].src}
            alt="slideshow"
            className="max-h-[60vh] max-w-full rounded-xl shadow-lg border-4 border-white object-contain z-10"
          />
          <p className="text-white text-base sm:text-xl mt-4 z-10">
            {slides[currentIndex].caption}
          </p>

          <div className="flex gap-4 mt-6 flex-wrap justify-center z-10">
            <button
              onClick={() =>
                setCurrentIndex(
                  (prev) => (prev - 1 + slides.length) % slides.length
                )
              }
              className="px-4 py-2 bg-pink-500 text-white rounded-lg"
            >
              ⬅ Prev
            </button>
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % slides.length)
              }
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Next ➡
            </button>
          </div>

          <button
            onClick={() => setShowSlideshow(false)}
            className="mt-6 px-5 py-2 bg-red-600 text-white rounded-lg z-10"
          >
            Close ❌ and listen bday song
          </button>
        </div>
      )}
    </div>
  );
}
