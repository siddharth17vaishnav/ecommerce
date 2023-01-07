import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Button, TextField } from "@mui/material";
import Profile from "../assets/user.png";
import Image from "next/image";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

interface usersProps {
  id: number;
  name: string;
  email: string;
  profile: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BasicTable() {
  const [data, setData] = useState<usersProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [update, setUpdate] = useState(false);

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    getUsers().then();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const getData = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users`
    );
    setData(getData.data.data);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleOnClose = () => {
    setOpen(false);
    setUpdate(false);
    getUsers().then();
  };

  const handleOnAdd = async () => {
    const addUser = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/register`,
      { name, email, password }
    );
    const response = await addUser;
    if (response.status === 200) {
      setOpen(false);
      setName("");
      setEmail("");
      setPassword("");
      getUsers().then();
    } else {
      alert("something went wrong!");
      setOpen(false);
    }
  };

  const handleOnDelete = async (id: number) => {
    const deleteUser = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users?userId=${id}`
    );
    const response = await deleteUser;
    if (response.data.data === "deleted") {
      getUsers().then();
    }
  };

  const handleOnUpdate = async (item: usersProps) => {
    setUpdate(true);
    setName(item.name);
    setEmail(item.email);
  };

  const handleOnSubmitUpdate = async () => {
    const updateUser = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
      { name, email, password }
    );
    const response = await updateUser;
    if (response.status === 200) {
      setOpen(false);
      setUpdate(false);
      setName("");
      setEmail("");
      setPassword("");
      getUsers().then();
    } else {
      alert("something went wrong!");
      setOpen(false);
    }
  };
  return (
    <Box>
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <Button
            variant="outlined"
            sx={{ display: "flex", marginLeft: "auto" }}
            onClick={handleOpen}
          >
            Add User
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">NAME</TableCell>
                  <TableCell align="right">EMAIL</TableCell>
                  <TableCell align="right">PROFILE</TableCell>
                  <TableCell align="right">ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length === 0 ? (
                  <Typography sx={{ mt: 2 }}>No User Found!</Typography>
                ) : (
                  <>
                    {data?.map((row: usersProps) => (
                      <TableRow
                        key={row?.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">
                          <Image
                            src={row.profile ? row.profile : Profile}
                            alt={"profile"}
                            width={40}
                            height={40}
                            className={"ml-auto"}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            color="primary"
                            sx={{ mx: 1 }}
                            onClick={() => handleOnUpdate(row)}
                          >
                            UPDATE
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            sx={{ mx: 1 }}
                            onClick={() => handleOnDelete(row.id)}
                          >
                            DELETE
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleOnClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add User
            </Typography>
            <Box id="transition-modal-description" sx={{ mt: 2 }}>
              <TextField
                id="name"
                label="Name"
                variant="standard"
                fullWidth
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="email"
                label="Email"
                variant="standard"
                fullWidth
                value={email}
                type={"email"}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="password"
                label="Password"
                variant="standard"
                fullWidth
                value={password}
                type={"password"}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ px: 1 }}
                  onClick={() => handleOnAdd()}
                >
                  ADD
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ px: 1 }}
                  onClick={() => handleOnClose()}
                >
                  CLOSE
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={update}
        onClose={handleOnClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={update}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Update User
            </Typography>
            <Box id="transition-modal-description" sx={{ mt: 2 }}>
              <TextField
                id="name"
                label="Name"
                variant="standard"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="email"
                label="Email"
                variant="standard"
                fullWidth
                value={email}
                type={"email"}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ px: 1 }}
                  onClick={() => handleOnSubmitUpdate()}
                >
                  UPDATE
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ px: 1 }}
                  onClick={() => handleOnClose()}
                >
                  CLOSE
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
