import { ChangeEvent, ReactNode, useState } from 'react';
//TODO: absolute imports
//TODO: imports order
import UnsplashService from '../services/unsplash-service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Gallery } from '../modules/gallery';
import { SearchGroup } from '../modules/search-group';
import clsx from 'clsx';
import { UIButton, UIDialog, UILayout } from '../ui';

const unsplashServie = new UnsplashService();

//TODO: refactor
export function SearchPage(): ReactNode {
  const [searchValue, setSearchValue] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  const { /*status, */data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['photos', currentQuery],
    queryFn: (ctx) => unsplashServie.searchPhotos(currentQuery, ctx.pageParam),
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
    enabled: !!currentQuery,
    //keepPreviousData: true,
    retry: 2,
  });

  function handleSearchBtnClick() {
    refetch();
    setCurrentQuery(searchValue);
  }

  function handleSearchBtnKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'Enter') {
      handleSearchBtnClick();
    }
  }

  function clearSearchValue() {
    setSearchValue('');
    setCurrentQuery('');
    //refetch();
  }

  //TODO: not only url, but complete photo object
  const [chosenPhotoUrl, setChosenPhotoUrl] = useState('');

  function handlePhotoClick(url: string) {
    setChosenPhotoUrl(url);
  }

  const photos = data ? data.photos.flatMap((d) => d) : [];

  const isNothingFound = !photos.length && currentQuery && !isFetching; //&& status === 'success' && !isFetching;
  const isSomethingFound = !!photos.length && currentQuery; //&& status === 'success' && !isFetching;

  //console.log(status);

  //TODO: check semantic
  return (
    <>
      <div className={clsx('transition duration-300 ease pb-[16px] pt-[10px] sticky top-0 bg-white z-1')}>
        <UILayout>
          <SearchGroup
            className={clsx('transition duration-300 ease relative', {
              'animate-[var(--animate-to-right)]': !(isSomethingFound || isNothingFound),
              'animate-[var(--animate-to-left)]': isSomethingFound || isNothingFound,
            })}
            searchValue={searchValue}
            handleInputChange={handleInputChange}
            clearSearchValue={clearSearchValue}
            searchBtn={
              //TODO: move to json
              <UIButton onClick={handleSearchBtnClick} onKeyDown={handleSearchBtnKeyDown} disabled={isFetching}>
                Искать
              </UIButton>
            }
          />
        </UILayout>
      </div>

      <UILayout className={clsx({ 'py-[40px]': isNothingFound })} tag="section">
        {/* {isInitialLoading && (<div>Загрузка...</div>)}
        {status === 'error' && <div>Ошибка: {error.message}</div>}
        {status === 'success' && isFetching && !isFetchingNextPage && <div>Ожидание...</div>} */}
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
