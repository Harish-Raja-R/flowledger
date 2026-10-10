# FlowLedger - Viva Demonstration Guide & Script

## Project Overview
**FlowLedger** is an end-to-end business workflow and approval platform designed to digitize, streamline, and audit internal company requests (e.g., Purchase Requests, Leave Applications, IT Access). It eliminates paper trails and email bottlenecks by providing a dynamic, role-based workflow engine.

---

## 1. Project Introduction (1 Minute)
* **Start on the Login Screen.**
* "Hello, my project is FlowLedger, a comprehensive workflow and approval platform."
* "The problem it solves is the inefficiency of manual or email-based approval processes in organizations. It provides a centralized, trackable, and automated way to handle requests."
* "It is built using the MERN stack: MongoDB, Express, React, and Node.js. The UI uses Tailwind CSS and Framer Motion for a premium, responsive experience."

## 2. Authentication & Roles (1 Minute)
* **Log in as an EMPLOYEE (e.g., employee@flowledger.com).**
* "The system features role-based access control (RBAC). We have Employees, Managers, Finance/HR Approvers, and Admins."
* "Authentication is securely handled using JSON Web Tokens (JWT)."

## 3. Creating & Submitting a Request (2 Minutes)
* **Navigate to 'New Request'.**
* "Here, an employee can create a new request, such as a Purchase Request."
* Fill out the form (Title, Description, Amount, Priority).
* "Notice the real-time UI validation and state management powered by React."
* **Click 'Save Draft'.**
* "The request is saved to MongoDB. It is currently in a 'DRAFT' state."
* **Submit the request.**
* "Upon submission, the Node.js backend triggers the Workflow Engine. It finds the active workflow for 'Purchase Requests' in this department and automatically assigns the first approval step."

## 4. The Workflow & Approval Engine (3 Minutes)
* **Log out and log in as a MANAGER (e.g., manager@flowledger.com).**
* **Navigate to 'Approvals'.**
* "The manager now sees the request in their pending queue."
* "They can review the details, and they have three options: Approve, Reject, or Request Changes."
* **Approve the request.**
* "When approved, the Express backend updates the approval status. The workflow engine then checks for the next step. If it requires Finance approval, it automatically routes to the Finance queue."
* **Log out and log in as FINANCE.**
* **Approve the request as Finance.**
* "Once the final step is approved, the overall request status changes to 'APPROVED'."

## 5. Audit Logging & Analytics (1.5 Minutes)
* **Navigate to the Dashboard.**
* "The dashboard aggregates data in real-time, pulling statistics from MongoDB via analytical endpoints in the backend."
* "Every single action—creation, submission, approval, rejection—generates an immutable Audit Log entry in the database. This ensures complete traceability and accountability, which is crucial for enterprise software."

## 6. Code & Technical Highlights (1.5 Minutes)
* "To highlight the technical implementation:"
  * **Frontend:** "We used React with functional components and hooks. The UI is custom-styled with Tailwind CSS, completely responsive, and enhanced with Framer Motion animations."
  * **Backend:** "We built a modular Express REST API. Controllers are separated from routes. We handle cross-origin requests, JWT verification middleware, and centralized error handling."
  * **Database:** "Mongoose is used for complex data modeling, including relationships between Users, Departments, Requests, Workflows, and Approvals."

## Potential Viva Questions & Answers

**Q: How do you handle asynchronous requests on the frontend?**
A: We use Axios to make HTTP requests. We manage the asynchronous nature using `async/await` within React's `useEffect` hooks, managing loading and error states to update the UI accordingly.

**Q: Explain how your authentication works.**
A: When a user logs in, the backend verifies the password against a bcrypt hash. If valid, it generates a JWT containing the user ID and signs it with a secret key. This token is sent to the client, which stores it (e.g., in localStorage) and attaches it as a Bearer token in the Authorization header of subsequent API requests.

**Q: How does the workflow engine know who to assign next?**
A: We have a `Workflow` collection in MongoDB that defines sequential steps (e.g., Step 1: Manager, Step 2: Finance). When a request is submitted or a step is approved, the backend queries this workflow definition, finds the next step based on the order index, and creates a new pending `Approval` record assigned to that role.

**Q: How did you ensure the application is responsive?**
A: I used Tailwind CSS's mobile-first utility classes. By defining breakpoints (sm, md, lg), the grid and flexbox layouts automatically adjust—for example, changing from a single-column layout on mobile to a multi-column layout on desktop.

**Q: What would you improve if you had more time?**
A: I would add real-time WebSocket notifications using Socket.io instead of simulated/polled notifications, and implement file attachments for requests using AWS S3 or GridFS.
