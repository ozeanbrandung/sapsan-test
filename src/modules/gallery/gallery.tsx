import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';
import { IPhoto } from '../../services/unsplash-service';

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
    estimateSize: () => 200, // Приблизительная высота элемента
    overscan: 5, // Количество дополнительных элементов для рендера
    gap: 10,
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
    <section ref={parentRef}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((item) => {
          const isLoaderRow = item.index > photos.length - 1;
          const photo = photos[item.index];

          if (!photo) return null;

          return (
            <div
              key={item.key}
              style={{
                position: 'absolute',
                //top: 0,
                //left: 0,
                width: '200px',
                height: '200px',
                //height: `${item.size}px`,
                transform: `translateY(${item.start}px)`,
              }}
            >
              <div key={photo.id}>
                <img
                  src={photo.urls.thumb}
                  alt={photo.alt_description}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                  }}
                />
              </div>
              {isLoaderRow && hasNextPage && 'Loading...'}
            </div>
          );
        })}
      </div>
    </section>
  );
}
