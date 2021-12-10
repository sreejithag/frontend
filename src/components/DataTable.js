import React, { useState, useEffect } from "react";
import Search from "./Search";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Container,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import helper from "../helpers/helper";

function DataTable() {
  const [data, updateData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [currentPage, updatePage] = useState(0);
  const [maxResults, updateMax] = useState(0);
  const [lastQuery, updateLastQuery] = useState("");

  const apiCall = async (query) => {
    await helper.getDataFromApiAndSetState(
      query,
      updateData,
      updateMax,
      updatePage,
      updateLastQuery
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const query = `${process.env.REACT_APP_API_BASE_URL}/getData?page=1&limit=${limit}`;
      await helper.getDataFromApiAndSetState(
        query,
        updateData,
        updateMax,
        updatePage,
        updateLastQuery
      );
    };
    fetchData();
  }, []);

  const seekNext = async () => {
    const query = `${lastQuery}?page=${currentPage + 1}&limit=${limit}`;
    await apiCall(query);
  };

  const seekPrev = async () => {
    const query = `${lastQuery}?page=${currentPage - 1}&limit=${limit}`;
    await apiCall(query);
  };

  const rows = data.map((d, index) => {
    return (
      <Tr key={index}>
        <Td>{d.name}</Td>
        <Td>{d.address}</Td>
        <Td>{d.phone}</Td>
        <td>{d.worksAt}</td>
      </Tr>
    );
  });

  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <Box>
          <Box marginTop="50px" paddingBottom="22px">
            <Search
              updateData={updateData}
              updateMax={updateMax}
              updatePage={updatePage}
              limit={limit}
              updateLastQuery={updateLastQuery}
            />
          </Box>
          <Table variant="simple" borderWidth="1px">
            <Thead bg="rgb(226, 232, 240)">
              <Tr>
                <Th>Name</Th>
                <Th>Address</Th>
                <Th>Phone</Th>
                <Th>Works at</Th>
              </Tr>
            </Thead>
            <Tbody>{rows}</Tbody>
          </Table>
          <Box display="fixed" justifyContent="space-between" paddingTop="10px">
            <Box paddingLeft="10px">
              <p>
                showing {maxResults === 0 ? 0 : limit * (currentPage - 1) + 1}{" "}
                to{" "}
                {maxResults < limit * currentPage
                  ? maxResults
                  : limit * currentPage}{" "}
                of {maxResults} entries
              </p>
            </Box>
            <Box display="flex" flexDirection="row-reverse">
              <ButtonGroup variant="outline" spacing="6">
                <Button isDisabled={currentPage < 2} onClick={seekPrev}>
                  Previous
                </Button>
                <Button
                  isDisabled={maxResults - limit * currentPage <= 0}
                  onClick={seekNext}
                >
                  Next
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default DataTable;
