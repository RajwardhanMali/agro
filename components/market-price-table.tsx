"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

interface MarketPriceTableProps {
  state: string;
  commodity: string;
  district: string;
}

export function MarketPriceTable({
  state,
  commodity,
  district,
}: MarketPriceTableProps) {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      const queryParams = new URLSearchParams({
        "api-key": process.env.NEXT_PUBLIC_GOV_API_KEY || "",
        limit: itemsPerPage.toString(),
        offset: ((page - 1) * itemsPerPage).toString(),
        format: "json",
        ...(state !== "All States" && { "filters[state.keyword]": state }),
        ...(commodity && { "filters[commodity]": commodity }),
        ...(district && { "filters[district]": district }),
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MARKET_PRICES_API_URL}?${queryParams}`
      );
      const result = await response.json();
      setData(result.records || []);
      setTotalPages(Math.ceil(result.total / itemsPerPage));
    }
    fetchData();
  }, [page, state, commodity, district]);

  const getPaginationItems = () => {
    const items = [];
    if (page > 1) {
      items.push(
        <PaginationItem key="prev">
          <PaginationLink
            onClick={() => setPage(page - 1)}
            className="cursor-pointer"
          >
            {page - 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    items.push(
      <PaginationItem key="current">
        <PaginationLink isActive className="cursor-pointer">
          {page}
        </PaginationLink>
      </PaginationItem>
    );
    for (let i = 1; i <= 3 && page + i <= totalPages; i++) {
      items.push(
        <PaginationItem key={page + i}>
          <PaginationLink
            onClick={() => setPage(page + i)}
            className="cursor-pointer"
          >
            {page + i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mandi</TableHead>
            <TableHead>Commodity</TableHead>
            <TableHead>Variety</TableHead>
            <TableHead className="text-right">Min Price (₹/q)</TableHead>
            <TableHead className="text-right">Max Price (₹/q)</TableHead>
            <TableHead className="text-right">Modal Price (₹/q)</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.market}</TableCell>
              <TableCell>{item.commodity}</TableCell>
              <TableCell>{item.variety}</TableCell>
              <TableCell className="text-right">{item.min_price}</TableCell>
              <TableCell className="text-right">{item.max_price}</TableCell>
              <TableCell className="text-right">{item.modal_price}</TableCell>
              <TableCell>{item.arrival_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={
                page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
              }
            />
          </PaginationItem>
          {getPaginationItems()}
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className={
                page === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
