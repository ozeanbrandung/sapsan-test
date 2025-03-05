import { ChangeEvent, ReactNode, useState } from 'react';
//TODO: absolute imports
//TODO: imports order
import UnsplashService from '../services/unsplash-service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Gallery } from '../modules/gallery';
import { SearchGroup } from '../modules/search-group';
import clsx from 'clsx';

const unsplashServie = new UnsplashService();

//TODO: refactor
export function SearchPage(): ReactNode {
  const [searchValue, setSearchValue] = useState('');

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  const { status, data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery(
    {
      queryKey: ['photos' /*, searchValue*/],
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
      //enabled: !!searchValue,
    },
  );

  function handleSearchBtnClick() {
    refetch();
  }

  function clearSearchValue() {
    setSearchValue('');
    //refetch();
  }

  //console.log("data", data);

  const photos = data ? data.photos.flatMap((d) => d) : [];

  //TODO: check semantic
  return (
    <section>
      <SearchGroup
        className={clsx('transition duration-300 ease pb-[16px] pt-[10px] sticky top-0 bg-white z-1', {
          'translate-y-[232px]': !photos.length && !searchValue,
          'translate-y-0': !!photos.length && searchValue,
        })}
        searchValue={searchValue}
        handleInputChange={handleInputChange}
        handleSearchBtnClick={handleSearchBtnClick}
        clearSearchValue={clearSearchValue}
      />

      {!!photos.length && searchValue && (
        <Gallery
          photos={photos}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}

      {!photos.length && searchValue && (
        <div className="py-[40px]">
          <p className="font-[18px] text-(--color-dark-grey)">К сожалению, поиск не дал результатов</p>
        </div>
      )}
    </section>
  );
}
