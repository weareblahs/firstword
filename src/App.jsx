import { useEffect, useState } from "react";
import "./App.css";
import { fetchLyrics } from "./fetchLyricsComponent";

function App() {
  const [songName, setName] = useState("");
  const [res, setRes] = useState("...");
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const handler = setTimeout(async () => {
      // set back dynamic data to its original value
      setRes("...");
      setInfo([]);
      const result = await fetchLyrics(songName); // start search
      if (result.length !== 3) {
        // if result is not "???" or "..."
        const outputLyrics = result.lyrics.split("\n").filter((o) => o !== "");
        setRes(result.lyrics[0] === "[" ? outputLyrics[1] : outputLyrics[0]);
        setInfo(result.songInfo);
      } else {
        setRes(result);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [songName]);

  return (
    <>
      <div className="">
        <div className="h-[20vh] p-6">
          {/* top section */}
          <div className="text-center text-4xl">
            <h1>Wait, what's the first line of that song again?</h1>
          </div>
          {/* Following input box modified from https://v1.tailwindcss.com/components/forms */}
          <div class="md:w-1/3 ms-auto me-auto mt-2">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              placeholder="Search song name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <p className="text-center">
            <i>
              Note: Include artist name for better accuracy. Non-English songs
              might not be processed properly.
            </i>
          </p>
        </div>
        <div className="h-[60vh] flex items-center justify-center p-6">
          <div>
            <h1 className="text-5xl/tight lg:text-6xl/snug text-center font-bold">
              {res}
            </h1>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-6 text-center">
          {info.length !== 0 && (
            <p className="text-sm lg:text-base">
              Currently viewing {info[1]} by {info[0]}. Wrong song? Try
              searching with the artist name
            </p>
          )}
          {res === "???" && (
            <p className="text-sm lg:text-base mb-2">
              <b>Seeing this?</b> This song has no lyrics at the moment, or the
              song is an instrumental-only song.
            </p>
          )}
          <p className="text-sm lg:text-base">
            Lyrics data from the <a href="https://lyrics.ovh">Lyrics.ovh</a> API
            (<a href="https://github.com/NTag/lyrics.ovh">source code</a>). Used
            under MIT License. Made by Tan (weareblahs).{" "}
            <a href="https://github.com/weareblahs/">Source code</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
