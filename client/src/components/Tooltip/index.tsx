import * as RadixTooltip from '@radix-ui/react-tooltip'
import { useState } from 'react'

interface TooltipProps {
  children: React.ReactNode
  content: JSX.Element
  displayArrow?: boolean
  triggerOnClick?: boolean
  triggerOnHover?: boolean
  open?: boolean
}

const Tooltip = ({ children, content, displayArrow = true, triggerOnClick, triggerOnHover, open }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(!!open)
  const handleOnClick = () => {
    if (!isOpen) {
      setIsOpen(true)
      setTimeout(() => {
        setIsOpen(false)
      }, 1000)
    }
  }

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root open={isOpen}>
        <RadixTooltip.Trigger
          asChild
          onClick={triggerOnClick ? handleOnClick : () => {}}
          onMouseOver={triggerOnHover ? () => setIsOpen(true) : () => {}}
          onMouseOut={triggerOnHover ? () => setIsOpen(false) : () => {}}
        >
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="z-50 max-w-[500px] data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] font-bold"
            sideOffset={5}
          >
            {content}
            {displayArrow && <RadixTooltip.Arrow className="fill-white" />}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}

export default Tooltip
