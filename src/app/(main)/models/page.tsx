// "use client";
"use client";

import { Badge } from "@components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function usePagination(currentPage, totalPages) {
  const [page, setPage] = useState(currentPage);

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return {
    page,
    totalPages,
    goToPreviousPage,
    goToNextPage,
    goToPage,
  };
}

export default function Models() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const initialPage = parseInt(params.get("page")) || 1; // Initial page

  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(null); // State for total pages
  const [serverUrl, setServerUrl] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.host;
      let domain = host.split(":")[0];
      setServerUrl(`http://${domain}:3020`);
    }
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Clear previous errors

      try {
        const res = await fetch(
          `${serverUrl}/model-changes?page=${initialPage}`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const response = await res.json();
        setRequests(response?.data || []);

        // Update total pages if available in the response
        if (response?.total_pages) {
          setTotalPages(response.total_pages);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [initialPage]); // Dependency array for initial fetch on page change

  const { page, goToPreviousPage, goToNextPage, goToPage } = usePagination(
    initialPage,
    totalPages // Pass totalPages if available, otherwise undefined
  );

  return (
    <main className="w-full flex flex-1 flex-col">
      <Card className="w-full border-none">
        <CardHeader className="w-full">
          <CardTitle>Model changes</CardTitle>
          <CardDescription>
            Recent Model change events from your server.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead> Model Name</TableHead>
                <TableHead className=" sm:table-cell">Event</TableHead>
                <TableHead className=" sm:table-cell">Entity data</TableHead>
                <TableHead className=" md:table-cell">performed_at</TableHead>
                <TableHead className="text-right">performed_by</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request: any) => (
                <TableRow key={request.id} className="bg-accent">
                  <TableCell>
                    <div className="font-medium">{request?.model}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {request?.model}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {request?.type}
                  </TableCell>

                  <TableCell className="">
                    {JSON.stringify(request?.entityData)}
                  </TableCell>
                  <TableCell className="">
                    {JSON.stringify(request?.performedAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    {JSON.stringify(request?.performedBy)}
                  </TableCell>
                  <TableCell className="">
                    <Link href={`/models/${request?.id}`}>See Details</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={goToPreviousPage}
                  isActive={page === 1}
                />
              </PaginationItem>
              {getPaginationItems(page, totalPages)}
              <PaginationItem>
                <PaginationNext
                  onClick={goToNextPage}
                  isActive={page === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </main>
  );
}

function getPaginationItems(currentPage: any, totalPages: any) {
  if (!totalPages) {
    return null; // Handle case where totalPages is not yet available
  }

  const visiblePages = [];

  // Always show the first page
  visiblePages.push({ number: 1, isActive: currentPage === 1 });

  // Show 2 pages before and after the current page (if possible)
  const startIndex = Math.max(Math.min(currentPage - 1, totalPages - 4), 2);
  const endIndex = Math.min(Math.max(currentPage + 1, 4), totalPages - 1);

  // if(startIndex + 1 > 2 && endIndex  totalPages){
  //   visiblePages.push({ isEllipsis: true });
  //   console.log('elipsis')
  // }

  for (let i = startIndex; i <= endIndex; i++) {
    visiblePages.push({ number: i, isActive: currentPage === i });
  }

  // Show ellipsis if there are hidden pages in the middle
  if (endIndex < totalPages - 1 && startIndex >= 2) {
    console.log("elipsis");
    visiblePages.push({ isEllipsis: true });
  } else {
    console.log(" no elipsis");
  }

  // Always show the last page
  visiblePages.push({
    number: totalPages,
    isActive: currentPage === totalPages,
  });

  return visiblePages.map((item) => (
    <PaginationItem key={item.number || "ellipsis"}>
      {item.isEllipsis ? (
        <PaginationEllipsis />
      ) : (
        <PaginationLink href={`?page=${item.number}`} isActive={item.isActive}>
          {item.number}
        </PaginationLink>
      )}
    </PaginationItem>
  ));
}
