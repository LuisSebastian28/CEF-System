import React from 'react';
import { Sidebar } from '../Sidebar';



export const FormsPage = () => {
    return (
      <div className="flex h-screen bg-gray-200">
        <div className="flex flex-col items-center p-10 bg-gray-100 w-full">
          <h1 className="text-3xl font-bold mb-6">Forms</h1>
          <div className="flex justify-around w-full">
            {/* Formulario 5 Day Club */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 mx-2">
              <h2 className="text-2xl font-semibold mb-4">5 Day Club Form</h2>
              <p className="mb-4">Fill out the form for the 5 Day Club event.</p>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clubName">
                    Club Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="clubName"
                    type="text"
                    placeholder="Enter club name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clubLocation">
                    Club Location
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="clubLocation"
                    type="text"
                    placeholder="Enter club location"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clubDate">
                    Club Date
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="clubDate"
                    type="date"
                  />
                </div>
                <div className="mb-4 flex">
                  <div className="mr-2 w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clubStartTime">
                      Start
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="clubStartTime"
                      type="time"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clubEndTime">
                      End
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="clubEndTime"
                      type="time"
                    />
                  </div>
                </div>
                <button
                  className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="button"
                >
                  Submit 5 Day Club Form
                </button>
              </form>
            </div>
  
            {/* Formulario Goodnews Camp */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 mx-2">
              <h2 className="text-2xl font-semibold mb-4">Goodnews Camp Form</h2>
              <p className="mb-4">Fill out the form for the Goodnews Camp event.</p>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="campName">
                    Camp Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="campName"
                    type="text"
                    placeholder="Enter camp name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="campLocation">
                    Camp Location
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="campLocation"
                    type="text"
                    placeholder="Enter camp location"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="campDate">
                    Camp Date
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="campDate"
                    type="date"
                  />
                </div>
                <div className="mb-4 flex">
                  <div className="mr-2 w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="campStartTime">
                      Start
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="campStartTime"
                      type="time"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="campEndTime">
                      End
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="campEndTime"
                      type="time"
                    />
                  </div>
                </div>
                <button
                  className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="button"
                >
                  Submit Goodnews Camp Form
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  