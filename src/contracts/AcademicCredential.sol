// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AcademicCredential {
    struct Credential {
        string srn;
        string prn;
        uint256 hallTicketNo;
        uint256 cgpa;
        uint256 sgpa;
        string studentName;
        string collegeName;
    }
    

    mapping(string => Credential) public credentials;
    event CredentialStored(string srn, string prn, string studentName);

    function storeCredential(
        string memory _srn,
        string memory _prn,
        uint256 _hallTicketNo,
        uint256 _cgpa,
        uint256 _sgpa,
        string memory _studentName,
        string memory _collegeName
    ) public {
        credentials[_srn] = Credential(
            _srn,
            _prn,
            _hallTicketNo,
            _cgpa,
            _sgpa,
            _studentName,
            _collegeName
        );

        emit CredentialStored(_srn, _prn, _studentName);
    }

    function getCredential(string memory _srn)
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            uint256,
            uint256,
            string memory,
            string memory
        )
    {
        Credential memory cred = credentials[_srn];
        return (
            cred.srn,
            cred.prn,
            cred.hallTicketNo,
            cred.cgpa,
            cred.sgpa,
            cred.studentName,
            cred.collegeName
        );
    }
}
