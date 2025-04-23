
export default function OrderItem({count,price,product}) {
  return (
    <div className="product flex gap-2 border-b border-gray-300 last:border-b-0 py-4">
      <div className="image w-[100px] h-[100px]">
        <img src={product.imageCover} className="w-full h-full rounded-md object-cover" alt="product-image" />
      </div>
      <div className="content flex flex-1 justify-between items-center">
        <div className="">
          <h3 className="text-xl text-[#090f41] mb-1">{product.title.split(' ', 2).join(' ')}</h3>
          <span className="text-gray-300">DeFacto</span>
        </div>
        <div className="">
          <span className="block text-xl text-[#090f41] mb-1"> {price} EGP</span>
          <span className="text-gray-300">Qyt: {count} </span>
        </div>
      </div>
    </div>
  )
}
