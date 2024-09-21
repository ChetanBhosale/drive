import React from 'react'
import Badge from './Badge'

const WorkflowCard = ({ workflow }) => {
  const prospectArray = workflow.prospect_details.split(' OR ')

  return (
    <div className="border border-gray-200 rounded-lg shadow-lg p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 hover:from-blue-50 hover:via-gray-50 hover:to-blue-100 transition-transform transform hover:scale-[1.01] cursor-pointer hover:shadow-2xl group">
      <h3 className="font-bold text-xl mb-3 group-hover:text-blue-600">
        {workflow.company_details}
      </h3>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-1">Industry</p>
        <Badge text={workflow.industry} color="indigo" />
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-1">Location</p>
        {workflow.location.split('OR').map((prospect, index) => (
          <Badge key={index} text={prospect} color="blue" />
        ))}
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-1">Company Size</p>
        <p className="text-base text-gray-800 font-semibold">
          {workflow.lower_limit} - {workflow.upper_limit} employees
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-1">Prospects</p>
        {prospectArray.map((prospect, index) => (
          <Badge key={index} text={prospect} color="blue" />
        ))}
      </div>
    </div>
  )
}

export default WorkflowCard
