import * as React from "react";
import SunEditor from "suneditor-react";
import FileManager from "../ImageManager/MultiFileManager.js";
import styles from '../../app/template.module.scss'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, Button, Typography } from "@mui/material";
import FileManagerMultiFile from "../ImageManager/MultiFileManager";

import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import 'katex/dist/katex.min.css'
const defaultFonts = [
  "Arial",
  "Comic Sans MS",
  "Courier New",
  "Impact",
  "Georgia",
  "Tahoma",
  "Trebuchet MS",
  "Verdana"
];
export default function App({ editorData, mydata, saveItem, id }: any) {
  const [value, setValue] = React.useState(editorData);
  const [value3, setValue3] = React.useState(editorData.val);

  const sortedFontOptions = [
  
    "Logical",
    "Salesforce Sans",
    "Garamond",
    "Sans-Serif",
    "Serif",
    "Times New Roman",
    "Helvetica",
    ...defaultFonts
  ].sort();
  const insermode = (data: any) => {
    var newdata = `${value} <img src="${data}" />`;
    setValue3(newdata);
    setValue(newdata);

  }
  return (
    <div className="App" >
     {/* <CKEditor
        editor={ClassicEditor}
        data={value3}
        config={ {
       
          toolbar:  [
        'undo', 'redo',
        '|', 'heading',
        '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
        '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
        '|', 'link', 'uploadImage', 'blockQuote', 'codeBlock',
        '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
    ]
      } }
        onChange={(event, editor) => {
          const data = editor.getData();
         setValue(data);
        }}
        

      /> */}
    
      <SunEditor
        setContents={value3}
        onChange={(event: any) => {
       
          const data = event;
          setValue(data);
        }}
        setOptions={{
          buttonList: [
            ["undo", "redo"],
            ["font", "fontSize"],
            // ['paragraphStyle', 'blockquote'],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript"
            ],
            ["fontColor", "hiliteColor"],
            ['dir'],
            ["align", "list", "lineHeight"],
            ["outdent", "indent"],

            ["table", "horizontalRule", "link", "image", "video"],
            // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
            // ['imageGallery'], // You must add the "imageGalleryUrl".
            ["fullScreen", "showBlocks", "codeView"],
            ["preview", "print"],
            ["removeFormat"]


            // ['save', 'template'],
            // '/', Line break
          ], // Or Array of button list, eg. [['font', 'align'], ['image']]
          defaultTag: "div",
          minHeight: "400px",
          showPathLabel: false,
          font: sortedFontOptions
        }}
      />
      <FileManagerMultiFile insermode={insermode} component='TextEditor' parent={id}></FileManagerMultiFile>

      <Button onClick={(e) => { mydata(value) }} className={styles.buttonblack} style={{ height: 40 }} >
        <Typography fontSize={12} color={'white'}>Save</Typography>
      </Button>
      <hr />

    </div>
  );
}
