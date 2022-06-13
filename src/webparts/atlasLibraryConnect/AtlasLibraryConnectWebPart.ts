import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './AtlasLibraryConnectWebPart.module.scss';
import * as strings from 'AtlasLibraryConnectWebPartStrings';

import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';
import { PropertyFieldTextWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldTextWithCallout';
// import { IFilePickerResult } from '@pnp/spfx-property-controls';
import { PropertyFieldFilePicker, IPropertyFieldFilePickerProps, IFilePickerResult } from "@pnp/spfx-property-controls/lib/PropertyFieldFilePicker";
import { PropertyFieldMessage } from '@pnp/spfx-property-controls/lib/PropertyFieldMessage';
import { PropertyFieldLabelWithCallout } from '@pnp/spfx-property-controls';
import { sp } from '@pnp/sp/presets/all';
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';



export interface IAtlasLibraryConnectWebPartProps {
  ImageProperty: any;
  description: string;
  PageTitle: string;
  filePickerResult: any;

  LangEnglish: any;
  LangChinese: any;
  LangGerman: any;
  LangEspanol: any;
  LangFrancais: any;
  LangPolski: any;
  LangJapanese: any;
  LangPortugues: any;
  LangRussian: any;

  EnglishText: any;
  ChineseText: any;
  GermanText: any;
  EspanolText: any;
  FrancaisText: any;
  PolskiText: any;
  JapaneseText: any;
  PortuguesText: any;
  RussianText: any;
}


export default class AtlasLibraryConnectWebPart extends BaseClientSideWebPart<IAtlasLibraryConnectWebPartProps> {

  public render(): void {

    sp.setup({
      spfxContext: this.context
    });

    var siteUrl = this.context.pageContext.web.absoluteUrl ///Get Site Url
    // console.log(siteUrl)

    const myArray1 = siteUrl.split("/");
    let siteName = myArray1[myArray1.length - 1].split(".")[0]; ///Get Site Name
    // console.log(siteName)

    try {
      // Set Image URL received from the file picker component--->
      const myObj = (this.properties.filePickerResult);
      // console.log(myObj.fileAbsoluteUrl);
      this.properties.ImageProperty = myObj.fileAbsoluteUrl;
    }
    catch (err) {

    }


    // console.log(this.properties.PageTitle);
    // console.log(this.properties.description);
    // }
    // let pageTitle: string = document.title;
    //---------Get Current Page Title--------------->>
    var flagVar = false;
    const myArray = document.title.split("-");
    let pageTitle = myArray[myArray.length - 1].split(",")[0];
    pageTitle = "Test"

    if (this.properties.PageTitle != pageTitle) {
      flagVar = true;
    }

    // if (!this.renderedOnce || flagVar) {
    //   console.log("First Render")
    //   // this.properties.PageTitle = pageTitle;

    // }


    // console.log("Page Title is---" + pageTitle);
    // if(this.properties.PageTitle = null){
    //   this.properties.PageTitle = pageTitle;

    // }
    // else{

    //   if(this.properties.PageTitle!=pageTitle && this.properties.PageTitle!=null){
    //   console.log(this.properties.PageTitle)
    //   } 
    //   else{
    //     this.properties.PageTitle = pageTitle;
    //     this.properties.description = pageTitle;
    //   }
    // }

    // try {
    //   // Set Image URL received from the file picker component--->
    //   var myObj1 = (this.properties.filePickerResult);
    //   var image1 = myObj1.fileAbsoluteUrl;
    // }
    // catch (err) {
    //   // console.error(err);

    // }


    //---->>Set User Language based on user preference .....
    // var userEmail = this.context.pageContext.user.email;
    // this.context.spHttpClient.get(`${siteUrl}/_api/web/lists/getbytitle('Preference')/Items?&$filter=Title eq '${userEmail}'`,
    //   SPHttpClient.configurations.v1)
    //   .then((response: SPHttpClientResponse) => {
    //     response.json().then((responseJSON: any) => {
    //       // console.log(responseJSON.value);
    //       var prefLanguage = responseJSON.value.map(function (obj: { Language: any; }) {
    //         return obj.Language;
    //       });
    //       console.log(prefLanguage)



          if (this.properties.ImageProperty) {

            this.domElement.innerHTML = `
  <head>
           <link rel="preconnect" href="https://fonts.googleapis.com">
       <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
       <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
       </head>
    <div class="${styles.atlasLibraryConnect}">
      <div class="${styles.pageImage}" style="background-image: url(${this.properties.ImageProperty});
      margin-left: 25%;
      height: 10em;
      box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
    background-repeat: no-repeat;width:50em;height:10em;
    background-size:cover;
    background-position: center;">
      <div class="${styles.callToAction}">
      ${escape(this.properties.PageTitle)}


      
       </div>
      </div>
    </div>`;



          }

          else {
            this.domElement.innerHTML = `
    <head>
             <link rel="preconnect" href="https://fonts.googleapis.com">
         <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
         <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
         </head>
      <div class="${styles.atlasLibraryConnect}">
        <div class="${styles.pageImage}">
        <div class="${styles.callToAction}">
        ${escape(this.properties.PageTitle)}
        
       

        
         </div>
        </div>
      </div>`;



          }



      //   });
      // });


  }


  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    var siteUrl = this.context.pageContext.web.absoluteUrl ///Get Site Url
    // console.log(siteUrl)

    const myArray = siteUrl.split("/");
    let siteName = myArray[myArray.length - 1].split(".")[0]; ///Get Site Name
    // console.log(siteName)

    let EnglishProperty: any;
    let ChineseProperty: any;
    let GermanProperty: any;
    let EspanolProperty: any;
    let FrancaisProperty: any;
    let PolskiProperty: any;
    let JapaneseProperty: any;
    let PortuguesProperty: any;
    let RussianProperty: any;

    if (this.properties.LangEnglish == true) {
      EnglishProperty = PropertyPaneTextField('EnglishText', {
        label: "",
        value: this.properties.EnglishText
      })
    }
    else {
      EnglishProperty = ""
    };
    ////////////////////////////////////////////////////////////
    if (this.properties.LangChinese == true) {
      ChineseProperty = PropertyPaneTextField('ChineseText', {
        label: "",
        value: this.properties.ChineseText
      })
    }
    else {
      ChineseProperty = ""
    };
    /////////////////////////////////////////////////////////////
    if (this.properties.LangGerman == true) {
      GermanProperty = PropertyPaneTextField('GermanText', {
        label: "",
        value: this.properties.GermanText
      })
    }
    else {
      GermanProperty = ""
    };
    ////////////////////////////////////////////////////////////
    if (this.properties.LangEspanol == true) {
      EspanolProperty = PropertyPaneTextField('EspanolText', {
        label: "",
        value: this.properties.EspanolText
      })
    }
    else {
      EspanolProperty = ""
    };
    ////////////////////////////////////////////////////////////
    if (this.properties.LangFrancais == true) {
      FrancaisProperty = PropertyPaneTextField('FrancaisText', {
        label: "",
        value: this.properties.FrancaisText
      })
    }
    else {
      FrancaisProperty = ""
    };
    ///////////////////////////////////////////////////////////////
    if (this.properties.LangPolski == true) {
      PolskiProperty = PropertyPaneTextField('PolskiText', {
        label: "",
        value: this.properties.PolskiText
      })
    }
    else {
      PolskiProperty = ""
    };
    //////////////////////////////////////////////////////////////
    if (this.properties.LangJapanese == true) {
      JapaneseProperty = PropertyPaneTextField('JapaneseText', {
        label: "",
        value: this.properties.JapaneseText
      })
    }
    else {
      JapaneseProperty = ""
    };
    /////////////////////////////////////////////////////////////
    if (this.properties.LangPortugues == true) {
      PortuguesProperty = PropertyPaneTextField('PortuguesText', {
        label: "",
        value: this.properties.PortuguesText
      })
    }
    else {
      PortuguesProperty = ""
    };
    //////////////////////////////////////////////////////////
    if (this.properties.LangRussian == true) {
      RussianProperty = PropertyPaneTextField('RussianText', {
        label: "",
        value: this.properties.RussianText
      })
    }
    else {
      RussianProperty = ""
    };
    ///////////////////////////////////////////////////////////



    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('PageTitle', {
                  label: "Page Title",
                  value: this.properties.PageTitle,
                }),
                // PropertyPaneCheckbox('LangEnglish', {
                //   text: "English",
                //   checked: false,
                //   disabled: false
                // }),
                // EnglishProperty,
                // PropertyPaneCheckbox('LangChinese', {
                //   text: "Chinese",
                //   checked: false,
                //   disabled: false
                // }),
                // ChineseProperty,
                // PropertyPaneCheckbox('LangGerman', {
                //   text: "German",
                //   checked: false,
                //   disabled: false
                // }),
                // GermanProperty,
                // PropertyPaneCheckbox('LangEspanol', {
                //   text: "Espanol",
                //   checked: false,
                //   disabled: false
                // }),
                // EspanolProperty,
                // PropertyPaneCheckbox('LangFrancais', {
                //   text: "Francais",
                //   checked: false,
                //   disabled: false
                // }),
                // FrancaisProperty,
                // PropertyPaneCheckbox('LangPolski', {
                //   text: "Polski",
                //   checked: false,
                //   disabled: false
                // }),
                // PolskiProperty,
                // PropertyPaneCheckbox('LangJapanese', {
                //   text: "Japanese",
                //   checked: false,
                //   disabled: false
                // }),
                // JapaneseProperty,
                // PropertyPaneCheckbox('LangPortugues', {
                //   text: "Portugues",
                //   checked: false,
                //   disabled: false
                // }),
                // PortuguesProperty,
                // PropertyPaneCheckbox('LangRussian', {
                //   text: "Russian",
                //   checked: false,
                //   disabled: false
                // }),
                // RussianProperty,


                // PropertyFieldFilePicker('filePicker1', {
                //   context: this.context,
                //   filePickerResult: this.properties.filePickerResult1,
                //   onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                //   properties: this.properties,
                //   onSave: (e: IFilePickerResult) => { console.log(e); this.properties.filePickerResult1 = e; },
                //   onChanged: (e: IFilePickerResult) => { console.log(e); this.properties.filePickerResult1 = e; },
                //   key: "filePickerId",
                //   buttonLabel: "Select Image(1200w X 150h)",


                //  label: "Select Image",
                // }),

                PropertyFieldFilePicker('filePicker', {
                  context: this.context,
                  filePickerResult: this.properties.filePickerResult,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onSave: async (e: IFilePickerResult) => {
                    // console.log(e);
                    // console.log(e.downloadFileContent());
                    //for uploaded images
                    if (e.fileAbsoluteUrl == null) {
                      await e.downloadFileContent()
                        .then(async r => {
                          console.log(r, e)
                          let fileresult = await sp.web.getFolderByServerRelativeUrl(`/sites/${siteName}/SiteAssets/RackhouseImages/`).files.addUsingPath(e.fileName.replace(/ /g, "_").replace(/\(|\)|\[|\]/g, "_"), r, { Overwrite: true });
                          e = { ...e, fileAbsoluteUrl: this.context.pageContext.web.absoluteUrl + fileresult.data.ServerRelativeUrl.substring(16) } //Will need to change substring value if Site name changes---->
                          this.properties.filePickerResult = e;

                        });
                    }
                    //for stock images/url/link images
                    else {
                      this.properties.filePickerResult = e;
                    }

                    // console.log(this.properties.filePickerResult, e);

                  },
                  onChanged: (e: IFilePickerResult) => { this.properties.filePickerResult = e; },
                  key: "filePickerId",
                  buttonLabel: "Image Picker",
                  label: "Select Image",

                }),





              ]
            }
          ]
        }
      ]
    };
  }
}
