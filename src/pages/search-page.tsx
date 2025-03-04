import { ChangeEvent, ReactNode, useState } from "react";
//TODO: absolute imports
import UnsplashService from "../services/unsplash-service";
import { useQuery } from "@tanstack/react-query";

const unsplashServie = new UnsplashService();

//TODO: refactor
export function SearchPage(): ReactNode {
  const [searchValue, setSearchValue] = useState("");

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  const query = useQuery({
    queryKey: ["search", searchValue],
    queryFn: () => unsplashServie.searchPhotos(searchValue),
  });

  console.log(query.data);

  const isResultEmpty = !query.data?.results.length;

  //TODO: check semantic 
  return (
    <section>
      <input value={searchValue} onChange={handleInputChange} />

      <section>
        {isResultEmpty && <div>Нет результатов</div>}

        {!isResultEmpty &&
          query.data?.results.map((photo) => (
            <div key={photo.id}>
              <img src={photo.urls.thumb} alt={photo.alt_description} />
            </div>
          ))}
      </section>
    </section>
  );
}
