import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask, toggleTask } from '../../store/slices/taskSlice';
import { RootState } from '../../store';
import { Trash2, CheckCircle, Circle, Cloud } from 'lucide-react';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(toggleTask(task.id))}
              className="focus:outline-none"
            >
              {task.completed ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <Circle className="h-6 w-6 text-gray-400" />
              )}
            </button>
            <div>
              <p className={`text-lg ${task.completed ? 'line-through text-gray-400' : ''}`}>
                {task.title}
              </p>
              <span className={`text-sm ${getPriorityColor(task.priority)}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {task.weather && (
              <div className="flex items-center text-sm text-gray-500">
                <Cloud className="h-4 w-4 mr-1" />
                {task.weather.temp}°C
              </div>
            )}
            <button
              onClick={() => dispatch(removeTask(task.id))}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;