import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef, useState } from 'react';
import { IPhoto } from '../../services/unsplash-service';
import { useWindowSize } from '../../app';
import { Button } from '@headlessui/react';

interface IGalleryProps {
  photos: IPhoto[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  handlePhotoClick: (url: string) => void;
}

export function Gallery({ photos, hasNextPage, isFetchingNextPage, fetchNextPage, handlePhotoClick }: IGalleryProps) {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const { width } = useWindowSize();

  //TODO: make numbers constants
  const isDesktop = width >= 1440;

  //const imageSize = isDesktop ? 204 : 114;
  const [imageSize, setImageSize] = useState(isDesktop ? 204 : 114);
  const [columnsCount, setColumnsCount] = useState(isDesktop ? 6 : 3);
  //const columnsCount = isDesktop ? 6 : 3;

  useEffect(() => {
    if (isDesktop) {
      setImageSize(204);
      setColumnsCount(6);
    } else {
      setImageSize(114);
      setColumnsCount(3);
    }
  }, [isDesktop]);

  console.log(imageSize);

  const virtualizer = useWindowVirtualizer({
    count: hasNextPage ? photos.length + 1 : photos.length,
    estimateSize: () => imageSize, // Приблизительная высота элемента
    overscan: 5, // Количество дополнительных элементов для рендера
    gap: 10,
    lanes: columnsCount,
  });

  useEffect(() => {
    virtualizer.measure();
  }, [imageSize, columnsCount]);

  useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= photos.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, photos.length, isFetchingNextPage, virtualizer.getVirtualItems()]);

  return (
    <div ref={parentRef}>
      <div
        className="relative w-full"
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          //width: '100%',
          //position: '',
        }}
      >
        {virtualizer.getVirtualItems().map((item) => {
          const isLoaderRow = item.index > photos.length - 1;
          const photo = photos[item.index];

          console.log(item.index === 0 && item);

          if (!photo) return null;

          return (
            <Button
              key={item.key}
              className="absolute w-[114px] h-[114px] lg:w-[204px] lg:h-[204px] cursor-pointer"
              onClick={() => handlePhotoClick(photo.urls.regular)}
              style={{
                transform: `translateY(${item.start}px) translateX(${item.lane * imageSize + 10 * item.lane}px)`,
              }}
            >
              {/* <div key={photo.id} className='w-[114px] h-[114px]'> */}
              <img
                className="w-full h-full object-cover"
                src={photo.urls.thumb}
                alt={photo.alt_description}
                loading="lazy"
              />
              {/* </div> */}
              {isLoaderRow && hasNextPage && 'Loading...'}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
