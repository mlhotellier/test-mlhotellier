import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Testimonial from './Testimonial.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Testimonial />
  </StrictMode>
)
