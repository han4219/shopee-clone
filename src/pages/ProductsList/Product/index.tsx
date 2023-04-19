import { Link } from 'react-router-dom'
import { Product as ProductType } from 'src/types/product.type'
import { formatAmountSold, formatProductPrice } from 'src/utils/format'

type Props = {
  product: ProductType
}

export default function Product({ product }: Props) {
  const getWidthRating = (rating: number, index: number) => {
    if (index <= rating) return 100
    if (0 < index - rating && index - rating < 1) {
      return 100 - (index - rating) * 100
    }
    return 0
  }

  return (
    <Link to='/'>
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
            <div className='flex'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div className='relative mr-0.5 flex items-center' key={index}>
                    <div
                      className={`absolute top-0 left-0 overflow-hidden`}
                      style={{ width: `${getWidthRating(product.rating, index + 1)}%` }}
                    >
                      <svg
                        enableBackground='new 0 0 15 15'
                        viewBox='0 0 15 15'
                        x={0}
                        y={0}
                        className='h-2.5 w-2.5 fill-[#ffce3d] stroke-[#ffce3d]'
                      >
                        <polygon
                          points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                      </svg>
                    </div>
                    <svg
                      enableBackground='new 0 0 15 15'
                      viewBox='0 0 15 15'
                      x={0}
                      y={0}
                      className='h-2.5 w-2.5 fill-[#d5d5d5] stroke-[#d5d5d5]'
                    >
                      <polygon
                        points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeMiterlimit={10}
                      />
                    </svg>
                  </div>
                ))}
            </div>
            <div className='ml-2 truncate text-xs'>Đã bán {formatAmountSold(product.sold)}</div>
          </div>
        </div>
      </div>
      <div></div>
    </Link>
  )
}
