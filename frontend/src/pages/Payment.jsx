import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast, // Import useToast
} from "@chakra-ui/react";

const Payment = () => {
  const [documentFiles, setDocumentFiles] = useState({
    invoices: [],
    paymentReceipt: null,
    bankStatements: null,
    contract: null,
  });

  const toast = useToast(); // Initialize useToast

  const handleFileChange = (e, documentType) => {
    const files = e.target.files;
    if (documentType === "invoices" && files.length < 3) {
      alert("Please upload a minimum of 3 invoices.");
      return;
    }
    setDocumentFiles({
      ...documentFiles,
      [documentType]: [...documentFiles[documentType], ...files],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Display "Your documents are being analyzed" toast
    const analyzingToastId = toast({
      title: "Your documents are being analyzed",
      status: "info",
      duration: 5000, // Display for 5 seconds
    });

    setTimeout(() => {
      // After a short delay, display "Your loan was approved" toast
      toast.close(analyzingToastId); // Close the analyzing toast
      toast({
        title: "Your loan was approved",
        status: "success",
      });

      // Send the documentFiles object to your backend for processing.
      console.log("Uploaded files:", documentFiles);
    }, 5000); // Delay for 5 seconds
  };

  return (
    <Box p={5} bg="#F4F4F4" m={4}>
      <Heading
        textTransform="uppercase"
        fontSize="2xl"
        bgGradient="linear(to-r, #EA0036, #F45022)"
        bgClip="text"
        mt={6}
        textAlign="center"
      >
        Upload Required Loan Documents
      </Heading>
      <Box my={5}>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Upload Invoices (Minimum of 3)</FormLabel>
            <Input
              type="file"
              accept=".pdf, .jpg, .docx, .png"
              multiple
              required
              onChange={(e) => handleFileChange(e, "invoices")}
              p={2} // Add padding to the input
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Upload Payment Receipt</FormLabel>
            <Input
              type="file"
              required
              accept=".pdf, .jpg, .png"
              onChange={(e) => handleFileChange(e, "paymentReceipt")}
              p={2} // Add padding to the input
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Upload Bank Statements</FormLabel>
            <Input
              type="file"
              required
              accept=".pdf, .jpg, .png"
              onChange={(e) => handleFileChange(e, "bankStatements")}
              p={2} // Add padding to the input
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Upload Contract</FormLabel>
            <Input
              type="file"
              required
              accept=".pdf, .jpg, .png"
              onChange={(e) => handleFileChange(e, "contract")}
              p={2} // Add padding to the input
            />
          </FormControl>
          <Button
            mt={4}
            colorScheme="red" // Use the red color scheme
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Payment;
