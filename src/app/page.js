"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Controls from "./components/Controls";
import Pagination from "./components/Pagination";

// Lazy load IdeaCard component
const IdeaCard = dynamic(() => import("./components/IdeaCard"), {
  suspense: true,
});

// API client setup
const api = axios.create({
  baseURL: "/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default function IdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("currentPage")) || 1;
    }
    return 1;
  });
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("itemsPerPage")) || 10;
    }
    return 10;
  });
  const [sortOrder, setSortOrder] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sortOrder") || "-published_at";
    }
    return "-published_at";
  });
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  // Persist state to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentPage", currentPage);
      localStorage.setItem("itemsPerPage", itemsPerPage);
      localStorage.setItem("sortOrder", sortOrder);
    }
  }, [currentPage, itemsPerPage, sortOrder]);

  // Fetch ideas from API
  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(true);
      try {
        const response = await api.get("/ideas", {
          params: {
            "page[number]": currentPage,
            "page[size]": itemsPerPage,
            "append[]": ["small_image", "medium_image"],
            sort: sortOrder,
          },
        });
        setIdeas(response.data.data || []);
        setTotalItems(response.data.meta?.total || 0);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, [currentPage, itemsPerPage, sortOrder]);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  // Calculate pagination range
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div>
      <Navbar />
      <Hero />
      <main className="content-wrapper">
        <Controls
          startItem={startItem}
          endItem={endItem}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          sortOrder={sortOrder}
          onItemsPerPageChange={handleItemsPerPageChange}
          onSortChange={handleSortChange}
        />
        <div className="ideas-grid">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Suspense fallback={<p>Loading cards...</p>}>
              {ideas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  image={idea.medium_image?.[0]?.url || "/bg1.png"}
                  date={new Date(idea.published_at).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                  title={idea.title}
                />
              ))}
            </Suspense>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
}
