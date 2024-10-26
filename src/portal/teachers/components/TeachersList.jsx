// src/portal/components/TeachersList.js
import React from 'react';
import { TeacherCard } from './TeacherCard';

export const TeachersList = ({ teachers, onContact }) => (
    <div className="w-4/5 mx-auto p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {teachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} onContact={onContact} />
            ))}
        </div>
    </div>
);
