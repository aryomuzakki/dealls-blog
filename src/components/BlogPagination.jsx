"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const BlogPagination = ({ currentPage, totalPage, goToPage }) => {

  const pageRange = Array.from({ length: Math.min((totalPage - (currentPage - 1) + 1), 3) }, (_, idx) => idx + (currentPage - 1));

  const isMore = currentPage + 1 < totalPage;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => goToPage(--currentPage)}
            className={`${currentPage <= 1 ? "pointer-events-none opacity-50" : ""}`}
          />
        </PaginationItem>
        {pageRange.map((pageNum) => {
          if (pageNum <= 0) return;
          return (
            <PaginationItem key={pageNum} >
              <PaginationLink
                onClick={() => goToPage(pageNum)}
                {...currentPage === (pageNum) && { isActive: true }}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        {isMore && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => goToPage(++currentPage)}
            className={`${currentPage >= totalPage ? "pointer-events-none opacity-50" : ""}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default BlogPagination