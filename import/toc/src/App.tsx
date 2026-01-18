import { useState } from 'react'
import { TableOfContents, TocItem } from './components/TableOfContents'

const tocItems: TocItem[] = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  {
    id: 'examples',
    label: 'Examples',
    children: [
      { id: 'simple-area-chart', label: 'Simple Area Chart' },
      { id: 'double-area-chart', label: 'Double Area Chart' },
      { id: 'animated-area-chart', label: 'Animated Area Chart' },
    ],
  },
  { id: 'test-cases', label: 'Test Cases' },
  { id: 'props', label: 'Props' },
  { id: 'allowed-variables', label: 'Allowed Variables' },
  { id: 'usecases', label: 'Usecases' },
]

function App() {
  const [activeId, setActiveId] = useState('examples')

  return (
    <TableOfContents
      items={tocItems}
      activeId={activeId}
      onItemClick={setActiveId}
    />
  )
}

export default App
