
export default function CategoryItem({name,image}) {
  return (
    <div className="border border-green-500 p-2 rounded-2xl overflow-hidden">
      <img src={image} className="h-[150px] w-full object-contain" alt={name} />
      <h3 className="text-green-600 text-xl text-center my-3 mx-2"> {name} </h3>
    </div>
  )
}
