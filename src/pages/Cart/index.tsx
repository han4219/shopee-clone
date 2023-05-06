import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { Purchase } from 'src/types/purchase.type'
import { formatProductPrice, formatSocialMediaNumber } from 'src/utils/format'
import { generateProductNameIdInURL } from 'src/utils/utils'
import { produce } from 'immer'
import { keyBy } from 'lodash'

interface ExtendedPurchase extends Purchase {
  disable: boolean
  checked: boolean
}

export default function Cart() {
  const [extendedPuchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])
  const isCheckedAll = useMemo(() => {
    return extendedPuchases.every((purchase) => purchase.checked)
  }, [extendedPuchases])

  const { data: purchaseData, refetch } = useQuery({
    queryKey: ['getPurchases', { status: purchasesStatus.IN_CART }],
    queryFn: () => purchaseApi.getPurchases(purchasesStatus.IN_CART)
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const handleUpdateQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (!enable) {
      return
    }
    const purchase = extendedPuchases[purchaseIndex]
    setExtendedPurchases(
      produce(extendedPuchases, (draft) => {
        draft[purchaseIndex].disable = true
      })
    )

    updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce(extendedPuchases, (draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce(extendedPuchases, (draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isCheckedAll
      }))
    )
  }

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const purchaseObject = keyBy(prev, '_id')
      return (
        purchaseData?.data.data.map((purchase) => ({
          ...purchase,
          disable: false,
          checked: Boolean(purchaseObject[purchase._id]?.checked || false)
        })) || []
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseData])

  return (
    <div className='border-b-2 border-orange bg-bodyColor py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-3 text-sm text-gray-500'>
              <div className='col-span-6'>
                <div className='flex items-center justify-center'>
                  <div className='flex-shrink-0'>
                    <input
                      onChange={handleCheckAll}
                      type='checkbox'
                      checked={isCheckedAll}
                      className='h-5 w-5 border border-gray-300 accent-orange'
                    />
                  </div>
                  <div className='ml-5 flex-grow'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5'>
                  <div className='col-span-2 flex items-center justify-center'>Đơn Giá</div>
                  <div className='col-span-1 flex items-center justify-center'>Số Lượng</div>
                  <div className='col-span-1 flex items-center justify-center'>Số Tiền</div>
                  <div className='col-span-1 flex items-center justify-center'>Thao Tác</div>
                </div>
              </div>
            </div>

            <div className='mt-4 bg-white py-5 px-4'>
              {purchaseData &&
                extendedPuchases.map((purchase, index) => (
                  <div
                    className='mt-5 grid grid-cols-12 rounded-sm border border-gray-200 px-5 py-6 text-sm first:mt-0'
                    key={purchase._id}
                  >
                    <div className='col-span-6'>
                      <div className='flex items-center justify-center gap-3'>
                        <div className='flex-shrink-0'>
                          <input
                            checked={extendedPuchases[index]?.checked || false}
                            onChange={handleCheck(index)}
                            type='checkbox'
                            className='h-5 w-5 border border-gray-300 accent-orange'
                          />
                        </div>
                        <div className='h-20 w-20 flex-shrink-0 overflow-hidden rounded border'>
                          <Link
                            to={path.home + generateProductNameIdInURL(purchase.product.name, purchase.product._id)}
                          >
                            <img src={purchase.product.image} alt={purchase.product.name} />
                          </Link>
                        </div>
                        <div className='flex-grow line-clamp-2'>{purchase.product.name}</div>
                      </div>
                    </div>
                    <div className='col-span-6 my-auto'>
                      <div className='grid grid-cols-5'>
                        <div className='col-span-2 flex items-center justify-center gap-1'>
                          <div className='text-gray-500 line-through'>
                            ₫{formatProductPrice(purchase.price_before_discount)}
                          </div>
                          <div className='text-gray-900'>₫{formatProductPrice(purchase.price)}</div>
                        </div>
                        <div className='col-span-1 flex items-center justify-center'>
                          <QuantityController
                            disabled={purchase.disable}
                            value={purchase.buy_count}
                            max={purchase.product.quantity}
                            onTyping={handleTypeQuantity(index)}
                            onDecrease={(value) => handleUpdateQuantity(index, value, purchase.buy_count > 1)}
                            onIncrease={(value) =>
                              handleUpdateQuantity(index, value, purchase.buy_count < purchase.product.quantity)
                            }
                            onFocusOut={(value) =>
                              handleUpdateQuantity(
                                index,
                                value,
                                purchase.buy_count >= 1 &&
                                  purchase.buy_count <= purchase.product.quantity &&
                                  value !== purchaseData.data.data[index].buy_count
                              )
                            }
                            classNameInput='outline-none text-center text-black text-base max-w-[40px]'
                            decreaseBtnClassName='border-r-[1px] border-gray-300 p-1'
                            increaseBtnClassName='border-l-[1px] border-gray-300 p-1'
                          />
                        </div>
                        <div className='col-span-1 flex items-center justify-center'>
                          <div className='text-orange'>₫{formatProductPrice(purchase.price * purchase.buy_count)}</div>
                        </div>
                        <div className='col-span-1 flex items-center justify-center'>
                          <button className='bg-none transition-colors hover:text-orange'>Xóa</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 my-6 rounded-sm bg-white shadow-shadow-cart'>
          <div className='flex flex-col items-center justify-between gap-4 px-6 py-4 sm:flex-row'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <input
                  checked={isCheckedAll}
                  type='checkbox'
                  onChange={handleCheckAll}
                  id='select-all'
                  className='h-5 w-5 cursor-pointer border border-gray-300 accent-orange'
                />
              </div>
              <div className='ml-3 capitalize text-gray-800'>
                <label htmlFor='select-all' className='cursor-pointer'>
                  Chọn tất cả {'('}
                  {extendedPuchases.length}
                  {')'}
                </label>
              </div>
              <div>
                <button className='ml-4 bg-none text-gray-800 transition-colors hover:text-orange'>Xóa</button>
              </div>
            </div>
            <div className='ml-4 flex flex-col items-center sm:flex-row'>
              <div className='flex items-start'>
                <span className='text-base'>
                  Tổng thanh toán {'('}2 sản phẩm{')'}:
                </span>
                <div className='ml-1 flex flex-col'>
                  <p className='-mt-1 text-2xl text-orange'>₫{formatProductPrice(234000)}</p>
                  <div className='text-base'>
                    Tiết kiệm <span className='text-sm text-orange'>₫{formatSocialMediaNumber(34000)}</span>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <button className='mt-4 ml-3 rounded-sm bg-orange px-14 py-2 capitalize text-white transition-colors hover:bg-orange/80 sm:mt-0'>
                  mua hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
