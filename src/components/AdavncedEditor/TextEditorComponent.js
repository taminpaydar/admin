
import dynamic from "next/dynamic";
import { Container } from "@mui/system";
import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from 'react';
import styles from '../../app/template.module.scss'
import axios from "axios";
import { config } from "@/config";
import { getCookies } from "cookies-next";
import MessageBox from "../MessageBox";
import FileManagerMultiFile from "../ImageManager/MultiFileManager";

export function TextEditor({ data }) {

    const Editor = dynamic(() => import("./Ckeditor"), { ssr: false });
    const [editorData, setData] = useState({ val: data.data, callback: null });
    const [error, setError] = useState(null);
    const [key, setKey] = useState(0);
    const [message, setMessage] = useState(null);

    let cookie = getCookies();
 
    const mydata = (data) => {


        setData({ val: data, callback: () => null })
        saveItem(data)

    }
    const insermode = (data) => {
        var newdata = `${editorData} <img src="${data}" />`;
        setData(newdata
        );

    }
    const saveItem = async (htmdata) => {
        let mydata = {
            data: htmdata
        }
        try {
            let res = await axios({
                method: 'put',
                data: mydata,
                url: config.url + '/v1/dashboard/componenet/updatedata/' + data.id,
                headers: {
                    Authorization: 'Bearer ' + cookie['token'],
                }
            });
            let x = key + 1;
            setKey(x);
            setMessage('Saved');

            return true;
        } catch (error) {
            let x = key + 1;

            setError(error.response);
        }
    }
    return (
        <Container>
            {message != null && <MessageBox key={key} message={message}></MessageBox>}
            <Container>

                <Box m={2}>
                    <Editor
                        editorData={editorData}
                        mydata={mydata}
                        saveItem={saveItem}
                    />

                </Box>



            </Container>

        </Container>
    )


}