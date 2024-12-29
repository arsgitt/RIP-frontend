import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { updateProfileAsync} from '../redux/authSlice';
import Navbar from './components/Navbar';
import BreadCrumbs from './components/BreadCrumbs';
import user from '../assets/user.png';

const ProfilePage = () => {
    const { username, isAuthenticated, status, error, success } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        const data: { email?: string; password?: string } = {};
        if (email) data.email = email;
        if (password) data.password = password;

        if (Object.keys(data).length === 0) {
            alert('Необходимо ввести хотя бы один параметр для обновления.');
            return;
        }

        dispatch(updateProfileAsync(data));
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-200 to-gray-400">
            <Navbar />
            <BreadCrumbs path="/profile" />
            <div className="flex justify-center mt-8">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
                    <div className="flex items-center justify-center">
                        <img
                            src={user}
                            alt="User Avatar"
                            className="w-24 h-24 rounded-full shadow-md border border-gray-300"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-center mt-4 text-gray-700">Личный кабинет</h2>
                    <h3 className="text-lg text-center text-gray-600 mt-2">Пользователь: {username}</h3>

                    <form onSubmit={handleProfileUpdate} className="mt-6 space-y-4">
                        {error && <div className="text-red-500 text-center">{error}</div>}
                        {success && <div className="text-green-500 text-center">{success}</div>}
                        {status === 'loading' && <div className="text-blue-500 text-center">Обновление...</div>}

                        <div>
                            <label htmlFor="email" className="block text-gray-600 text-sm mb-1">
                                Новый Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-400"
                                placeholder="Введите новый Email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-600 text-sm mb-1">
                                Новый пароль
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-400"
                                placeholder="Введите новый пароль"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
                        >
                            Обновить профиль
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        <p>
                            <Link
                                to="/"
                                onClick={() => dispatch(logout())}
                                className="text-blue-500 hover:underline"
                            >
                                Выйти из аккаунта
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
