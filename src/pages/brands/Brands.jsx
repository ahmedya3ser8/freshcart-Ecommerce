import { useQuery } from "@tanstack/react-query";
import axios from "axios"

export default function Brands() {
  function getAllBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let {data, isLoading, isError, error} = useQuery({
    queryKey: ['brands'],
    queryFn: getAllBrands,
    gcTime: 1000 * 60,
    select: (data) => data.data.data
  })
  if (isError) {
    return <p> {error} </p>
  }
  if (isLoading) {
    return <div className='flex justify-center items-center h-screen'>
      <span className="loader"></span>
    </div>
  }
  return (
    <section className="mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {data.map((brand) => (
          <div key={brand._id} className="border border-green-500 p-2 rounded-2xl overflow-hidden">
            <img src={brand.image} className="h-[150px] w-full object-contain" alt={brand.name} />
            <h3 className="text-green-600 text-xl text-center my-3 mx-2"> {brand.name} </h3>
          </div>
        ))}
      </div>
    </section>
  )
}
