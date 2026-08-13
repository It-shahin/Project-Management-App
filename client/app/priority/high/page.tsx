import React from 'react'
import ReausablePriorityPage from '../reusablePriorityPage'
import { Priority } from '@/state/api'

const Urgent = () => {
  return (
   <ReausablePriorityPage
    priority={Priority.High}
   />
  )
}

export default Urgent
