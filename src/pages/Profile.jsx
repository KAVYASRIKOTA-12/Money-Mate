import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const APP_VERSION = '1.0.0';

function Profile() {
    const { currentUser, updateProfile } = useAuth();

    const [name, setName] = useState(currentUser?.name || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [nameMessage, setNameMessage] = useState('');
    const [nameError, setNameError] = useState('');

    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // --- Update Name ---
    function handleNameSubmit(e) {
        e.preventDefault();
        setNameMessage('');
        setNameError('');

        const result = updateProfile({ name });

        if (!result.success) {
            setNameError(result.error);
            return;
        }

        setNameMessage('Name updated successfully!');
    }

    // --- Change Password ---
    function handlePasswordSubmit(e) {
        e.preventDefault();
        setPasswordMessage('');
        setPasswordError('');

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError('Please fill in all password fields.');
            return;
        }

        if (currentPassword !== currentUser?.password) {
            setPasswordError('Current password is incorrect.');
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError('New password must be at least 6 characters.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('New passwords do not match.');
            return;
        }

        if (newPassword === currentPassword) {
            setPasswordError('New password must be different from current.');
            return;
        }

        // TODO: Update password in AuthContext
        // For now, show success message
        setPasswordMessage(
            'Password change requested. (Coming soon — backend needed.)'
        );

        // Clear fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }

    return (
        <div className="container py-4">
            <h2 className="fw-bold">Profile Settings</h2>
            <p className="text-muted">
                Manage your personal account information.
            </p>

            {/* --- Account Overview --- */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <div className="d-flex align-items-center gap-3">
                        <div
                            className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
                            style={{ width: '64px', height: '64px', fontSize: '1.5rem' }}
                        >
                            {currentUser?.name?.charAt(0).toUpperCase() || '?'}
                        </div>

                        <div>
                            <h5 className="fw-bold mb-1">{currentUser?.name}</h5>
                            <p className="text-muted mb-0 small">
                                {currentUser?.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Update Name --- */}
            <h5 className="fw-bold mb-3">Account Information</h5>

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <h6 className="fw-bold mb-1">Display Name</h6>
                    <p className="text-muted small mb-3">
                        This name appears in your profile and navbar.
                    </p>

                    {nameMessage && (
                        <div className="alert alert-success" role="alert">
                            ✅ {nameMessage}
                        </div>
                    )}

                    {nameError && (
                        <div className="alert alert-danger" role="alert">
                            ⚠️ {nameError}
                        </div>
                    )}

                    <form onSubmit={handleNameSubmit}>
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

                        <div className="mb-3">
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

                        <button type="submit" className="btn btn-success">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>

            {/* --- Change Password --- */}
            <h5 className="fw-bold mb-3">Security</h5>

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <h6 className="fw-bold mb-1">Change Password</h6>
                    <p className="text-muted small mb-3">
                        Update your password to keep your account secure.
                    </p>

                    {passwordMessage && (
                        <div className="alert alert-info" role="alert">
                            {passwordMessage}
                        </div>
                    )}

                    {passwordError && (
                        <div className="alert alert-danger" role="alert">
                            ⚠️ {passwordError}
                        </div>
                    )}

                    <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Current Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter current password"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="At least 6 characters"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Confirm New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter new password"
                            />
                        </div>

                        <button type="submit" className="btn btn-success">
                            Update Password
                        </button>
                    </form>
                </div>
            </div>

            

            <p className="text-muted text-center small mt-4 mb-0">
                💰 Track your money, master your future.
            </p>
        </div>
    );
}

export default Profile;