import React, { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Box, HStack } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import helper from "../helpers/helper";

function Search(props) {
  const { updateData, updateMax, updatePage, limit, updateLastQuery } = props;

  const [countryList, updateCountryList] = useState([]);
  const [nameFilter, updateNameFilter] = useState("");
  const [countryFilter, updateCountryFilter] = useState("");

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
    const fetchCountryList = async () => {
      const url = `${process.env.REACT_APP_API_BASE_URL}/getCountry`;
      const response = await helper.getDataFromApi(url);
      if (response.status === 200) {
        const countryListDb = await response.json();
        updateCountryList(countryListDb.sort());
      }
    };

    fetchCountryList();
  }, []);

  const filterByName = async (event) => {
    const name = event.target.value;

    if (name === "") {
      updateNameFilter("");
      const query = `${process.env.REACT_APP_API_BASE_URL}/getData?page=1&limit=${limit}`;
      await apiCall(query);
    } else {
      if (name === undefined) {
        updateNameFilter("");
        return;
      }

      updateNameFilter(name);

      const query =
        countryFilter === "" || countryFilter === undefined
          ? `${process.env.REACT_APP_API_BASE_URL}/getDataByName/${name}?page=1&limit=${limit}`
          : `${process.env.REACT_APP_API_BASE_URL}/getDataByName/${name}/${countryFilter}?page=1&limit=${limit}`;

      await apiCall(query);
    }
  };

  const filterByCountry = async (event) => {
    const country = event.target.value;

    if (country === undefined || country === "") {
      updateCountryFilter("");
      return;
    }

    updateCountryFilter(country);
    const query =
      nameFilter === "" || nameFilter === undefined
        ? `${process.env.REACT_APP_API_BASE_URL}/getDataByCountry/${country}?page=1&limit=10`
        : `${process.env.REACT_APP_API_BASE_URL}/getDataByName/${nameFilter}/${country}?page=1&limit=10`;
    await apiCall(query);
  };

  const options = countryList.map((Country, index) => {
    return <option key={index}>{Country}</option>;
  });

  return (
    <Box display="flex" maxW="xl">
      <FormControl>
        <HStack spacing="25px">
          <Input
            type="search"
            placeholder="Filter by name"
            onChange={filterByName}
          />
          <Select placeholder="filter by country" onChange={filterByCountry}>
            {options}
          </Select>
        </HStack>
      </FormControl>
    </Box>
  );
}

export default Search;
