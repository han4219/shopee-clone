import { Link } from 'react-router-dom'
import RatingStarProduct from 'src/components/RatingStarProduct'
import path from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import { formatProductPrice, formatSocialMediaNumber } from 'src/utils/format'

type Props = {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${product._id}`}>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:scale-[1.01] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute left-0 top-0 h-full w-full bg-white object-cover'
          />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[1.75rem] text-sm line-clamp-2'>{product.name}</div>
          <div className='my-4 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatProductPrice(product.price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatProductPrice(product.price)}</span>
            </div>
          </div>
          <div className='flex items-center'>
            <RatingStarProduct rating={product.rating} />
            <div className='ml-2 truncate text-xs'>Đã bán {formatSocialMediaNumber(product.sold)}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
