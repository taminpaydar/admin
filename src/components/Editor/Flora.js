import ReactDOM from 'react-dom';


// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import dynamic from "next/dynamic";

//import FroalaEditorComponent from 'react-froala-wysiwyg';
const Editor = dynamic(
    () => {
      return new Promise(resolve =>
        import("react-froala-wysiwyg").then(e => {
          //import("react-froala-wysiwyg").then(resolve);
        })
      );
    },
    {
      loading: () => null,
      ssr: false
    }
  );
// // Import all Froala Editor plugins;
//  dynamic(
//     () => {
//         return import("froala-editor/js/plugins.pkgd.min.js");
//     },
//     { ssr: false }
// );
// dynamic(import('froala-editor/js/plugins.pkgd.min.js'), { ssr: false });

// Import a single Froala Editor plugin.
// import 'froala-editor/js/plugins/align.min.js';

// Import a language file.
// import 'froala-editor/js/languages/de.js';

// Import a third-party plugin.
// import 'froala-editor/js/third_party/image_tui.min.js';
// import 'froala-editor/js/third_party/embedly.min.js';
// import 'froala-editor/js/third_party/spell_checker.min.js';

// Include font-awesome css if required.
// install using "npm install font-awesome --save"
// import 'font-awesome/css/font-awesome.css';
// import 'froala-editor/js/third_party/font_awesome.min.js';

// Include special components if required.
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
// import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';

// Render Froala Editor component.
import React, { useState, useEffect } from 'react';

export function EditorFlora() {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        ReactDOM.render(<Editor tag='textarea' />, document.getElementById('editor'));
    
        setDomLoaded(true);
    }, []);
   
    return (
        <>

            <div id="editor">
            </div>


        </>
    )
}
