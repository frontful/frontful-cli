import logoAsset from '../../assets/logo.png'

const requestListener = (req, res) => {
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>__project_name__</title>
        <link rel="stylesheet" href="${global.frontful.environment.assets.css.main}">
      </head>
      <body>
        <div class="container">
          <div class="content">
            <img src="${logoAsset}"/>
          </div>
        </div>
        <script src="${global.frontful.environment.assets.js.vendor}"></script>
        <script src="${global.frontful.environment.assets.js.main}"></script>
      </body>
    </html>
  `)
}

export default requestListener
