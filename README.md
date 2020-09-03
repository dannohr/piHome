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

To get the latest:
git fetch --all

git reset --hard origin/master

To checkin new:
git add .

git commit -am "your commit message"

git push origin master
