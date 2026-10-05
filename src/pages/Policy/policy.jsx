import React from "react";

const Policy = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-[70%] bg-white shadow-lg rounded-lg p-6 overflow-y-auto h-[85%]">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold">View Policy</h2>
          <span className="text-gray-500">40%</span>
        </div>

        {/* Policy Content */}
        <div className="mt-4 text-sm text-gray-800">
          <h3 className="text-center font-bold text-lg mb-4">HIRING POLICY</h3>

          <p className="mb-3">
            <strong>1. OVERVIEW</strong>
            <br />
            [COMPANY NAME] believes that hiring qualified personnel to fill
            positions in the different departments contributes to the company’s
            overall success. Each employee is therefore hired with the objective
            of making a significant contribution to [COMPANY NAME].
          </p>

          <p className="mb-3">
            <strong>2. PURPOSE</strong>
            <br />
            The hiring policy has been established to ensure [COMPANY NAME] has
            the opportunity to attract the best available staff for all vacant
            positions.
          </p>

          <p className="mb-3">
            <strong>3. SCOPE</strong>
            <br />
            This hiring policy applies to all employees of [COMPANY NAME] who
            are involved in the hiring process.
          </p>

          <p className="mb-3">
            <strong>4. RESPONSIBILITY</strong>
            <br />
            It shall be the responsibility of the{" "}
            <strong>Human Resources (HR) department</strong> to implement this
            policy and to monitor its performance.
          </p>

          <p className="mb-3">
            It is the responsibility of{" "}
            <strong>Managers and Supervisors</strong> to ensure that:
            <ul className="list-disc pl-6">
              <li>
                They are familiar with the recruitment policies and procedures,
                and that they follow them accordingly.
              </li>
              <li>
                Staffing levels for their department are determined and
                authorised.
              </li>
              <li>
                All roles have current position descriptions that specify role
                requirements and selection criteria.
              </li>
            </ul>
          </p>

          <p className="mb-3">
            It is the responsibility of the <strong>HR department</strong> to
            ensure that:
            <ul className="list-disc pl-6">
              <li>
                All Managers are aware of their responsibilities in the
                recruitment and selectsion process;
              </li>
              <li>
                Managers are given continuous support and guidance in regard to
                recruitment and selection issues.
              </li>
            </ul>
          </p>

          <p className="mb-3">
            <strong>5. POLICY AND PROCEDURES</strong>
            <br />
            In hiring the most qualified candidates for positions, the following
            process should be followed.
          </p>

          <p>
            <strong>a) Staff request</strong>
            <br />
            When a position (newly created or replacement, continuing or term
            position) needs to be filled or extended, a staff request form must
            be completed and authorised. Requests must be submitted by the
            supervisor or service manager and forwarded to the HR department.
          </p>
        </div>

        {/* Footer with Button */}
        <div className="flex justify-between items-center border-t mt-6 pt-4">
          <p className="text-xs text-gray-500">
            Read all the details carefully
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add New Legal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Policy;
