import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import path from 'src/constants/path'
import CategoryIcon from 'src/svgs/CategoryIcon'
import FunnelIcon from 'src/svgs/FunnelIcon'
import StarYellow from 'src/svgs/StarYellow'
import StarYellowOutline from 'src/svgs/StarYellowOutline'

export default function Aside() {
  return (
    <div className='w-4/5'>
      <div>
        <Link to={path.home} className='flex items-center justify-start pb-4'>
          <CategoryIcon />
          <span className='ml-2 text-base font-bold capitalize'>tất cả danh mục</span>
        </Link>
      </div>
      <div className='h-[1px] w-full bg-gray-300'></div>
      {/* list category */}
      <div className='py-4 pl-3'>
        <ul>
          <li className='py-1.5'>
            <Link to={path.home} className='text-sm font-bold capitalize text-orange transition-all hover:opacity-80'>
              nhà cửa & đời sống
            </Link>
          </li>
          <li className='py-1.5'>
            <Link to={path.home} className='text-sm capitalize transition-all hover:opacity-80'>
              chăn, ga, gối & nệm
            </Link>
          </li>
          <li className='py-1.5'>
            <Link to={path.home} className='text-sm capitalize transition-all hover:opacity-80'>
              trang trí nhà cửa
            </Link>
          </li>
          <li className='py-1.5'>
            <Link to={path.home} className='text-sm capitalize transition-all hover:opacity-80'>
              dụng cụ & thiết bị tiện ích
            </Link>
          </li>
        </ul>
      </div>

      {/* filter, search */}
      <div className=''>
        <div>
          <Link to={path.home} className='flex items-center justify-start py-6'>
            <FunnelIcon />
            <span className='ml-2 text-base font-bold uppercase'>bộ lọc tìm kiếm</span>
          </Link>
        </div>
        <div>
          <p className='pb-4 text-sm capitalize'>khoảng giá</p>
          <form>
            <div className='flex items-center justify-between gap-3'>
              <Input
                type='text'
                placeholder='₫ TỪ'
                classNameInput='w-full rounded-sm border border-gray-300 py-2 px-4 text-sm outline-none focus:border-gray-400 focus:shadow-sm'
                classNameError=''
                className='grow'
              />
              <div className='h-[1px] w-3 flex-shrink-0 bg-gray-400'></div>
              <Input
                type='text'
                placeholder='₫ ĐẾN'
                classNameInput='w-full rounded-sm border border-gray-300 py-2 px-4 text-sm outline-none focus:border-gray-400 focus:shadow-sm'
                classNameError=''
                className='grow'
              />
            </div>
            <Button className='mt-4 flex w-full items-center justify-center rounded-sm bg-orange py-2 uppercase text-white transition-all hover:bg-orange/80'>
              áp dụng
            </Button>
          </form>
        </div>
      </div>
      <div className='my-4 h-[1px] w-full bg-gray-300'></div>
      <div>
        <p className='pb-4 text-sm capitalize'>đánh giá</p>
        <div>
          <div className='my-1 flex items-center gap-1'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div className='h-3.5 w-3.5' key={index}>
                  <StarYellow />
                </div>
              ))}
          </div>
          <div className='my-1 flex items-center gap-1 text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div className='h-3.5 w-3.5' key={index}>
                  <StarYellowOutline />
                </div>
              ))}
            trở lên
          </div>
        </div>
      </div>
      <div className='my-4 h-[1px] w-full bg-gray-300'></div>
      <div>
        <Button className='flex w-full items-center justify-center rounded-sm bg-orange py-2 uppercase text-white transition-all hover:bg-orange/80'>
          xóa tất cả
        </Button>
      </div>
    </div>
  )
}
