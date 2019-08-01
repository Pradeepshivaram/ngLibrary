import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxXmlToJsonService {
  private parser: any;
  private mimeType:any = 'text/xml';
  xml= `<contact-info><address category = "residence"><name>Tanmay Patil</name><company>TutorialsPoint</company><phone>(011) 123-4567</phone></address><address category = "commercial"/></contact-info>`;
  constructor() { 
    this.parser = new DOMParser();
  }

  xmlToJson(xmlString: string, myOptions: any) {
    let jsonObj = Object.create(null);
    let obj = {};
    const options = { // set up the default options 
      mergeCDATA: true, // extract cdata and merge with text
      normalize: true, // collapse multiple spaces to single space
      xmlns: true, // include namespaces as attribute in output
      namespaceKey: '_ns', // tag name for namespace objects
      textKey: 'text', // tag name for text nodes
      valueKey: 'value', // tag name for attribute values
      attrKey: 'attr', // tag for attr groups
      cdataKey: 'cdata', // tag for cdata nodes (ignored if mergeCDATA is true)
      attrsAsObject: true, // if false, key is used as prefix to name, set prefix to '' to merge children and attrs.
      stripAttrPrefix: true, // remove namespace prefixes from attributes
      childrenAsArray: true // force children into arrays
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
      case 4 : // PROCESSING_INSTRUCTION_NODE
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
          let nodeName = node.nodeName === '#text' ? opt.textKey : node.nodeName;
          if(obj[nodeName] === undefined) {
            if( opt.mergeCDATA && node.nodeType === 4) {
              cData = this.convertToJson(node,opt);
            } else {
              obj[nodeName] = this.convertToJson(node,opt);
            }
            if(cData) {

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
