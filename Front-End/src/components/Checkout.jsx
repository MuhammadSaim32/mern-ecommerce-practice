import React from 'react'

function Checkout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Payment Successful</h1>
        <p className="text-gray-700">Your payment was processed successfully!</p>
      </div>
    </div>
  )
}

export default Checkout