import inquirer from 'inquirer'

inquirer.prompt([
  {
    name: 'name',
    type: 'string',
    message: 'Project folder name',
  },
  {
    name: 'template',
    type: 'rawlist',
    message: 'Project template type',
    choices: [
      {
        short: 'Zero',
        name: 'Unopinionated - Entry files for server and browser',
        value: 'zero',
      },
      {
        short: 'Basic',
        name: 'Structure - Express, React and configuration',
        value: 'basic',
      },
      {
        short: 'Compleate',
        name: 'Architecture - State management, routing, styling etc.',
        value: 'compleate',
      },
      {
        short: 'Static',
        name: 'Static webpage - Generate static Html using React',
        value: 'static',
      },
      {
        short: 'Package',
        name: 'Package template - Configured build and deploy',
        value: 'package',
      },
    ]
  },
]).then(function (answers) {
  console.log('Not implemented', answers)
})
