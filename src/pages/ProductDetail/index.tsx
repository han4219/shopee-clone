import { useQuery } from '@tanstack/react-query'
import { useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product'
import InputNumber from 'src/components/InputNumber'
import RatingStarProduct from 'src/components/RatingStarProduct'
import Cart from 'src/svgs/Cart'
import ChevronLeft from 'src/svgs/ChevronLeft'
import ChevronRight from 'src/svgs/ChevronRight'
import Minus from 'src/svgs/Minus'
import Plus from 'src/svgs/Plus'
import { formatProductPrice, formatSocialMediaNumber } from 'src/utils/format'
import DOMPurify from 'dompurify'

const ProductDetail = () => {
  const { Id } = useParams()
  const imageRef = useRef<HTMLImageElement>(null)
  const [currentImagesIndex, setCurrentImagesIndex] = useState([0, 5])
  const [indexActiveImage, setIndexActiveImage] = useState(0)

  const { data } = useQuery({
    queryKey: ['product', [Id]],
    queryFn: () => {
      return productApi.getProductDetail(Id as string)
    }
  })

  const currentImages = useMemo(() => {
    return data?.data.data.images.slice(...currentImagesIndex)
  }, [currentImagesIndex, data?.data.data.images])

  const next = () => {
    if (data && currentImagesIndex[1] < data.data.data.images.length) {
      setCurrentImagesIndex((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const previous = () => {
    if (data && currentImagesIndex[0] > 0) {
      setCurrentImagesIndex((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoom = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    const { width, height } = event.currentTarget.getBoundingClientRect()
    const { offsetX, offsetY } = event.nativeEvent
    image.style.maxWidth = 'unset'
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.left = offsetX * (1 - naturalWidth / width) + 'px'
    image.style.top = offsetY * (1 - naturalHeight / height) + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  if (!data) return null
  else
    return (
      <div className='mb-16 border-b-4 border-orange bg-bodyColor py-4'>
        {data && (
          <div>
            <div className='container'>
              <div className='rounded bg-white p-4'>
                <div className='grid grid-cols-12'>
                  <div className='col-span-5'>
                    <div className='px-4'>
                      <div
                        className='relative w-full overflow-hidden pt-[100%] hover:cursor-zoom-in'
                        onMouseLeave={handleRemoveZoom}
                        onMouseMove={handleZoom}
                      >
                        <img
                          ref={imageRef}
                          src={data.data.data.images[indexActiveImage]}
                          alt={data.data.data.name}
                          className='pointer-events-none absolute top-0 left-0 object-contain'
                        />
                      </div>
                      <div className='mt-4'>
                        <div className='relative flex w-full justify-center gap-2'>
                          {currentImages?.map((image, index) => (
                            <div
                              onFocus={() => setIndexActiveImage(index)}
                              onMouseOver={() => setIndexActiveImage(index)}
                              className={`w-[20%] cursor-pointer border-2 ${
                                indexActiveImage === index ? 'border-orange' : 'border-transparent'
                              }`}
                              key={index}
                            >
                              <img src={image} alt={data.data.data.name} />
                            </div>
                          ))}
                          <button
                            onClick={previous}
                            className='absolute top-1/2 left-0.5 -translate-y-1/2 bg-black/20 py-2'
                          >
                            <ChevronLeft strokeColor='#FFF' width={15} height={20} />
                          </button>
                          <button
                            onClick={next}
                            className='absolute top-1/2 right-0.5 -translate-y-1/2 bg-black/20 py-2'
                          >
                            <ChevronRight strokeColor='#FFF' width={15} height={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-7'>
                    <div className='px-4'>
                      <div>
                        <h1 className='text-xl leading-tight'>{data.data.data.name}</h1>
                      </div>
                      <div className='mt-4 flex items-center'>
                        <div className='flex items-center gap-2'>
                          <div>
                            <p className='border-b-2 border-orange text-lg leading-6 text-orange'>
                              {data.data.data.rating}
                            </p>
                          </div>
                          <div>
                            <RatingStarProduct
                              rating={data.data.data.rating}
                              classNameOutlineStar='h-4 w-4 fill-transparent stroke-orange'
                              classNameSolidStar='h-4 w-4 fill-orange stroke-orange'
                            />
                          </div>
                        </div>
                        <div className='mx-5 h-6 w-[1px] bg-gray-300'></div>
                        <div>
                          {formatSocialMediaNumber(data.data.data.sold)}{' '}
                          <span className='ml-1 text-sm capitalize text-gray-500'>đã bán</span>
                        </div>
                      </div>
                      <div className='mt-4 flex flex-wrap items-center gap-3 rounded-sm bg-gray-100 py-5 px-10'>
                        <p className='text-gray-500 line-through'>
                          ₫{formatProductPrice(data.data.data.price_before_discount)}
                        </p>
                        <p className='text-3xl text-orange'>₫{formatProductPrice(data.data.data.price)}</p>
                        <span className='bg-orange px-2 py-0.5 text-xs font-bold uppercase text-white'>
                          {Math.floor(
                            (((data.data.data.price_before_discount - data.data.data.price) /
                              data.data.data.price_before_discount) %
                              100) *
                              100
                          )}
                          % giảm
                        </span>
                      </div>
                      <div className='my-6'>
                        <div className='flex items-center gap-4 text-sm text-gray-500'>
                          <p>Số Lượng</p>
                          <div className='flex items-center justify-between rounded-sm border-[1px] border-gray-300'>
                            <button className='border-r-[1px] border-gray-300 p-2'>
                              <Minus />
                            </button>
                            <InputNumber
                              classNameInput='outline-none text-center text-black text-base max-w-[50px]'
                              value={1}
                            />
                            <button className='border-l-[1px] border-gray-300 p-2'>
                              <Plus />
                            </button>
                          </div>
                          <p>{data.data.data.quantity} sản phẩm có sẵn</p>
                        </div>
                      </div>
                      <div className='mt-6'>
                        <div className='flex items-center gap-4'>
                          <button className='flex items-center gap-2 rounded-sm border border-orange bg-orange/10 px-6 py-2 transition-all hover:bg-orange/20'>
                            <Cart stroke='#ee4d2d' />
                            <span className='text-base capitalize text-orange'>thêm vào giỏ hàng</span>
                          </button>
                          <button className='rounded-sm bg-orange px-6 py-3 text-base text-white'>Mua Ngay</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='h-5'></div>
            <div className='container'>
              <div className='rounded bg-white p-4'>
                <div className='px-6'>
                  <h1 className=' mb-4 bg-gray-50 p-4 text-xl font-medium uppercase'>chi tiết sản phẩm</h1>
                  <div
                    className='px-4'
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.data.data.description) }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
}

export default ProductDetail
