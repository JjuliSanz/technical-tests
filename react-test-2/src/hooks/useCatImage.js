import { useEffect, useState } from "react";

export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState("");

  // para recuperar la imagen cada vez que tenemos una fact nuevo
  useEffect(() => {
    if (!fact) {
      // setImageUrl("");
      console.log('no hay facto');
      return;
    }

    // const firstWord = fact.split(' ').slice[0, 3].join(' ');
    const threeFirstWord = fact.split(" ", 3).join(" ");
    console.log(threeFirstWord);

    fetch(`https://cataas.com/cat/says/${threeFirstWord}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching fact");
        const { url } = res;
        setImageUrl(url);
        console.log(url, "url");
        console.log(imageUrl, "imgurl");
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        // setImageUrl(""); // Establece imageUrl en vacío en caso de error
      });

    return  imageUrl ;
  }, [fact]);
}
