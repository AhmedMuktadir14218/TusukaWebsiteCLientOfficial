import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Tusuka_Logo_tr.png'; // Make sure this path is correct
import { Link } from 'react-router-dom';

interface Job {
    id: number;
    position: string;
    vacancy: number;
    job_context: string;
    job_responsibilities: string;
    educational_requirements: string;
    experience: string;
    job_location: string;
    salary: string;
    application_deadline: string;
    additional_requirements: string | null;
    other_benefits: string | null;
    created_at: string;
    updated_at: string;
    user_id: number;
}

function JoinWithUse() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
     const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/readjobs`); // Replace with your actual API URL
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data.success && Array.isArray(data.jobs.data)) {
                    setJobs(data.jobs.data); // Accessing the 'data' property within 'jobs'
                } else {
                    throw new Error('API response format is not as expected or success is false.');
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handleSeeMoreClick = (job: Job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    const handleApplyNowClick = () => {
        // Implement your application logic here, e.g., redirect to an application form
        alert(`Applying for ${selectedJob?.position}!`);
        handleCloseModal(); // Close modal after action
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
                <motion.img
                    src={logo}
                    alt="Company Logo"
                    className="h-32 w-32 mb-6" // Adjust size as needed
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-500"></div>
                <p className="ml-4 text-xl text-gray-700 mt-4">Loading career opportunities...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-red-50 p-6 rounded-lg shadow-lg">
                <p className="text-red-700 text-2xl font-bold mb-4">Error loading jobs:</p>
                <p className="text-red-600 text-lg">{error}</p>
                <p className="text-red-500 mt-4">Please try again later or contact support.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto min-h-screen p-8">
            <div className=' px-4 py-15  '>
                <motion.h1
                    className="text-5xl font-extrabold text-center text-gray-900 mb-12 drop-shadow-lg"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    Join Our Dynamic Team
                </motion.h1>

                <motion.p
                    className="text-center text-xl text-gray-700 max-w-3xl mx-auto mb-16 leading-relaxed"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.0, delay: 0.2 }}
                >
                    Explore exciting career opportunities and become a part of a growing company dedicated to innovation and excellence. We're looking for passionate individuals to contribute to our success.
                </motion.p>

                {jobs.length === 0 ? (
                    <div className="text-center text-2xl text-gray-600 mt-20">
                        <p>No job openings available at the moment. Please check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {jobs.map((job, index) => (
                            <motion.div
                                key={job.id}
                                className="bg-white rounded-xl shadow-xl overflow-hidden p-8 border border-blue-200 hover:shadow-2xl transition-all duration-300"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ translateY: -5 }} // Subtle lift on hover
                            >
                                <h2 className="text-3xl font-bold text-indigo-700 mb-4">{job.position}</h2>
                                <p className="text-gray-600 mb-2">
                                    <span className="font-semibold">Vacancy:</span> {job.vacancy}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <span className="font-semibold">Location:</span> {job.job_location}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <span className="font-semibold">Salary:</span> {job.salary}
                                </p>

                                <div className="space-y-4 text-gray-700 text-sm mb-6">
                                    <p>
                                        <span className="font-semibold text-gray-800">Context:</span> {job.job_context.substring(0, 150)}...
                                    </p>
                                </div>

                                <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4 mt-6 border-blue-100">
                                    <span>Deadline: {new Date(job.application_deadline).toLocaleDateString()}</span>
                                    <button
                                        onClick={() => handleSeeMoreClick(job)}
                                        className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 transform hover:scale-105 shadow-lg"
                                    >
                                        See More
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Job Details Modal */}
            <AnimatePresence>
                {isModalOpen && selectedJob && (
                    <motion.div
                        className="fixed inset-0 backdrop-blur-sm  flex items-center justify-center p-4 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseModal} // Close on outside click
                    >
                        <motion.div
                            // Add a custom class for scrollbar hiding
                            className="bg-[#e6e6ec] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-no-scrollbar transform scale-95"
                            initial={{ scale: 0.95, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 50 }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            onClick={e => e.stopPropagation()} // Prevent modal from closing when clicking inside
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <button
                                        onClick={handleCloseModal}
                                        className="text-gray-500 hover:text-gray-700 transition duration-200 p-2 -ml-2 rounded-full hover:bg-gray-100"
                                    >
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                        </svg>
                                    </button>
                                    <h2 className="text-4xl font-extrabold text-gray-900 text-center flex-grow -mt-1">{selectedJob.position}</h2>
                                    <div className="w-7 h-7"></div> {/* Spacer for alignment */}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-lg text-gray-700 mb-8 border-b pb-6 border-gray-200">
                                    <p><span className="font-semibold text-gray-800">Vacancy:</span> {selectedJob.vacancy}</p>
                                    <p><span className="font-semibold text-gray-800">Location:</span> {selectedJob.job_location}</p>
                                    <p><span className="font-semibold text-gray-800">Salary:</span> {selectedJob.salary}</p>
                                    <p><span className="font-semibold text-gray-800">Deadline:</span> {new Date(selectedJob.application_deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>

                                <div className="space-y-6 text-gray-800 mb-10">
                                    <div>
                                        <h3 className="text-2xl font-bold text-indigo-700 mb-3">Job Context</h3>
                                        <p className="leading-relaxed text-base">{selectedJob.job_context}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-indigo-700 mb-3">Job Responsibilities</h3>
                                        <p className="leading-relaxed text-base">{selectedJob.job_responsibilities}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-indigo-700 mb-3">Educational Requirements</h3>
                                        <p className="leading-relaxed text-base">{selectedJob.educational_requirements}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-indigo-700 mb-3">Experience</h3>
                                        <p className="leading-relaxed text-base">{selectedJob.experience}</p>
                                    </div>
                                    {selectedJob.additional_requirements && (
                                        <div>
                                            <h3 className="text-2xl font-bold text-indigo-700 mb-3">Additional Requirements</h3>
                                            <p className="leading-relaxed text-base">{selectedJob.additional_requirements}</p>
                                        </div>
                                    )}
                                    {selectedJob.other_benefits && (
                                        <div>
                                            <h3 className="text-2xl font-bold text-indigo-700 mb-3">Other Benefits</h3>
                                            <p className="leading-relaxed text-base">{selectedJob.other_benefits}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-center mt-8">
                                   
                                    <button
                                        onClick={handleApplyNowClick}
                                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition duration-300 transform hover:scale-105"
                                    >
                                        <Link to='contact-us'> Apply Now</Link>
                                       
                                    </button>
                                   
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default JoinWithUse;