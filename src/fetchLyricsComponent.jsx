import ky from "ky";

export const fetchLyrics = async (songName) => {
  try {
    const response = await ky.get(`https://api.lyrics.ovh/suggest/${songName}`);
    const data = await response.json();
    if (data.total > 0) {
      let constructed = ""; // initialize constructed artist/songname combination for URL
      // from all the results, best to pick the song name that matches the response
      const preprocessData = data.data.find(
        (s) => s.title && s.title.toLowerCase() === songName.toLowerCase(),
      );
      const info = ["", ""]; // create blank info for footer

      // if the artist name contains "," and "&" replace it appropriately
      // so that the Lyrics.ovh API can parse it properly
      // example: "Earth, Wind & Fire" => "Earth Wind and Fire"

      // if the found song name contains multiple parentheses, it removes everything from second parantheses onwards
      // example: "I Want You (She's So Heavy) (Remastered 2009)" => "I Want You (She's So Heavy)"

      if (preprocessData) {
        // found lyrics with exact name as song
        constructed =
          preprocessData.artist.name.replace(",", "").replace("&", "and") +
          "/" +
          preprocessData.title
            .replace(",", "")
            .replace("&", "and")
            .replace("/", " ")
            .replace("'", "")
            .replace(/(\(.*?\).*?)\(.*?\).*/, "$1");
        info[0] = preprocessData.artist.name;
        info[1] = preprocessData.title;
      } else {
        // else get first from index
        constructed =
          data.data[0].artist.name.replace(",", "").replace("&", "and") +
          "/" +
          data.data[0].title
            .replace(",", "")
            .replace("&", "and")
            .replace("/", " ")
            .replace("'", "")
            .replace(/(\(.*?\).*?)\(.*?\).*/, "$1");
        info[0] = data.data[0].artist.name;
        info[1] = data.data[0].title;
      }
      // construct URL
      const constructedData = await ky
        .get(`https://api.lyrics.ovh/v1/${constructed}`)
        .json();
      if (constructedData) {
        // return lyrics and song information in plaintext
        return {
          songInfo: info,
          lyrics: constructedData.lyrics,
        };
      }
    }
  } catch (error) {
    if (songName !== "") {
      console.error("Failed to fetch lyrics:", error);
      return "???";
    } else {
      console.error("Failed to fetch lyrics:", error);
      return "...";
    }
  }
};
