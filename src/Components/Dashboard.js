// import React from "react";
// import { useLocation, Link } from "react-router-dom";
// import {
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBCardHeader,
//   MDBBtn,
//   MDBIcon,
// } from "mdb-react-ui-kit";

// export default function Dashboard() {
//   const location = useLocation();
//   const userName = location.state?.userName || "User"; // Default to 'User' if no name is passed

//   return (
//     <MDBContainer className="mt-5">
//       <MDBRow>
//         <MDBCol md="12">
//           <MDBCard>
//             <MDBCardHeader className="text-center bg-primary text-white">
//               <h3>Welcome to the Academic Credentials Management System</h3>
//             </MDBCardHeader>
//             <MDBCardBody>
//               <h5 className="text-center">Hello, {userName}!</h5>
//               <p className="text-center">
//                 Manage your academic credentials easily and efficiently.
//               </p>

//               <MDBRow className="mt-4">
//                 <MDBCol md="4">
//                   <MDBCard className="text-center">
//                     <MDBCardBody>
//                       <MDBIcon fas icon="file-alt" size="3x" />
//                       <h5 className="mt-3">View Records</h5>
//                       <p>Check your academic records and grades.</p>
//                       <MDBBtn color="primary">View</MDBBtn>
//                     </MDBCardBody>
//                   </MDBCard>
//                 </MDBCol>

//                 <MDBCol md="4">
//                   <MDBCard className="text-center">
//                     <MDBCardBody>
//                       <MDBIcon fas icon="user-plus" size="3x" />
//                       <h5 className="mt-3">Add Credentials</h5>
//                       <p>Submit new academic credentials.</p>
//                       <Link to="/add-credentials">
//                         <MDBBtn color="primary">Add</MDBBtn>
//                       </Link>
//                     </MDBCardBody>
//                   </MDBCard>
//                 </MDBCol>

//                 <MDBCol md="4">
//                   <MDBCard className="text-center">
//                     <MDBCardBody>
//                       <MDBIcon fas icon="cogs" size="3x" />
//                       <h5 className="mt-3">Settings</h5>
//                       <p>Manage your account settings.</p>
//                       <Link to="/login">
//                         <MDBBtn color="primary">LOGOUT</MDBBtn>
//                       </Link>
//                     </MDBCardBody>
//                   </MDBCard>
//                 </MDBCol>
//               </MDBRow>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// }









import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn,
  MDBIcon,
  MDBCardTitle,
  MDBCardText
} from "mdb-react-ui-kit";

export default function Dashboard() {
  const location = useLocation();
  const userName = location.state?.userName || "User"; // Default to 'User' if no name is passed

  const [studentStats, setStudentStats] = useState({
    totalStudents: 0,
    totalOnBlockchain: 0,
    avgCgpaAbove8: 0,
    pendingVerification: 0,
  });

  // // Fetch stats from the backend API
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/get-academic-credentials");

  //       const credentials = response.data.data;

  //       const totalStudents = credentials.length;
  //       const totalOnBlockchain = credentials.filter(cred => cred.hash).length; // Count those deployed on blockchain
  //       const avgCgpaAbove8 = (credentials.filter(cred => cred.cgpa >= 8).length / totalStudents) * 100;
  //       const pendingVerification = credentials.filter(cred => !cred.hash).length; // Count pending blockchain deployment

  //       setStudentStats({
  //         totalStudents,
  //         totalOnBlockchain,
  //         avgCgpaAbove8,
  //         pendingVerification,
  //       });
  //       console.log(response.data)
  //     } catch (error) {
  //       console.error("Error fetching academic credentials:", error);
  //     }
  //   }

  //   fetchData();
    
  // }, []);



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/api/get-academic-credentials");
        const credentials = response.data.data;
  
        const totalStudents = credentials.length;
        const totalOnBlockchain = credentials.filter(cred => cred.hash).length; // Count those deployed on blockchain
        const avgCgpaAbove8 = (credentials.filter(cred => cred.cgpa >= 8).length / totalStudents) * 100;
        const pendingVerification = credentials.filter(cred => !cred.hash).length; // Count pending blockchain deployment
  
        setStudentStats({
          totalStudents,
          totalOnBlockchain,
          avgCgpaAbove8,
          pendingVerification,
        });
      } catch (error) {
        console.error("Error fetching academic credentials:", error);
      }
    }
  
    fetchData();
  }, []);
  

  return (
    <MDBContainer className="mt-3">


      {/* Welcome Section */}
      <MDBRow className="mt-4">
        <MDBCol md="12">
          <MDBCard>
            <MDBCardHeader className="text-center bg-primary text-white">
              <h3>Welcome to the Academic Credentials Management System</h3>
            </MDBCardHeader>
            <MDBCardBody>
              <h5 className="text-center ">Hello,<span className="text-danger has-text-weight-bold "> <u> {userName}!</u></span></h5>
              <p className="text-center">
                Manage your academic credentials easily and efficiently.
              </p>

              <br />



              <MDBRow>
        {/* Statistic Cards */}
        <MDBCol md="3">
          <MDBCard className="text-center bg-light">
            <MDBCardBody>
              <MDBIcon fas icon="users" size="3x" className="text-primary" />
              <h5 className="mt-3">Total Students</h5>
              <MDBCardText>{studentStats.totalStudents}</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="3">
          <MDBCard className="text-center bg-light">
            <MDBCardBody>
              <MDBIcon fas icon="check-circle" size="3x" className="text-success" />
              <h5 className="mt-3">Data on Blockchain</h5>
              <MDBCardText>{studentStats.totalOnBlockchain}</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="3">
          <MDBCard className="text-center bg-light">
            <MDBCardBody>
              <MDBIcon fas icon="chart-line" size="3x" className="text-warning" />
              <h5 className="mt-3">Avg CGPA 8+</h5>
              <MDBCardText>{studentStats.avgCgpaAbove8.toFixed(2)}%</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="3">
          <MDBCard className="text-center bg-light">
            <MDBCardBody>
              <MDBIcon fas icon="hourglass-half" size="3x" className="text-danger" />
              <h5 className="mt-3">Pending Verification</h5>
              <MDBCardText>{studentStats.pendingVerification}</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

<br />
<br />
<hr />

              <MDBRow className="mt-3">
                <MDBCol md="4">
                  <MDBCard className="text-center">
                    <MDBCardBody>
                      <MDBIcon fas icon="file-alt" size="3x" />
                      <h5 className="mt-3">View Records</h5>
                      <p>Check your academic records and grades.</p>
                      <Link to="/show-credentials">
                      <MDBBtn color="primary">View</MDBBtn></Link>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>

                <MDBCol md="4">
                  <MDBCard className="text-center">
                    <MDBCardBody>
                      <MDBIcon fas icon="user-plus" size="3x" />
                      <h5 className="mt-3">Add Credentials</h5>
                      <p>Submit new academic credentials.</p>
                      <Link to="/add-credentials">
                        <MDBBtn color="primary">Add</MDBBtn>
                      </Link>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>

                <MDBCol md="4">
                  <MDBCard className="text-center">
                    <MDBCardBody>
                      <MDBIcon fas icon="cogs" size="3x" />
                      <h5 className="mt-3">Settings</h5>
                      <p>Manage your account settings.</p>
                      <Link to="/login">
                        <MDBBtn color="primary">LOGOUT</MDBBtn>
                      </Link>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
