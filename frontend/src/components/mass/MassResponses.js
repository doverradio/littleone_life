import React from 'react';
import PieChart from '../utils/piechart/PieChart';
import ReusableDatatable from '../utils/datatable/ReusableDatatable';
import { deleteMassAttendances } from '../../api/massAttendance'; // Import the function

const MassResponses = ({ massAttendances, pieChartData, massesPerPage, fetchMassAttendances, setMassAttendances, userId, token }) => {

    const handleDelete = async (selectedIds) => {
        if (window.confirm('Are you sure you want to delete the selected masses?')) {
            try {
                const response = await deleteMassAttendances(selectedIds, token);
                if (response) {
                    console.log('Deleted successfully');

                    // Update your state or UI here
                    fetchMassAttendances(); // Fetch updated mass attendances
                }
            } catch (error) {
                console.error('Delete operation failed:', error);
                // Show error message to user if needed
            }
        }
    };

    const columns = [
        {
            header: 'Mass Time',
            accessor: 'massTime'
        },
        {
            header: 'Church',
            accessor: 'church',
        },
        {
            header: 'Created At',
            accessor: 'createdAt',
            isDate: true // Assuming you have date formatting logic in your table
        },
    ];

    const onRowSelect = (rowData) => {
        console.log('Selected Row Data:', rowData);
    };

    return (
        <div>
            <div className="container mt-5">
                <div className="row my-3">
                    <div className="col-12">
                        <p style={{ fontWeight: 'bold' }}>Total: {massAttendances.length} Masses</p>
                    </div>
                </div>
            </div>
            
            <PieChart data={pieChartData} />

            <ReusableDatatable 
                data={massAttendances}
                columns={columns}
                pageSize={massesPerPage}
                checkbox={true}
                onRowSelect={onRowSelect}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default MassResponses;
