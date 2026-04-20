# What's this?

This is a simple one-page web app for finding the first line of the lyrics.

# How does it work?

This web app utilizes the public `Lyrics.ovh` API. The retrieval method is located at `src/fetchLyricsComponent` then to the main page.

## Lyrics retrieval process

1. After the user types in the song name, the function that is used to retrieve the lyrics (step 2 onwards) runs after 500ms of wait time to prevent excessive requests.
2. The web app contacts the `/suggest` endpoint of the `Lyrics.ovh` API, then gets a list of songs with the result available from Deezer.
3. If an exact match of the song name typed at the input box is found, then it retrieves the song from the API.
   - If there is no exact match of the song name, then it retrieves the first result from the `/suggest` endpoint.
   - Some modifications are made with song / artist names with symbol. For information refer to the comment at `src/fetchLyricsComponent`
4. To show the first line of the lyric, there is a code that splits the original multiline lyrics response from the API and retrieves the first line.
   - Some songs does not have a standard lyric-only first line, such as [Verse 1] - The script advances to the next line when `[]` is found in the first line of the lyrics
   - Blank lines are filtered out in the process.
