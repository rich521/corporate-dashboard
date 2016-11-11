import React from "react";

// Google Map and Info component for rendering
export default function(infoMarker) {
    const passInfo = infoMarker.infoMarker;
    return (
        <table class="table table-bordered table-hover table-striped">
            <thead>
                <tr>
                    <th>City</th>
                    <th>Company Name</th>
                    <th>Employees</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{passInfo.city}</td>
                    <td>{passInfo.company_name}</td>
                    <td>{passInfo.employees}</td>
                </tr>
            </tbody>
        </table>
    );
}
