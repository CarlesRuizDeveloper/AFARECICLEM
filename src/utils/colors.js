export const getColorByCourse = (curs) => {
  switch (curs) {
    case '1r ESO':
      return { bgColor: 'bg-red-200', textColor: 'text-red-800', iconColor: 'text-red-500' };
    case '2n ESO':
      return { bgColor: 'bg-green-100', textColor: 'text-green-800', iconColor: 'text-green-500' };
    case '3r ESO':
      return { bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', iconColor: 'text-yellow-500' };
    case '4t ESO':
      return { bgColor: 'bg-blue-100', textColor: 'text-blue-800', iconColor: 'text-blue-500' };
    case '1r Primària':
      return { bgColor: 'bg-pink-200', textColor: 'text-pink-800', iconColor: 'text-pink-500' };
    case '2n Primària':
      return { bgColor: 'bg-violet-200', textColor: 'text-violet-800', iconColor: 'text-violet-500' };
    case '3r Primària':
      return { bgColor: 'bg-sky-100', textColor: 'text-sky-800', iconColor: 'text-sky-500' };
    case '4t Primària':
      return { bgColor: 'bg-teal-100', textColor: 'text-teal-800', iconColor: 'text-teal-500' };
    case '5è Primària':
      return { bgColor: 'bg-indigo-100', textColor: 'text-indigo-800', iconColor: 'text-indigo-500' };
    case '6è Primària':
      return { bgColor: 'bg-lime-100', textColor: 'text-lime-800', iconColor: 'text-lime-500' };
    case '1r Batxillerat':
      return { bgColor: 'bg-cyan-100', textColor: 'text-cyan-800', iconColor: 'text-cyan-500' };
    case '2n Batxillerat':
      return { bgColor: 'bg-rose-200', textColor: 'text-rose-800', iconColor: 'text-rose-500' };
    default:
      return { bgColor: 'bg-gray-100', textColor: 'text-gray-800', iconColor: 'text-gray-500' };
  }
};
