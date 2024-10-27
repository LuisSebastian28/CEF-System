import React from 'react';
import { ResourceCard } from './ResourceCard';

export const ResourceCategory = ({ title, files, type }) => {
    return (
        <section className="mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-700">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {files.map((file, index) => (
                    <ResourceCard key={index} file={file} type={type} />
                ))}
            </div>
        </section>
    );
};
