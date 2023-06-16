/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "./reusable/Sidebar";
import { Button, OutlinedInput, Paper, Stack } from "@mui/material";
import { Header } from "./reusable/Header";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ClearIcon from "@mui/icons-material/Clear";
import { LocationIcon, WebsiteIcon } from "./Icons";
import theme from "theme";
import LoadingPage from "./pages/LoadingPage";
import { useSearchParams } from "react-router-dom";
import { Debounce } from "./utils/debounce";

interface Search {
  name: string | null | undefined;
  loading: boolean;
}

interface Company {
  logo: string;
  name: string;
  website: string;
  hq: string;
  short_description: string;
}

const CompaniesList = () => {
  const [searchPrams, setSearchParams] = useSearchParams({ company: "" });
  const [search, setSearch] = useState<Search>({
    name: searchPrams.get("company"),
    loading: false,
  });
  const [companiesList, setCompaniesList] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);
  const token = localStorage.getItem("token");

  const fetchCompanyList = async (payload: string) => {
    const url =
      "https://wokelo-dev.eastus.cloudapp.azure.com/api/assets/get_company_list/";
    try {
      setSearch((prev: Search) => ({ ...prev, loading: true }));
      const response = await axios.post(
        url,
        { name: payload },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCompaniesList(response?.data?.data);
    } catch (err) {
      throw err;
    } finally {
      setSearch((prev: Search) => ({ ...prev, loading: false }));
    }
  };

  const apiCall = useCallback(Debounce(fetchCompanyList, 500), []);

  useEffect(() => {
    if (search.name) {
      apiCall(search.name);
    }
  }, [search?.name]);

  const filteredCompanies = companiesList?.filter((company: { name: string }) =>
    search?.name
      ? company?.name?.toLowerCase().includes(search?.name?.toLowerCase())
      : []
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch((prev: Search) => ({ ...prev, name: e.target.value }));
    setSearchParams({ company: e.target.value });
  };

  const handleCompanySelect = (company: Company) => {
    setSelectedCompanies((prevSelectedCompanies: Company[]) => {
      if (prevSelectedCompanies?.some((item) => item?.name === company?.name)) {
        return prevSelectedCompanies?.filter(
          (item) => item?.name !== company?.name
        );
      } else {
        return [...prevSelectedCompanies, company];
      }
    });
  };

  const handleNext = async () => {
    const url =
      "https://res.cloudinary.com/crunchbase-production/image/upload/{logo_id}";
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
  };

  const getCompany = (item: Company, isFromSelectedCompanies: boolean) => {
    const isCompanySelected =
      !isFromSelectedCompanies &&
      selectedCompanies?.some((fItem: Company) => {
        return fItem?.name === item.name;
      });

    return (
      <>
        {!isCompanySelected && (
          <Stack
            component={Paper}
            elevation={1}
            sx={{
              p: 1,
              mr: 1,
              ...(isFromSelectedCompanies && {
                background: "rgba(104, 78, 234, 0.06)",
              }),
              border: "0.5px solid rgba(0, 0, 0, 0.14)",
            }}
            key={item?.name}
          >
            <Stack justifyContent="space-between" direction="row">
              <Stack direction="row" gap={1}>
                <img src={item?.logo} alt="brand logo" />
                <Typography fontSize="16px" fontWeight={500}>
                  {item?.name}
                </Typography>
              </Stack>
              <Button
                startIcon={
                  isFromSelectedCompanies ? <ClearIcon /> : <AddIcon />
                }
                sx={{
                  height: "30px",
                  fontWeight: 500,
                  fontSize: "15px",
                }}
                onClick={() => handleCompanySelect(item)}
                disabled={isCompanySelected}
              >
                {isFromSelectedCompanies ? "Remove" : "Add"}
              </Button>
            </Stack>
            <Stack direction="row" gap={2}>
              <Stack direction="row" gap={1} alignItems="center">
                <WebsiteIcon />
                <a
                  href={item?.website}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  website
                </a>
              </Stack>
              <Stack direction="row" gap={1} alignItems="center">
                <LocationIcon />
                <Typography color={theme.palette.grey[500]} fontWeight={500}>
                  HQ:{item?.hq}
                </Typography>
              </Stack>
            </Stack>
            <Typography color={theme.palette.grey[500]}>
              Description: {item?.short_description}
            </Typography>
          </Stack>
        )}
      </>
    );
  };

  return (
    <Stack direction="row">
      <Sidebar />
      <Stack>
        <Header />
        <Stack
          sx={{ maxHeight: "100%", width: "100", mt: 3 }}
          justifyContent="start"
          alignItems="center"
          gap={2}
        >
          <Stack
            justifyContent="space-between"
            direction="row"
            sx={{ width: "50%" }}
          >
            <Stack>
              <Typography sx={{ fontSize: "22px", fontWeight: 600 }}>
                Peer Analysis
              </Typography>
              <Typography>Select Company you want to research</Typography>
            </Stack>
            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              disabled={selectedCompanies?.length === 0}
              onClick={handleNext}
            >
              Next Step
            </Button>
          </Stack>
          <Typography fontWeight={600} fontSize="15px">
            Add Companies for Peer Analysis
          </Typography>
          <OutlinedInput
            value={search.name}
            onChange={handleOnChange}
            type="text"
            placeholder="Type company names for analysis"
            sx={{ width: "50%" }}
            endAdornment={
              search?.name && (
                <ClearIcon
                  sx={{
                    color: theme.palette.grey[500],
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSearch((prev: Search) => ({ ...prev, name: "" }));
                    setSearchParams({ company: "" });
                  }}
                />
              )
            }
          />
          <Stack
            sx={{
              height: "calc(100vh - 270px)",
              width: "50%",
              overflowX: "hidden",
              overflowY: "auto",
            }}
            gap={2}
          >
            {selectedCompanies?.length > 0 && (
              <Stack gap={2}>
                <Typography fontWeight={600} fontSize="15px">
                  Selected Companies
                </Typography>
                {selectedCompanies?.map((item: Company) => {
                  return (
                    <React.Fragment key={item?.name}>
                      {getCompany(item, true)}
                    </React.Fragment>
                  );
                })}
              </Stack>
            )}
            <Stack>
              {search.loading && <LoadingPage />}
              {!search?.loading && companiesList && (
                <Stack gap={2}>
                  {filteredCompanies?.map((item: Company) => {
                    return (
                      <React.Fragment key={item?.name}>
                        {getCompany(item, false)}
                      </React.Fragment>
                    );
                  })}
                </Stack>
              )}
              {!search?.loading && companiesList.length === 0 && (
                <Typography align="center">No Data</Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CompaniesList;
