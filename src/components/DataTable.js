import React, { useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";

function DataTable() {
  const data = useSelector((state) => state.tableReducer.data);
  const limit = useSelector((state) => state.tableReducer.limit);
  const currentPage = useSelector((state) => state.tableReducer.page);
  const lastQuery = useSelector((state) => state.tableReducer.lastQuery);
  const maxResults = useSelector((state) => state.tableReducer.max);

  const dispatch = useDispatch();

  const apiCall = async (query) => {
    await helper.getDataFromApiAndSetState(query, dispatch);
  };

  useEffect(() => {
    const fetchData = async () => {
      const query = `${process.env.REACT_APP_API_BASE_URL}/getData?page=1&limit=${limit}`;
      await helper.getDataFromApiAndSetState(query, dispatch);
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
            <Search />
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
