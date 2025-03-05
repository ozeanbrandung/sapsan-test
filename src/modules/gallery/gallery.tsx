import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';
import { IPhoto } from '../../services/unsplash-service';
import { UILayout } from '../../ui/ui-layout/ui-layout';

interface IGalleryProps {
  photos: IPhoto[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export function Gallery({ photos, hasNextPage, isFetchingNextPage, fetchNextPage }: IGalleryProps) {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const virtualizer = useWindowVirtualizer({
    count: hasNextPage ? photos.length + 1 : photos.length,
    estimateSize: () => 114, // Приблизительная высота элемента
    overscan: 5, // Количество дополнительных элементов для рендера
    gap: 10,
    lanes: 3,
  });

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
    <UILayout tag="section" ref={parentRef}>
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

          console.log(item);

          if (!photo) return null;

          return (
            <div
              key={item.key}
              className="absolute w-[114px] h-[114px]"
              style={{
                transform: `translateY(${item.start}px) translateX(${item.lane * 114 + 10 * item.lane}px)`,
              }}
            >
              {/* <div key={photo.id} className='w-[114px] h-[114px]'> */}
              <img className="w-full h-full object-cover" src={photo.urls.thumb} alt={photo.alt_description} />
              {/* </div> */}
              {isLoaderRow && hasNextPage && 'Loading...'}
            </div>
          );
        })}
      </div>
    </UILayout>
  );
}
