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
