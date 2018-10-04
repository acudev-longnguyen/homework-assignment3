// Dependencies
const fs = require('fs');
const util = require('util');
const fsRead = util.promisify(fs.readFile);
const path = require('path');

/*
 * Wrapper model for Template
 *
 */
class Template {

  constructor(templateName) {
    this.templatesDir = path.join(__dirname,'/../resources/templates/');
    this.templateName = templateName;
    this.templateContent = '';
  }

  async load(includeUniversalTemplate) {
    const targetTemplate = await fsRead(`${this.templatesDir}/${this.templateName}.html`, 'utf-8');

    if (includeUniversalTemplate) {
      const headerTemplate = await fsRead(`${this.templatesDir}/_header.html`, 'utf-8');
      const footerTemplate = await fsRead(`${this.templatesDir}/_footer.html`, 'utf-8');

      this.templateContent = headerTemplate + targetTemplate + footerTemplate;
    } else {
      this.templateContent = targetTemplate.trim();
    }

    return this;
  }

  async interpolate(data) {
    let templateContent = typeof(this.templateContent) == 'string' && this.templateContent.length > 0 ? this.templateContent : '';
    data = typeof(data) == 'object' && data !== null ? data : {};

    // For each key in the data object, insert its value into the string at the corresponding placeholder
    for(let key in data){
       if(data.hasOwnProperty(key) && typeof(data[key] == 'string')){
          let replace = data[key];
          let find = '{'+key+'}';
          this.templateContent = templateContent.replace(find,replace);
       }
    }
  }
}

// Export the module
 module.exports = Template;