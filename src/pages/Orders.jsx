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
  Chip,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TablePagination from "@mui/material/TablePagination";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const StatusToColor = {
  pending: "secondary",
  completed: "success",
  cancelled: "error",
}; // square brackert statutocolor[status]

export default function UserOrders() {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { isPending, data } = useQuery({
    queryKey: ["users", { page, rowsPerPage, status }],
    queryFn: () => {
      return axios.get("/api/home/user/orders", {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          status,
        },
      });
    }
  });

  return (
    <>
      <Box sx={{ my: 1, display: "flex", justifyContent: "end" }}>
        <FormControl>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            displayEmpty
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">Status</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No of Products</TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>Status</TableCell>
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
                {data?.data?.data?.map(
                  ({ _id, products, totalAmount, status }) => (
                    <TableRow
                      key={_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>Total Product: {products.length}</TableCell>
                      <TableCell>{totalAmount}</TableCell>
                      <TableCell>
                        <Chip
                          label={status}
                          color={StatusToColor[status]}
                          size="small"
                          variant="contained"
                        />
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={data?.data?.count ?? 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[10, 20, 30, 40]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
