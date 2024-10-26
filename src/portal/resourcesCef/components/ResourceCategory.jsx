// src/portal/components/ResourceCategory.js
import React from 'react';
import { ResourceCard } from './ResourceCard';

export const ResourceCategory = ({ title, files, type }) => {
    return (
        <section className="mt-12">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {files.map((file, index) => (
                    <ResourceCard key={index} file={file} type={type} />
                ))}
            </div>
        </section>
    );
};
