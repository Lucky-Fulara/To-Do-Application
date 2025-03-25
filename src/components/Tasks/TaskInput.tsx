import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/slices/taskSlice';
import { Plus } from 'lucide-react';
import { Task } from '../../types';
import { getWeather, getCities } from '../../services/weatherApi';
import { debounce } from 'lodash';

const TaskInput: React.FC = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [location, setLocation] = useState('');
  const [cities, setCities] = useState<Array<{ name: string; country: string; state?: string }>>([]);
  const [showCities, setShowCities] = useState(false);
  const dispatch = useDispatch();

  const debouncedSearch = debounce(async (search: string) => {
    if (search.length >= 2) {
      const results = await getCities(search);
      setCities(results);
      setShowCities(true);
    } else {
      setCities([]);
      setShowCities(false);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(location);
    return () => debouncedSearch.cancel();
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location) return;

    const weather = await getWeather(location);
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
      weather,
    };

    dispatch(addTask(newTask));
    setTitle('');
    setPriority('medium');
    setLocation('');
    setCities([]);
    setShowCities(false);
  };

  const selectCity = (city: { name: string; country: string; state?: string }) => {
    setLocation(`${city.name}, ${city.country}`);
    setShowCities(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        
        <div className="relative">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location for weather..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          {showCities && cities.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {cities.map((city, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => selectCity(city)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
                >
                  {city.name}, {city.state && `${city.state}, `}{city.country}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task['priority'])}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          
          <button
            type="submit"
            disabled={!title.trim() || !location}
            className="px-6 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskInput;