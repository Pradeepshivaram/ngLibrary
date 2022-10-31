# NgxXmlToJson

Angular 14 module to convert xml to json.

## Installation

```
npm install ngx-xml-to-json --save
```

## Example

```typescript
import { Component } from '@angular/core';
import { NgxXmlToJsonService } from 'ngx-xml-to-json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   xml= `<contact-info><address category = "residence" type = "sale" ><name color='white'><![CDATA[ Welcome to TutorialsPoint]]>Tanmay Patil</name><company>TutorialsPoint</company><phone>(011) 123-4567</phone></address><address/><personal category = "commercial"> i dont know</personal></contact-info>`;
  constructor(private ngxXmlToJsonService: NgxXmlToJsonService) {
    const options = { // set up the default options 
      textKey: 'text', // tag name for text nodes
      attrKey: 'attr', // tag for attr groups
      cdataKey: 'cdata', // tag for cdata nodes (ignored if mergeCDATA is true)
    };
    const obj = this.ngxXmlToJsonService.xmlToJson(this.xml, options)
    console.log(obj);
  }
}
```


## Result 

```json
{
    "contact-info": {
        "address":[
            {
                "attr" : {
                    "category": "residence",
                    "type": "sale"
                },
                "company": {
                    "text": "TutorialsPoint"
                },
                "name": {
                    "attr" : {
                        "color": "white"
                    },
                    "cData": "Welcome to TutorialsPoint",
                    "text": "Tanmay Patil"
                },
                "phone": {
                    "text": "(011) 123-4567"
                }
            }
        ],
        "personal": {
            "attr" : {
                "category": "commercial"
            },
            "text": "I don't know"
        }
    }
}
```

