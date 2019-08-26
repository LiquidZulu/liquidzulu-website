var responses = require('./responses_collection.js');
/**
 * Used to generate error pages programatically with a high efficiency. 
 * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 
 * Usage :-- 
 * 
 * const HTTPerr = require('./path/to/this/file/error_response.js');
 * 
 * // for 404 error page:
 * 
 * var errorPage = new HTTPerr(404);
 * 
 * res.status(404).send(errorPage); // Express syntax
 * 
 * @param {Number} response
 */

module.exports = class errResponse {

  /**
   * 
   * @param {Number} response 
   */

  constructor(response){
    
    if(typeof response !== 'string'){response = `${response}`}
    
    /**
     * @type {integer}
     */
    
    this.response = responses.find('code', response);
    
    
    /**
     * @type {string}
     */
    
    this.title = this.response.message;
    
    
    /**
     * @type {string}
     */
    
    this.desc = this.response.description;
    
    
    this.genErrPage = async (meta) => {

      if(meta){

        return `
        <!DOCTYPE html>

        ${meta.html.prepend || ''}

        <html>

          <head>

            ${meta.head.prepend || ''}
            <title>ERROR ${meta.code || this.response.code}: ${meta.title || this.response.title}</title>
            <link rel='stylesheet' href='${meta.css.href || ''}'/>
            <link rel="icon" type="${meta.icon.MIME || 'image/' + meta.icon.href.substring(meta.icon.href.length - 3, meta.icon.href.length) || ''}" href="${meta.icon.href || ''}"/>
            <style>${meta.css.code || ''}</style>
            ${meta.head.append || ''}

          </head>


          <body>

            ${meta.body.prepend || ''}
            <h1 id='pageTitle'>HTTP ERROR ${meta.code || this.response.code}: ${meta.title || this.response.title}</h1>
    
            <center>
              <a href='${meta.home || './'}' class='sourceURL'>Return to Homepage</a>
              <div class='desc'>
                <p>${meta.desc || this.desc}</p>
              </div>
            </center>
            ${meta.body.append || ''}

          </body>
        </html>
        ${meta.html.append || ''}`;
      }else{
        return this.genErrPage({
          code: this.response.code,
          title: this.title,
          css: {
            href: 'https://garfield-comics.glitch.me/style.css',
            code: ''
          },
          icon: {
            href: 'http://media.liquidzulu.xyz/garf/GarfieldOnlyThirdPanel.png',
            MIME: 'image/png'
          },
          home: '../',
          desc: this.desc,
          head: {
            prepend: '',
            append: ''
          },
          body: {
            prepend: '',
            append: ''
          },
          html: {
            prepend: '',
            append: ''
          }
        });
      }
    }
    
  }

  /**
   * Sets the <title> of the error page
   * @param {String} title 
   */
  
  setTitle(title){
    this.title = title
  }

  /**
   * Sets the description for the error page
   * @param {String} desc 
   */
  
  setDesc(desc){
    this.desc = desc
  }

  /**
   * Can be used to override the html output of this class.
   * 
   * this.desc and this.title may still be able to be used 
   * though I have not tested this in all situations.
   * @param {String} errPage 
   */
  
  setErrPage(errPage){
    this.errPage = errPage;
  }
}