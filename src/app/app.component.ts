import { Component } from '@angular/core';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { NgxXmlToJsonService } from 'ngx-xml-to-json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Libraries Application';
  xml= `<contact-info><address category = "residence" categohry = "residence" ><name color='white'><![CDATA[<message> Welcome to TutorialsPoint </message>]]>Tanmay Patil</name><company>TutorialsPoint</company><phone>(011) 123-4567</phone></address><address/><personal category = "commercial"> i dont know</personal></contact-info>`;
  constructor(private ngxXml2jsonService: NgxXml2jsonService , private ngxXmlToJsonService: NgxXmlToJsonService){
    const parser = new DOMParser();
    const xml = parser.parseFromString(this.xml, 'text/xml');
    const obj = this.ngxXml2jsonService.xmlToJson(xml);
    console.log(obj);
    console.log('-------------------------------------------');
    const myOptions = {
      attrKey: 'attr',
      textKey: 'textavlue',
      mergeCDATA: false
    }
    const a = this.ngxXmlToJsonService.xmlToJson(this.xml, myOptions)
    console.log(a);
  }

  
}
