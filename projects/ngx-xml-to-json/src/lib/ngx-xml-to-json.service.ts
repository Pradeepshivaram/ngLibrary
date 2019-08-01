import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxXmlToJsonService {
  private parser: any;
  private mimeType:any = 'text/xml';
  constructor() { 
    this.parser = new DOMParser();
  }

  xmlToJson(xmlString: string, myOptions: any) {
    let jsonObj = Object.create(null);
    let obj = {};
    const options = { // set up the default options 
      mergeCDATA: false, // extract cdata and merge with text
      cDataKey:'cData',
      textKey: 'text', // tag name for text nodes
      valueKey: 'value', // tag name for attribute values
      attrKey: 'attr', // tag for attr groups
      cdataKey: 'cdata', // tag for cdata nodes (ignored if mergeCDATA is true)
    };
    // update the options
    for(let prop in myOptions ) {
      if(options[prop] !== undefined) {
        options[prop] = myOptions[prop];
      }
    }
    let xmlDoc = this.parser.parseFromString(xmlString, this.mimeType);
    obj = this.convertToJson(xmlDoc, options);
    return Object.assign(jsonObj, obj);
  }

  private convertToJson(doc, opt){
    let obj = {};
    switch(doc.nodeType) {
      case 1 : // ELEMENT_NODE
        const eleAttr = doc.attributes;
        if (eleAttr.length > 0) {
          obj[opt.attrKey] = {};
          for( let i= 0 ; i< eleAttr.length; i++ ) {
            const attribute = eleAttr[i];
            obj[opt.attrKey][attribute.nodeName] = attribute['nodeValue'];
          }
        }
        break;
      case 3 : // TEXT_NODE
        obj = doc.nodeValue;
        break;
      case 4 : // CDATA_SECTION_NODE
        obj = doc.nodeValue;
        break;
      case 7 : // PROCESSING_INSTRUCTION_NODE
        obj = doc.nodeValue;
        break;
      default:
        
    }
    
    if( doc.hasChildNodes()){
      if(doc.childNodes.length === 1 && doc.childNodes[0]['nodeType'] === 3){
        obj[opt.textKey] = doc.childNodes[0]['nodeValue'];
      } else {
        doc.childNodes.forEach(node => {
          let cData: any;
          let nodeName = node.nodeType === 3 ? opt.textKey : node.nodeName;
          if(obj[nodeName] === undefined) {
            if( node.nodeType === 4 ){
              cData = this.convertToJson(node,opt);
              if(!opt.mergeCDATA){
                obj[opt.cDataKey] = cData;
              }
            } else {
              obj[nodeName] = cData === undefined ? this.convertToJson(node,opt) : `${cData}${this.convertToJson(node,opt)}`;
            }
          } else {
            const previousNode = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(previousNode);
            obj[nodeName].push(this.convertToJson(node, opt));
          }
        });
      }
    }
    return obj;
  }

}
