import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function EditProfile() {
    const { currentUser, updateProfile } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState(currentUser?.name || '');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        setMessage('');
        setError('');

        const result = updateProfile({ name });

        if (!result.success) {
            setError(result.error);
            return;
        }

        setMessage('Profile updated successfully!');

        // Go back to dashboard after 1.5 seconds
        setTimeout(() => {
            navigate('/dashboard');
        }, 1500);
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="fw-bold mb-2">Edit Profile</h2>
                            <p className="text-muted mb-4">
                                Update your personal information.
                            </p>

                            {message && (
                                <div className="alert alert-success" role="alert">
                                    ✅ {message}
                                </div>
                            )}

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    ⚠️ {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={currentUser?.email || ''}
                                        disabled
                                    />
                                    <small className="text-muted">
                                        Email cannot be changed.
                                    </small>
                                </div>

                                <div className="d-flex gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-success flex-grow-1"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate('/dashboard')}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;