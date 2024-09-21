import React, { useEffect, useState } from 'react'
import WorkflowModal from '@/components/custom/Modal/WorkflowModal'
import { useGetWorkflowQuery } from '@/store/api/workflowApi'
import WorkflowCard from '@/components/custom/workflowCard'


const WorkFlow = () => {
  const { isLoading, isSuccess, isError, error, data } = useGetWorkflowQuery()
  const [workData, setWorkData] = useState(null)

  useEffect(() => {
    if (isSuccess) {
      setWorkData(data.results)
      console.log(data)
    }
    if (isError) {
      console.log(error)
    }
  }, [isSuccess, isError])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full h-[90vh]">
      <div className="w-full py-4 px-5">
        <WorkflowModal />
      </div>
      <div className="w-full py-4 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workData &&
          workData.map((workflow) => (
            <WorkflowCard key={workflow._id} workflow={workflow} />
          ))}
      </div>
    </div>
  )
}

export default WorkFlow
