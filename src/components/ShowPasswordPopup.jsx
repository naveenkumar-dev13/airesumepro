import React from 'react'

function ShowPasswordPopup( setTempValue, setShowPasswordPopup, showPasswordPopup, confirmPasswordSave) {
  return (
    <div>
        {showPasswordPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <form onSubmit={confirmPasswordSave}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                  onChange={(e) => setTempValue(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                  onChange={(e) => setTempValue(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                  onChange={(e) => setTempValue(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordPopup(false)}
                  className="p-2 border
                 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default ShowPasswordPopup
