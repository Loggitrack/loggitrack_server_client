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
import { useSelector } from 'react-redux';
import { AppState } from "../../store";

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

export default function Requests() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const initialPage = parseInt(params.get("page")) || 1; // Initial page

  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(null); // State for total pages

  // const [serverUrl, setServerUrl] = useState('http://0.0.0.0:3020');
  const serverUrl = useSelector((state: AppState) => state.serverUrl.serverUrl);

  useEffect(() => {
    // if (typeof window !== "undefined") {
    //   const host = window.location.host;
    //   let domain = host.split(":")[0];
    //   setServerUrl(`http://${domain}:3020`);
    // }

    console.log('serverUrl: ', serverUrl)

    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Clear previous errors

      try {
        const res = await fetch(
          `${serverUrl}/request-logs?page=${initialPage}`,
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
          <CardTitle>Requests</CardTitle>
          <CardDescription>Recent requests from your server.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Ip Address
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  Response time
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  response status code
                </TableHead>
                <TableHead className="text-right">Body</TableHead>
                <TableHead className="text-right">Query Params</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request: any) => (
                <TableRow key={request.id} className="bg-accent">
                  <TableCell>
                    <div className="font-medium">{request?.method}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {request?.url}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {request?.remote_address}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      {request?.response_time} ms
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`hidden md:table-cell ${
                      String(request?.response_status_code).startsWith("2")
                        ? "text-green"
                        : "text-red"
                    }`}
                  >
                    {request?.response_status_code}
                  </TableCell>
                  <TableCell className="text-right">
                    {JSON.stringify(request?.body)}
                  </TableCell>
                  <TableCell className="text-right">
                    {JSON.stringify(request?.query_parameters)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/requests/${request?.id}`}>See Details</Link>
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
