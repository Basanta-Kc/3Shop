import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast, Bounce } from "react-toastify";
import axios from "axios";

const schema = yup
  .object({
    firstName: yup
      .string()
      .min(2, "First Name must be at least 2 characters")
      .required(),
    lastName: yup.string().min(2).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    isAdmin: yup.boolean(),
  })
  .required();

export default function AddUserDialog({ handleClose, open, }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      console.log(data);
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("isAdmin", data.isAdmin);
      formData.append("profileImage", data.profileImage[0]);
      return axios.post("/api/admin/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
      handleClose();
      reset();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(onSubmit),
        }}
      >
        <DialogTitle>{"Add New User"}</DialogTitle>
        <DialogContent sx={{ width: "600px" }}>
          <input type="file" {...register("profileImage")} />
          <TextField
            sx={{ mb: 1 }}
            placeholder="First Name"
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            autoFocus
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.message}
            {...register("firstName")}
          />
          <TextField
            sx={{ mb: 1 }}
            placeholder="Last Name"
            autoComplete="given-name"
            name="lastName"
            required
            fullWidth
            id="lastName"
            autoFocus
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.message}
            {...register("lastName")}
          />
          <TextField
            sx={{ mb: 1 }}
            placeholder="Email"
            autoComplete="email"
            name="email"
            required
            fullWidth
            id="email"
            autoFocus
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            sx={{ mb: 1 }}
            placeholder="Password"
            autoComplete="new-password"
            name="password"
            required
            fullWidth
            id="password"
            autoFocus
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            {...register("password")}
            type="password"
          />
          <Controller
            control={control}
            name="isAdmin"
            label="Is Admin"
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                label="Is Admin"
                control={<Checkbox checked={value} onChange={onChange} />}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            {"Add User"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
