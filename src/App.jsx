import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import lovesvg from "./assets/All You Need Is Love SVG Cut File.svg";
import lovesvg2 from "./assets/Love In The Air SVG Cut File.svg";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [forcedYes, setForcedYes] = useState(false);
  const yesButtonSize = noCount * 20 + 16;
  const bearImage = "/bear-roses.jpg";
  const bearImageFallback =
    "https://gifdb.com/images/high/cute-Love-bear-roses-ou7zho5oosxnpo6k.gif";

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    setForcedYes(true);
    setYesPressed(true);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "Plsss? :( You're breaking my heart",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  useEffect(() => {
    if (!yesPressed) return;

    const duration = 3500;
    const end = Date.now() + duration;
    const interval = setInterval(() => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() > end) {
        clearInterval(interval);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [yesPressed]);

  return (
    <div className="overflow-hidden flex flex-col items-center justify-center pt-4 h-screen -mt-16 selection:bg-rose-600 selection:text-white text-zinc-900">
      {yesPressed ? (
        <>
          <audio autoPlay loop>
            <source src="/you-getting-fd-tonight.mp3" type="audio/mpeg" />
          </audio>
          <img
            src="/yes.gif"
            alt="Happy valentine reaction"
          />
          <div className="text-4xl md:text-6xl font-bold my-4">
            It says YES! 💘
          </div>
          {forcedYes && (
            <div className="text-lg md:text-2xl font-semibold text-rose-700">
              No turns into YES 😉
            </div>
          )}
        </>
      ) : (
        <>
          <img
            src={lovesvg}
            alt="All you need is love"
            className="fixed animate-pulse top-10 md:left-24 left-6 md:w-40 w-28"
          />
          <img
            src={lovesvg2}
            alt="Love is in the air"
            className="fixed bottom-16 -z-10 animate-pulse md:right-24 right-10 md:w-40 w-32"
          />
          <img
            className="h-[230px] rounded-lg shadow-lg"
            src={bearImage}
            alt="Bear holding roses"
            onError={(event) => {
              if (event.currentTarget.src !== bearImageFallback) {
                event.currentTarget.src = bearImageFallback;
              }
            }}
          />
          <h1 className="text-4xl md:text-6xl my-4 text-center">
            Will you be my Valentine?
          </h1>
          <div className="flex flex-wrap justify-center gap-2 items-center">
            <button
              className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-4`}
              style={{ fontSize: yesButtonSize }}
              onClick={() => setYesPressed(true)}
            >
              Yes
            </button>
            <button
              onClick={handleNoClick}
              className=" bg-rose-500 hover:bg-rose-600 rounded-lg text-white font-bold py-2 px-4"
            >
              No
            </button>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

const Footer = () => {
  return (
    <a
      className="fixed bottom-2 right-2 backdrop-blur-md opacity-80 hover:opacity-95 border p-1 rounded border-rose-300"
      href="https://github.com/Xeven777/valentine"
      target="__blank"
    >
      Made with{" "}
      <span role="img" aria-label="heart">
        ❤️
      </span>
    </a>
  );
};
