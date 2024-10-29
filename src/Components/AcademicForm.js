import React, { useState } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from "axios";
import { Link } from "react-router-dom";

const AcademicForm = () => {
  const [formData, setFormData] = useState({
    srn: "",
    prn: "",
    hallTicketNo: "",
    cgpa: "",
    sgpa: "",
    studentName: "",
    collegeName: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/store-academic-credentials",
        formData
      );
      if (response.data.success) {
        setMessage("Credentials stored successfully");
      } else {
        setMessage("Error storing credentials in MongoDB");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error storing credentials");
    }
  };

  return (
    <MDBContainer className="mt-5">
      <MDBCard className="p-4 shadow-5">
        <MDBCardBody>
          <h2 className="text-center mb-4">Academic Credentials Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col-md-6">
                <MDBInput
                  label="SRN No"
                  name="srn"
                  value={formData.srn}
                  onChange={handleChange}
                  required
                  placeholder="Enter your SRN"
                />
              </div>
              <div className="col-md-6">
                <MDBInput
                  label="PRN No"
                  name="prn"
                  value={formData.prn}
                  onChange={handleChange}
                  required
                  placeholder="Enter your PRN"
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-6">
                <MDBInput
                  label="Hall Ticket No"
                  name="hallTicketNo"
                  value={formData.hallTicketNo}
                  onChange={handleChange}
                  required
                  placeholder="Enter your Hall Ticket No"
                />
              </div>
              <div className="col-md-6">
                <MDBInput
                  label="CGPA"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                  required
                  placeholder="Enter your CGPA"
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-6">
                <MDBInput
                  label="SGPA"
                  name="sgpa"
                  value={formData.sgpa}
                  onChange={handleChange}
                  required
                  placeholder="Enter your SGPA"
                />
              </div>
              <div className="col-md-6">
                <MDBInput
                  label="Student Name"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                />
              </div>
            </div>
            <div className="mb-4">
              <MDBInput
                label="College Name"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                required
                placeholder="Enter your college name"
              />
            </div>
            <MDBBtn type="submit" color="primary" className="mb-4" block>
              <MDBIcon fas icon="paper-plane" className="me-2" />
              SUBMIT
            </MDBBtn>
            <Link to="/show-credentials">
              <MDBBtn type="button" color="info" block>
                <MDBIcon fas icon="eye" className="me-2" />
                VIEW
              </MDBBtn>
            </Link>
          </form>
          {message && (
            <div className="mt-3 alert alert-info text-center">{message}</div>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default AcademicForm;

// import React, { useState } from "react";
// import {
//   MDBContainer,
//   MDBInput,
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBIcon
// } from "mdb-react-ui-kit";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const AcademicForm = () => {
//   const [formData, setFormData] = useState({
//     srn: "",
//     prn: "",
//     hallTicketNo: "",
//     cgpa: "",
//     sgpa: "",
//     studentName: "",
//     collegeName: "",
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Store data in MongoDB
//       const response = await axios.post(
//         "http://localhost:5000/api/store-academic-credentials",
//         formData
//       );
//       if (response.data.success) {
//         setMessage("Credentials stored successfully");
//       } else {
//         setMessage("Error storing credentials in MongoDB");
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage("Error storing credentials");
//     }
//   };

//   return (
//     <MDBContainer className="mt-5">
//       <MDBCard className="p-4 shadow-5">
//         <MDBCardBody>
//           <h2 className="text-center mb-4">Academic Credentials Form</h2>
//           <form onSubmit={handleSubmit}>
//             <MDBInput
//               label="SRN No"
//               name="srn"
//               value={formData.srn}
//               onChange={handleChange}
//               required
//               className="mb-4"
//             />
//             <MDBInput
//               label="PRN No"
//               name="prn"
//               value={formData.prn}
//               onChange={handleChange}
//               required
//               className="mb-4"
//             />
//             <MDBInput
//               label="Hall Ticket No"
//               name="hallTicketNo"
//               value={formData.hallTicketNo}
//               onChange={handleChange}
//               required
//               className="mb-4"
//             />
//             <MDBInput
//               label="CGPA"
//               name="cgpa"
//               value={formData.cgpa}
//               onChange={handleChange}
//               required
//               className="mb-4"
//             />
//             <MDBInput
//               label="SGPA"
//               name="sgpa"
//               value={formData.sgpa}
//               onChange={handleChange}
//               required
//               className="mb-4"
//             />
//             <MDBInput
//               label="Student Name"
//               name="studentName"
//               value={formData.studentName}
//               onChange={handleChange}
//               required
//               className="mb-4"
//             />
//             <MDBInput
//               label="College Name"
//               name="collegeName"
//               value={formData.collegeName}
//               onChange={handleChange}
//               required
//               className="mb-4"
//             />
//             <MDBBtn type="submit" color="primary" className="mb-4" block>
//               <MDBIcon fas icon="paper-plane" className="me-2" />
//               SUBMIT
//             </MDBBtn>
//             <Link to="/show-credentials">
//               <MDBBtn type="button" color="info" block>
//                 <MDBIcon fas icon="eye" className="me-2" />
//                 VIEW
//               </MDBBtn>
//             </Link>
//           </form>
//           {message && (
//             <div className="mt-3 alert alert-info text-center">{message}</div>
//           )}
//         </MDBCardBody>
//       </MDBCard>
//     </MDBContainer>
//   );
// };

// export default AcademicForm;
