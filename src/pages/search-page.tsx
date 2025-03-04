import { ChangeEvent, ReactNode, useState } from "react";
//TODO: absolute imports
//TODO: imports order
import UnsplashService from "../services/unsplash-service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Gallery } from "../modules/gallery";

const unsplashServie = new UnsplashService();

//TODO: refactor
export function SearchPage(): ReactNode {
  const [searchValue, setSearchValue] = useState("");

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["photos", searchValue],
    queryFn: (ctx) => unsplashServie.searchPhotos(searchValue, ctx.pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    select: (data) => {
      // Преобразуем данные для удобства использования
      return {
        photos: data.pages.map((page) => page.results),
      };
    },
    initialPageParam: 1,
  });

  console.log("data", data);

  const photos = data ? data.photos.flatMap((d) => d) : [];

  //TODO: check semantic
  return (
    <section>
      <input value={searchValue} onChange={handleInputChange} />

      <Gallery
        photos={photos}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </section>
  );
}
