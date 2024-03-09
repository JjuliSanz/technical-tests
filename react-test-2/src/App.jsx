import { useEffect, useState } from "react";
import "./App.css";
import { useCatFact } from "./hooks/useCatFact";
import { useCatImage } from "./hooks/useCatImage";

export function App() {
  const { fact, refreshFact } = useCatFact();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!fact) {
      console.log("There is no fact");
      return;
    }

    // const firstWord = fact.split(' ').slice[0, 3].join(' ');
    const threeFirstWord = fact.split(" ", 3).join(" ");
    console.log(threeFirstWord);

    fetch(`https://cataas.com/cat/says/${threeFirstWord}?fontSize=50&fontColor=white`)
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching fact");
        const { url } = res;
        setImageUrl(url);
        console.log(url, "url");
        console.log(imageUrl, "imgurl");
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });

  }, [fact]);

  const handleClick = async () => {
    refreshFact();
  };

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>new fact</button>
      {fact && <p>{fact}</p>}
      {!imageUrl && <p>no hay imagen</p>}
      {imageUrl && (
        <img
          src={`${imageUrl}`}
          alt={`Image extract using the first three words for ${fact}`}
        />
      )}
    </main>
  );
}
