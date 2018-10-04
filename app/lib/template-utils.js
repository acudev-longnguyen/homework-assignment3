/*
 * Template utilities
 *
 */

// Dependencies
const fs = require('fs');
const util = require('util');
const fsRead = util.promisify(fs.readFile);
const TemplateUtils = {};

// Read and return a template content
TemplateUtils.read = async (templateName, data) => {
  const templatesDir = path.join(__dirname,'/../resources/templates/');
  const templateContent = await fsRead(`${templatesDir}/${templateName}.html`, 'utf-8');

  if (templateContent) {
    return await Template.interpolate(templateContent, data);
  } else {
    return null;
  }
};

// Replace placeholders on template with data
TemplateUtils.interpolate = async (templateContent, data) => {
  templateContent = typeof(templateContent) == 'string' && templateContent.length > 0 ? templateContent : '';
  data = typeof(data) == 'object' && data !== null ? data : {};

  // For each key in the data object, insert its value into the string at the corresponding placeholder
  for(let key in data){
     if(data.hasOwnProperty(key) && typeof(data[key] == 'string')){
        let replace = data[key];
        let find = '{'+key+'}';
        templateContent = templateContent.replace(find,replace);
     }
  }

  return templateContent;
};

TemplateUtils.serveStaticResource = async (fileName, type) => {
  fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
  if (fileName) {
    // set resource path
    const publicDir = path.join(__dirname,`/../resources/${type}/`);

    // read and return resource
    return await fsRead(`${publicDir}${fileName}`);
  } else {
    return null;
  }
};

// Export the module
module.exports = TemplateUtils;