// components/PaginatedList.tsx
import { useEffect, useState } from 'react';

const PaginatedList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 10;

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${itemsPerPage}`);
      const result = await response.json();
      console.log(result.data);
      
      setData(result.data);
      setTotalPages(result.metadata.numberOfPages); // You need your API to return totalPages or totalItems
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {data?.map((item) => (
            <li key={item.id} className="p-4 border rounded bg-white shadow">
              {item.title}
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1 border rounded ${
                pageNum === currentPage ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedList;
