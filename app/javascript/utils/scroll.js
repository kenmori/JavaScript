import { findDOMNode } from 'react-dom'

export const scrollToElement = ref => {
  const element = findDOMNode(ref)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
  }
}
