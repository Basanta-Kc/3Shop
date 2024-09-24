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
  Box,
  Button,
  Avatar,
} from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import TablePagination from "@mui/material/TablePagination";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import AddUserDialog from "./AddUserDialog";
import { SERVER_URL } from "../../constant";
import { toast, Bounce } from "react-toastify";
import useDebounce from "../../hooks/useDecounce";

export default function Customers() {
  const [userToBeEdited, setUserToBeEdited] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`/api/admin/users/${id}`);
    },
    onSuccess: (res) => {
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      refetch();
    },
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { isPending, data, refetch } = useQuery({
    queryKey: ["users", { rowsPerPage, page, debouncedSearch }],
    queryFn: () => {
      return axios.get("/api/admin/users", {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          search: debouncedSearch,
        },
      });
    },
  });

  return (
    <>
      <AddUserDialog
        handleClose={handleClose}
        open={open}
        user={userToBeEdited}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ my: 1, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" onClick={handleClickOpen}>
              Add
            </Button>
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
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell />
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
                          <Skeleton
                            variant="circle"
                            sx={{ fontSize: "1rem" }}
                          />
                        </TableCell>
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
                  ({ firstName, lastName, _id, email, profileImage, roles }) => (
                    <TableRow
                      key={_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <Avatar
                          src={`${SERVER_URL}${profileImage}`}
                          alt={firstName}
                        />
                      </TableCell>
                      <TableCell>{`${firstName} ${lastName}`}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>
                        {" "}
                        <IconButton
                          color="secondary"
                          aria-label="edit"
                          onClick={() => {
                            setOpen(true);
                            setUserToBeEdited({
                              id: _id,
                              firstName,
                              lastName,
                              email,
                              isAdmin: roles?.includes("Admin"),
                            });
                          }}
                        >
                          <CreateIcon />
                        </IconButton>
                        <IconButton
                          color="warning"
                          aria-label="delete"
                          onClick={() => {
                            mutation.mutate(_id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
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
