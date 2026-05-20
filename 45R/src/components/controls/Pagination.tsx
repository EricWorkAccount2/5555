import { Button } from "@/components";

type PaginationProps = {
  page: number;
  maxPages: number;
  onClick: (page: number) => void;
};

export const Pagination = ({ page, maxPages, onClick }: PaginationProps) => {
  const safeMaxPages = Math.max(maxPages, 1);

  const goPrev = () => {
    if (page > 1) {
      onClick(page - 1);
    }
  };

  const goNext = () => {
    if (page < safeMaxPages) {
      onClick(page + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-6">
      <Button disabled={page <= 1} onClick={goPrev}>
        Prev
      </Button>

      <p className="font-medium text-gray-300">
        {page} / {safeMaxPages}
      </p>

      <Button disabled={page >= safeMaxPages} onClick={goNext}>
        Next
      </Button>
    </div>
  );
};