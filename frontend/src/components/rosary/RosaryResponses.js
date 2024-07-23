import React from 'react';
import PieChartMysteries from './PieChartMysteries';
import ReusableDatatable from '../utils/datatable/ReusableDatatable';
import { formatDataForTable } from './utils/rosaryUtils';

const RosaryResponses = ({ rosaries, chartData, columns, handleRowSelect, handleDelete, refreshTrigger }) => {
    // Ensure rosaries is always treated as an array
    const formattedRosaries = Array.isArray(rosaries) ? rosaries : [];

    return (
        <div>
            <div className="container mt-5">
                <div className="row my-3">
                    <div className="col-12">
                        <p style={{ fontWeight: 'bold' }}>Total: {formattedRosaries.length} Rosaries</p>
                    </div>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-12">
                    <p><sup>The most recent rosary prayed is outlined in the table below:</sup></p>
                    <ReusableDatatable
                        data={formatDataForTable(formattedRosaries)} 
                        columns={columns} 
                        pageSize={30} 
                        checkbox={true}
                        onRowSelect={handleRowSelect} 
                        onDelete={handleDelete}
                        refreshTrigger={refreshTrigger}
                    />
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12">
                    <PieChartMysteries data={chartData} />
                </div>
            </div>
        </div>
    );
};

export default RosaryResponses;
