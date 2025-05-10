"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaginationButtonProps {
  currentPage: number
  totalPages: number
}

export function PaginationButton({ currentPage, totalPages }: PaginationButtonProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams?.toString())
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  // Generate page numbers to display
  const generatePagination = (currentPage: number, totalPages: number) => {
    // If total pages is 7 or less, show all pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // If current page is among the first 3 pages
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, "...", totalPages]
    }

    // If current page is among the last 3 pages
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    // If current page is somewhere in the middle
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
  }

  const pages = generatePagination(currentPage, totalPages)

  return (
    <div className="flex items-center justify-center gap-1">
      <Button
        variant="outline"
        size="icon"
        asChild
        disabled={currentPage <= 1}
        className={cn(currentPage <= 1 && "opacity-50 cursor-not-allowed")}
      >
        <Link href={createPageURL(currentPage - 1)}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous Page</span>
        </Link>
      </Button>

      {pages.map((page, i) => (
        <div key={i}>
          {page === "..." ? (
            <Button variant="outline" size="icon" disabled>
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More Pages</span>
            </Button>
          ) : (
            <Button variant={currentPage === page ? "default" : "outline"} size="icon" asChild={currentPage !== page}>
              {currentPage !== page ? <Link href={createPageURL(page)}>{page}</Link> : <span>{page}</span>}
            </Button>
          )}
        </div>
      ))}

      <Button
        variant="outline"
        size="icon"
        asChild
        disabled={currentPage >= totalPages}
        className={cn(currentPage >= totalPages && "opacity-50 cursor-not-allowed")}
      >
        <Link href={createPageURL(currentPage + 1)}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next Page</span>
        </Link>
      </Button>
    </div>
  )
}
