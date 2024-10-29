// import React from "react";
// import { MDBCard, MDBCardBody, MDBCardText } from "mdb-react-ui-kit";

// const Certificate = ({ data }) => {
//   return (
//     <MDBCard style={{ backgroundColor: "#ffedcc", borderColor: "#002366", color: "#002366" }}>
//       <MDBCardBody className="text-center">
//         <h2 className="mb-4" style={{ color: "#ff7f00" }}>Vishwakarma University</h2>
//         <hr />
//         <h3>Certificate of Achievement</h3>
//         <p>
//           This is to certify that <strong>{data.studentName}</strong> with SRN{" "}
//           <strong>{data.srn}</strong> has successfully completed the course{" "}
//           <strong>{data.course}</strong> with a CGPA of <strong>{data.cgpa}</strong>.
//         </p>
//         <MDBCardText>
//           Honors: <strong>{data.honors}</strong>
//         </MDBCardText>
//         <hr />
//         <p>Presented on {new Date().toLocaleDateString()}</p>
//         <p>Transaction Hash  :  {data.transactionHash}</p>
//       </MDBCardBody>
//     </MDBCard>
//   );
// };

// export default Certificate;


import React from "react";
import { MDBCard, MDBCardBody, MDBCardText } from "mdb-react-ui-kit";

// CSS styles for the border
const styles = {
  certificateCard: {
    backgroundColor: "#ffedcc",
    borderColor: "#002366",
    color: "#002366",
    border: "10px solid #002366", // Border thickness and color
    width: "100%", // Ensure it takes full width
    height: "100%", // Ensure it takes full height
    maxWidth: "842px", // Max width for A4 landscape in pixels
    maxHeight: "595px", // Max height for A4 landscape in pixels
    margin: "0 auto", // Center the card horizontally
    position: "relative", // For positioning if needed
    overflow: "hidden", // Prevent overflow
  },
};

const Certificate = ({ data }) => {
  return (
    <MDBCard style={styles.certificateCard}>
      <MDBCardBody className="text-center">
        <h2 className="mb-4" style={{ color: "#ff7f00" }}>Vishwakarma University</h2>
        <hr />
        <h3>Certificate of Achievement</h3>
        <p>
          This is to certify that <strong>{data.studentName}</strong> with SRN{" "}
          <strong>{data.srn}</strong> has successfully completed the course{" "}
          <strong>{data.course}</strong> with a CGPA of <strong>{data.cgpa}</strong>.
        </p>
        <MDBCardText>
          Honors: <strong>{data.honors}</strong>
        </MDBCardText>
        <hr />
        <p>Presented on {new Date().toLocaleDateString()}</p>
        <p>Transaction Hash  :  {data.transactionHash}</p>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Certificate;
