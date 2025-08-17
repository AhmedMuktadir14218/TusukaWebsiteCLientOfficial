import axios from 'axios';
import { useEffect, useState } from 'react';


type Job = {
    id: number;
    position: string;
    vacancy: number;
    job_context: string;
    job_responsibilities: string;
    educational_requirements: string;
    experience: string;
    additional_requirements?: string | null;
    job_location: string;
    salary: string;
    application_deadline: string;
    other_benefits?: string | null;
    user_id: number;
    created_at: string;
    updated_at: string;
};



const initialFormData: Omit<Job, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
    position: '',
    vacancy: 1,
    job_context: '',
    job_responsibilities: '',
    educational_requirements: '',
    experience: '',
    additional_requirements: null,
    job_location: '',
    salary: 'Negotiable',
    application_deadline: new Date().toISOString().split('T')[0],
    other_benefits: null,
};

const Jobs = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState(initialFormData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const token = localStorage.getItem('token');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/api/jobs`);
            setJobs(response.data.jobs.data || response.data.jobs);
            setError('');
        } catch (err) {
            setError('Failed to fetch jobs');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'vacancy' ? parseInt(value) || 0 : value,
        }));
    };

    const handleCreateClick = () => {
        setEditingJob(null);
        setFormData(initialFormData);
        setIsModalOpen(true);
    };

    const handleEditClick = (job: Job) => {
        setEditingJob(job);
        setFormData({
            position: job.position,
            vacancy: job.vacancy,
            job_context: job.job_context,
            job_responsibilities: job.job_responsibilities,
            educational_requirements: job.educational_requirements,
            experience: job.experience,
            additional_requirements: job.additional_requirements,
            job_location: job.job_location,
            salary: job.salary,
            application_deadline: job.application_deadline,
            other_benefits: job.other_benefits,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingJob(null);
        setFormData(initialFormData);
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingJob) {
                await axios.put(`${API_BASE_URL}/api/jobs/${editingJob.id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await axios.post(`${API_BASE_URL}/api/jobs`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            fetchJobs();
            handleCloseModal();
        } catch (err) {
            setError('Failed to save job');
            console.error(err);
        }
    };

    const handleDeleteJob = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await axios.delete(`${API_BASE_URL}/api/jobs/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                fetchJobs();
            } catch (err) {
                setError('Failed to delete job');
                console.error(err);
            }
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    if (loading) return (
        
          
            <div className="container mx-auto px-4 py-8">
                <p>Loading jobs...</p>
            </div>
 
    );

    if (error && !isModalOpen) return (
    
            <div className="container mx-auto px-4 py-8">
                <p className="text-red-600">{error}</p>
                <button onClick={fetchJobs} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                    Retry
                </button>
            </div>
      
    );

    return (
        
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Job Listings</h1>
                    
                        <button
                            onClick={handleCreateClick}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Create New Job
                        </button>
                    
                </div>

                {/* Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map(job => (
                        <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-bold mb-2">{job.position}</h2>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                        {job.vacancy} vacancy
                                    </span>
                                </div>
                                
                                <div className="space-y-2 mt-4">
                                    <div className="flex items-center text-gray-600">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        {job.job_location}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        {job.salary}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                        Deadline: {new Date(job.application_deadline).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h3 className="font-semibold text-gray-800">Job Context:</h3>
                                    <p className="text-gray-600 text-sm mt-1 line-clamp-3">{job.job_context}</p>
                                </div>

                                
                                    <div className="mt-6 flex space-x-3">
                                        <button
                                            onClick={() => handleEditClick(job)}
                                            className="text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-600 rounded hover:bg-blue-50"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteJob(job.id)}
                                            className="text-red-600 hover:text-red-800 px-3 py-1 border border-red-600 rounded hover:bg-red-50"
                                        >
                                            Delete
                                        </button>
                                    </div>
                              
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal (unchanged from your original) */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-transparent bg-opacity-20 flex items-center justify-center p-4">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <h2 className="text-xl font-semibold mb-4">
                                {editingJob ? 'Edit Job' : 'Create New Job'}
                            </h2>
                            {error && <p className="text-red-600 mb-4">{error}</p>}
                            <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                                    <input
                                        type="text"
                                        id="position"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="vacancy" className="block text-sm font-medium text-gray-700 mb-1">Vacancy</label>
                                    <input
                                        type="number"
                                        id="vacancy"
                                        name="vacancy"
                                        value={formData.vacancy}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                        min="1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="job_location" className="block text-sm font-medium text-gray-700 mb-1">Job Location</label>
                                    <input
                                        type="text"
                                        id="job_location"
                                        name="job_location"
                                        value={formData.job_location}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                                    <input
                                        type="text"
                                        id="salary"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="application_deadline" className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
                                    <input
                                        type="date"
                                        id="application_deadline"
                                        name="application_deadline"
                                        value={formData.application_deadline}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="job_context" className="block text-sm font-medium text-gray-700 mb-1">Job Context</label>
                                <textarea
                                    id="job_context"
                                    name="job_context"
                                    value={formData.job_context}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="job_responsibilities" className="block text-sm font-medium text-gray-700 mb-1">Job Responsibilities</label>
                                <textarea
                                    id="job_responsibilities"
                                    name="job_responsibilities"
                                    value={formData.job_responsibilities}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="educational_requirements" className="block text-sm font-medium text-gray-700 mb-1">Educational Requirements</label>
                                <textarea
                                    id="educational_requirements"
                                    name="educational_requirements"
                                    value={formData.educational_requirements}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                                <textarea
                                    id="experience"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="additional_requirements" className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements (Optional)</label>
                                <textarea
                                    id="additional_requirements"
                                    name="additional_requirements"
                                    value={formData.additional_requirements || ''} // Handle null for optional
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                                    rows={3}
                                />
                            </div>

                            <div className="mb-8">
                                <label htmlFor="other_benefits" className="block text-sm font-medium text-gray-700 mb-1">Other Benefits (Optional)</label>
                                <textarea
                                    id="other_benefits"
                                    name="other_benefits"
                                    value={formData.other_benefits || ''} // Handle null for optional
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                                    rows={3}
                                />
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-sm hover:bg-gray-400 transition duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                                >
                                    {editingJob ? 'Update Job' : 'Create Job'}
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                )}
            </div>
   
    );
};

export default Jobs;