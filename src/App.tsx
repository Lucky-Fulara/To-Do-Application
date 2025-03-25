import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { RootState } from './store';
import LoginForm from './components/Auth/LoginForm';
import TaskInput from './components/Tasks/TaskInput';
import TaskList from './components/Tasks/TaskList';
import { LogOut } from 'lucide-react';
import { logout } from './store/slices/authSlice';

const TodoApp: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="flex justify-between items-center pb-8">
                <h1 className="text-2xl font-semibold">
                  Welcome, {user?.name}
                </h1>
                <button
                  onClick={() => dispatch(logout())}
                  className="flex items-center text-red-500 hover:text-red-700"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
              <div className="py-8">
                <TaskInput />
              </div>
              <div className="pt-8">
                <TaskList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TodoApp />
      </PersistGate>
    </Provider>
  );
}

export default App;