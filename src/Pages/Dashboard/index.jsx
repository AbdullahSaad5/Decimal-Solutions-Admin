import { useContext, useState } from "react";
import axios from "axios";
import { SimpleGrid } from "@mantine/core";
import PageHeader from "../../components/PageHeader";
import { Card } from "./card";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";
import { useQuery } from "react-query";

export const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([
    { label: "Service", value: 50 },
    { label: "Service", value: 50 },
    { label: "Service", value: 50 },
    { label: "Service", value: 50 },
    { label: "Service", value: 50 },
    { label: "Service", value: 50 },
    { label: "Service", value: 50 },
    { label: "Service", value: 50 },
  ]);

  const { status } = useQuery(
    "fetchDashboard",
    () => {
      return axios.get(backendUrl + "/api/v1/dashboard", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        setData(data);
      },
    }
  );
  return (
    <>
      <PageHeader label={"Dashboard"} />
      <SimpleGrid
        verticalSpacing={"xl"}
        breakpoints={[
          { minWidth: "sm", cols: 2 },
          { minWidth: "md", cols: 3 },
          { minWidth: "lg", cols: 4 },
        ]}
      >
        {data.map((obj, ind) => (
          <Card key={ind} data={obj} />
        ))}
      </SimpleGrid>
    </>
  );
};