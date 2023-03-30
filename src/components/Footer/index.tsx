import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-bodyColor py-20'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='flex w-full flex-col justify-between text-grey md:flex-row'>
          <div className='mx-auto md:mx-0'>
            <span className='text-xs md:text-sm'>© 2023 Shopee. Tất cả các quyền được bảo lưu.</span>
          </div>
          <div className='mx-auto my-4 md:mx-0 md:my-0'>
            <span className='text-xs md:text-sm'>
              Quốc gia & Khu vực: Singapore | Indonesia | Đài Loan | Thái Lan | Malaysia | Việt Nam | Philippines |
              Brazil | México | Colombia | Chile
            </span>
          </div>
        </div>
        <div className='mx-auto mt-10 mb-7 flex justify-center'>
          <span className='text-xs text-grey md:text-sm'>
            CHÍNH SÁCH BẢO MẬT | QUY CHẾ HOẠT ĐỘNG | CHÍNH SÁCH VẬN CHUYỂN | CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN
          </span>
        </div>
        <div className='mx-auto flex justify-center'>
          <span className='mb-5 text-xs text-grey md:text-sm'>Công ty TNHH Shopee</span>
        </div>
        <div className='mt-5 flex flex-col items-center gap-3 text-xs text-grey md:text-sm'>
          <p>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </p>
          <p>Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)</p>
          <p>Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015</p>
          <p>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
