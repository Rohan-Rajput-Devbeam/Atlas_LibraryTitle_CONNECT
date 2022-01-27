import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './AtlasLibraryConnectWebPart.module.scss';
import * as strings from 'AtlasLibraryConnectWebPartStrings';

import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';
import { PropertyFieldTextWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldTextWithCallout';

export interface IAtlasLibraryConnectWebPartProps {
  description: string;
  PageTitle: string;
}


export default class AtlasLibraryConnectWebPart extends BaseClientSideWebPart<IAtlasLibraryConnectWebPartProps> {

  public render(): void {
    // console.log(this.properties.PageTitle);
    // console.log(this.properties.description);
    // }
    // let pageTitle: string = document.title;
  //---------Get Current Page Title--------------->>

    const myArray = document.title.split("-");
    let pageTitle = myArray[myArray.length - 1].split(",")[0];
    // console.log("Page Title is---" + pageTitle);
    this.properties.PageTitle = pageTitle;
     this.properties.description = pageTitle;




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









  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
                  label: strings.DescriptionFieldLabel,
                  value: this.properties.PageTitle
                  
                }),
                
              ]
            }
          ]
        }
      ]
    };
  }
}
