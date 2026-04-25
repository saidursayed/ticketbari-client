import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Container from "../../components/Shared/Container/Container";
import TicketCard from "../../components/Home/TicketCard/TicketCard";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import { FaFilter, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { TbArrowsUpDown } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";

const AllTickets = () => {
  const [temp, setTemp] = useState({
    from: "",
    to: "",
    type: "",
    sort: "",
  });

  const [filters, setFilters] = useState({
    from: "",
    to: "",
    type: "",
    sort: "",
  });

  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "tickets",
      filters.from,
      filters.to,
      filters.type,
      filters.sort,
      page,
    ],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/all-tickets?from=${filters.from}&to=${filters.to}&type=${filters.type}&sort=${filters.sort}&page=${page}&limit=${limit}`,
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleSearch = () => {
    setPage(1);
    setFilters(temp);
  };

  const removeFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: "" }));
    setTemp((prev) => ({ ...prev, [key]: "" }));
    setPage(1);
  };

  return (
    <div className="py-10">
      <Container>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary-content">
            All Tickets
          </h1>
          <p className="text-primary-content/70 mt-1">
            Find and book your perfect ticket
          </p>
        </div>

        <div className="w-full bg-white rounded-2xl shadow-md p-6 border border-accent-content my-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            {/* LEFT: From + To */}
            <div className="w-full lg:flex-1 flex flex-col sm:flex-row gap-3">
              {/* From */}
              <div className="flex items-center gap-2 border border-accent-content rounded-lg px-4 py-2 w-full">
                <FaMapMarkerAlt className="text-secondary-content shrink-0" />
                <input
                  type="text"
                  placeholder="From location"
                  value={temp.from}
                  onChange={(e) => setTemp({ ...temp, from: e.target.value })}
                  className="outline-none w-full bg-transparent text-sm font-medium text-primary-content"
                />
              </div>

              {/* To */}
              <div className="flex items-center gap-2 border border-accent-content rounded-lg px-4 py-2 w-full">
                <FaMapMarkerAlt className="text-secondary-content shrink-0" />
                <input
                  type="text"
                  placeholder="To location"
                  value={temp.to}
                  onChange={(e) => setTemp({ ...temp, to: e.target.value })}
                  className="outline-none w-full bg-transparent text-sm font-medium text-primary-content"
                />
              </div>
            </div>

            {/* RIGHT: Filter + Sort + Button */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row sm:justify-between gap-3">
              {/* Type */}
              <div className="flex items-center gap-2 border border-accent-content rounded-lg px-4 py-2 w-full ">
                <FaFilter className="text-secondary-content shrink-0" />
                <select
                  value={temp.type}
                  onChange={(e) => setTemp({ ...temp, type: e.target.value })}
                  className="outline-none bg-transparent text-sm w-full font-medium text-primary-content"
                >
                  <option value="">All Transport</option>
                  <option value="Bus">Bus</option>
                  <option value="Train">Train</option>
                  <option value="Flight">Flight</option>
                  <option value="Launch">Launch</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 border border-accent-content rounded-lg px-4 py-2 w-full ">
                <TbArrowsUpDown className="text-secondary-content shrink-0" />
                <select
                  value={temp.sort}
                  onChange={(e) => setTemp({ ...temp, sort: e.target.value })}
                  className="outline-none bg-transparent text-sm w-full font-medium text-primary-content"
                >
                  <option value="">Default</option>
                  <option value="asc">Low → High</option>
                  <option value="desc">High → Low</option>
                </select>
              </div>

              {/* Button */}
              <button
                onClick={handleSearch}
                className="btn bg-primary/90 text-white rounded-lg hover:bg-primary w-full sm:w-auto px-6 py-2 flex items-center justify-center gap-2"
              >
                <FaSearch />
                <span>Search</span>
              </button>
            </div>
          </div>

          <div>
            {/* Active Filters */}
            {(filters.from || filters.to || filters.type || filters.sort) && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-sm font-semibold">Active filters:</span>

                {filters.from && (
                  <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
                    From: {filters.from}
                    <button
                      onClick={() => removeFilter("from")}
                      className="text-red-500 font-bold"
                    >
                      <RxCross2 className="cursor-pointer text-red-500" />
                    </button>
                  </span>
                )}

                {filters.to && (
                  <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
                    To: {filters.to}
                    <button
                      onClick={() => removeFilter("to")}
                      className="text-red-500 font-bold"
                    >
                      <RxCross2 className="cursor-pointer text-red-500" />
                    </button>
                  </span>
                )}

                {filters.type && (
                  <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {filters.type}
                    <button
                      onClick={() => removeFilter("type")}
                      className="text-red-500 font-bold"
                    >
                      <RxCross2 className="cursor-pointer text-red-500" />
                    </button>
                  </span>
                )}

                {filters.sort && (
                  <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {filters.sort === "asc"
                      ? "Price: Low to High"
                      : "Price: High to Low"}
                    <button
                      onClick={() => removeFilter("sort")}
                      className="text-red-500 font-bold"
                    >
                      <RxCross2 className="cursor-pointer text-red-500" />
                    </button>
                  </span>
                )}

                {/* Clear all */}
                <button
                  onClick={() => {
                    setFilters({ from: "", to: "", type: "", sort: "" });
                    setTemp({ from: "", to: "", type: "", sort: "" });
                    setPage(1);
                  }}
                  className="ml-2 px-3 py-1 text-sm font-medium text-red-500 border border-red-200 rounded-md hover:bg-red-50 hover:text-red-600 transition-all duration-200 cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          {isLoading && <LoadingSpinner />}

          {isFetching && !isLoading && <LoadingSpinner />}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.tickets?.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        </div>

        {/* 📄 PAGINATION */}
        {data?.tickets?.length != 0 && (
          <div className="flex gap-2 mt-6 justify-center">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className={`border-[1.5px] px-4 py-1.5 rounded-md font-semibold transition-all duration-200 cursor-pointer ${page === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200" : "bg-white text-primary hover:bg-primary hover:text-white border-primary"}`}
            >
              Prev
            </button>

            {[...Array(data?.totalPages || 0).keys()].map((n) => (
              <button
                key={n}
                onClick={() => setPage(n + 1)}
                className={`px-3 py-1 border-[1.5px] border-accent-content hover:border-primary rounded-md hover:bg-primary  hover:text-white cursor-pointer transition font-medium ${
                  page === n + 1 ? "bg-primary text-white border-primary" : ""
                }`}
              >
                {n + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === data?.totalPages}
              className={`border-[1.5px] px-4 py-1.5 rounded-md font-semibold transition-all duration-200 cursor-pointer ${page === data?.totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200" : "bg-white text-primary hover:bg-primary hover:text-white border-primary"}`}
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllTickets;
