import React from "react";

// Table component for rendering
export default function(issues) {
    const passIssue = issues.filteredIssues;
    return (
        <table class="table table-bordered table-hover table-striped">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Customer Name</th>
                    <th>Customer Email</th>
                    <th>Created_On</th>
                    <th>Closed_On</th>
                    <th>Status</th>
                    <th>Employee Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {passIssue.map(user => {
                    return (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.customer_name}</td>
                            <td>{user.customer_email}</td>
                            <td>{user.created_timestamp}</td>
                            <td>{user.closed_timestamp}</td>
                            <td>{user.status}</td>
                            <td>{user.employee_name}</td>
                            <td>{user.description}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
