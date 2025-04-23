import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import CategoryItem from '../../components/category-item/CategoryItem';

export default function Categories() {
  function getAllCategories() {
    return axios.get(`/api/v1/categories`);
  }
  let {data, isLoading, isError, error} = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
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
    <section className='mt-10'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data.map((category) => (
          <CategoryItem key={category._id} {...category} />
        ))}
      </div>
    </section>
  )
}
