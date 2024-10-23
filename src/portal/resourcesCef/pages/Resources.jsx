import React from 'react';

const resourcesData = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', action: 'Download', image: 'path/to/great_gatsby_image.png' },
  { title: 'Introduction to Algebra', author: 'Math Lessons', category: 'Video', action: 'Watch', image: 'path/to/algebra_image.png' },
  { title: 'Math Worksheet: Fractions', author: 'Task', category: 'Math', action: 'Download', image: 'path/to/worksheet_image.png' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', action: 'Download', image: 'path/to/mockingbird_image.png' },
];

export const Resources = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-4/5 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Resources</h1>
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white py-2 px-4 rounded">Filter</button>
            <input type="text" placeholder="Search resources..." className="py-2 px-4 rounded border border-gray-400" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10">
          {resourcesData.map((resource, index) => (
            <div key={index} className="bg-white p-5 rounded shadow flex flex-col items-center">
              <img src={resource.image} alt={`${resource.title} cover`} className="w-24 h-24 mb-5" />
              <div className="text-center">
                <h2 className="text-xl font-bold">{resource.title}</h2>
                <p className="text-gray-600">{resource.author}</p>
                <p className="text-gray-600">{resource.category}</p>
                <button className="mt-5 bg-blue-600 text-white py-2 px-4 rounded">{resource.action}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
