import { ChangeEvent, ReactNode, useState } from 'react';
//TODO: absolute imports
//TODO: imports order
import UnsplashService from '../services/unsplash-service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Gallery } from '../modules/gallery';
import { SearchGroup } from '../modules/search-group';
import clsx from 'clsx';
import { UIDialog, UILayout } from '../ui';

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

  //TODO: not only url, but complete photo object
  const [chosenPhotoUrl, setChosenPhotoUrl] = useState('');

  function handlePhotoClick(url: string) {
    setChosenPhotoUrl(url);
  }

  //console.log("data", data);

  console.log('search', searchValue);

  const photos = data ? data.photos.flatMap((d) => d) : [];

  const isNothingFound = !photos.length && searchValue;
  const isSomethingFound = !!photos.length && searchValue;

  //TODO: check semantic
  return (
    <>
      <div
        className={clsx('transition duration-300 ease pb-[16px] pt-[10px] sticky top-0 bg-white z-1', {
          'translate-y-[232px]': !searchValue,
          'translate-y-0': isSomethingFound || isNothingFound,
        })}
      >
        <UILayout>
          <SearchGroup
            className={clsx('transition duration-300 ease relative', {
              'translate-x-[-50%] left-[50%]': true,
              //TODO: animation
              //'translate-x-[-50%] left-[50%]': !searchValue,
              //' translate-x-[0%] left-[0%]': isSomethingFound || isNothingFound,
            })}
            searchValue={searchValue}
            handleInputChange={handleInputChange}
            handleSearchBtnClick={handleSearchBtnClick}
            clearSearchValue={clearSearchValue}
          />
        </UILayout>
      </div>

      <UILayout className={clsx({ 'py-[40px]': isNothingFound })} tag="section">
        {isSomethingFound && (
          <>
            <Gallery
              photos={photos}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
              handlePhotoClick={handlePhotoClick}
            />
            <UIDialog isOpen={!!chosenPhotoUrl} handleClose={() => handlePhotoClick('')}>
              <div>
                <img className="max-w-[100vw] max-h-[100vh]" src={chosenPhotoUrl} alt="chosen" />
              </div>
            </UIDialog>
          </>
        )}

        {isNothingFound && (
          <p className="font-[18px] text-(--color-dark-grey)">К сожалению, поиск не дал результатов</p>
        )}
      </UILayout>
    </>
  );
}
