import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { getCookies } from "cookies-next";
import { Box, Button, Card, Grid, CardMedia, CardActionArea, CardContent, Typography, Container, TextField, Stack } from '@mui/material';
import { config } from "@/config";
import styles from '../../app/template.module.scss'
import i18n from '../../../i18n';
import PropTypes from 'prop-types';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'

import { Refresh, AddAPhoto, Delete, Edit, ArrowBack, ArrowForward } from '@mui/icons-material';
import AdvancedEditor, { AdvancedEditorS } from '../AdavncedEditor/TissEditor';
function SimpleDialog(props) {
  const { onClose, open, selectedValue } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}

      onClose={handleClose} open={open} >
      <DialogTitle>Set backup account</DialogTitle>
      <Container>
        <Box textAlign={'center'}>
          <TextField>

          </TextField>
        </Box>
      </Container>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.any.isRequired
};

export default function FileManagerMultiFile({ parent, component, insermode, edittable = false, fullwidth = false, overlytext = false }) {
  const [listfile, setListFiles] = useState(null);
  const [key, setKey] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  let cookie = getCookies();
  const handleClickOpen = (id, title) => {
    Swal.fire({
      title: 'Caption',
      text: 'New Caption',
      inputValue: title,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      preConfirm: (title) => {
        ChangeTitle(id, title);

      },
      confirmButtonText: 'Cool'
    })
  };
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    // Note how this callback is never invoked if drop occurs on the inner dropzone
    onDrop: files => myCustomFileGetter(files, parent, component, loaditem),
    onDropRejected: files => myCustomFileGetter(files, parent, component, loaditem),
    onDragEnter: files => myCustomFileGetter(files, parent, component, loaditem),
  });
  useEffect(() => {
    loaditem()

  }, []);
  const deleteitem = async (id) => {
    console.log(id);
    try {
      let res = await axios({
        method: 'delete',
        url: config.url + '/v1/dashboard/filemanager/' + id,
        headers: {
          Authorization: 'Bearer ' + cookie['token'],
        }
      });

      let x = key + 1;
      setKey(key);
      loaditem()
      return true;
    } catch (error) {
      console.log(error);
      // setError(error.response);
    }
  }
  const ArrangToTop = async (id) => {

    try {
      let res = await axios({
        method: 'put',
        url: config.url + '/v1/dashboard/filemanager/orderup/' + id,
        headers: {
          Authorization: 'Bearer ' + cookie['token'],
        }
      });

      loaditem();

      return true;
    } catch (error) {
      console.log(error);
      // setError(error.response);
    }

  }
  const ChangeTitle = async (id, title) => {

    try {
      let res = await axios({
        method: 'put',
        data: {
          title: title
        },
        url: config.url + '/v1/dashboard/filemanager/title/' + id,
        headers: {
          Authorization: 'Bearer ' + cookie['token'],
        }
      });

      loaditem();

      return true;
    } catch (error) {
      console.log(error);
      // setError(error.response);
    }

  }
  const ArrangToDown = async (id) => {

    try {
      let res = await axios({
        method: 'put',
        url: config.url + '/v1/dashboard/filemanager/orderdown/' + id,
        headers: {
          Authorization: 'Bearer ' + cookie['token'],
        }
      });

      loaditem();

      return true;
    } catch (error) {
      console.log(error);
      // setError(error.response);
    }

  }

  const loaditem = async () => {

    try {
      let res = await axios({
        method: 'get',
        url: config.url + '/v1/dashboard/filemanager/getitem/' + parent + '?component=' + component,
        headers: {
          Authorization: 'Bearer ' + cookie['token'],
        }
      });

      let x = key + 1;
      setKey(key);
      setListFiles(res.data.message);

      return true;
    } catch (error) {
      console.log(error);
      // setError(error.response);
    }

  }
  return (
    <div className="container">
      <Stack spacing={4} direction="row">
        <Box
          mr={2}
          {...getRootProps({ className: 'dropzone' })} style={{ height: '40px', cursor: 'pointer', backgroundColor: 'green', width: '80px', borderRadius: '15px', padding: '5px', textAlign: 'center' }}>
          <input {...getInputProps()} />
          <p style={{ color: 'white' }}>{i18n.t('File Upload')}</p>
        </Box>
        <Box></Box>
        <Box
          mr={2}
          style={{ height: '40px', cursor: 'pointer', backgroundColor: 'gray', width: '80px', borderRadius: '15px', padding: '5px', textAlign: 'center' }}
          onClick={(e) => loaditem()}
        >
          <Refresh htmlColor='white'></Refresh>
        </Box>
      </Stack>


      <Grid container >
        {listfile != null && listfile.map((item) => {

          return (
            <Grid p={1} md={fullwidth == true && 12} >
              <Card  >
                <CardMedia
                  component="img"
                  height={fullwidth != true && 150}
                  image={`${config.url}${item.url}`}
                  alt="green iguana"
                />
                <CardContent>
                  <Grid container  >
                    {insermode != '' && <Grid xs={2}> <AddAPhoto onClick={(e) => insermode(`${config.url}${item.url}`)}></AddAPhoto></Grid>}
                    <Grid xs={3}> <Delete onClick={(e) => deleteitem(item._id)}  ></Delete></Grid>
                    <Grid xs={3}>
                      <Typography fontSize={10}> {item.mimetype}</Typography>
                    </Grid>
                  </Grid>
                  {edittable == true &&
                    <Grid container>
                      <Grid item xs={4}>
                        <Box> <ArrowForward onClick={(e) => { ArrangToTop(item._id) }}></ArrowForward></Box>
                      </Grid>
                      <Grid item xs={4}>

                        <Box> <Edit onClick={(e) => handleClickOpen(item._id, item.title)} ></Edit></Box>
                      </Grid>
                      <Grid item xs={4}>

                        <Box> <ArrowBack onClick={(e) => { ArrangToDown(item._id) }}></ArrowBack></Box>
                      </Grid>

                      <Grid item xs={12}>

                        <Box textAlign={'center'}>
                          <Typography fontSize={10}>{item.title}</Typography>
                        </Box>
                        {
                          overlytext == true &&
                          <AdvancedEditor key={item.id} parent={item.id}></AdvancedEditor>
                        }
                      </Grid>

                    </Grid>

                  }



                </CardContent>
              </Card>
            </Grid>
          );

        })}

      </Grid>
    </div>
  );
}

async function myCustomFileGetter(event, parent, component, loaditem) {
  let cookie = getCookies();
  event.map(async (item) => {
    let formData = new FormData();
    formData.append("file", item);
    formData.append("component", component);
    formData.append("parent", parent);
    console.log(config.url + "/v1/dashboard/filemanager");

    await axios({
      method: "post",
      url: config.url + "/v1/dashboard/filemanager",
      data: formData,
      headers: {
        Authorization: 'Bearer ' + cookie['token'],
        "Content-Type": "multipart/form-data"
      },
    })
      .then(function (response) {
        loaditem()
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  })




  return true;
}


