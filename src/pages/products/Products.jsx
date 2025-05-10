import { useState } from 'react';
import ProductItem from '../../components/product-item/ProductItem';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProducts = async (page) => {
  const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
    params: {
      page,
      limit: 10
    }
  });
  return res.data;
};

export default function Products() {
  let [searchProducts, setSearchProducts] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
  const {data, isLoading} = useQuery({
    queryKey: ['products', currentPage],
    queryFn: () => fetchProducts(currentPage),
    keepPreviousData: true,
    select: (data) => data
  });

  const totalPages = data?.metadata.numberOfPages ?? 1;
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredProducts = data?.data.filter((product) => product.title.toLowerCase().includes(searchProducts.toLowerCase()));
  if (isLoading) {
    return <div className='flex justify-center items-center h-screen'>
      <span className="loader"></span>
    </div>
  }
  return (
    <section className='mt-10'>
      <input
        value={searchProducts}
        onChange={(e) => setSearchProducts(e.target.value)} 
        type="search" 
        placeholder="search by title..." 
        className="block p-[.5rem_.75rem] text-gray-500 w-[70%] mb-6 mx-auto outline-none border border-green-600 focus:ring-0 focus:border-border-green-600 rounded-lg" 
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {filteredProducts?.length > 0 ? filteredProducts?.map((product) => (
          <ProductItem key={product.id} {...product} />
        )) : <p className='text-gray-500 text-2xl text-center col-span-5'>No Products Found</p>}
      </div>
      {/* pageniation */}
      <div className="p-4">
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
                  pageNum === currentPage ? 'bg-green-500 text-white' : ''
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
    </section>
  )
}
