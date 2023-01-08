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
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

interface usersProps {
  id: number;
  name: string;
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

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    getCategory().then();
  }, []);

  const getCategory = async () => {
    setLoading(true);
    const getData = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category`
    );
    setData(getData.data.data);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleOnClose = () => {
    setOpen(false);
    getCategory().then();
  };

  const handleOnAdd = async () => {
    const addCategory = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category`,
      { name }
    );
    const response = await addCategory;
    if (response.status === 200) {
      setOpen(false);
      setName("");
      getCategory().then();
    } else {
      alert("something went wrong!");
      setOpen(false);
    }
  };

  const handleOnDelete = async (id: number) => {
    const deleteUser = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category?categoryId=${id}`
    );
    const response = await deleteUser;
    if (response.data.data === "deleted") {
      getCategory().then();
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
            Add Category
          </Button>
          <TableContainer component={Paper} sx={{ width: 500 }}>
            <Table sx={{ maxWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">NAME</TableCell>
                  <TableCell align="right">ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length === 0 ? (
                  <Typography sx={{ mt: 2 }}>No Category Found!</Typography>
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

                        <TableCell align="right">
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
    </Box>
  );
}
