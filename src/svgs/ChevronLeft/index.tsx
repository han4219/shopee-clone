type Props = {
  width?: number
  height?: number
  strokeColor?: string
  strokeWidth?: number
}

export default function ChevronLeft({ width = 12, height = 12, strokeWidth = 3, strokeColor }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={`${strokeWidth}`}
      width={width}
      height={height}
      stroke={strokeColor ? strokeColor : 'currentColor'}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
    </svg>
  )
}
