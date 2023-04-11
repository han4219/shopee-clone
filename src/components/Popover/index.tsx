import React, { useRef, useState, useId, ElementType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FloatingArrow, FloatingPortal, arrow, offset, shift, useFloating } from '@floating-ui/react'

type Props = {
  children: React.ReactNode
  content?: React.ReactNode
  className?: string
  offsetCrossAxis?: number
  offsetMainAxis?: number
  type: ElementType
  initialOpen?: boolean
}

export default function Popover({
  children,
  content,
  offsetCrossAxis = 0,
  offsetMainAxis = 6,
  className,
  type: Element,
  initialOpen = false
}: Props) {
  const id = useId()
  const arrowRef = useRef(null)
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen)
  const { x, y, strategy, refs, context, middlewareData } = useFloating({
    open: isOpen,
    middleware: [
      offset({
        crossAxis: offsetCrossAxis,
        mainAxis: offsetMainAxis
      }),
      shift(),
      arrow({
        element: arrowRef
      })
    ]
  })

  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }
  return (
    <Element className={className} onMouseEnter={showPopover} onMouseLeave={hidePopover} ref={refs.setReference}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ x: 0, opacity: 1, transform: 'scale(1)' }}
              transition={{ duration: 0.1 }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
            >
              {content}
              <FloatingArrow ref={arrowRef} context={context} fill='white' width={20} height={10} />
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
