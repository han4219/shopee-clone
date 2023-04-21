type Props = {
  width?: number
  height?: number
  strokeColor?: string
  strokeWidth?: number
}

export default function ChevronRight({ width = 12, height = 12, strokeWidth = 3, strokeColor }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      width={width}
      height={height}
      strokeWidth={`${strokeWidth}`}
      stroke={strokeColor ? strokeColor : 'currentColor'}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
    </svg>
  )
}
