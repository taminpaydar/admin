import SunEditor from "suneditor-react";
import SingleFileManager from "../ImageManager/SingleFileManager";
import { Box, Grid, TextField, Button, Select, MenuItem } from "@mui/material";
import React, { useState, useEffect } from 'react';
import styles from '../../app/template.module.scss'
import { config } from "@/config";
import { getCookies } from "cookies-next";
import MessageBox from "../MessageBox";
import axios from "axios";
import { t } from "i18next";
type Inputs = {
    model: String,
    link: String,

};
export default function VideoEditor({ data }: any) {
    const [mydata, setData] = useState<Inputs>({
        model: data.data != undefined ? data.data.model : 'Aparat',
        link: data.data != undefined ? data.data.link : '',

    });
    const [key, setKey] = useState<any>(0);

    let cookie = getCookies();
    const [message, setMessage] = useState<any>(null);

    const saveItem = async () => {
        console.log(mydata);
        let saved = {
            data: mydata
        }
        try {
            let res: any = await axios({
                method: 'put',
                data: saved,
                url: config.url + '/v1/dashboard/componenet/updatedata/' + data.id,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });
            console.log(res);
            let x = key + 1;
            setKey(x);
            setMessage('Saved');

            return true;
        } catch (error: any) {
        }
    }

    return (
        <>
            {message != null && <MessageBox key={key} message={message}></MessageBox>}
            <Box>

                <Grid container p={2}>
                    <Grid xs={12}>


                        {mydata.model == "Aparat" &&
                            mydata.link != "" &&
                            <iframe
                                width={'100%'}
                                height={600}
                                src={`https://www.aparat.com/video/video/embed/videohash/${mydata.link}/vt/frame?titleShow=true`}

                            ></iframe>
                        }
                        {mydata.model == "YouTube" &&
                            mydata.link != "" &&
                            <iframe width={'100%'}
                                height={600} src={`https://www.youtube.com/embed/${mydata.link}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>

                        }

                    </Grid>
                    <Grid xs={12} p={2} md={6}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Model"
                            fullWidth
                           
                            onChange={(e) => setData({ ...mydata, model: e.target.value })}
                            defaultValue={mydata.model}
                        >
                            <MenuItem value={'YouTube'}>{t('YouTube')} </MenuItem>
                            <MenuItem value={'Aparat'}>{t('Aparat')}</MenuItem>

                        </Select>
                    </Grid>
                    <Grid xs={12} p={2} md={6}>

                        <TextField
                            onChange={(e) => setData({ ...mydata, link: e.target.value })}

                            defaultValue={mydata.link} fullWidth label={t('caption')} ></TextField>
                    </Grid>
                    <Grid xs={12}>
                        <Box textAlign={'center'}>
                            {mydata.model == "Aparat" && <img width={400} src="/aparat.png"></img>}
                            {mydata.model == "YouTube" && <img width={400} src="/youtube.png"></img>}

                        </Box>
                    </Grid>
                    <Grid xs={12} p={2} md={6}>
                        <Button onClick={(e) => saveItem()} className={styles.buttonoutline}>{t('Save')}</Button>
                    </Grid>


                </Grid>
            </Box>
        </>
    )

}