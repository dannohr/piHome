# piHome

# Data Migrations

sequelize db:migrate --config config/sequelizeConfig.js

sequelize db:migrate:undo --config config/sequelizeConfig.js
sequelize db:migrate:undo:all --config config/sequelizeConfig.js

# Seed Tables

seed:generate --name pick-any-name

sequelize db:seed:all --config config/sequelizeConfig.js

sequelize db:seed:undo
sequelize db:seed:undo:all --config config/sequelizeConfig.js

To create a branch locally
You can create a branch locally as long as you have a cloned version of the repo.

From your terminal window, list the branches on your repository.

\$ git branch

- master
  This output indicates there is a single branch, the master and the asterisk indicates it is currently active.

Create a new feature branch in the repository

\$ git branch <feature_branch>
Switch to the feature branch to work on it.

\$ git checkout <feature_branch>
You can list the branches again with the git branch command.

Commit the change to the feature branch:

$ git add .
$ git commit -m "adding a change from the feature branch"
Switch back to the master branch.

\$ git checkout master
Push the feature branch to Bitbucket:

\$ git push origin <feature_branch>
