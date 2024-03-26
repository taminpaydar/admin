import SunEditor from "suneditor-react";
import MultiFileManager from "../ImageManager/MultiFileManager";
import { Box, Grid, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from 'react';
import styles from '../../app/template.module.scss'
import { config } from "@/config";
import { getCookies } from "cookies-next";
import MessageBox from "../MessageBox";
import axios from "axios";
import { t } from "i18next";
type Inputs = {
    alt: String,
    caption: String,

};
export default function SliderEditor({ data }: any){
    const [mydata, setData] = useState<Inputs>({
        alt: data.data!=undefined ? data.data.alt : '',
        caption: data.data!=undefined ? data.data.caption : '',
    
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

    return(
            <>
            {message != null && <MessageBox key={key} message={message}></MessageBox>}
           <MultiFileManager insermode={''} component='TextEditor' parent={data.id}></MultiFileManager>
           <Box>
            <Grid container p={2}>
                <Grid xs={12}  p={2} md={6}>
                <TextField 
                 onChange={(e) => setData({ ...mydata, alt: e.target.value })}
                defaultValue={mydata.alt} fullWidth label={t('alt')} ></TextField>
                </Grid>
                <Grid xs={12}  p={2} md={6}>
                    
                <TextField
                  onChange={(e) => setData({ ...mydata, caption: e.target.value })}

                defaultValue={mydata.caption} fullWidth label={t('caption')} ></TextField>
                </Grid>
                <Grid xs={12}  p={2} md={6}>
                    <Button onClick={(e)=>saveItem()} className={styles.buttonoutline}>{t('Save')}</Button>
                    </Grid>

            </Grid>
            </Box>
            </>
    )

}