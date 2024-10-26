import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startDeleteClub, startFetchClubs } from '../../../store/portal/clubs/clubsThunks';
import { FilterButtons } from '../components/FilterButtons';
import { Pagination } from '../components/Pagination';
import { ClubCard } from '../components/ClubCard';
import { ExpandedAttendeesList } from '../components/ExpandedAttendess';
import { AttendeesModal } from '../components/AttendessModal';
import { EditClubModal } from '../components/EditClubModal';

export const Insights = () => {
    const dispatch = useDispatch();
    const { clubs, status, error } = useSelector((state) => state.clubs);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [expandedClubs, setExpandedClubs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('All');
    const itemsPerPage = 10;

    useEffect(() => {
        if (status === 'idle') {
            dispatch(startFetchClubs());
        }
    }, [status, dispatch]);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const filteredClubs = clubs.filter(club => filter === 'All' || club.eventType === filter);
    const currentInsights = filteredClubs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredClubs.length / itemsPerPage);

    const handleExpand = (clubId) => {
        setExpandedClubs(prev => prev.includes(clubId) ? prev.filter(id => id !== clubId) : [...prev, clubId]);
    };

    return (
        <div className="p-8 white min-h-screen">
            <h2 className="text-3xl font-bold mb-4">Insights</h2>
            <FilterButtons filter={filter} setFilter={setFilter} setCurrentPage={setCurrentPage} />
            {status === 'loading' && <p>Cargando clubes...</p>}
            {status === 'failed' && <p className="text-red-500">Error: {error}</p>}

            {status === 'succeeded' && (
                <div className="space-y-4">
                    {currentInsights.map((club) => (
                        <div key={club.id}>
                            <ClubCard
                                club={club}
                                onExpand={handleExpand}
                                onDelete={(id) => dispatch(startDeleteClub(id))}
                                onEdit={() => setIsEditModalOpen(true)}
                                onInfo={() => setIsModalOpen(true)}
                                isExpanded={expandedClubs.includes(club.id)}
                            />
                            {expandedClubs.includes(club.id) && <ExpandedAttendeesList attendees={club.attendees} />}
                        </div>
                    ))}
                </div>
            )}
            <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
            <AttendeesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <EditClubModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
        </div>
    );
};
