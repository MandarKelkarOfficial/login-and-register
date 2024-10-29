import React, { useState } from "react";
import {
  MDBPopover,
  MDBPopoverHeader,
  MDBPopoverBody,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";

const UpdatePopover = ({ srn, initialData, onClose }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/update-academic-credential/${srn}`,
        formData
      );
      if (response.data.success) {
        alert("Updated successfully");
        onClose(); // Close the popover after update
      } else {
        alert("No changes made or error occurred");
      }
    } catch (error) {
      console.error("Error updating credential:", error);
      alert("Error updating credential");
    }
  };

  return (
    <MDBPopover>
      <MDBPopoverHeader>Update Academic Credential</MDBPopoverHeader>
      <MDBPopoverBody>
        <form onSubmit={handleSubmit}>
          <MDBInput
            label="SRN"
            name="srn"
            value={formData.srn}
            onChange={handleChange}
            required
          />
          <MDBInput
            label="Hall Ticket No"
            name="hallTicketNo"
            value={formData.hallTicketNo}
            onChange={handleChange}
            required
          />
          <MDBInput
            label="CGPA"
            name="cgpa"
            type="number"
            value={formData.cgpa}
            onChange={handleChange}
            required
          />
          <MDBInput
            label="SGPA"
            name="sgpa"
            type="number"
            value={formData.sgpa}
            onChange={handleChange}
            required
          />
          <MDBInput
            label="Student Name"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
          <MDBInput
            label="College Name"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            required
          />
          <MDBBtn type="submit">Update</MDBBtn>
          <MDBBtn onClick={onClose}>Cancel</MDBBtn>
        </form>
      </MDBPopoverBody>
    </MDBPopover>
  );
};

export default UpdatePopover;
