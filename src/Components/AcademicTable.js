import React, { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBCard,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import AcademicCredential from "../abi/AcademicCredential.json";
import "../App.css";
import { Link } from "react-router-dom";
import UpdatePopover from "./Popover"; // Import your popover component
import TransactionHashTable from "./TransactionHashTable";

const AcademicTable = () => {
  const [credentials, setCredentials] = useState([]);
  const [deployedRows, setDeployedRows] = useState([]); // Updated
  const [, setLoading] = useState(false);
  const [selectedSrn, setSelectedSrn] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [showPopover, setShowPopover] = useState(false);

  const handleEditClick = (srn, data) => {
    setSelectedSrn(srn);
    setSelectedData(data);
    setShowPopover(true);
  };

  const handleClosePopover = () => {
    setShowPopover(false);
    setSelectedData(null);
  };

  useEffect(() => {
    // const fetchCredentials = async () => {
    //   try {
    //     // Fetch academic credentials
    //     const credentialsRes = await axios.get(
    //       "http://localhost:5000/api/get-academic-credentials"
    //     );
    //     if (credentialsRes.data.success) {
    //       setCredentials(credentialsRes.data.data);
    //     }

    //     // Fetch deployed SRN values from TransactionHash collection
    //     const transactionRes = await axios.get(
    //       "http://localhost:5000/api/get-transaction-hashes"  // Corrected URL
    //     );
    //     console.log(transactionRes);
    //     if (transactionRes.data.success) {
    //       const deployedSrn = transactionRes.data.data.map(item => item.srn);
    //       console.log(deployedSrn);
    //       setDeployedRows(deployedSrn);  // Store SRNs of deployed credentials
    //     }
    //   } catch (error) {
    //     console.error("Error fetching credentials or transaction hashes:", error);
    //   }
    // };
    // fetchCredentials();

    const fetchCredentials = async () => {
      try {
        const credentialsRes = await axios.get(
          "http://localhost:5000/api/get-academic-credentials"
        );
        if (credentialsRes.data.success) {
          setCredentials(credentialsRes.data.data);
          const deployedSrn = credentialsRes.data.data
            .filter((item) => item.hash) // Only SRNs with a hash are considered deployed
            .map((item) => item.srn);
          setDeployedRows(deployedSrn);
        }
      } catch (error) {
        console.error(
          "Error fetching credentials or transaction hashes:",
          error
        );
      }
    };

    fetchCredentials();
  }, []);

  const web3 = new Web3(window.ethereum);

  const enableMetaMask = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("MetaMask connected");
    } catch (error) {
      console.error("User denied account access", error);
    }
  };

  enableMetaMask();

  const deployToBlockchain = async (row) => {
    setLoading(true);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length === 0) {
        console.error("No accounts found. Please connect MetaMask.");
        return;
      }

      const contractAddress = "0x137017a8663c2bDad3D7B5BfeE4ACfdEB171066c";
      const abi = AcademicCredential.abi;
      const contract = new web3.eth.Contract(abi, contractAddress);

      const cgpa = Math.round(row.cgpa * 10);
      const sgpa = Math.round(row.sgpa * 10);

      const gasPrice = await web3.eth.getGasPrice();

      const transaction = await contract.methods
        .storeCredential(
          row.srn,
          row.prn,
          row.hallTicketNo,
          cgpa,
          sgpa,
          row.studentName,
          row.collegeName
        )
        .send({
          from: accounts[0],
          gas: "1000000",
          gasPrice: gasPrice,
        });

      const transactionHash = transaction.transactionHash;

      // Save transaction hash and SRN
      await axios.post("http://localhost:5000/api/save-transaction-hash", {
        srn: row.srn,
        transactionHash: transactionHash,
      });

      const gasUsed = transaction.gasUsed;
      const totalCost = gasUsed * gasPrice;

      alert(
        `Transaction successful! Hash: ${transactionHash}\nGas Used: ${gasUsed}\nTotal Cost: ${totalCost} Wei`
      );

      // Mark the SRN as deployed
      setDeployedRows([...deployedRows, row.srn]);
    } catch (error) {
      console.error("Error deploying to blockchain:", error);
    }
    setLoading(false);
  };

  return (
    <MDBContainer className="mt-5">
      <MDBCard className="p-3 shadow-5">
        <h3 className="text-center mb-4">Academic Credentials</h3>
        <hr />
        <MDBTable hover striped responsive className="mb-4">
          <MDBTableHead dark>
            <tr>
              <th>SRN</th>
              <th>PRN</th>
              <th>Hall Ticket No</th>
              <th>CGPA</th>
              <th>SGPA</th>
              <th>Student Name</th>
              <th>College Name</th>
              <th>Action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {credentials.map((row, index) => (
              <tr
                key={index}
                className={
                  deployedRows.includes(row.srn) ? "table-success" : ""
                }
              >
                <td>{row.srn}</td>
                <td>{row.prn}</td>
                <td>{row.hallTicketNo}</td>
                <td>{row.cgpa}</td>
                <td>{row.sgpa}</td>
                <td>{row.studentName}</td>
                <td>{row.collegeName}</td>
                <td className="d-flex justify-content-between align-content-between gap-2">
                  <MDBBtn
                    color={
                      deployedRows.includes(row.srn) ? "success" : "primary"
                    }
                    size="sm"
                    onClick={() => deployToBlockchain(row)}
                    disabled={deployedRows.includes(row.srn)}
                  >
                    {deployedRows.includes(row.srn) ? (
                      <>
                        <MDBIcon fas icon="check" className="me-1" />
                        Deployed
                      </>
                    ) : (
                      <>
                        <MDBIcon fas icon="cloud-upload-alt" className="me-1" />
                        Deploy
                      </>
                    )}
                  </MDBBtn>
                  {/* Hide the edit button if deployed */}
                  {!deployedRows.includes(row.srn) && (
                    <MDBBtn
                      color="warning"
                      size="sm"
                      onClick={() => handleEditClick(row.srn, row)}
                    >
                      <MDBIcon fas icon="edit" className="me-1" />
                      Edit
                    </MDBBtn>
                  )}
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>

        {showPopover && (
          <UpdatePopover
            srn={selectedSrn}
            initialData={selectedData}
            onClose={handleClosePopover}
          />
        )}
        <br />
        <Link to="/add-credentials">
          <MDBBtn type="button" color="info" block className="rounded-5">
            <MDBIcon fas icon="plus-circle" className="me-2" />
            Add New Credential
          </MDBBtn>
        </Link>
      </MDBCard>

      <br />
      <MDBCard className="p-3 shadow-5">
        <TransactionHashTable />
      </MDBCard>
    </MDBContainer>
  );
};

export default AcademicTable;
