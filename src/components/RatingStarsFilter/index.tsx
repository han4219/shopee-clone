import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import StarYellow from 'src/svgs/StarYellow'
import StarYellowOutline from 'src/svgs/StarYellowOutline'

/*
  Index tổng 0: index từ 0 - 4 đều là màu vàng
  Index tổng 1: index từ 0 - 3 đều là màu vàng
  Index tổng 2: index từ 0 - 2 đều là màu vàng
  Index tổng 3: index từ 0 - 1 đều là màu vàng
  Index tổng 4: index 0 là màu vàng
  => index < 5 - Index tổng là màu vàng
*/
type Props = {
  queryConfig: QueryConfig
}

const RatingStarsFilter: React.FC<Props> = ({ queryConfig }) => {
  const navigate = useNavigate()

  const handleFilterRating = (rating: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(rating)
      }).toString()
    })
  }

  return (
    <div className='pl-4'>
      <div>
        {Array(5)
          .fill(0)
          .map((_, RatingIndex) => (
            <button key={RatingIndex} className='flex py-1' onClick={() => handleFilterRating(5 - RatingIndex)}>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div key={index}>
                    {index < 5 - RatingIndex ? (
                      <div className='mr-1'>
                        <StarYellow />
                      </div>
                    ) : (
                      <div className='mr-1'>
                        <StarYellowOutline />
                      </div>
                    )}
                  </div>
                ))}
              {RatingIndex !== 0 && <span className='text-sm'>trở lên</span>}
            </button>
          ))}
      </div>
    </div>
  )
}

export default RatingStarsFilter
