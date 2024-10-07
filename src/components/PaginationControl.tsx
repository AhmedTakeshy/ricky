"use client"
import { ChevronLeftIcon, ChevronRightIcon, } from "@radix-ui/react-icons"
import Link from "next/link"
import { Button } from "./ui/button"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"


type PaginationControlProps = {
    currentPage: number
    metadata: {
        hasNextPage: boolean,
        totalPages: number,
    }
    className?: string
}

export default function PaginationControl({ currentPage, metadata, className }: PaginationControlProps) {

    const hasPreviousPage = currentPage > 1
    const searchParams = useSearchParams()

    const getPageNumbers = () => {
        const { totalPages } = metadata
        const pageNumbers = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            // Less than maxVisiblePages, show all
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i)
            }
        } else {
            // Add first page
            pageNumbers.push(1)
            if (currentPage > 3) {
                pageNumbers.push("...")
            }

            // Pages around the current page
            const startPage = Math.max(currentPage - 1, 2)
            const endPage = Math.min(currentPage + 1, totalPages - 1)
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i)
            }


            if (currentPage < totalPages - 2) {
                pageNumbers.push("...")
            }

            pageNumbers.push(totalPages)
        }

        return pageNumbers
    }

    return (
        <div className={cn("flex items-center justify-center gap-1 mx-auto px-2.5 mt-12", className)}>
            <ChevronLeftIcon className="h-4 w-4 -mr-4" />
            <Button
                asChild={hasPreviousPage}
                variant="ghost"
                className={`rounded-md text-base${currentPage === 1 ? " text-accent-foreground" : "text-white"}`}
                disabled={!hasPreviousPage}>
                <Link href={{
                    query: {
                        ...Object.fromEntries(searchParams),
                        page: currentPage > 1 ? currentPage - 1 : currentPage
                    }
                }}>
                    Previous
                </Link>
            </Button>
            {getPageNumbers().map((page, index) =>
                typeof page === "number" ? (
                    <Button
                        asChild
                        variant={currentPage === page ? "outline" : "ghost"}
                        className={`rounded-md ${currentPage === page ? "bg-accent text-accent-foreground" : ""}`}
                        key={page}>
                        <Link href={{
                            query: {
                                ...Object.fromEntries(searchParams),
                                page
                            }
                        }}>
                            {page}
                        </Link>
                    </Button>
                ) : (
                    <span key={index} className="text-lg text-black">...</span>
                )
            )}
            <Button
                asChild={metadata.hasNextPage}
                variant="ghost"
                className={`rounded-md text-base${currentPage === metadata.totalPages ? " text-accent-foreground" : "text-white"}`}
                disabled={!metadata.hasNextPage}>
                <Link href={{
                    query: {
                        ...Object.fromEntries(searchParams),
                        page: currentPage < metadata.totalPages ? currentPage + 1 : currentPage
                    }

                }}>
                    Next
                </Link>
            </Button>
            <ChevronRightIcon className="h-4 w-4 -ml-4" />
        </div>
    )
}