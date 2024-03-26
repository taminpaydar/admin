import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { getCookies } from "cookies-next";
import { Box, Button, Card, Grid, CardMedia, CardActionArea, CardContent, Typography } from '@mui/material';
import { config } from "@/config";
import styles from '../../app/template.module.scss'
import i18n from '../../../i18n';
import { Refresh, AddAPhoto, Delete } from '@mui/icons-material';
export default function FileManagerSingle({ parent, component, insermode }) {
  const [listfile, setListFiles] = useState(null);
  const [key, setKey] = useState(0);

  let cookie = getCookies();

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
  const loaditem = async () => {

    try {
      let res = await axios({
        method: 'get',
        url: config.url + '/v1/dashboard/filemanager/getitem/' + parent+'?component='+component,
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
      <div {...getRootProps({ className: 'dropzone' })} className={styles.btnupload}>
        <input {...getInputProps()} />
        <p>{i18n.t('File Upload')}</p>
      </div>



      <Grid container >
        {listfile != null && listfile.map((item) => {

          return (
            <Grid xs={12} >
              <Card >
                <CardActionArea >
                  <Box textAlign={'center'}>
                    <img
                      component="img"
                      width="100%"
                      src={`${config.url}${item.url}`}
                    />
                  </Box>
                  <CardContent>
                    <Grid container>
                      {insermode != '' && <Grid xs={2}> <AddAPhoto onClick={(e) => insermode(`${config.url}${item.url}`)}></AddAPhoto></Grid>}
                      <Grid xs={2}> <Delete onClick={(e) => deleteitem(item._id)}  ></Delete></Grid>
                      <Grid xs={3}> {item.mimetype}</Grid>

                    </Grid>



                  </CardContent>
                </CardActionArea>
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
  console.log(event);

  let formData = new FormData();
  formData.append("file", event[0]);
  formData.append("component", component);
  formData.append("parent", parent);
  console.log(config.url + "/v1/dashboard/filemanager");

  await axios({
    method: "post",
    url: config.url + "/v1/dashboard/filemanager/single",
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



  return true;
}

