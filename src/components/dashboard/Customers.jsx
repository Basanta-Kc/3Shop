import { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TablePagination from "@mui/material/TablePagination";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

export default function Customers() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { isPending, data } = useQuery({
    queryKey: ["users", { rowsPerPage, page, search }],
    queryFn: () => {
      return axios.get("/api/admin/users", {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          search,
        },
      });
    },
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          id="input-with-icon-textfield"
          label="Search"
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isPending && (
                <>
                  {[1, 2, 3, 4].map((id) => (
                    <TableRow key={id}>
                      <TableCell>
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
              {data?.data?.data?.map(({ firstName, lastName, _id, email }) => (
                <TableRow
                  key={_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {`${firstName} ${lastName}`}
                  </TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>
                    {" "}
                    <IconButton color="secondary" aria-label="delete">
                      <CreateIcon />
                    </IconButton>
                    <IconButton color="warning" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TablePagination
              component="div"
              count={data?.data?.count ?? 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[10, 20, 30, 40]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
