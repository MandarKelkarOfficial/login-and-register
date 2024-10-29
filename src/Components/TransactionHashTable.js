// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import {
//   MDBTable,
//   MDBTableHead,
//   MDBTableBody,
//   MDBContainer,
//   MDBCard,
//   MDBBtn,
// } from "mdb-react-ui-kit";
// import Certificate from "./Certificate"; // Import the certificate component
// import { useReactToPrint } from "react-to-print";

// const TransactionHashTable = () => {
//   const [transactionHashes, setTransactionHashes] = useState([]); // State for transaction hashes
//   const [credentials, setCredentials] = useState([]); // State for academic credentials
//   const [selectedRow, setSelectedRow] = useState(null); // Store selected row data
//   const certificateRef = useRef(); // Reference for printing

//   useEffect(() => {
//     // Fetch transaction hashes
//     const fetchTransactionHashes = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/get-transaction-hashes");
//         if (res.data.success) {
//           setTransactionHashes(res.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching transaction hashes:", error);
//       }
//     };

//     // Fetch academic credentials
//     const fetchCredentials = async () => {
//       try {
//         const credentialsRes = await axios.get("http://localhost:5000/api/get-academic-credentials");
//         if (credentialsRes.data.success) {
//           setCredentials(credentialsRes.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching credentials:", error);
//       }
//     };

//     fetchTransactionHashes();
//     fetchCredentials();
//   }, []);

//   // Function to trigger print as PDF
//   const handlePrint = useReactToPrint({
//     content: () => certificateRef.current, // Certificate content reference
//     documentTitle: "Student_Certificate",  // Name for the downloaded PDF
//   });

//   // Handle button click for generating the certificate
//   const handleGenerateCertificate = (row) => {
//     setSelectedRow(row); // Set the clicked row as the selected row for the certificate

//     // Wait for the certificate to render fully before triggering print
//     setTimeout(() => {
//       if (certificateRef.current) {
//         handlePrint();
//       }
//     }, 300); // A short delay to ensure certificate is rendered
//   };

//   // Helper function to find the academic credential for the selected SRN
//   const getCredentialForSRN = (srn) => {
//     return credentials.find((credential) => credential.srn === srn);
//   };

//   return (
//     <MDBContainer className="mt-4">
//       <MDBCard className="p-3 shadow-5">
//         <h3 className="text-center mb-4">Transaction Hashes</h3>
//         <hr />
//         <MDBTable hover striped responsive>
//           <MDBTableHead dark>
//             <tr>
//               <th>SRN</th>
//               <th>Transaction Hash</th>
//               <th>Action</th>
//             </tr>
//           </MDBTableHead>
//           <MDBTableBody>
//             {transactionHashes.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.srn}</td>
//                 <td>{row.transactionHash}</td>
//                 <td>
//                   <MDBBtn
//                     size="sm"
//                     color="primary"
//                     onClick={() => handleGenerateCertificate(row)}
//                   >
//                     Generate Certificate
//                   </MDBBtn>
//                 </td>
//               </tr>
//             ))}
//           </MDBTableBody>
//         </MDBTable>
//       </MDBCard>

//       {/* Render the certificate component only when a row is selected */}
//       {selectedRow && (
//         <div style={{ display: "block" }}> {/* Hidden during normal viewing */}
//           <div ref={certificateRef}>
//             {(() => {
//               // Get the credential for the selected SRN
//               const credential = getCredentialForSRN(selectedRow.srn);
//               if (credential) {
//                 return (
//                   <Certificate
//                     data={{
//                       studentName: `Student ${credential.studentName || selectedRow.srn}`, // Use real student name or SRN
//                       srn: selectedRow.srn,
//                       course: credential.course || "BTech Computer Science", // Use real course data
//                       cgpa: credential.cgpa || "N/A", // Use real CGPA data
//                       honors: credential.honors || "BTech", // Optional: Add any honors if available
//                       transactionHash:selectedRow.transactionHash,
//                     }}
//                   />
//                 );
//               } else {
//                 return (
//                   <Certificate
//                     data={{
//                       studentName: `Student ${selectedRow.srn}`, // Fallback if no data is available
//                       srn: selectedRow.srn,
//                       course: "BTech Computer Science",
//                       cgpa: "N/A", // Fallback CGPA
//                       honors: "BTech", // Fallback honors
//                     }}
//                   />
//                 );
//               }
//             })()}
//           </div>
//         </div>
//       )}
//     </MDBContainer>
//   );
// };

// export default TransactionHashTable;



import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBCard,
  MDBBtn,
} from "mdb-react-ui-kit";
import Certificate from "./Certificate"; // Import the certificate component
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print"; // Ensure this line is present


const TransactionHashTable = () => {
  const [transactionHashes, setTransactionHashes] = useState([]); // State for transaction hashes
  const [credentials, setCredentials] = useState([]); // State for academic credentials
  const [selectedRow, setSelectedRow] = useState(null); // Store selected row data
  const certificateRef = useRef(); // Reference for printing

  useEffect(() => {
    // Fetch transaction hashes
    const fetchTransactionHashes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/get-transaction-hashes");
        if (res.data.success) {
          setTransactionHashes(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching transaction hashes:", error);
      }
    };

    // Fetch academic credentials
    const fetchCredentials = async () => {
      try {
        const credentialsRes = await axios.get("http://localhost:5000/api/get-academic-credentials");
        if (credentialsRes.data.success) {
          setCredentials(credentialsRes.data.data);
        }
      } catch (error) {
        console.error("Error fetching credentials:", error);
      }
    };

    fetchTransactionHashes();
    fetchCredentials();
  }, []);

  // Function to trigger print as PDF
  const handlePrint = useReactToPrint({
    content: () => certificateRef.current, // Certificate content reference
    documentTitle: "Student_Certificate",  // Name for the downloaded PDF
  });

  // Function to capture and store the certificate as a PDF
//   const handleSaveCertificateAsPDF = async () => {
//     if (certificateRef.current) {
//       // Capture the certificate component as an image using html2canvas
//       const canvas = await html2canvas(certificateRef.current);
//       const imgData = canvas.toDataURL("image/png");

//       // Generate a PDF using jsPDF
//       const pdf = new jsPDF("landscape", "pt", "a4");
//       const imgWidth = 842; // Adjust as needed
//       const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

//       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//       pdf.save(`Certificate_${selectedRow.srn}.pdf`);
//     }
//   };

// Function to capture and store the certificate as a PDF
const handleSaveCertificateAsPDF = async () => {
    if (certificateRef.current) {
      // Capture the certificate component as an image using html2canvas
      const canvas = await html2canvas(certificateRef.current, {
        // Add options if needed
        scale: window.devicePixelRatio, // Ensure high resolution
      });
      const imgData = canvas.toDataURL("image/png");
  
      // Generate a PDF using jsPDF
      const pdf = new jsPDF("landscape", "pt", "a4");
      const imgWidth = 842; // Width for A4 landscape in points
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  
      // Calculate the vertical offset for centering the image in the PDF
      const yOffset = (pdf.internal.pageSize.height - imgHeight) / 2;
  
      // Add image to PDF
      pdf.addImage(imgData, "PNG", 0, yOffset, imgWidth, imgHeight);
      pdf.save(`Certificate_${selectedRow.srn}.pdf`);
    }
  };
  

  // Handle button click for generating the certificate
  const handleGenerateCertificate = (row) => {
    setSelectedRow(row); // Set the clicked row as the selected row for the certificate
  };

  // Helper function to find the academic credential for the selected SRN
  const getCredentialForSRN = (srn) => {
    return credentials.find((credential) => credential.srn === srn);
  };

  return (
    <MDBContainer className="mt-4">
      <MDBCard className="p-3 shadow-5">
        <h3 className="text-center mb-4">Transaction Hashes</h3>
        <hr />
        <MDBTable hover striped responsive>
          <MDBTableHead dark>
            <tr>
              <th>SRN</th>
              <th>Transaction Hash</th>
              <th>Action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {transactionHashes.map((row, index) => (
              <tr key={index}>
                <td>{row.srn}</td>
                <td>{row.transactionHash}</td>
                <td>
                  <MDBBtn
                    size="sm"
                    color="primary"
                    onClick={() => handleGenerateCertificate(row)}
                  >
                    Generate Certificate
                  </MDBBtn>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </MDBCard>
<br />
<hr />
      {/* Render the certificate component only when a row is selected */}
      {selectedRow && (
        <div style={{ display: "block" }}>
          <div ref={certificateRef}>
            {(() => {
              // Get the credential for the selected SRN
              const credential = getCredentialForSRN(selectedRow.srn);
              if (credential) {
                return (
                  <Certificate
                    data={{
                      studentName: `Student ${credential.studentName || selectedRow.srn}`, // Use real student name or SRN
                      srn: selectedRow.srn,
                      course: credential.course || "BTech Computer Science", // Use real course data
                      cgpa: credential.cgpa || "N/A", // Use real CGPA data
                      honors: credential.honors || "BTech", // Optional: Add any honors if available
                      transactionHash: selectedRow.transactionHash,
                    }}
                  />
                );
              } else {
                return (
                  <Certificate
                    data={{
                      studentName: `Student ${selectedRow.srn}`, // Fallback if no data is available
                      srn: selectedRow.srn,
                      course: "BTech Computer Science",
                      cgpa: "N/A", // Fallback CGPA
                      honors: "BTech", // Fallback honors
                    }}
                  />
                );
              }
            })()}
          </div>

          {/* Button to save certificate as PDF */}
          <MDBBtn
            size="sm"
            color="success"
            onClick={handleSaveCertificateAsPDF}
            className="mt-3 w-100"
          >
            Save as PDF
          </MDBBtn>
        </div>
      )}
    </MDBContainer>
  );
};

export default TransactionHashTable;
