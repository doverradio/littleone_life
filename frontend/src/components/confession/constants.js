// Constants for font sizes
export const DEFAULT_FONT_SIZE = 11;
export const MAX_FONT_SIZE = 33;
export const MIN_FONT_SIZE = 11;

// Columns configuration for the ReusableDatatable
export const columns = [
  {
    header: 'Confession Time',
    accessor: 'confessionTime'
  },
  {
    header: 'Church',
    accessor: 'church.name'
  },
  {
    header: 'Created At',
    accessor: 'createdAt',
    isDate: true
  }
];

export const CONFESSION_TIMES_OPTIONS = [
  '8:00 A.M.', '8:30 A.M.', 
  '9:00 A.M.', '9:30 A.M.',
  '10:00 A.M.', '10:30 A.M.', 
  '11:00 A.M.', '11:30 A.M.',
  '12:00 P.M.', '12:30 P.M.', 
  '1:00 P.M.', '1:30 P.M.',
  '2:00 P.M.', '2:30 P.M.', 
  '3:00 P.M.', '3:15 P.M.', '3:30 P.M.', '3:45 P.M.',
  '4:00 P.M.', '4:15 P.M.', '4:30 P.M.', '4:45 P.M.', 
  '5:00 P.M.', '5:15 P.M.', '5:30 P.M.', '5:45 P.M.',
  '6:00 P.M.', '6:15 P.M.', '6:30 P.M.', '6:45 P.M.',
  '7:00 P.M.', '7:15 P.M.', '7:30 P.M.', '7:45 P.M.',
  '8:00 P.M.', '8:15 P.M.', '8:30 P.M.', '8:45 P.M.',
  '9:00 P.M.', '9:15 P.M.', '9:30 P.M.', '9:45 P.M.',
  '10:00 P.M.', '10:15 P.M.', '10:30 P.M.', '10:45 P.M.',
];