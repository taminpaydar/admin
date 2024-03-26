import { Box, Grid, Typography, Container } from "@mui/material"
import i18n from 'i18n';
import { getCookies } from "cookies-next";
import { useRouter } from "next/router";
import ErrorDB from "@/components/ErrorDb";
import { config } from "@/config";
import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import styles from '../../app/template.module.scss'
import { TextEditor as Ckeditor } from "./TextEditorComponent";
import ShowAricle from "./ShowComponent/ShowArticle";
import ImageEditor from "./imageEditor";
import ShowImage from "./ShowComponent/showImage";
import SliderEditor from "./SliderEditor";
import ShowSlider, { Item } from "./ShowComponent/ShowSlider";
import VideoEditor from "./VideoEditor";
import VideoShow from "./ShowComponent/ShowVideo";
import dynamic from "next/dynamic";

export default function AdvancedEditor({ parent }: any) {
   const router = useRouter()
   const [key, setKey] = useState<any>(0);
   const [error, setError] = useState<any>(null);
   const [listitem, setListItem] = useState<any>(null);
   const myRef = useRef(null);

   let cookie = getCookies();

   const loadcomonent = async () => {

      try {
         let res: any = await axios({
            method: 'get',
            url: config.url + '/v1/dashboard/componenet/group/' + parent,

            headers: {
               Authorization: 'Bearer ' + cookie['token'],
            }
         });
         setListItem(res.data.message)
         //   let mydata = res.data;
         //router.push('/Dashboard/Articles/Groups/Edit/'+res.data.data.id)
         return true
      } catch (error: any) {
         let x = key + 1;
         setKey(x);
         setError(error.response);
      }
   }
   const AddItem = async (mode: string) => {
      let mydata = {
         parent: parent,
         component: mode
      }
      try {
         let res: any = await axios({
            method: 'post',
            url: config.url + '/v1/dashboard/componenet',
            data: mydata,
            headers: {
               Authorization: 'Bearer ' + cookie['token'],
            }
         });

         loadcomonent();
         router.push("#endofpage");
         return mydata;
      } catch (error: any) {
         let x = key + 1;
         setKey(x);
         setError(error.response);
      }

   }
   useEffect(() => {

      loadcomonent();
   },
      []
   )
      ;
   return (
      <>

         <Grid container direction="row"
         >
            <Grid item >
               <Box textAlign={'center'} onClick={() => AddItem('TextEditor')} >
                  <Grid container className={styles.buttonAdEditor} p={1}>
                     <Grid md={4} textAlign={'center'}>  <img src="/assets/components/text.svg" width={20} height={20}></img></Grid>
                     <Grid md={8} >  <Typography>{i18n.t('TextEditor')} </Typography></Grid>

                  </Grid>


               </Box>
            </Grid>
            <Grid item >
               <Box textAlign={'center'} onClick={() => AddItem('Image')}  >
                  <Grid container className={styles.buttonAdEditor} p={1}>
                     <Grid md={4} textAlign={'center'}>  <img src="/assets/components/image.svg" width={20} height={20}></img></Grid>
                     <Grid md={8} >  <Typography>{i18n.t('Image')} </Typography></Grid>

                  </Grid>
               </Box>
            </Grid>
            <Grid item>
               <Box textAlign={'center'} onClick={() => AddItem('Slider')} >
                  <Grid container className={styles.buttonAdEditor} p={1}>
                     <Grid md={4} textAlign={'center'}>  <img src="/assets/components/slider.svg" width={20} height={20}></img></Grid>
                     <Grid md={8} >  <Typography>{i18n.t('Slider')} </Typography></Grid>

                  </Grid>
               </Box>
            </Grid>
            <Grid item>
               <Box textAlign={'center'} onClick={() => AddItem('Video')} >
                  <Grid container className={styles.buttonAdEditor} p={1}>
                     <Grid md={4} textAlign={'center'}>  <img src="/assets/components/video.svg" width={20} height={20}></img></Grid>
                     <Grid md={8} >  <Typography>{i18n.t('Video')} </Typography></Grid>

                  </Grid>
               </Box>
            </Grid>
            {/* <Grid xs={2} md={2}>
               <Box textAlign={'center'} onClick={() => AddItem('Chart')} >
                  <img src="/assets/components/chart.svg" width={50} height={50}></img>
                  <Typography>{i18n.t('Chart')} </Typography>
               </Box>
            </Grid> */}
            <Grid xs={2} md={2}>
               <Box textAlign={'center'} onClick={() => AddItem('Map')} >
                  <Grid container className={styles.buttonAdEditor} p={1}>
                     <Grid md={4} textAlign={'center'} >   <img src="/assets/components/map.svg" width={20} height={20}></img></Grid>
                     <Grid md={8} >  <Typography>{i18n.t('Map')} </Typography></Grid>

                  </Grid>
               </Box>
            </Grid>
         </Grid>
         <Grid container mt={4}>
            {
               listitem != null ?
                  <Grid xs={12}>
                     <Grid container>
                        {
                           listitem.map((item: any, key: number) => {
                              return <AdvancedEditorS loadcomonent={loadcomonent} data={item} key={key}> </AdvancedEditorS>
                           })
                        }
                     </Grid>

                     <Grid id='endofpage'></Grid>
                  </Grid> :
                  <Box className={styles.infobox}>
                     <Typography>{i18n.t('Add section with click on top icons')} </Typography>
                  </Box>
            }
         </Grid>

         {error != null && <ErrorDB key={key} err={error} />}

      </>
   )
}
export function AdvancedEditorS({ data, loadcomonent }: any) {
   const router = useRouter()
   const [key, setKey] = useState<any>(0);
   const [error, setError] = useState<any>(null);
   const [listitem, setListItem] = useState<any>(null);
   const [eye, setEye] = useState<any>(false);

   let cookie = getCookies();
   const OrderTop = async (id: number) => {

      try {

         let res: any = await axios({
            method: 'put',
            url: config.url + '/v1/dashboard/componenet/orderup/' + id,
            headers: {
               Authorization: 'Bearer ' + cookie['token'],
            }
         });
         loadcomonent();
         return true;
      } catch (error: any) {
         let x = key + 1;
         setKey(x);
         setError(error.response);
      }

   }
   const deletecomponent=async (id:String) => {
      try {
         let res: any = await axios({
            method: 'delete',
            url: config.url + '/v1/dashboard/componenet/' + id,
            headers: {
               Authorization: 'Bearer ' + cookie['token'],
            }
         });
         loadcomonent();
         return true;
      } catch (error: any) {
         let x = key + 1;
         setKey(x);
         setError(error.response);
      }
   };
   const OrderDown = async (id: number) => {

      try {
         let res: any = await axios({
            method: 'put',
            url: config.url + '/v1/dashboard/componenet/orderdown/' + id,
            headers: {
               Authorization: 'Bearer ' + cookie['token'],
            }
         });
         loadcomonent();
         return true;
      } catch (error: any) {
         let x = key + 1;
         setKey(x);
         setError(error.response);
      }

   }
   const ChangeSize = async (cols: number) => {
      let mydata = {
         cols: cols
      }
      try {
         let res: any = await axios({
            method: 'put',
            url: config.url + '/v1/dashboard/componenet/' + data.id,
            data: mydata,
            headers: {
               Authorization: 'Bearer ' + cookie['token'],
            }
         });
         loadcomonent();
         return mydata;
      } catch (error: any) {
         let x = key + 1;
         setKey(x);
         setError(error.response);
      }

   }
   const loadshow = () => {
      loadcomonent().then(function () {
         setEye(true);
      })
   }
   const loadhide = () => {
      loadcomonent().then(function () {
         setEye(false);
      })
   }
   return <Grid xs={12} md={data.cols}>
      <Container>
         <Grid container className={styles.headerbox}>
            <Grid md={4}>
               <Box component="span" p={1}>
                  <img src="/assets/components/top.svg" onClick={() => OrderTop(data.id)} width={20} height={20}></img>
               </Box>
               <Box component="span" p={1}>
                  <img src="/assets/components/down.svg" onClick={() => OrderDown(data.id)} width={20} height={20}></img>
               </Box>

               {
                  eye == true ?
                     <Box component="span" p={1}>
                        <img src="/assets/components/edit.svg" onClick={(e) => loadhide()} width={20} height={20}></img>
                     </Box>
                     :
                     <Box component="span" p={1}>
                        <img src="/assets/components/eye.svg" onClick={(e) => loadshow()} width={20} height={20}></img>
                     </Box>

               }



               <Box component="span" p={1} onClick={(e)=>{ deletecomponent(data.id)}}>
                  <img src="/assets/components/trash.svg" width={20} height={20}></img>
               </Box>
            </Grid>
            <Grid md={7} textAlign={'left'}>
               <Box component="span" >
                  <Typography fontSize={14}>{i18n.t(data.component)} </Typography>
               </Box>
            </Grid>

            <Grid md={1} textAlign={'right'}>
               {
                  data.cols == 12 &&
                  <Box component="span" p={1} onClick={() => ChangeSize(6)}>
                     <img src="/assets/components/full.svg" width={40} height={15}></img>
                  </Box>
               }
               {
                  data.cols == 6 &&
                  <Box component="span" p={1} onClick={() => ChangeSize(4)} >
                     <img src="/assets/components/half.svg" width={40} height={15}></img>
                  </Box>
               }
               {
                  data.cols == 4 &&
                  <Box component="span" p={1} onClick={() => ChangeSize(12)} >
                     <img src="/assets/components/quarter.svg" width={40} height={15}></img>
                  </Box>
               }

            </Grid>
         </Grid>
         <Grid>
            {eye == true ?
               <ComponentSelect mode={data.component} data={data}> </ComponentSelect>
               : <ShowComponentSelect mode={data.component} data={data}> </ShowComponentSelect>}
         </Grid>
      </Container>
      {error != null && <ErrorDB key={key} err={error} />}

   </Grid>
}
export function ComponentSelect({ mode, data }: any) {

   switch (mode) {
      case "TextEditor":
         return (<Ckeditor data={data} ></Ckeditor>)
      case "Image":
         return (<ImageEditor data={data} ></ImageEditor>)
      case "Slider":
         return (<SliderEditor data={data} ></SliderEditor>)

      case "Video":
         return (<VideoEditor data={data} ></VideoEditor>)

      default:

         return <Box />;
   }

}
export function ShowComponentSelect({ mode, data }: any) {
   switch (mode) {
      case "TextEditor":
         return (<ShowAricle data={data} ></ShowAricle>)
      case "Image":
         return (<ShowImage data={data} ></ShowImage>)
      case "Slider":
         return (<ShowSlider data={data} ></ShowSlider>)
      case "Video":
         return (<VideoShow data={data} ></VideoShow>)
      default:
         return <Box />;
   }

}