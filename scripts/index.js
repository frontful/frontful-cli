import fs from 'fs-extra'
import inquirer from 'inquirer'
import path from 'path'
import find from 'find'
import chalk from 'chalk'

console.log(chalk.green.bold(`Creating new Frontful project`))

function getProjectPath(name) {
  const projectPath = path.resolve(process.cwd(), name)
  if (fs.existsSync(projectPath)) {
    throw new Error('Folder already exists')
  }
  return projectPath
}

inquirer.prompt([
  {
    name: 'name',
    type: 'string',
    message: 'Name:',
    validate: (name) => {
      try {
        getProjectPath(name)
      }
      catch(error) {
        return error.message
      }
      return true
    }
  },
  {
    name: 'template',
    type: 'rawlist',
    message: 'Template:',
    choices: [
      {
        short: 'Zero',
        name: 'Zero - Unopinionated entry files for server and browser',
        value: 'zero',
      },
      {
        short: 'Basic',
        name: 'Basic - Structure and configuration with Express and React',
        value: 'basic',
      },
      {
        short: 'Complete',
        name: 'Complete - Architecture, state management, routing, styling etc.',
        value: 'complete',
      },
      {
        short: 'Static',
        name: 'Static - Generate static HTML webpages using React',
        value: 'static',
      },
      {
        short: 'Package',
        name: 'Package - Template with configured package build and deploy scripts',
        value: 'package',
      },
    ]
  },
]).then(function (answers) {
  const templatePath = path.resolve(__dirname, `../templates/${answers.template}`)
  const projectPath = getProjectPath(answers.name)

  fs.copySync(templatePath, projectPath, {
    filter: (filename) => {
      return new RegExp(`^((?!(/(node_modules|build|yarn.lock)(/|$))).)*$`, 'i').test(filename)
    }
  })

  find.fileSync(new RegExp(`^((?!(/(node_modules|build|yarn.lock)(/|$))).)*$`, 'i'), projectPath).forEach((filename) => {
    var content = fs.readFileSync(filename, 'utf8')
    if(/__project_name__/.test(content)) {
      content = content.replace(/__project_name__/gi, answers.name)
      fs.writeFileSync(filename, content)
    }
  })

  console.log(chalk.cyan.bold(`Project "${answers.name}" created`))
  console.log(chalk.white.bold(`Usage:`))
  console.log(chalk.white(`cd ./${answers.name}`))
  console.log(chalk.white(`yarn install`))
  console.log(chalk.white(`yarn start`))
})
